import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Pressable,
  Animated,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  LongPressGestureHandler,
  State,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import styles from '../styles/ProfileScreen';

const ProfileScreen = () => {
  const route = useRoute();
  const {username} = route.params || {username: 'Guest'};
  const navigation = useNavigation();
  const [imageData, setImageData] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchUserImages();
  }, [username]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserImages().then(() => setRefreshing(false));
  };

  const fetchUserImages = async () => {
    try {
      const response = await fetch(
        `https://661010ca0640280f219c36af.mockapi.io/post?username=${username}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch user images');
      }
      const data = await response.json();
    
      const filteredData = data.filter(
        (item: {image: string}) =>
          item.image && /\.(jpg|jpeg)$/i.test(item.image),
      );

      setImageData(filteredData.reverse());
      const likesCount = filteredData.reduce(
        (total: any, item: {likes: any}) => total + (item.likes || 0),
        0,
      );
      setTotalLikes(likesCount);
    } catch (error) {
      console.error('Error fetching user images:', (error as Error).message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login' as never);
  };

  const enlargeImage = (image: React.SetStateAction<null>) => {
    setSelectedImage(image);
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideEnlargedImage = () => {
    setSelectedImage(null);
  };

  const closeEnlargedImage = () => {
    if (selectedImage) {
      hideEnlargedImage();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text}>Welcome, {username}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{imageData.length} Posts</Text>
          <Text style={styles.statsText}>{totalLikes} Likes</Text>
        </View>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
      {selectedImage && (
        <View style={styles.enlargedContainer}>
          <Text style={styles.enlargedUsername}>{username}</Text>
          <Image
            source={{uri: selectedImage.image}}
            style={styles.enlargedImage}
          />
        </View>
      )}
      <View style={styles.bottomSection}>
        <FlatList
          data={chunkArray(imageData, 3)}
          renderItem={({item}) => (
            <View style={styles.imageRow}>
              {item.map(
                (
                  imageItem: {image: any},
                  index: React.Key | null | undefined,
                ) => (
                  <LongPressGestureHandler
                    key={index}
                    onHandlerStateChange={({nativeEvent}) => {
                      if (nativeEvent.state === State.ACTIVE) {
                        enlargeImage(imageItem);
                      } else if (
                        nativeEvent.state === State.END ||
                        nativeEvent.state === State.FAILED
                      ) {
                        closeEnlargedImage();
                      }
                    }}>
                    <View>
                      <PanGestureHandler
                        onGestureEvent={({nativeEvent}) => {
                          if (
                            nativeEvent.translationY > 100 &&
                            nativeEvent.state === State.ACTIVE
                          ) {
                            onRefresh();
                          }
                        }}>
                        <View>
                          <Image
                            source={{uri: imageItem.image}}
                            style={styles.image}
                          />
                        </View>
                      </PanGestureHandler>
                    </View>
                  </LongPressGestureHandler>
                ),
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{alignItems: 'center'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <Text style={styles.text}>No images found for {username}</Text>
          )}
          scrollEnabled={!selectedImage}
        />
      </View>
    </View>
  );
};

const chunkArray = (array: string | any[], chunkSize: number) => {
  return Array.from({length: Math.ceil(array.length / chunkSize)}, (_, index) =>
    array.slice(index * chunkSize, (index + 1) * chunkSize),
  );
};

export default ProfileScreen;
