import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const navigation = useNavigation(); // For navigation between screens

  const handleLogin = () => {
    if (username === 'Nithila' && password === 'nithila123') {
      setErrorMessage('');
      navigation.navigate('Home', {username: username});  // Navigate to Home screen after successful login
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#2D343C" />
      <Image
        source={require('../assets/images/carlogin.png')} // Replace with your image path
        style={styles.image}
      />
      <Text style={styles.title}>RouteWise</Text>

      {/* Username Input */}
      <TextInput
        style={[
          styles.input,
          isFocusedUsername && styles.inputFocused,  // Apply white border when focused
        ]}
        placeholder="Username"
        placeholderTextColor="#ccc"
        onChangeText={(text) => setUsername(text)}
        value={username}
        onFocus={() => setIsFocusedUsername(true)}
        onBlur={() => setIsFocusedUsername(false)}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={[
          styles.input,
          isFocusedPassword && styles.inputFocused,  // Apply white border when focused
        ]}
        placeholder="Password"
        placeholderTextColor="#ccc"
        onChangeText={(text) => setPassword(text)}
        value={password}
        onFocus={() => setIsFocusedPassword(true)}
        onBlur={() => setIsFocusedPassword(false)}
        secureTextEntry
      />

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D343C',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
  },
  image: {
    width: 270,
    height: 270,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 50,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#40444F',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#50575E',  // Default border color
  },
  inputFocused: {
    borderColor: '#FFFFFF',  // White border when focused
  },
  errorText: {
    color: '#FF5252',
    marginTop: 10,
    fontSize: 14,
  },
  button: {
    marginTop: 30,
    width: '80%',
    height: 50,
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 14,
  },
  signUpText: {
    color: '#FF8C00', // Highlight color for the "Sign Up" text
    fontWeight: 'bold',
  },
});
