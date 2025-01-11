
import { Dimensions } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

// Pre-calculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? x < 320 ? 0.75 : 0.875 : 1;
const ratioY = y < 568 ? y < 480 ? 0.75 : 0.875 : 1;


// We set our base font size value
const baseUnit = 16;

// We're simulating EM by changing font size according to Ratio
const unit = baseUnit * ratioX;

function em(value: number) {
  return moderateScale(unit * value);
}

const navBarHeight = verticalScale(54);
const navBarStatusHeight = verticalScale(25);

// Then we set our styles with the help of the em() function
const Style = {

  // GENERAL
  DEVICE_WIDTH: x,
  DEVICE_HEIGHT: y,
  RATIO_X: ratioX,
  RATIO_Y: ratioY,


  // NAVIGATION
  NAV_BAR_HEIGHT: navBarHeight,
  NAV_BAR_STATUS_HEIGHT: navBarStatusHeight,

  // Fonts
  FONT_SIZE: em(1),
  FONT_SIZE_SMALL_2XS: em(0.55),
  FONT_SIZE_SMALL_XS: em(0.65),
  FONT_SIZE_SMALL_S: em(0.75),
  FONT_SIZE_SMALL: em(0.875),
  FONT_SIZE_TITLE: em(1.25),
  FONT_SIZE_TITLE_S: em(1.50),
  FONT_SIZE_TITLE_M: em(1.75),
  FONT_SIZE_TITLE_L: em(2.25),
  FONT_SIZE_TITLE_XL: em(2.50),
  FONT_SIZE_TITLE_2XL: em(3.00),
  FONT_SIZE_TITLE_3XL: em(4.00),


};

export { Style };
