import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setItemCount } from './Store'; // Importing the action to set item count

export default function HomeScreen({ route }) {
  const { username } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const itemCount = useSelector(state => state.itemCount.itemCount);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    // Reset item count to 0 on login
    dispatch(setItemCount(0)); // Dispatch action to set item count to 0

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
  }, [dispatch]); // Empty dependency array ensures this only runs on initial mount

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  const toggleImageVisibility = () => {
    setIsImageVisible(!isImageVisible);
  };

  const handleSelectItem = (id) => {
    let newSelectedItems;
    if (selectedItems.includes(id)) {
      newSelectedItems = selectedItems.filter((item) => item !== id);
      dispatch(setItemCount(itemCount - 1)); // Decrease count when item is deselected
    } else {
      newSelectedItems = [...selectedItems, id];
      dispatch(setItemCount(itemCount + 1)); // Increase count when item is selected
    }
    setSelectedItems(newSelectedItems);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedItems.includes(item.id) && styles.selectedCard // Add conditional style here
      ]}
      onPress={() => handleSelectItem(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      {selectedItems.includes(item.id) && (
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
              <Text style={styles.checkboxTick}>✔</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={[styles.statusTag, item.status === 'Available' ? styles.available : styles.unavailable]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>RouteWise</Text>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={toggleImageVisibility}>
            <Image
              source={require('../assets/images/output-onlinepngtools (3).png')}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Image
              source={require('../assets/images/logout-image.png')}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

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
                  source={require('../assets/images/output-onlinepngtools (3).png')}
                  style={styles.largeProfileImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => console.log('Count:', itemCount)}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF8C00',
    letterSpacing: 1.5,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#FF8C00',
  },
  username: {
    fontSize: 18,
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  largeProfileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  listContainer: {
    padding: 15,
    marginBottom: 70,
  },
  card: {
    backgroundColor: '#2D343C',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    position: 'relative',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#FF8C00', // Thin yellow border when selected
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderBottomWidth: 4,
    borderBottomColor: '#FF8C00',
  },
  checkboxContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderWidth: 3,
    borderColor: '#FF8C00',
    backgroundColor: 'transparent',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FF8C00',
  },
  checkboxTick: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#F1F2F6',
    marginBottom: 15,
  },
  statusTag: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    fontSize: 14,
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
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FF8C00',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 35,
    elevation: 6,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
