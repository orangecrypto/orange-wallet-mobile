import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { Fonts } from '@values/fonts';
import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface TokenImageProps {
  token?: string;
  loading?: boolean;
  fungibleToken?: { name?: string; ticker?: string, tick?: string };
  size?: number;
  round?: boolean;
  variant?: 'default' | 'dark' | 'send';
}

export default function TokenImage({
  token,
  loading,
  fungibleToken,
  size,
  round = true,
  variant = 'default',
}: TokenImageProps) {
  const background =
    variant === 'dark'
      ? Color.tokenImageDarkBg
      : variant === 'send'
        ? Color.white
        : Color.selectedCategory;

  const displayedTicker = useMemo(() => {
    const ticker = fungibleToken?.ticker || fungibleToken?.name  || fungibleToken?.tick || token || '?';

    console.log('displayedTicker', `ticker : ${ticker} : ${ticker.substring(0, 2).toUpperCase()}`)
    return ticker.substring(0, 2).toUpperCase();
  }, [fungibleToken, token]);

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { width: size, height: size, borderRadius: round ? size / 2 : 8 }]}>
        <ActivityIndicator size="small" color={Color.second} />
      </View>
    );
  }

  return (
    <View style={[styles.placeholder, { backgroundColor: background, width: size, height: size, borderRadius: round ? size / 2 : 8 }]}>
      <Text style={[
        styles.text,
        variant === 'dark' ? styles.darkText : variant === 'send' ? styles.sendText : styles.defaultText
      ]}>
        {displayedTicker}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.tokenImageBg,
  },
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: Responsive.size13,
    fontFamily: Fonts.semibold,

  },
  defaultText: {
    color: Color.white,
    fontSize: Responsive.size16,
    fontFamily: Fonts.bold
  },
  darkText: {
    color: Color.tokenImageDarkText,
  },
  sendText: {
    color: Color.orangeButton,
    fontSize: Responsive.size14, 
    fontFamily: Fonts.bold, 
  },
});
