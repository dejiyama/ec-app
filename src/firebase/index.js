import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import { firebaseConfig } from "./config"

//firebaseConfigを使って、firebasをイニシャライザして、firebaseのアプリを使えるようになった。
firebase.initializeApp(firebaseConfig);

//firebaseのメソッドをconstで宣言した変数に入れている。ちなみにメソッドとは、プロパティに値が関数のものをメソッドとよぶ。
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
//下記のメソッドは、日時を取得できるので、作成した日時を取得したい時に使える。
export const FirebaseTimestamp = firebase.firestore.Timestamp;