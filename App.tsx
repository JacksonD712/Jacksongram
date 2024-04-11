import React, {useEffect} from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigation';
import notifee, {EventType} from '@notifee/react-native';

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['jackson://'],
  config: {
    screens: {
      ImageDetailScreen: 'image/:id',
    },
  },
};

function App(): React.JSX.Element {
  useEffect(() => {
    const unsubscribeForeground = notifee.onForegroundEvent(
      ({type, detail}) => {
        handleNotificationEvent(type, detail);
      },
    );

    return () => {
      unsubscribeForeground();
    };
  }, []);

  function handleNotificationEvent(type: EventType, detail: any) {
    switch (type) {
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        console.log('User pressed notification', detail.notification);

        break;
    }
  }

  return (
    <NavigationContainer linking={linking}>
      <MainNavigator />
    </NavigationContainer>
  );
}
export default App;
