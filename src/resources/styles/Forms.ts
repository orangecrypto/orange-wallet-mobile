import { StyleSheet } from 'react-native';

// Resources
import { Style } from './Style';
import * as Color from '../values/color';
import { Responsive } from '../../utils/Responsive';

const InputSize = Object.freeze({
  INPUT_20: Responsive.size20,
  INPUT_40: Responsive.size40,
  INPUT_50: Responsive.size50,
  INPUT_60: Responsive.size60,
  INPUT_150: Responsive.size150,
});

const PickerSize = Object.freeze({
  PICKER_50: Responsive.size50,
  PICKER_65: Responsive.size65,
});

const SizeType = Object.freeze({
  BORDER_RADIUS: 5,
});

const borderRadius = 4;
const InputSizeDefault = InputSize.INPUT_60;
const InputSizeMultilineDefault = Responsive.size30;
const Forms = StyleSheet.create({
  containerForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerInput: {
    paddingTop: Responsive.size16,
    paddingHorizontal: 0,
  },
  input: {
    height: InputSizeDefault,
    color: Color.primaryText,
    fontSize: Responsive.size16,
    fontWeight: 'normal',
    borderWidth: 1,
    borderRadius,
    paddingHorizontal: Responsive.size12,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputEmpty: {
    height: InputSizeDefault,
    color: Color.thirdText,
    fontSize: Responsive.size16,
    fontWeight: 'normal',
    borderWidth: 0,
    borderRadius,
    backgroundColor: Color.grayDisabled,
    paddingHorizontal: Responsive.size12,
  },
  inputLabel: {
    color: Color.primaryText,
    fontSize: Responsive.size16,
    fontWeight: 'normal',
    paddingVertical: Responsive.size8,
  },
  inputMultiline: {
    height: InputSizeMultilineDefault,
    paddingTop: Responsive.size12,
    textAlignVertical: 'top',
  },
  inputSeparator: {
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  textCheckBox: {
    color: Color.second,
    fontSize: Responsive.size14,
    alignSelf: 'flex-start',
  },
  textLink: {
    color: Color.second,
    fontSize: Responsive.size16,
    fontWeight: 'normal',
    textDecorationLine: 'none',
    alignSelf: 'center',
  },
  width12: {
    width: Style.DEVICE_WIDTH / 1.2,
  },
  width15: {
    width: Style.DEVICE_WIDTH / 1.5,
  },
  width2: {
    width: Style.DEVICE_WIDTH / 2,
  },
  widthFull: {
    width: '100%',
  },
});

export { Forms, InputSize, InputSizeDefault, InputSizeMultilineDefault, PickerSize, SizeType };
