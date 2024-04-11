import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import styles from '../styles/AddScreenstyle';

export default function AddScreen() {
  const [imageSource, setImageSource] = useState<{uri: string} | null>(null);
  const [description, setDescription] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    requestNotificationPermission();
    createNotificationChannel();
  }, []);

  const requestNotificationPermission = async () => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus >= 3) {
      console.log('Permission granted');
    } else {
      console.log('Permission denied');
    }
  };

  const createNotificationChannel = async () => {
    try {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    } catch (error) {
      console.error('Error creating notification channel:', error);
    }
  };

  const pickImageFromGallery = async () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.didCancel) {
        console.log('User cancelled image picking.');
      } else {
        if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setImageSource({uri: selectedImage.uri});
          setIsImageUploaded(true);
        } else {
          console.log('No image selected');
        }
      }
    });
  };

  const sendLocalNotification = async (imageUri: string) => {
    try {
      await notifee.displayNotification({
        title: 'Image Uploaded',
        body: 'Your image has been successfully uploaded!',
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default',
            launchActivity: 'default',
            data: {id: imageUri},
          },
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  const uploadImage = async () => {
    const {username} = route.params;
    if (!imageSource) {
      Alert.alert('Error', 'Please select an image.');
      return;
    }
    try {
      const responseAPI = await fetch(
        'https://661010ca0640280f219c36af.mockapi.io/post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            image: imageSource.uri,
            description: description,
            likes: 0,
            comments: null,
          }),
        },
      );
      if (!responseAPI.ok) {
        throw new Error('Failed to save image to API');
      }
      await sendLocalNotification(imageSource.uri); // Pass image URI here
      Alert.alert('Success', 'Photo saved successfully', [
        {
          style: 'cancel',
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home' as never);
            setIsImageUploaded(false);
            setDescription('');
          },
        },
      ]);
    } catch (error) {
      console.error('Error Saving image:', (error as Error).message);
      Alert.alert('Error', 'Failed to save photo. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a caption..."
        placeholderTextColor="#c0c0c0"
        value={description}
        onChangeText={text => setDescription(text)}
      />
      {imageSource && (
        <Image source={{uri: imageSource.uri}} style={styles.image} />
      )}
      {!isImageUploaded && (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickImageFromGallery}>
          <Text style={styles.uploadText}>Upload Image</Text>
        </TouchableOpacity>
      )}
      {isImageUploaded && (
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.uploadText}>Post</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
