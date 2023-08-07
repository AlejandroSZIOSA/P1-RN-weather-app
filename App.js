
import { StyleSheet, Text, View,Button, BackHandler, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*          --  Saknas --
-1 Animatable image (screen 1)
-2 Om Server is conected och storage är ladat då skippa (screen 2) (fixat)
**/
export const Contexlocalisation = createContext(); //context

const Stack=createNativeStackNavigator();//navigation 
export default function App() {
  const [value2,setValue2]=useState("contex"); //context 

  useEffect(() => {
    checkingStorageDataSaved();
  }, [])
  const gettingDataStorage = async () => {
    try {
    const loadLocalisation = await AsyncStorage.getItem('@storage_Key') 
    return loadLocalisation != null ? setValue2(loadLocalisation)  : null;
    } catch(e) {
      console.log("loading error ");
    }
  }
  const checkingStorageDataSaved = async ()=>{
    //await. fixed promise problem
      if( await gettingDataStorage() === null){
        console.log("null");
        setValue2("Empty");
      }
        else {
          
          console.log("not null");
        }
    }
  return (
    <Contexlocalisation.Provider value={{value2,setValue2}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Welcome to Catch your Weather" getComponent= {()=> require("./src/CompScreen1").default}
            options={{
            headerStyle:{
            backgroundColor:"#001524"
            },
            headerTintColor: "#ffecd1",
            headerTitleStyle:{
            fontWeight: "bold"
            },
            }}
          />
          <Stack.Screen name="Start" getComponent={()=> require("./src/CompScreen2").default } 
            options={{
            headerStyle:{
            backgroundColor:"#001524"
            },
            headerTintColor: "#ffecd1", headerTitleStyle:{
            fontWeight: "bold"
            },
            }}
          />
          <Stack.Screen name="Your Wheather" getComponent={()=> require("./src/CompScreen3").default }
            options={{
            headerStyle:{
            backgroundColor:"#001524"
            },
            headerTintColor: "#ffecd1", headerTitleStyle:{
            fontWeight: "bold"
            },
            headerRight:()=>(
              <Button
              color="#ff7d00"
              title="Close-APP"
              onPress={()=> { alert("Closing Android App"); BackHandler.exitApp()  }  }
              />
            )}} 
          />
        </Stack.Navigator>
      </NavigationContainer>
  </Contexlocalisation.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
