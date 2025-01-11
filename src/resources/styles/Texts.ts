/* eslint import/prefer-default-export: 0 */

import { StyleSheet } from 'react-native';

// Resources
import { Style } from './Style';
import * as Color from '../values/color';
import { fontTextBold, fontTextRegular } from './TextsCustomFonts';

const Texts = StyleSheet.create({
  alignCenter: {
    textAlign: 'center',
  },
  alignLeft: {
    textAlign: 'left',
  },
  alignRight: {
    textAlign: 'right',
  },
  fontFamilyTextBold: {
    ...fontTextBold(),
  },
  fontFamilyTextRegular: {
    ...fontTextRegular(),
  },
  fontFamilyTextSemiBold: {
    // ...fontTextSemiBold(),
  },
  fontFamilyTitleBold: {
    ...fontTextBold(),
  },

  fontFamilyTitleRegular: {
    ...fontTextRegular(),
  },
  navBarDrawer: {
    ...fontTextRegular(),
    fontSize: Style.FONT_SIZE_SMALL_S,
    color: Color.second,
  },
  subTitle: {
    fontSize: Style.FONT_SIZE_TITLE,
    color: Color.primaryText,
    fontWeight: '400',
    textAlign: 'left',
    marginBottom: 10,
  },
  textColorBlack: {
    color: Color.black,
  },
  textColorBlue: {
    color: Color.primary,
  },
  textColorError: {
    color: Color.error,
  },
  textColorGray: {
    color: Color.gray,
  },
  textColorGrayButtonDisabled: {
    color: Color.grayDisabled,
  },
  textColorGrayDisabled: {
    color: Color.textDisabled,
  },
  textColorGrayLight: {
    color: Color.lightGrey,
  },
  textColorGreen: {
    color: Color.green,
  },
  textColorGreenSuccess: {
    color: Color.greenSuccess,
  },
  textColorGreenSuccess1: {
    color: Color.greenSuccess,
  },
  textColorLine: {
    color: Color.line,
  },
  textColorPrimary: {
    color: Color.primary,
  },
  textColorPrimaryText: {
    color: Color.primaryText,
  },
  textColorRed: {
    color: Color.red,
  },
  textColorSecond: {
    color: Color.second,
  },
  textColorSecondText: {
    color: Color.secondText,
  },
  textColorTextDisabled: {
    color: Color.textDisabled,
  },
  textColorThirdText: {
    color: Color.thirdText,
  },
  textColorWhite: {
    color: Color.white,
  },
  textColorYellow: {
    color: Color.textYellow,
  },
  textColorYellowSystem: {
    color: Color.yellow,
  },
  textError: {
    ...fontTextRegular(),
    fontSize: Style.FONT_SIZE_SMALL,
    fontWeight: 'normal',
    color: Color.error,
  },
  textFontWeightBold: {
    ...fontTextBold(),
  },
  textFontWeightNormal: {
    ...fontTextRegular(),
    fontWeight: 'normal',
  },
  textLineHeight: {
    lineHeight: 19,
  },
  textNormal: {
    ...fontTextRegular(),
    color: Color.primaryText,
    fontSize: Style.FONT_SIZE,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  textLWithOutColor: {
    ...fontTextRegular(),
    fontSize: Style.FONT_SIZE,
    fontWeight: 'normal',
  },
  textSmall: {
    ...fontTextRegular(),
    color: Color.primaryText,
    fontSize: Style.FONT_SIZE_SMALL,
    textAlign: 'left',
  },
  textSmallS: {
    ...fontTextRegular(),
    color: Color.primaryText,
    fontSize: Style.FONT_SIZE_SMALL_S,
    textAlign: 'left',
  },
  textSmallXS: {
    ...fontTextRegular(),
    color: Color.primaryText,
    fontSize: Style.FONT_SIZE_SMALL_XS,
    textAlign: 'left',
  },
  textSmall2XS: {
    ...fontTextRegular(),
    color: Color.primaryText,
    fontSize: Style.FONT_SIZE_SMALL_2XS,
    textAlign: 'left',
  },
  textSubTitle: {
    ...fontTextRegular(),
    color: Color.primaryText,
    fontSize: Style.FONT_SIZE,
    fontWeight: 'normal',
    textAlign: 'left',
  },
  title: {
    ...fontTextBold(),
    color: Color.primaryText,
    fontSize: Style.FONT_SIZE_TITLE,
    fontWeight: '800',
    textAlign: 'left',
  },
  titleForm: {
    ...fontTextBold(),
    textAlign: 'center',
    marginTop: 20,
  },
  titleS: {
    ...fontTextBold(),
    fontSize: Style.FONT_SIZE_TITLE_S,
    color: Color.primaryText,
    fontWeight: '800',
    textAlign: 'left',
    marginBottom: 10,
  },
  titleM: {
    ...fontTextBold(),
    fontSize: Style.FONT_SIZE_TITLE_M,
    color: Color.primaryText,
    textAlign: 'left',
    marginBottom: 10,
  },
  titleL: {
    ...fontTextBold(),
    fontSize: Style.FONT_SIZE_TITLE_L,
    color: Color.primaryText,
    fontWeight: '800',
    textAlign: 'left',
    marginBottom: 10,
  },
  titleXL: {
    ...fontTextBold(),
    fontSize: Style.FONT_SIZE_TITLE_XL,
    color: Color.primaryText,
    fontWeight: '800',
    textAlign: 'left',
    marginBottom: 10,
  },
});

export { Texts };
