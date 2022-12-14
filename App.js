import { StatusBar } from 'expo-status-bar';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React,{ useEffect, useState }  from 'react';
import { StyleSheet, Text, View,Alert, FlatList, ScrollView, Dimensions, TouchableOpacity, } from 'react-native';
import CustomInput from "./Custom/Custom"
import CustomButton from "./Custom/CustomButton"
import { NavigationContainer } from '@react-navigation/native';
import { create } from '@react-navigation/native';
import {navigationStackNavigator} from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack';
import { IconComponentProvider, Icon, ActivityIndicator } from "@react-native-material/core";
import { Button,IconButton  } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {axios} from 'axios';
const Stack = createStackNavigator()
let Userid = '';
let UderKateId = '';
export default function App({navigation}) {

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="RegisterUser" component={RegisterUser} options={{gestureEnabled: false}} />

        <Stack.Screen name="Kategori" component={Kategori} options={({ navigation })=>({headerRight:()=>(
          <Button title={'Profil'} color='rgba(52, 52, 52, 0.8)' onPress={() => navigation.navigate("Users")}/>
        )})} />
        <Stack.Screen name="Underkate" component={UnderKate} options={({ navigation })=>({headerLeft:()=>(
          <TouchableOpacity title={'Kategori'} style={{marginLeft:10}}  onPress={() => navigation.navigate("Kategori")}><Text style={{fontSize:16}}> Kategori</Text></TouchableOpacity>
        ), gestureEnabled: false,headerRight:()=>(
          <Button title={'Profil'} color='red' onPress={() => navigation.navigate("Users")}/>
        )})} />

        <Stack.Screen name="Varer" component={Varer} options={({ navigation })=>({headerLeft:false,gestureEnabled: false,headerRight:()=>(
          <Button title={'Profil'} color='red' onPress={() => navigation.navigate("Users")}/>
        )})} />

        <Stack.Screen name="VareInfo" component={VareInfo} options={({ navigation })=>({headerLeft:false,gestureEnabled: false,headerRight:()=>(
          <Button title={'Profil'} color='red' onPress={() => navigation.navigate("Users")}/>
        )})} />

        <Stack.Screen name="QrScanner" component={QrScanner}  />
        <Stack.Screen name="Users" component={User} options={{gestureEnabled: false}} />
        
        <Stack.Screen name="UserFavorits" component={UserFavorits} options={({ navigation })=>({headerLeft:()=>(
          <Button title={'Back'} color='rgba(52, 52, 52, 0.8)' onPress={() => navigation.navigate("Users")}/>
        )})}/>
        <Stack.Screen name="RetUserInfo" component={RetUserInfo} options={{headerLeft:false,gestureEnabled: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Login({navigation}){
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const onLogin = async() => {
   /* const respons =  await fetch('http://god.rundstykker.macd.dk/api/Bruger/HentBrugerGUID', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Username": username,
          "Password": password,
        })
      });
      const json = await respons.text();
      const res = await respons.status;
      console.log(json);
      console.log(res);
      if (res == 400) {
        Alert.alert(json)
      }
      if (res==200) {
        Alert.alert("Loggoetid")
        navigation.navigate("Kategori") 
      }*/
      Alert.alert("Logget ind")
  }
  const onRegister = () =>{
    Alert.alert("Hey eksample 3");
    Userid ="Test1";
    navigation.navigate("RegisterUser")

  }
  return (
    
    <View style={styles.container}>
      <CustomInput 
        style={styles.imput}
        placeholder="Username"
        value={username}
        setValue={setUsername}/>
        <CustomInput 
                placeholder="Password" 
                value={password}
                setValue={setPassword}
                secureTextEntry
            />
        
        <CustomButton style={{width:'80%'}} text="Login" onPress={onLogin}/>
        <CustomButton style={{width:'50%'}} text="register" onPress={onRegister}/>
    </View>
  );
}
 function Kategori({navigation}){
  const QrScan = () =>{
    navigation.navigate("QrScanner")
  }
  const UnderKategori = () =>{
    navigation.navigate("Underkate")
  }
  const [data,setData]=useState([])
  const screenHeight = Dimensions.get('window').height
  const [loading,setloading]=useState(true)
  const getdata = async () => {
    try {
      const respons = await fetch('https://api.openbrewerydb.org/breweries');
      const json = await respons.json();
      setData(json);
    }
    catch(error){
      console.error("lolr");
    }
    finally{
      setloading(false);
    }
  } 
  useEffect(()=>{
    getdata();
  },[])
  return(
    <View style={styles.container}>
    <View style={{flex:1,width:'100%',height:'85%', padding:5,}}>
    <ScrollView style={{  }}>
          
          {
            
            loading ? (<Text>Loading ....</Text>):(
            <FlatList
              keyExtractor={(item)=>item.id}
              data={data}
              renderItem={({item})=>(
                  <View style={styles.boxes}>
                    <TouchableOpacity style={{opacity:1,backgroundColor: 'rgba(52, 52, 52, 0.8)',height:'100%',}} onPress={UnderKategori}>
                      <Text style={{textAlign:'center',fontSize:18,marginTop:50,width:'100%', alignItems:'center',justifyContent:'center'}}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
              )}
            />
          )
          } 
        </ScrollView>
    </View>
      
        
        <View style={styles.buttonContainer}>
              <CustomButton  text="Login" onPress={QrScan}/>
        </View>
    </View>



  // testArray.map((item)=>{
  //   return(
  //     <View>
  //       <Text>{item.name} some {item.roll}</Text>
  //     </View>
  //   );
  // })
  );
}
function User(){
  return(
    <View>
      <Text>User</Text>
    </View>
  )
}
function UnderKate({navigation}){
  const QrScan = () =>{
    navigation.navigate("QrScanner")
  }
  const UnderKategori = () =>{
    navigation.navigate("VareInfo")
  }
  
  const [data,setData]=useState([])
  const screenHeight = Dimensions.get('window').height
  const [loading,setloading]=useState(true)
  const getdata = async () => {
    try {
      const respons = await fetch('https://api.openbrewerydb.org/breweries');
      const json = await respons.json();
      setData(json);
    }
    catch(error){
      console.error("lolr");
    }
    finally{
      setloading(false);
    }
  } 
  useEffect(()=>{
    getdata();
  },[])
  return(
    <View style={styles.container}>
    <View style={{flex:1,width:'100%',height:'85%', padding:5,}}>
    <ScrollView style={{  }}>
          
          {
            
            loading ? (<Text>Loading ....</Text>):(
            <FlatList
              keyExtractor={(item)=>item.id}
              data={data}
              renderItem={({item})=>(
                  <View style={styles.boxes}>
                    <TouchableOpacity style={{opacity:1,backgroundColor: 'rgba(52, 52, 52, 0.8)',height:'100%',}} onPress={UnderKategori}>
                      <Text style={{textAlign:'center',fontSize:18,marginTop:50,width:'100%', alignItems:'center',justifyContent:'center'}}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
              )}
            />
          )
          } 
        </ScrollView>
    </View>
      
        
        <View style={styles.buttonContainer}>
              <CustomButton  text="Login" onPress={QrScan}/>
        </View>
    </View>
  )
}

function Varer({navigation}){

  const [data,setData]=useState([])
  const screenHeight = Dimensions.get('window').height
  const [loading,setloading]=useState(true)
  const getdata = async () => {
    try {
      const respons = await fetch('https://api.openbrewerydb.org/breweries');
      const json = await respons.json();
      setData(json);
    }
    catch(error){
      console.error("lolr");
    }
    finally{
      setloading(false);
    }
  } 
  useEffect(()=>{
    getdata();
  },[])
  const Varespecifik = ()=>{
    navigation.navigate('VareInfo')
  }

  /*const getdata = async () => {
    try {
      console.log("virker")
      const respons = await fetch('https://192.168.87.25:7110/api/Vare/CheckQr',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const json = await respons.json();
      setData(json);
    }
    catch(error){
      console.error(error);
    }
    finally{
      setloading(false);
    }
  } 
  useEffect(()=>{
    getdata();
  })*/
  return(
    <View style={styles.container}>
    <View style={{flex:1,width:'100%',height:'85%', padding:5,}}>
    <ScrollView style={{  }}>
          
          {
            
            loading ? (<Text>Loading ....</Text>):(
            <FlatList
              keyExtractor={(item)=>item.id}
              data={data}
              renderItem={({item})=>(
                  <View style={styles.boxes}>
                    <TouchableOpacity style={{opacity:1,backgroundColor: 'rgba(52, 52, 52, 0.8)',height:'100%',}} onPress={Varespecifik}>
                      <Text style={{textAlign:'center',fontSize:18,marginTop:50,width:'100%', alignItems:'center',justifyContent:'center'}}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
              )}
            />
          )
          } 
        </ScrollView>
    </View>
      
        
        <View style={styles.buttonContainer}>
              <CustomButton  text="Login" />
        </View>
    </View>
  )
}

//
// Qr Scanner Funktion
//
function QrScanner({navigation}){
  const[HasPermission, setHasPermission] = useState(null);
  const[scanned,SetScanned] = useState(false);
  const[text, setText]=useState("Not yet scanned");
  const[vareid,setvareid]=useState([])
  

  const askForCameraPermission = () => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    })()
  }

  useEffect(()=>{
    askForCameraPermission();
  }, []);


  const handleBarCodeScanned = async ({type,data}) =>{
    SetScanned(true);
    setText(data);
    try{
      console.log("TEST");
      //const respons = fetch('http://god.rundstykker.macd.dk/api/Vare/TEST')
      //const test2 = await axios.get('https://api.openbrewerydb.org/breweries')
      //https://localhost:7110/api/Vare/CheckQr
      //console.log("LOL")
      //console.log(respons)
      //setvareid(vareidJson);
    }
   catch(res){
      console.log(res)
    }
    if (data != null) {
      if (vareid[0]) {
        navigation.navigate("Varer")
      }
    }
    else{
      console.log('no data')
    }
    //console.log('Type: '+type+ '\nData: ' +data)
  }

  if(HasPermission ===null){
    return(
      <View>
        <Text>Virker</Text>
      </View>
    )
  }

  if(HasPermission===false){
    <View>
      <Text>No Access to Camera</Text>
      <Button title={'Allow Camera'} onPress={()=>askForCameraPermission()} />
    </View>
  }
  return(
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{height:400,width:400}}/>
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={'Scan again?'} onPress={() =>SetScanned(false)} color='tomato'/>}
    </View>
  )
}


