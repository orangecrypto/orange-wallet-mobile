import { I18nManager } from 'react-native';
import en from './en';
const strings = en

const isRTL = () => I18nManager.isRTL;

export { strings, isRTL };