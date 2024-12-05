import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error states for each field
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Focus state variables
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] = useState(false);

  const navigation = useNavigation(); // For navigation between screens

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Accepts only 10-digit numbers
    return phoneRegex.test(phone);
  };

  const handleSignUp = () => {
    let valid = true;

    // Reset error messages
    setUsernameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate fields
    if (!username) {
      setUsernameError('Username is required');
      valid = false;
    }
    if (!email || !validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    }
    if (!phone || !validatePhone(phone)) {
      setPhoneError('Invalid phone number');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (valid) {
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login'); // Navigate back to LoginScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
        <TextInput
          style={[
            styles.input,
            isFocusedUsername && styles.inputFocused, // Apply focused style
            usernameError && styles.errorInput, // Apply error style
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

      {/* Email Input */}
      <View style={styles.inputContainer}>
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <TextInput
          style={[
            styles.input,
            isFocusedEmail && styles.inputFocused, // Apply focused style
            emailError && styles.errorInput, // Apply error style
          ]}
          placeholder="Email"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setEmail(text)}
          value={email}
          onFocus={() => setIsFocusedEmail(true)}
          onBlur={() => setIsFocusedEmail(false)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
        <TextInput
          style={[
            styles.input,
            isFocusedPhone && styles.inputFocused, // Apply focused style
            phoneError && styles.errorInput, // Apply error style
          ]}
          placeholder="Phone Number"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          onFocus={() => setIsFocusedPhone(true)}
          onBlur={() => setIsFocusedPhone(false)}
          keyboardType="phone-pad"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
        <TextInput
          style={[
            styles.input,
            isFocusedPassword && styles.inputFocused, // Apply focused style
            passwordError && styles.errorInput, // Apply error style
          ]}
          placeholder="Password"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setPassword(text)}
          value={password}
          onFocus={() => setIsFocusedPassword(true)}
          onBlur={() => setIsFocusedPassword(false)}
          secureTextEntry
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        {confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
        <TextInput
          style={[
            styles.input,
            isFocusedConfirmPassword && styles.inputFocused, // Apply focused style
            confirmPasswordError && styles.errorInput, // Apply error style
          ]}
          placeholder="Confirm Password"
          placeholderTextColor="#ccc"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          onFocus={() => setIsFocusedConfirmPassword(true)}
          onBlur={() => setIsFocusedConfirmPassword(false)}
          secureTextEntry
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already have an account? */}
      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D343C',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
    letterSpacing: 1,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#40444F',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#40444F', // Default border color matching background
  },
  inputFocused: {
    borderColor: '#FFFFFF', // White border when focused
  },
  errorInput: {
    borderColor: '#FF5252', // Red border for error
  },
  errorText: {
    color: '#FF5252',
    marginBottom: 5, // Adjust spacing between error text and input
    fontSize: 14,
    alignSelf: 'flex-start', // Align error text to the left
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#FF8C00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  loginText: {
    color: '#FF8C00', // Highlight color for the "Login" text
    fontWeight: 'bold',
  },
});
