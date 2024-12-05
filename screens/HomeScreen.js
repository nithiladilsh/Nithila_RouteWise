import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ route }) {
  const { username } = route.params; // Get the username from route parameters
  const navigation = useNavigation();
  const [isImageVisible, setIsImageVisible] = useState(false); // State to control modal visibility

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => navigation.navigate('Login') // Navigate to LoginScreen
        }
      ]
    );
  };

  const toggleImageVisibility = () => {
    setIsImageVisible(!isImageVisible); // Toggle the modal visibility
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        {/* RouteWise Title */}
        <Text style={styles.appName}>RouteWise</Text>
        
        {/* Profile Icon, Username, and Logout Button */}
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={toggleImageVisibility}>
            <Image 
              source={require('../assets/images/output-onlinepngtools (3).png')} // Your profile icon image
              style={styles.profileIcon}
            />
          </TouchableOpacity>
          <Text style={styles.username}>{username}</Text>

          {/* Logout Button */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Image 
              source={require('../assets/images/logout-image.png')} // Your logout icon image
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Profile Image */}
      {isImageVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isImageVisible}
          onRequestClose={toggleImageVisibility}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={toggleImageVisibility}>
                <Image 
                  source={require('../assets/images/output-onlinepngtools (3).png')} // Your larger profile image
                  style={styles.largeProfileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F6', // A lighter background color for the app
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space between the app name and profile section
    alignItems: 'center',
    backgroundColor: '#2D343C', // Deep, rich background color
    paddingHorizontal: 20,
    paddingVertical: 15, // Reduced padding for a more compact look
    borderBottomWidth: 1, // Add a subtle border at the bottom of the header for emphasis
    borderBottomColor: '#FF8C00', // Accent color from your theme
    height: 80,
  },
  appName: {
    fontSize: 24, // Reduced font size for a more elegant look
    fontWeight: 'bold',
    color: '#FF8C00', // Vibrant accent color for the app name
    letterSpacing: 2, // Slightly reduced letter spacing for a cleaner look
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 35, // Slightly smaller icon
    height: 35,
    borderRadius: 17.5, // Circular icon
    marginRight: 10, // Reduced space between icon and username
    borderWidth: 2, // Adding a border to the icon for emphasis
    borderColor: '#FF8C00', // Border color that matches your theme's accent color
  },
  username: {
    fontSize: 16, // Smaller text size for the username
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginLeft: 12, // Reduced space between username and logout icon
  },
  logoutIcon: {
    width: 24, // Smaller logout icon
    height: 24,
    tintColor: '#FF8C00', // The logout icon color to match the theme
    opacity: 0.8, // Subtle effect to make the icon blend better with the background
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  largeProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make the image circular
  },
});
