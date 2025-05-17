import { localAssets } from '@assets/assets';
import useSeedVault from '@hooks/useSeedVault';
import { store } from '@redux/store';
import { resetNavigation } from '@routes/Navigator';
import { RouteType } from '@routes/RouteType';
import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { Fonts } from '@values/fonts';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  
  const { isVaultUnlocked} = useSeedVault()
  const startTimer = (routeName: string) => {
    setTimeout(() => {
      resetNavigation(routeName);
    }, 1500);
  };

  useEffect(() => {
    const initializeSeedVault = async () => {
      if (store.getState().appReducer.isWalletCreated) {
      
        setTimeout(async () => {
          if (await isVaultUnlocked()) {
            startTimer(RouteType.WALLETBALANCE);
          }
          else {        
            startTimer(RouteType.LOGIN)
          }
        }, 500);
      } else {
        startTimer(RouteType.HOME_SCREEN);
      }
    };
    initializeSeedVault();
 }, []);
  

  return (
    <View style={styles.container}>
        <Image source={localAssets.pill} style={styles.topIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
    justifyContent:'center',
    alignItems:'center'
  },
  topIcon: {
    height: Responsive.size120,
    width: Responsive.size120,
},

topText: {
    fontSize: Responsive.size22,
    fontFamily:Fonts.bold,
    color: Color.orangeButton,
    marginTop: Responsive.size22,
},
});
export default SplashScreen;
