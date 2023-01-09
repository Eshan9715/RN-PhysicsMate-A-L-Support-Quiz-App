import {auth} from './firebaseConfig'
import {ToastAndroid} from 'react-native';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth';

export const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      ToastAndroid.show('Logged in', ToastAndroid.SHORT);
    })
    .catch(err => {
      console.log(err);
    });
};

export const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      ToastAndroid.show('Signed up', ToastAndroid.SHORT);
      console.log(user);

    })
    .catch(err => {
      console.log(err);
    });
};

export const signOut = () => {
  signOut(auth)
    .then(() => {
      ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
    });
};
