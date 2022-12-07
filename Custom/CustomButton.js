import React from "react"
import { View,Text,StyleSheet, Pressable } from "react-native"

const CustomButton = ({onPress,text}) => {
    return(
    <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
    )
};
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#3B71F3',
        padding:15,
        marginVertical:5,
        width:'80%',
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontWeight:'bold',
        color:'white'
    }
})
export default CustomButton;