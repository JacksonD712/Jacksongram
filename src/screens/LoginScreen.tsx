import React, {useState, useContext} from 'react';
import {Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import styles from '../styles/LoginScreenStyle';
import {SignupContext} from '../Store/SignupContext';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/Inputs/Input';
import Button from '../components/Buttons/Button';
import * as Keychain from 'react-native-keychain';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setLoggedIn} = useContext(SignupContext);

  const handleNavigateToSignup = () => {
    navigation.navigate('Signup' as never);
  };

  const handleLogin = async () => {
    try {
      if (username && password) {
        console.log('Login successful');
        console.log({username});
        setUsername('');
        setPassword('');
        saveUsernameToAPI(username);

        navigation.navigate('Drawer', {username: username});
      } else {
        Alert.alert('Error', 'Please enter username and password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Failed to login. Please try again later.');
    }
  };

  const saveUsernameToAPI = async (username: string) => {
    try {
      const response = await fetch(
        'https://661010ca0640280f219c36af.mockapi.io/post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            image: null,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to save username to API');
      }

      console.log('Username saved successfully to API');
    } catch (error) {
      console.error('Error saving username to API:', error);
      Alert.alert(
        'Error',
        'Failed to save username to API. Please try again later.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <View style={styles.box}>
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            secureTextEntry={false}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Button onPress={handleLogin} text="Login" type="PRIMARY" />
          <TouchableOpacity onPress={handleNavigateToSignup}>
            <Text style={styles.signupText}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
