import {hydrateStores} from './stores';
import {initServices, services} from './services';
import {setOptionsForUseStyles} from './hooks/useStyles';
import auth from '@react-native-firebase/auth';
import {stores} from './stores';
import {Mode} from 'firestorter';

export const startApp = async () => {
  await hydrateStores();

  await initServices();

  setOptionsForUseStyles({
    normalize: true,
    darkmode: true,
  });

  auth().onAuthStateChanged(async (user) => {
    if (user) {
      stores.firestore.currentUser.path = `users/${user.uid}`;
      stores.firestore.currentUser.mode = Mode.On;
      await services.nav.startApp();
    } else {
      services.nav.startAuth();
    }
  });
};
