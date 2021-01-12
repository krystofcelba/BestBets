import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Text, Provider, DefaultTheme} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {isAndroid} from 'src/utils/helpMethods';
import auth from '@react-native-firebase/auth';
import {useStores} from 'src/stores';
import FormBuilder from 'src/components/common/FormBuilder';
import useGooglePlaces from 'use-google-places';
import firebase from '@react-native-firebase/app';
import {Buttons} from 'src/services/navigation/buttons';
import {useComponentWillMount} from 'src/hooks';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigationButtonPress} from 'react-native-navigation-hooks/dist/hooks';

type FormData = {
  topic: string;
  place: string;
  user1_answer: boolean;
};

const NewBetFormScreen = ({componentId}: {componentId: string}) => {
  useComponentWillMount(async () => {
    const icon = await Icon.getImageSource('ios-close', 24, 'black');
    Navigation.mergeOptions(componentId, {
      topBar: {leftButtons: [{id: 'dismiss', icon}]},
    });
  });

  useNavigationButtonPress(
    () => {
      Navigation.dismissModal(componentId);
    },
    componentId,
    'dismiss',
  );

  const form = useForm<FormData>({
    defaultValues: {topic: '', place: '', user1_answer: false},
    mode: 'onChange',
  });

  const {firestore} = useStores();

  const {loading, results, onChange, onSelect} = useGooglePlaces({
    apiKey: firebase.app().options.apiKey || '',
    delay: 400,
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log('on submit');

      firestore.myBets.add({
        ...data,
        user1_uid: firestore.currentUser.data['uid'],
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error!', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={isAndroid() ? undefined : 'padding'}
        keyboardVerticalOffset={isAndroid() ? 25 : 0}>
        <Provider>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.formContainer}>
            <FormBuilder
              form={form}
              formConfigArray={[
                {
                  type: 'input',
                  name: 'topic',
                  label: 'Topic',
                  rules: {
                    required: {
                      value: true,
                      message: 'Field is required',
                    },
                  },

                  textInputProps: {},
                },

                {
                  type: 'autocomplete',
                  name: 'place',
                  label: 'Place',
                  rules: {
                    required: {
                      value: true,
                      message: 'Field is required',
                    },
                  },
                  options: results.map((res) => ({
                    value: res.description,
                    label: res.description,
                  })),
                  onSearchInputChange: (value) => onChange(value),
                },
                {
                  type: 'switch',
                  name: 'user1_answer',
                  label: 'My Answer',
                  rules: {},
                },
              ]}>
              <Button
                title="Submit"
                color="#710ce3"
                onPress={form.handleSubmit(onSubmit)}
              />
            </FormBuilder>
          </ScrollView>
        </Provider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  formContainer: {
    padding: 10,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  root: {
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'whitesmoke',
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
});

NewBetFormScreen.options = {
  topBar: {title: {text: 'New Bet'}},
};

export default NewBetFormScreen;
