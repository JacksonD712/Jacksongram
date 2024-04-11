import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: '#E5E5E5',
    color: '#333',
    fontSize: 16,
  },
  imageContainer: {
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  notFoundText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default styles;
