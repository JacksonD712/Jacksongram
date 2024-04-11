import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  RefreshControl,
  Text,
} from 'react-native';
import axios from 'axios';
import styles from '../styles/SearchScreenstyle';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllImages();
  }, []);

  const fetchAllImages = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://661010ca0640280f219c36af.mockapi.io/post',
      );
      setAllImages(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchAllImages();
  }, [fetchAllImages]);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleSearch = () => {
    if (searchText === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = allImages.filter(
      item =>
        item.username.includes(searchText) &&
        item.image !== 'null' &&
        item.image &&
        /\.(jpg|jpeg)$/i.test(item.image),
    );
    setSearchResults(filteredResults);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAllImages().then(() => setRefreshing(false));
  }, []);

  const chunkArray = (array: string | any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };
  const maxItemsPerRow = 3;
  const chunkSize = Math.ceil(
    allImages.length / Math.ceil(allImages.length / maxItemsPerRow),
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setSearchText(text)}
        value={searchText}
        placeholder="Enter username"
        placeholderTextColor="#c0c0c0"
      />
      
      {searchResults.length === 0 && searchText.length > 0 && (
        <View>
          <Text style={styles.notFoundText}>No results found.</Text>
        </View>
      )}
      {searchText.length === 0 && (
        <View>
          <Text style={styles.notFoundText}>
            Please enter a username to search.
          </Text>
        </View>
      )}
      {searchResults.length > 0 && (
        <FlatList
          data={chunkArray(searchResults, chunkSize)}
          renderItem={({item: row}) => (
            <View style={styles.rowContainer}>
              {row.map(
                (item: {id: React.Key | null | undefined; image: any}) => (
                  <View key={item.id} style={styles.imageContainer}>
                    {item.image && (
                      <Image source={{uri: item.image}} style={styles.image} />
                    )}
                  </View>
                ),
              )}
            </View>
          )}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      {searchResults.length === 0 && searchText.length === 0 && (
        <View>
          <Text style={styles.notFoundText}>No images to display.</Text>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;
