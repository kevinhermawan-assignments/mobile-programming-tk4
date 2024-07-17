import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useAppContext } from '../components/AppContext';

GoogleSignin.configure({
  webClientId: process.env.WEB_CLIENT_ID,
});

export default function LoginScreen() {
  const { onAuthStateChanged } = useAppContext();

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const user = await auth().signInWithCredential(googleCredential);

    onAuthStateChanged(user);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text variant="titleLarge" style={styles.title}>
          Bantu Sekolah
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          Aplikasi Pendataan Kelayakan Sekolah
        </Text>
      </View>
      <View style={styles.footer}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          onPress={onGoogleButtonPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2196F3',
  },
  content: {
    flex: 0.9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').width / 1.5,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  footer: {
    flex: 0.1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
