import React, { useContext, useEffect, useState } from 'react';
import { Button, View,BackHandler, Text,Platform,StyleSheet, Image } from 'react-native';
import { Contexlocalisation } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompScreen1=({navigation})=> {  
    const {value2,setValue2}=useContext(Contexlocalisation); //contex
    const [osInRuning,setOsInRunning] = useState("");
    const startImage= require('./thunder22.jpg');
    const[apiStatus,setApiStatus] = useState("");
    const [disabledStartBt,setDisabledStartBt] = useState(false);
    const [disabledClearBt,setDisabledClearBt] = useState(false);
    const [jsonCopy,setJasonCopy]=useState({});
    
    useEffect(() => {
        checkStorage();
        checkServerStatus();
        platformCheck();
    }, [value2]);
    //Function check Server status
    const checkServerStatus= ()=> {
        fetch("https://goweather.herokuapp.com/weather/rom") //default localisation check server status
        .then((response) => response.json())
        .then((json) => json.response) 
        .catch(() =>{
        setApiStatus("In problem")
        setDisabledStartBt(true)
        })
        .finally(setApiStatus("OKAY") 
        )
    }
   //check server status and storage status and get fast information
    const getSavedLocalisationInfo = ()=> {
        fetch("https://goweather.herokuapp.com/weather/"+ value2) //default localisation check server status
        .then((response) => response.json())
        .then((json) => setJasonCopy(json)) 
        .catch(() =>{
        setApiStatus("In problem UPDATE")
        
        })
        .finally(setApiStatus("OKAY") 
        )
    }
    //remove storage
    const clearDataStorage=()=> {
        AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => console.log("clear"));
        setValue2("Empty"); //contex
        setDisabledClearBt(true)
    }
    //check if storage is load or Empty
    function checkStorage(){
        if (value2=="Empty")  // next fix :)
            setDisabledClearBt(true); //cambiar
            
           else {setDisabledClearBt(false); //cambiar
                getSavedLocalisationInfo();
                //console.log(jsonCopy.temperature);
           }
    }
    //Function check plataform
    function platformCheck(){
        switch(Platform.OS){
            case "web":
                setOsInRunning(" Web ");
                //alert("web not suported ");
                break;
            case "android":
                setOsInRunning(" Android ");
                //BackHandler.exitApp(); //this hook works only in android
                break;
            case "ios":
                setOsInRunning(" Ios ");
                alert("IOS not suported ");
                //RNExitApp.exitApp();//close App from IOS , this works only in IOS
                break;
            case "macos":
                setOsInRunning(" Mac OS ");
                break;
            default: setOsInRunning(" Unknown ");
        }
    }
    return (
     <View style={styles.container}>
        
        <View style={styles.container2Text}>
            <Text style={{color:'#ffecd1', fontSize:'large'}}> ON CATCH: {value2} </Text>
         
        </View>
              
        <View style={styles.container2Text} >
            <Text style={{color:'#ffecd1'}}> App - Is running on: {osInRuning}</Text>
        </View>    
        <Image style={styles.startImageS} source={startImage} />
        <View style={styles.containerStartButtom}>
            {/* changes .. skipp second screen if oncatch is loaded */}
            <Button color="#ff7d00" title="Start" disabled={disabledStartBt}
            onPress={ (value2!="Empty") ? ()=> 
            navigation.navigate("Your Wheather",
            {t:jsonCopy.temperature,d:jsonCopy.description,p:value2 } ) 
            : ()=> navigation.navigate("Start")} />
        </View>   
        <View>
            <Text> On catch :   <Button title="Clear"  disabled={disabledClearBt}  onPress={clearDataStorage}      />   
            </Text>
        </View>  
        <View>
            <Text style={{fontSize:'large'}}> Server status : {apiStatus }</Text>    
        </View>  
       
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#78290f",
        alignItems: "center",
        justifyContent: "top",
    },
    container2Text: {
        justifyContent: "center", 
        padding:"10px"
    },
    startImageS: {
        width : '300px',
        height: '420px',
        borderRadius:'30%',
        borderColor:'black',
        borderWidth:'12px',
    },
    containerStartButtom: {
        backgroundColor:"#78290f",
        justifyContent:'center' ,
        padding:'25px', //araund area
        width: "80%", //Bottom size
    },
});
export default CompScreen1;