import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import {useNavigationButtonPress} from 'react-native-navigation-hooks/dist/hooks';

import {useStores} from 'src/stores';
import {useServices} from 'src/services';
import {ButtonIcon} from 'src/components/Button';
import useStyles from 'src/hooks/useStyles';
import {ScreenNames} from 'src/services/navigation/screens';
import {Buttons} from 'src/services/navigation/buttons';
import {FlatList} from 'react-native-gesture-handler';
import BetListItem from 'src/components/BetListItem';

const MyBetsListScreen: NavigationFunctionComponent = observer(
  ({componentId}) => {
    const {firestore} = useStores();
    const {nav} = useServices();
    const {styles} = useStyles(_styles);

    useNavigationButtonPress(
      () => {
        nav.showModal(ScreenNames.NewBetFormScreen);
      },
      componentId,
      Buttons.Inc.id,
    );

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={firestore.myBets.docs.slice(0)}
          ListEmptyComponent={
            <View>
              <Text style={{fontWeight: 'bold'}}>Add Books Below</Text>
            </View>
          }
          renderItem={({item}) => <BetListItem item={item} />}
        />
      </SafeAreaView>
    );
  },
);

const _styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.bg,
    },
  });

MyBetsListScreen.options = {
  topBar: {title: {text: 'My Tickets'}, rightButtons: [Buttons.Inc]},
};

export default MyBetsListScreen;
