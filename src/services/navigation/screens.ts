import LoginScreen from 'src/screens/auth/LoginScreen';
import RegistrationScreen from 'src/screens/auth/RegistrationScreen';
import SettingsScreen from 'src/screens/SettingsScreen';
import MyBetsListScreen from 'src/screens/MyBetsListScreen';
import {Buttons} from './buttons';
import NewBetFormScreen from 'src/screens/NewBetFormScreen';

// Here we define all information regarding screens

const prefix = 'BestBets';

const ScreenNames = {
  SettingsScreen: `${prefix}.SettingsScreen`,

  ExampleScreen: `${prefix}.ExampleScreen`,

  LoginScreen: `${prefix}.LoginScreen`,
  RegistrationScreen: `${prefix}.RegistrationScreen`,

  MyBetsListScreen: `${prefix}.MyBetsListScreen`,
  NewBetFormScreen: `${prefix}.NewBetFormScreen`,
};

const ScreenTitles = {

  ExampleScreen: 'Example',

  LoginScreen: `Login`,
  RegistrationScreen: `Register`,
};




const Screens = new Map<string, React.FC<any>>();
Screens.set(ScreenNames.SettingsScreen, SettingsScreen);
Screens.set(ScreenNames.LoginScreen, LoginScreen);
Screens.set(ScreenNames.RegistrationScreen, RegistrationScreen);
Screens.set(ScreenNames.MyBetsListScreen, MyBetsListScreen);
Screens.set(ScreenNames.NewBetFormScreen, NewBetFormScreen);

export default Screens;
export {ScreenNames, ScreenTitles};
