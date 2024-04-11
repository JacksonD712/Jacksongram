import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    alignItems: 'center',
    width: 350,
    height: 600,
    backgroundColor: Platform.OS === 'ios' ? '#fff' : '#1C1C1C',
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  form: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  signupText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'grey',
  },
  image: {
    width: 220,
    height: 150,
    marginBottom: 20,
  },
});

export default styles;
