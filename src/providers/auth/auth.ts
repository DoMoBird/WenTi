import {Injectable} from '@angular/core';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthProvider {

  
    firedata = firebase.database().ref('/WenTisUsers');
  constructor(public afireauth: AngularFireAuth) {}

  loginUser(email: string, password: string){
    var promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
       })
    })
 
    return promise;
    
  }


signupUser(newuser){
    var promise = new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName: newuser.userName,
          photoURL: ''
        }).then(() => {
          this.firedata.child(firebase.auth().currentUser.uid).set({
            uid: firebase.auth().currentUser.uid,
            displayName: newuser.userName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/wentibd.appspot.com/o/1-11122Q12032.jpg?alt=media&token=155249cd-c240-49c4-8985-c932ad99b646'
          }).then(() => {
            resolve({ success: true });
            }).catch((err) => {
              reject(err);
          })
          }).catch((err) => {
            reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
}

resetPassword(email: string): firebase.Promise<void> {
  return firebase.auth().sendPasswordResetEmail(email);
}

logoutUser(): firebase.Promise<void> {
  return firebase.auth().signOut();
}


}