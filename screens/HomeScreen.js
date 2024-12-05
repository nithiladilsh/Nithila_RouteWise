import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'; // Importing useDispatch and useSelector

import { setItemCount } from './Store';

export default function HomeScreen({ route }) {
  const { username } = route.params; // Get username from route parameters
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const itemCount = useSelector(state => state.itemCount.itemCount); // Get itemCount from Redux store
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // State for selected items
  const [isImageVisible, setIsImageVisible] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://6751ed40d1983b9597b4d821.mockapi.io/Cars');
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => navigation.navigate('Login'), // Navigate to LoginScreen
        },
      ]
    );
  };

  const toggleImageVisibility = () => {
    setIsImageVisible(!isImageVisible); // Toggle the modal visibility
  };

  const handleSelectItem = (id) => {
    let newSelectedItems;
    if (selectedItems.includes(id)) {
      newSelectedItems = selectedItems.filter((item) => item !== id); // Unselect item
      dispatch(setItemCount(itemCount - 1)); // Decrease count
    } else {
      newSelectedItems = [...selectedItems, id]; // Add item to selection
      dispatch(setItemCount(itemCount + 1)); // Increase count
    }
    setSelectedItems(newSelectedItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      {/* Checkbox Overlay */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => handleSelectItem(item.id)}
      >
        <View
          style={[
            styles.checkbox,
            selectedItems.includes(item.id) && styles.checkboxSelected,
          ]}
        >
          {selectedItems.includes(item.id) && (
            <Text style={styles.checkboxTick}>✔</Text> // Add a tick mark
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={[styles.statusTag, item.status === 'Available' ? styles.available : styles.unavailable]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>RouteWise</Text>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={toggleImageVisibility}>
            <Image
              source={require('../assets/images/output-onlinepngtools (3).png')} // Your profile icon image
              style={styles.profileIcon}
            />
          </TouchableOpacity>
          <Text style={styles.username}>{username}</Text>
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
                  source={require('../assets/images/output-onlinepngtools (3).png')} // Larger profile image
                  style={styles.largeProfileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Item List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => console.log('Count:', itemCount)} // Just logging count, you can handle it as per your requirement
      >
        <Text style={styles.floatingButtonText}>{itemCount} Items Selected</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F2F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2D343C',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FF8C00',
    height: 80,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',
    letterSpacing: 2,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#FF8C00',
  },
  username: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginLeft: 12,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    tintColor: '#FF8C00',
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    borderRadius: 75,
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#2D343C',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FF8C00',
    backgroundColor: 'transparent',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FF8C00',
  },
  checkboxTick: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#F1F2F6',
    marginBottom: 10,
  },
  statusTag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  available: {
    backgroundColor: '#28A745',
  },
  unavailable: {
    backgroundColor: '#DC3545',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
