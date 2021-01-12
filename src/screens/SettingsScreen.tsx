import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {useNavigationComponentDidAppear} from 'react-native-navigation-hooks/dist/hooks';
import {ScrollView} from 'react-native-gesture-handler';

// EXPO modules
import {Constants as ExpoConstants} from 'react-native-unimodules';
import * as Network from 'expo-network';

import {useStores} from 'src/stores';
import {useServices} from 'src/services';
import Reanimated2 from 'src/components/Reanimated2';
import {ButtonTitle} from 'src/components/Button';
import useStyles from 'src/hooks/useStyles';
import auth from '@react-native-firebase/auth';

type SettingsScreenProps = {};

const SettingsScreen: NavigationFunctionComponent<SettingsScreenProps> = observer(
  ({componentId}) => {
    const {ui} = useStores();
    const {nav, t} = useServices();
    const {styles} = useStyles(_styles);

    useNavigationComponentDidAppear(() => {
      getNetworkType();
    }, componentId);

    const getNetworkType = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();

        ui.setNetworkType(networkState.type);
      } catch (e) {}
    };

    return (
      <>
        <ScrollView>
          <View style={styles.section}>
            <Text style={styles.header}>{t.do('navigation')}</Text>

            <ButtonTitle title={'Logout'} onPress={() => auth().signOut()} />
          </View>
        </ScrollView>
      </>
    );
  },
);

const _styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bg,
    },
    section: {
      padding: theme.sizes.m,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    text: {
      fontSize: 16,
      margin: theme.sizes.s,
      color: theme.colors.text,
    },
  });

SettingsScreen.options = {
  topBar: {title: {text: 'Settings'}},
};

export default SettingsScreen;