//
// Opret brugre
//
function RegisterUser({navigation}){
  const Anuller = () => {
    Alert.alert(Userid);
    navigation.navigate("Login")
  }  
  const Opret = async () => {
    try{
      /*const respons =  await fetch('http://god.rundstykker.macd.dk/api/Bruger/RegitrereBruger', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Username": usernamee,
          "Password": passworde,
          "Email":Emaile,
          "Fornavn":Fornavne,
          "Efternavn":EfterNavne,
          "Role":"normal"
        })
      });
      const json = await respons.text();
      const res = await respons.status;
      console.log(json);
      console.log(res);
      if (res == 400) {
        Alert.alert(json)
      }
      if (res==200) {
        Alert.alert("User Oprettet")
        navigation.navigate("Kategori") 
      }*/
      Alert.alert("User Oprettet")
      navigation.navigate("Kategori") 
    }
   catch(error){
      console.log(error)
   }
  }
  const[Emaile,setEmail]=useState('');
  const[usernamee,setUsername]=useState('');
  const[passworde,setPassword]=useState('');
  const[RepeatPassworde,setRepeatPassword]=useState('');
  const[Fornavne,setFornavn]=useState('');
  const[EfterNavne,setEfterNavn]=useState('');
  return(
    <View style={styles.container}>
      <Text style={{right:130}}>Email</Text>
      <CustomInput 
        style={styles.imput}
        placeholder="Email"
        value={Emaile}
        setValue={setEmail}
      />
      <Text style={{right:115}}>Username</Text>
      <CustomInput 
        style={styles.imput}
        placeholder="Username"
        value={usernamee}
        setValue={setUsername}
      />
      <Text style={{right:115}}>Password</Text>
      <CustomInput 
        style={styles.imput}
        placeholder="Password"
        value={passworde}
        setValue={setPassword}
        secureTextEntry
      />
      <Text style={{right:95}}>Gentag Password</Text>
      <CustomInput 
        style={styles.imput}
        placeholder="Gentag Password"
        value={RepeatPassworde}
        setValue={setRepeatPassword}
        secureTextEntry
      />
      <Text style={{right:120}}>Fornavn</Text>
      <CustomInput 
        style={styles.imput}
        placeholder="Fornavn"
        value={Fornavne}
        setValue={setFornavn}
      />
      <Text style={{right:115}}>Efter navn</Text>
      <CustomInput 
        style={styles.imput}
        placeholder="Efter navn"
        value={EfterNavne}
        setValue={setEfterNavn}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.buttonCr} title="Anuller" onPress={Anuller}/>
        <Button style={styles.buttonCg} title="Opret" onPress={Opret}/>
      </View>
    </View>
  )
}
function UserFavorits(){
  return(
    <View>
      <Text></Text>
    </View>
  )
}
function VareInfo(){
  const [data,setData]=useState([])
  const screenHeight = Dimensions.get('window').height
  const [loading,setloading]=useState(true)
  const tjek = async () => {
    try {
      //const respons = await fetch('http://god.rundstykker.macd.dk/api/Vare/TEST',{method:'GET', headers:{'Accept': '*/*','Content-Type': 'application/x-www-form-urlencoded',}});
      /*const json = await respons.text();
      const res = await respons.status;
      console.log(json);
      console.log(res);*/
      //setData(json);
      console.log("Tjek")
    }
    catch(error){
      console.error(error);
    }
    finally{
      setloading(false);
    }
  } 
  return(
    <View>
    <Button onPress={tjek}></Button>
    </View>
  )
}
function RetUserInfo(){
  const[Email,setEmail]=useState('');
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[RepeatPassword,setRepeatPassword]=useState('');
  const[Fornavn,setFornavn]=useState('');
  const[EfterNavn,setEfterNavn]=useState('');
  return(
    <View>
      <CustomInput 
        style={styles.imput}
        placeholder="Email"
        value={Email}
        setValue={setEmail}
      />      
      <CustomInput 
        style={styles.imput}
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput 
        style={styles.imput}
        placeholder="Password"
        value={password}
        setValue={setPassword}
      />
      <CustomInput 
        style={styles.imput}
        placeholder="Gentag Password"
        value={RepeatPassword}
        setValue={setRepeatPassword}
      />
      <CustomInput 
        style={styles.imput}
        placeholder="Fornavn"
        value={Fornavn}
        setValue={setFornavn}
      />
      <CustomInput 
        style={styles.imput}
        placeholder="Efter navn"
        value={EfterNavn}
        setValue={setEfterNavn}
      />
      <CustomButton style={{with:'50%'}} text="Gem" onPress={onLogin}/>
      <CustomButton style={{with:'50%', backgroundColor:'red'}} text="Anuller" onPress={onLogin}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollviews:{
    width:'100%',
    height:'80%',
    flex:1,
  },
  buttonContainer:{
    marginTop:'2%',
    bottom:10,
    width:'80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCg: {
    flex: 1,
    backgroundColor:'green',
    width:'4%',
    marginLeft:20
    },
  buttonCr: {
    flex: 1,
    backgroundColor:'red',
    width:'4%',
  },
  barcodebox: {
    alignItems:'center',
    justifyContent:'center',
    height:300,
    width:300,
    overflow:'hidden',
    borderRadius:30,
    backgroundColor:'tomato'
  },
  maintext:{
    fontSize:16,
    margin:20,
  },
  boxes:{
    backgroundColor:'red',
    width:'50%',
    height:150,
    marginBottom:20,
    alignSelf:'center'

  }
});
