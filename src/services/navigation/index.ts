import {Navigation} from 'react-native-navigation';
import {Root, BottomTabs, StackWith, Component} from './layout';
import {ScreenNames} from './screens';
import NavigationSystem from './system';
import {getTabOptions} from './tabs';

class NavigationService extends NavigationSystem implements IService {
  init = async () => {
    await this.initSystem();
  };

  showModal = (name: string) => {
    Navigation.showModal(StackWith(Component(name)));
  };

  // APP

  startApp = async () => {
    const tabOptions = await getTabOptions();

    Navigation.setRoot(
      Root(
        BottomTabs([
          StackWith(Component(ScreenNames.MyBetsListScreen), {
            ...tabOptions[0],
          }),

          StackWith(Component(ScreenNames.SettingsScreen), tabOptions[1]),
        ]),
      ),
    );
  };

  startAuth = () => {
    Navigation.setRoot(Root(StackWith(Component(ScreenNames.LoginScreen))));
  };
}

export default new NavigationService();
