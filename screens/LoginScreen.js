import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the eye icon

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
  const navigation = useNavigation(); // For navigation between screens

  const handleLogin = () => {
    if (username === 'Nithila' && password === 'nithila123') {
      setErrorMessage('');
      navigation.navigate('Home', { username: username });  // Navigate to Home screen after successful login
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar style="light" backgroundColor="#2D343C" />
        <Image
          source={require('../assets/images/carlogin.png')} // Replace with your image path
          style={styles.image}
        />
        <Text style={styles.title}>RouteWise</Text>

        {/* Username Input Container */}
        <View style={styles.usernameContainer}>
          <TextInput
            style={[
              styles.input,
              isFocusedUsername && styles.inputFocused, // Apply white border when focused
            ]}
            placeholder="Username"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setUsername(text)}
            value={username}
            onFocus={() => setIsFocusedUsername(true)}
            onBlur={() => setIsFocusedUsername(false)}
            autoCapitalize="none"
          />
        </View>

        {/* Password Input Container */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              isFocusedPassword && styles.inputFocused, // Apply white border when focused
            ]}
            placeholder="Password"
            placeholderTextColor="#ccc"
            onChangeText={(text) => setPassword(text)}
            value={password}
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsFocusedPassword(false)}
            secureTextEntry={!isPasswordVisible} // Toggle password visibility based on state
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle visibility on press
            style={styles.eyeIcon}
          >
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'} // Show the appropriate icon
              size={24}
              color="#ccc"
            />
          </TouchableOpacity>
        </View>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}









const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#2D343C',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Add space at the bottom to prevent input fields from being too close to the keyboard
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
  usernameContainer: {
    width: '80%', // Ensures the username field has the same width as password
    marginTop: 20,
  },
  passwordContainer: {
    width: '80%', // Ensures the password field has the same width as username
    marginTop: 20,
    position: 'relative', // To position the eye icon inside the input field
  },
  input: {
    width: '100%', // Ensures both username and password inputs have the same width
    height: 50,
    backgroundColor: '#40444F',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#50575E', // Default border color
  },
  inputFocused: {
    borderColor: '#FF8C00', // White border when focused
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }], // Vertically center the icon
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
