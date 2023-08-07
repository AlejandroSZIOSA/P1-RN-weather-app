import React, { Component,useContext } from "react";
import { Button, View,StyleSheet, Text, TextInput } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contexlocalisation } from '../App';

const CompScreen2 = ({ navigation }) => {
  const [userindata, setUserInData] = useState("");
  const [localisation, setNewLocalisation] = useState("rom"); //check server
  const [saveButoomDisabled,setSaveButomDisabled]=useState(false);
  const [clearButtomDisabled,setClearButtomDisabled]=useState(true);
  const [jsonCopy, setJsonCopy] = useState({});
  const [textdisabled, setTextDisabled] = useState(true); 
  const [butomDisabled, setButomDisabled] = useState(true); // change it, if Api problem
  const [apiStatus, setApiStatus] = useState("");
  const [storeStatus, setStoreStatus] = useState("");
  const [searchDisabled, setSearchDis] = useState(true);
  const [DisBotNewSearch, setDisBotNewSearch] = useState(true);
  const [DisBotSetLocalisation, setDisBotSetLocalisation] = useState(false);
  const {value2,setValue2}=useContext(Contexlocalisation);//context

  useEffect(() => {
    getSetDataApi(); //change it! if API problem
    checkingStorageDataSaved();

  },[localisation])
  
  //Row function check if storage is empty or not
  const checkingStorageDataSaved = async ()=>{
  //await. fix promise problem
    if( await gettingDataStorage() === null){
      setStoreStatus("Empty");
      setDisBotSetLocalisation(false);
      setSaveButomDisabled(true); //
      setClearButtomDisabled(true);
    }
      else {
        setStoreStatus(value2);
        setUserInData(value2); //contex
        setDisBotSetLocalisation(true);
        setSearchDis(true);
        setButomDisabled(false);
        setDisBotNewSearch(true);
        setTextDisabled(false);
        setClearButtomDisabled(false);
        setSaveButomDisabled(true); //
        }
  }
  //Save data in storage
  const saveDataStorage = async (value) => {  
    try {
    const saveLocalisation = (value); 
    await AsyncStorage.setItem('@storage_Key', saveLocalisation)
    setStoreStatus("Load");
    setValue2(value);//contex
    } catch (e) {
      console.log("saving error ");
    }
  }  
  //Load data from storage
  const gettingDataStorage = async () => {
    try {
    const loadLocalisation = await AsyncStorage.getItem('@storage_Key') 
    return loadLocalisation != null ? setNewLocalisation(JSON.parse(loadLocalisation) )  : null;
    } catch(e) {
      console.log("loading error ");
    }
  }
  //Delete all data in storage
  const clearDataStorage=()=> {
      AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => console.log("clear"));
      setStoreStatus("Empty");
      setValue2("Empty"); //contex
  }
  //Set Save The oncatch localisation
  const setSavedLocalisation=()=>{
    saveDataStorage(localisation);  //
    setSaveButomDisabled(true);
    setClearButtomDisabled(false);
    setDisBotNewSearch(true);
  }
  //Set Clear oncatched localisation 
  const setClearDataSaved=()=>{
    clearDataStorage();//
    setSaveButomDisabled(true);
    setClearButtomDisabled(true);
    setSearchDis(true);
    setUserInData("");
    setDisBotSetLocalisation(false);
    setTextDisabled(true);
    setDisBotNewSearch(true);
    setButomDisabled(true);
    setApiStatus("");
  }
  //Arrow function - check API Server status and catch API information, then make a copy
  const getSetDataApi=()=>{
    fetch("https://goweather.herokuapp.com/weather/"+ localisation)
      .then((response) => response.json())
      .then((json) => setJsonCopy(json)) 
      .catch(() =>{
        setApiStatus("Server is in problem") 
        setDisBotSetLocalisation(true) 
        setTextDisabled(false);
        //setButomDisabled(true); //ojo revisar
      })
      .finally(setApiStatus("Server is OKAY"))
  };
  //Arrow function - check the correct API information..
    const searchLocalisation = () => {
    if (jsonCopy.temperature === null || jsonCopy.temperature === undefined 
      ||jsonCopy.description === undefined||jsonCopy.temperature === ""||jsonCopy.temperature === '""' ) {
      setApiStatus("No information found, try efter a while!");
      setButomDisabled(true);
      setSearchDis(true);
      setDisBotSetLocalisation(true);
      setTextDisabled(false);
      setDisBotNewSearch(false);
      setSaveButomDisabled(false);
    }else {
        setApiStatus("Found it! ");
        setButomDisabled(false);
        setSearchDis(true);
        setDisBotNewSearch(false);
        setDisBotSetLocalisation(true);
        setTextDisabled(false);
        setSaveButomDisabled(false);
        }
  };
  //Arrow function - Check if the user information is correct 
  const inSetLocalisation = ()=>{
    if(userindata===""){
      setApiStatus("No user information"); 
      setDisBotNewSearch(false);
      setButomDisabled(true);
      setSearchDis(true);
      setDisBotSetLocalisation(true);
      setTextDisabled(false);
    }else{
        setNewLocalisation(userindata);
        setSearchDis(false);
        setTextDisabled(false);
        setDisBotSetLocalisation(true);
        }
  }
  //Arrow function - reset to default values
  const inNewLocalisation = () => {
    setTextDisabled(true);
    setSearchDis(true);
    setApiStatus("");
    setUserInData("");
    setDisBotSetLocalisation(false);
    setDisBotNewSearch(true);
    setButomDisabled(true);
    setSaveButomDisabled(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={{fontSize:"x-large",textAlign:'center'}}> Catch your Weather here </Text>
      </View>
      <View style={{marginRight:"70px"}}>
        <Text style={{fontSize:'large'  }}> [ city + country ]  </Text>
      </View>
      <View style={ styles.container3}>
          <View style={styles.container3TB}>
            <TextInput
            style={{height: 34,fontSize: 22,width:260, backgroundColor:"#C4C4C4", borderColor:"red"}}  
            title="city"
            placeholder="Ex: stockholm sweden"
            maxLength={27}
            value={userindata}
            editable={textdisabled}
            onChangeText={(value) => {setUserInData(value)}}
            />
          </View>
          <View style={styles.container3TB}>
            <Button color="#ff7d00" title="Set" onPress={inSetLocalisation} disabled={DisBotSetLocalisation} /> 
          </View>
      </View>
      <View style={styles.containerB2}>
        <View style={styles.B2}>
          <Button color="#ff7d00" title="New Search" onPress={inNewLocalisation} disabled={DisBotNewSearch} />
        </View>
        <View style={styles.B2}>
          <Button color="#ff7d00" title="Search" onPress={searchLocalisation} disabled={searchDisabled}    />
        </View>
        <View style={styles.B2}>
          <Button color="#ff7d00" title="Catch" onPress={setSavedLocalisation} disabled={saveButoomDisabled}    />
        </View>
        <View style={styles.B2}>
          <Button color="#ff7d00" title="Clear" onPress={setClearDataSaved} disabled={clearButtomDisabled}    />
        </View>
      </View>
      <Button
        color="#ff7d00"
        title="Show Whether"
        disabled={butomDisabled}
        onPress={() =>
          navigation.navigate("Your Wheather", {
             t:jsonCopy.temperature,
             d:jsonCopy.description,
             p:localisation,
          })
        }
      />
      <View style={styles.statusTextContainer}>
        <Text style={{color:"black",fontSize:'large'}} > [API status] : {apiStatus}</Text>
      </View>
      <View style={styles.statusTextContainer}>
        <Text style={{color:"black"}} > [STORAGE] : {storeStatus} </Text>
      </View>
      <View style={{backgroundColor:"#15616D", flex:1, flexDirection:"row" ,width:"100%"}}>
          <Text></Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffecd1",
    alignItems: "center",
    justifyContent: "top",
  },
  container2: {
    flexDirection:"row",
    justifyContent: "top",
    padding:"30px",
    justifyContent:"top" ,
  },
  container3: {
    flexDirection: "row",
    justifyContent:"space-between",
  },
  container3TB:{
    padding:'10px',
  },
  statusTextContainer:{
    padding:"15px",
    width:"350px",
    flexDirection:"row",
    marginRight:"5px",
    textAlign:"auto",
  },
  containerB2: {
    padding:"15px",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  B2:{
    padding:'6px'
  },
});
export default CompScreen2;
