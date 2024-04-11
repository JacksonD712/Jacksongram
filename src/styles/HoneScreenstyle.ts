import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D0D',
    flex: 1,
  },
  item: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#1C1C1C',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F0F0F0',
    marginLeft: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#F0F0F0',
    marginBottom: 10,
  },
  likeButton: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  likes: {
    fontSize: 14,
    color: '#F0F0F0',
    marginBottom: 10,
  },
  commentsContainer: {
    borderTopWidth: 1,
    borderColor: '#4CAF50',
    paddingTop: 10,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F0F0F0',
  },
  comment: {
    fontSize: 16,
    color: '#F0F0F0',
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    color: '#F0F0F0',
  },
  commentButton: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
