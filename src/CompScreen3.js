import React, { Component, useEffect, useState,useContext } from 'react';
import { Button, View, Text,StyleSheet,Image } from 'react-native';
import { Contexlocalisation } from '../App';


const CompScreen3=({route,navigation})=> {  //route .. parameter
    const {t,d,p}=route.params;
    const {value2,setValue2}=useContext(Contexlocalisation);
    // Getting and definne the wether Icon from a web source
    var picClearSky = "http://openweathermap.org/img/wn/01d.png";
    let picFewClowds = "http://openweathermap.org/img/wn/02d.png";
    let picScatteredClowds = "http://openweathermap.org/img/wn/03d.png ";
    let picBrokenClowds = "http://openweathermap.org/img/wn/04d.png";
    let picShowerRain = "http://openweathermap.org/img/wn/09d.png";
    let picRaind = "http://openweathermap.org/img/wn/10d.png";
    let picThunderstorm = "http://openweathermap.org/img/wn/11d.png";
    let picSnow = "http://openweathermap.org/img/wn/13d.png";
    let picMist ="http://openweathermap.org/img/wn/50d.png";

    const [picDescription,setPicDescription]=useState("");
    /*UseEffect - Switch search the corret icon description image. 
    It is depends of the source Api information  **/
    
    //const contexTest=useContext(Contexlocalisation);

    useEffect(() => {
        switch (d) {
            case "Light freezing drizzle":
                setPicDescription(picSnow);
               //console.log("si");       
            case "Light snow, light freezing drizzle":
                setPicDescription(picSnow);
                break;
            case "Clear":
                setPicDescription(picClearSky);
                break;
            case "Partly cloudy":
                setPicDescription(picFewClowds);
                break;
            case "Sunny":
                setPicDescription(picClearSky);
                break;
            case "Moderate or heavy rain shower":
                setPicDescription(picShowerRain);
                break;
            case "Light snow":
                setPicDescription(picSnow);
                break;
            case "Patchy heavy snow":
                setPicDescription(picSnow);
                break;
            case "Patchy rain possible":
                setPicDescription(picRaind);
                break;
            case "Light snow shower":
                setPicDescription(picSnow);
                break;
            case "Light rain":
                setPicDescription(picShowerRain);
                break;
            case "Snow, heavy snow shower":
                setPicDescription(picSnow);
                break;
            case "Moderate or heavy snow showers":
                setPicDescription(picSnow);
                break;
            default:
                console.log("Description not found");
        }
    },[]);

    return (
    <View style={styles.container}>
        <View style={{ padding:"25px"}}>            
            <Text style={{fontSize:"x-large",color:'white',textAlign:'center'}}  > {p} </Text>
        </View >
        <View style={{padding:"5px"}}>
            <Text style={{color:'white',fontSize:'x-large'}}> {t}  </Text> {/* temperature */}
        </View>
        <View style={{padding:"5px"}}> 
            <Text style={{color:'white',fontSize:'large'}}> {d}  </Text>  {/* description */}
        </View>
        <View style={styles.imageDescription}>
            <Image style={{ width: 80, height: 80  } } source={{ uri: picDescription,}}/>
        </View>
        <View style={{ padding:"60px", }}>
            <Button  color="#ff7d00" title="Restart"  onPress={ ()=> navigation.popToTop() } />
        </View>
        <View >
            <Text style={{fontSize:"large",color:"#ffecd1"}}> On Catch: {value2}</Text>
        </View>
        <View style={styles.container2}> 
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#001524',
        alignItems: 'top',
        justifyContent: 'center',
        textAlign:"center",
    },
    imageDescription: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:"10px",
    },
    container2: {
       flex:1,
        //flex:"column",
        backgroundColor: '#FF7D00',
        padding:"124px",
    },
});
export default CompScreen3;