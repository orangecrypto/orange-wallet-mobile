import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { resetNavigation } from '../../routes/Navigator';
import { HOME_SCREEN } from '../../routes/RouteType';

const SplashScreen = () => {

  const startTimer = (routeName: string) => {
    setTimeout(() => {
      resetNavigation(routeName);
    }, 1500);
  };


  useEffect(() => {  
      startTimer(HOME_SCREEN)
  }, []);


  return (
    <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <Text>Splash</Text>
    </View>
  );
};

export default SplashScreen;
