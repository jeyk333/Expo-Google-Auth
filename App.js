import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import 'expo-dev-client';
import React, { useState, useEffect } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Header from './components/Header/Header';

export default function App() {
  GoogleSignin.configure({
    //Add your Firebase App webclient ID
    webClientId: '******************************',
  });

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const onSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (err) {}
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <Header />
        <GoogleSigninButton onPress={onGoogleButtonPress} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Image source={{ uri: user?.photoURL }} style={styles.image} />
        <Text style={styles.name}>Hello, {user?.displayName}</Text>
        <Button title='Sign out' onPress={onSignOut} />
      </View>
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
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  image: {
    width: 280,
    height: 280,
  },
});
