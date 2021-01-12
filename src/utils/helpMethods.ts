import AsyncStorage from '@react-native-community/async-storage';
import {create} from 'mobx-persist';
import {Platform} from 'react-native';

export const hydrateMobX = create({storage: AsyncStorage, debounce: 500});

export const isAndroid = () => Platform.OS === 'android';
