import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 20,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  bottomSection: {
    flex: 2,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statsText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 30,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignSelf: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  enlargedImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  enlargedContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -160}, {translateY: -150}],
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
  },
  enlargedUsername: {
    color: 'black',
  },
});

export default styles;
