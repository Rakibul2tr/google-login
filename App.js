import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import 'expo-dev-client'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  GoogleSignin.configure({
  webClientId: '655906528184-sna2vjrvau16ujnlvgl5pv9mvcruu3pg.apps.googleusercontent.com',
});
 // Handle user state changes
  const onAuthStateChanged=(user)=> {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
const onGoogleButtonPress=async()=> {
   try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

      await auth().signInWithCredential(googleCredential);
      setUser(auth().currentUser);
    } catch (error) {
      console.error(error);
    }
}
const createAccount=()=>{
  console.log(email,password);
    auth()
  .createUserWithEmailAndPassword('ojane.doe@example.cm', 'SuperSecretPassword!')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }
  const logOutHendel=()=>{
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  }
  // create account email pasword
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  if (initializing) return null;
  if (!user) {
    return (
      <View style={styles.container}>
        <Button
        title="Google Sign-In"
        onPress={onGoogleButtonPress}
      />
      <View>
        <TextInput placeholder='enter A MAIL'style={{width:100,padding:10,borderColor:'#444',borderWidth:1}} onChangeText={(e)=>setEmail(e)}/>
        <TextInput placeholder='password'style={{width:100,padding:10,borderColor:'#444',borderWidth:1}}onChangeText={(e)=>setPassword(e)}/>
        <Button
        title="login"
        onPress={createAccount}
      />
      </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello..{user.displayName}</Text>
      <StatusBar style="auto" />
      <Button
        title="Log Out"
        onPress={logOutHendel}
      />
      
    </View>
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

// npx expo start --dev-client