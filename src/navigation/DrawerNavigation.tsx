import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import TabsNavigator from './Navigation';
import ImageDetailScreen from '../screens/ImageDetailScreen';
import {useRoute} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImage}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigation = ({}) => {
  const route = useRoute();
  const {username} = route.params || {};
  const {id} = route.params;
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#1C1C1C',
        drawerActiveTintColor: '#4CAF50',
      }}>
      <Drawer.Screen
        name="Jacksongram"
        component={TabsNavigator}
        initialParams={{username}}
        options={{
          drawerIcon: ({size}) => (
            <Image
              source={require('../../assets/logo.png')}
              style={[styles.drawerIcon, {width: size, height: size}]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ImageDetail"
        component={ImageDetailScreen}
        initialParams={{id}}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginBottom: 20,
    marginTop: 20,
  },
});

export default DrawerNavigation;
