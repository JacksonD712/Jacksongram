import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../styles/HoneScreenstyle'; // Corrected import statement
import axios from 'axios';

interface Post {
  id: string; // Assuming id is of type string
  username: string;
  image?: string;
  description: string;
  likes: number;
  liked: boolean;
  comments: string;
}

const HomeScreen = () => {
  const [data, setData] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Post[]>(
        'https://661010ca0640280f219c36af.mockapi.io/post?',
      );
      setData(response.data.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.isFocused()) {
          BackHandler.exitApp();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleLike = async (id: string) => {
    try {
      const updatedData = data.map(item =>
        item.id === id
          ? {
              ...item,
              likes: item.liked ? item.likes - 1 : item.likes + 1,
              liked: !item.liked,
            }
          : item,
      );

      setData(updatedData);

      await axios.put(
        `https://661010ca0640280f219c36af.mockapi.io/post/${id}`,
        {likes: updatedData.find(item => item.id === id)?.likes}, 
      );
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleComment = async (id: string) => {
    try {
      const response = await fetch(
        `https://661010ca0640280f219c36af.mockapi.io/post/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({comments: commentText}),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const updatedPost = await response.json();
      setData(data.map(item => (item.id === id ? updatedPost : item)));
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <FlatList
      data={data.filter(item => item.image).reverse()}
      renderItem={({item}) => (
        <View style={styles.item}>
          <View style={styles.header}>
            <Text style={styles.username}>{item.username}</Text>
          </View>
          {item.image && (
            <Image source={{uri: item.image}} style={styles.image} />
          )}
          <Text style={styles.description}>
            {item.username}: {item.description}
          </Text>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
            <Text style={styles.likeButton}>
              {item.liked ? 'Unlike' : 'Like'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.likes}>{item.likes} Likes</Text>
          <View style={styles.commentsContainer}>
            <Text style={styles.commentTitle}>Comments:</Text>
            <Text style={styles.description}>{item.comments}</Text>
          </View>
          <View style={styles.commentContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a comment..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={() => handleComment(item.id)}>
              <Text style={styles.commentButton}>Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={item => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default HomeScreen;
