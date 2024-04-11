/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import {Image} from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import {useRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
interface RouteParams {
  username?: string;
  name: string;
}
const TabsNavigator: React.FC = ({}) => {
  const route = useRoute();
  const {username} = (route.params as RouteParams) || {
    username: 'Guest',
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#000',
        tabBarActiveBackgroundColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          marginVertical: 8,
          marginHorizontal: 10,
          height: 55,
          borderRadius: 30,
          overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              source={require('../../assets/home.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        initialParams={{username: username}}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              source={require('../../assets/pluss.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        initialParams={{username: username}}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              source={require('../../assets/search.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={username}
        component={ProfileScreen}
        initialParams={{username}}
        options={{
          tabBarIcon: ({size}) => (
            <Image
              source={require('../../assets/profile.png')}
              style={{width: size, height: size}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
