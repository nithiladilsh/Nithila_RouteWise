import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { setUserCredentials } from './Store';


export default function Signupscreen() {
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

  // Success states for each field
  const [usernameSuccess, setUsernameSuccess] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [phoneSuccess, setPhoneSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [confirmPasswordSuccess, setConfirmPasswordSuccess] = useState('');

  // Focus state variables
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPhone, setIsFocusedPhone] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] = useState(false);

  // Password visibility state
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };


  const handleSignUp = () => {
    let valid = true;

    // Reset error and success messages
    setUsernameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setUsernameSuccess('');
    setEmailSuccess('');
    setPhoneSuccess('');
    setPasswordSuccess('');
    setConfirmPasswordSuccess('');

    // Validate fields and set success/error messages
    if (!username) {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setUsernameSuccess('Valid username');
    }

    if (!email || !validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } if (!email) {
      setEmailError('Email is required')
    } if (validateEmail(email)) {
      setEmailSuccess('Valid email address');
    }

    if (!phone || !validatePhone(phone)) {
      setPhoneError('Invalid phone number');
      valid = false;
    } if (!phone) {
      setPhoneError('Phone number is required');
    } if (validatePhone(phone)) {
      setPhoneSuccess('Valid phone number');
    }


    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } if (password.length < 6 || password.length > 12) {
      setPasswordError('Password must be between 6 and 12 characters');
      valid = false;
    }
    else {
      setPasswordSuccess('Valid password');
    }

    // First, check password match before setting success/error messages
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    } if (!password) {
      setPasswordError('Please enter a password');
      valid = false;
    }

    if (valid) {
      dispatch(setUserCredentials({ username, password }));
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign Up</Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
          {usernameSuccess && <Text style={styles.successText}>{usernameSuccess}</Text>}
          <TextInput
            style={[
              styles.input,
              isFocusedUsername && styles.inputFocused,
              usernameError && styles.errorInput,
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
          {emailSuccess && <Text style={styles.successText}>{emailSuccess}</Text>}
          <TextInput
            style={[
              styles.input,
              isFocusedEmail && styles.inputFocused,
              emailError && styles.errorInput,
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
          {phoneSuccess && <Text style={styles.successText}>{phoneSuccess}</Text>}
          <TextInput
            style={[
              styles.input,
              isFocusedPhone && styles.inputFocused,
              phoneError && styles.errorInput,
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
          {passwordSuccess && <Text style={styles.successText}>{passwordSuccess}</Text>}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                isFocusedPassword && styles.inputFocused,
                passwordError && styles.errorInput,
              ]}
              placeholder="Password"
              placeholderTextColor="#ccc"
              onChangeText={(text) => setPassword(text)}
              value={password}
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(false)}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
              <Icon name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          {confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
          {confirmPasswordSuccess && <Text style={styles.successText}>{confirmPasswordSuccess}</Text>}
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                isFocusedConfirmPassword && styles.inputFocused,
                confirmPasswordError && styles.errorInput,
              ]}
              placeholder="Confirm Password"
              placeholderTextColor="#ccc"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              onFocus={() => setIsFocusedConfirmPassword(true)}
              onBlur={() => setIsFocusedConfirmPassword(false)}
              secureTextEntry={!isConfirmPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIcon}>
              <Icon name={isConfirmPasswordVisible ? 'visibility-off' : 'visibility'} size={24} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>




        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have an account? */}
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D343C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
    position: 'relative',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center', // Align text and icon horizontally
    position: 'relative', // To position the eye icon
  },
  input: {
    height: 50,
    backgroundColor: '#40444F',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 40,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#40444F',
    flex: 1,
  },
  inputFocused: {
    borderColor: '#FF8C00',
  },
  errorInput: {
    borderColor: '#FF5252', // Red border for error
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 1, // Ensure the icon is always above other elements
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
    color: '#FF8C00',
  },
  errorText: {
    color: '#FF5252', // Red color for error messages
    fontSize: 14,
    marginBottom: 5,
  },
  successText: {
    color: '#28a745', // Green color for success messages
    fontSize: 14,
    marginBottom: 5,
  },
});
