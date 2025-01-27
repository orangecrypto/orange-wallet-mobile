import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { resetNavigation } from '@routes/Navigator';
import { RouteType} from '@routes/RouteType';
import { Color } from '@values/color';
import { Responsive } from '@utils/Responsive';
import { Fonts } from '@values/fonts';
import { localAssets } from '@assets/assets';
import { strings } from '@strings/i18n';

const SplashScreen = () => {

  const startTimer = (routeName: string) => {
    setTimeout(() => {
      resetNavigation(routeName);
    }, 1500);
  };

  useEffect(() => {  
      startTimer(RouteType.WALLETBALANCE)
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
