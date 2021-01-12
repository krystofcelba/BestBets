import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import {Collection, Document, initFirestorter} from 'firestorter';

firebase.firestore.setLogLevel('debug');
initFirestorter({firebase: firebase});

const currentUser = new Document<{name: string; email: string; uid: string}>();

const firestoreStore = {
  currentUser,
  myBets: new Collection('bets', {
    query: (ref) =>
      currentUser.data.uid
        ? ref.where('user1_uid', '==', currentUser.data.uid)
        : null,
  }),
};

export default firestoreStore;
