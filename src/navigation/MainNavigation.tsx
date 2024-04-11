// MainNavigator.tsx
import React, {useContext} from 'react';
import {SignupContext} from '../Store/SignupContext';
import AuthNavigator from '../navigation/AuthNavigator';
import DrawerNavigation from './DrawerNavigation';

const MainNavigator = () => {
  const {state} = useContext(SignupContext);

  return (
    <>
      {state.isLoggedIn ? (
        <DrawerNavigation route={undefined} />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default MainNavigator;
