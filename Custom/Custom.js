import React from "react";
import {View,Text,TextInput,StyleSheet} from 'react-native';
const CustomInput = ({value,setValue,placeholder,secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput 
                style = {styles.TextInput}
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}  
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#333333',
        width:'80%',
        height:40,
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:5,
        alignItems:'center',
        paddingHorizontal:10,
        marginVertical:5,
    },
    TextInput:{
        color: 'white',
        fontSize:24,
    },
})
export default CustomInput