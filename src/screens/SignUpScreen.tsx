import React, {useState, useContext} from 'react';
import {Text, View, Alert, Image, TouchableOpacity} from 'react-native';
import {SignupContext} from '../Store/SignupContext';
import Input from '../components/Inputs/Input';
import Button from '../components/Buttons/Button';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles/SignUpScreenstyle';
const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {addUser} = useContext(SignupContext);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ageChecked, setAgeChecked] = useState(false);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!ageChecked) {
      Alert.alert('Warning', 'You must be 18 years or older to sign up.');
      return;
    }
    if (!privacyPolicyChecked) {
      Alert.alert('Warning', 'You must accept the privacy policy to sign up.');
      return;
    }
    if (username.length < 3 || username.length > 30) {
      Alert.alert('Warning', 'Username must be between 3 and 30 characters.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Invalid email.');
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Password fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      addUser({username, email, password});
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      console.log('Signup successful with:', {username, email, password});
      navigation.navigate('Login' as never);
    } catch (error) {
      console.error('Error saving user to context:', error);
      Alert.alert('Error', 'Failed to sign up. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <View style={styles.box}>
        <View style={styles.form}>
          <Text style={styles.title}>Sign Up</Text>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            secureTextEntry={undefined}
          />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={undefined}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAgeChecked(!ageChecked)}>
              {ageChecked ? (
                <Text style={styles.checked}>✓</Text>
              ) : (
                <Text style={styles.unchecked} />
              )}
              <Text style={styles.confirm}>I am 18 years or older</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setPrivacyPolicyChecked(!privacyPolicyChecked)}>
              {privacyPolicyChecked ? (
                <Text style={styles.checked}>✓</Text>
              ) : (
                <Text style={styles.unchecked} />
              )}
              <Text style={styles.confirm}>I accept the privacy policy</Text>
            </TouchableOpacity>
          </View>

          <Button
            text="Sign Up"
            onPress={handleSignup}
            type="PRIMARY"
            bgColor={undefined}
            fgColor={undefined}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Button
            text="Login"
            onPress={() => navigation.navigate('Login' as never)}
            type="FORGOT"
            bgColor={undefined}
            fgColor={undefined}
          />
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
