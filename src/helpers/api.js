import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const register =(data)=>{
    auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then(() => {
        firestore()
        .collection('Users')
        .doc(data.email)
        .set(data)
        .then(() => {
          console.log('User added!');
        });
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

export default register