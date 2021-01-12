import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {TextInput} from 'react-native-paper';
import {Text} from 'react-native-paper';
import {ScreenNames} from 'src/services/navigation/screens';
import {isAndroid} from 'src/utils/helpMethods';
import {useStores} from 'src/stores';

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = (props: NavigationComponentProps) => {
  const {control, handleSubmit, errors} = useForm();
  const {firestore} = useStores();

  const onSubmit = async ({email, password}: FormData) => {
    try {
      console.log('on submit');

      const {
        user: {uid},
      } = await auth().signInWithEmailAndPassword(email, password);
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
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.formContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                label="Email"
                value={value}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                textContentType={'username'}
                autoCapitalize={'none'}
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
                textContentType={'password'}
                secureTextEntry={true}
              />
            )}
            name="password"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.password && <Text>This is required.</Text>}

          <Button
            title="Login"
            color="#710ce3"
            onPress={handleSubmit(onSubmit)}
          />
          <Button
            title="Register"
            color="#710ce3"
            onPress={() =>
              Navigation.push(props.componentId, {
                component: {name: ScreenNames.RegistrationScreen},
              })
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  // () => Navigation.setRoot(mainRoot)
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
  radioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

LoginScreen.options = {
  topBar: {title: {text: 'Login'}},
};

export default LoginScreen;
