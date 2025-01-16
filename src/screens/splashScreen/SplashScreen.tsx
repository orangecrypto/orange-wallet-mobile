import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { resetNavigation } from '@routes/Navigator';
import { HOME_SCREEN, LOGIN, WALLETBALANCE } from '@routes/RouteType';

const SplashScreen = () => {

  const startTimer = (routeName: string) => {
    setTimeout(() => {
      resetNavigation(routeName);
    }, 1500);
  };


  useEffect(() => {  
      startTimer(WALLETBALANCE)
  }, []);


  return (
    <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <Text>Splash</Text>
    </View>
  );
};

export default SplashScreen;
