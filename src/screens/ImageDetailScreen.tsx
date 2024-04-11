import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ImageDetailScreen = ({}) => {
  const route = useRoute();
  const {id} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Image Detail Screen</Text>
      <Text style={styles.text}>Image ID: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
});

export default ImageDetailScreen;
