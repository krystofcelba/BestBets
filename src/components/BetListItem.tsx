import {observer} from 'mobx-react';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {List} from 'react-native-paper';

import useStyles from 'src/hooks/useStyles';

type Props = {item: any};

const BetListItem: React.FC<Props> = observer(({item}) => {
  const {styles} = useStyles(_styles);

  return (
    <List.Item
      title={item.data.topic}
      left={(props) => <List.Icon {...props} icon="cash-check" />}
    />
  );
});

const _styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bg,
    },
  });

export default BetListItem;
