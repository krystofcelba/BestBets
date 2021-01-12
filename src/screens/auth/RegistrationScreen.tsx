import React from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import {Controller, useForm} from 'react-hook-form';
import {isAndroid} from 'src/utils/helpMethods';
import auth from '@react-native-firebase/auth';
import {useStores} from 'src/stores';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegistrationScreen = ({componentId}: {componentId: string}) => {
  const {control, handleSubmit, errors} = useForm<FormData>();
  const {firestore} = useStores();

  const onSubmit = async ({name, email, password}: FormData) => {
    try {
      console.log('on submit');

      const {
        user: {uid},
      } = await auth().createUserWithEmailAndPassword(email, password);

      firestore.currentUser.path = `users/${uid}`;
      firestore.currentUser.set({name, email, uid});
    } catch (error) {
      console.log(error);
      Alert.alert('Error!', error.message);
    }
  };

  console.log(errors);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={isAndroid() ? undefined : 'padding'}
        keyboardVerticalOffset={isAndroid() ? 25 : 0}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.formContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                label="Name"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                style={styles.input}
              />
            )}
            name="name"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.name && <Text>This is required.</Text>}
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                label="Email"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                textContentType={'username'}
                style={styles.input}
              />
            )}
            name="email"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.email && <Text>This is required.</Text>}

          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                label="Password"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                textContentType={'newPassword'}
                secureTextEntry={true}
                style={styles.input}
              />
            )}
            name="password"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.password && <Text>This is required.</Text>}

          <Button
            title="Submit"
            color="#710ce3"
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
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

RegistrationScreen.options = {
  topBar: {title: {text: 'Registration'}},
};

export default RegistrationScreen;
