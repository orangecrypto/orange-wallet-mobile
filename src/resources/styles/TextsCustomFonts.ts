const TEXT_BOLD = 'ABCFavoritArabic-Bold';
const TEXT_REGULAR = 'ABCFavoritArabic-Regular';
const TEXT_MEDIUM = 'ABCFavoritArabic-Medium';
const TEXT_LIGHT = 'ABCFavoritArabic-Light';
const TEXT_BOOK = 'ABCFavoritArabic-Book';

const {CUSTOM_FONTS} = process.env;

export const fontTextBold = () => CUSTOM_FONTS && { fontFamily: TEXT_BOLD };

export const fontTextRegular = () => CUSTOM_FONTS  && { fontFamily: TEXT_REGULAR };

export const fontTextMedium = () => CUSTOM_FONTS && { fontFamily: TEXT_MEDIUM };

export const fontTextLight = () => CUSTOM_FONTS && { fontFamily: TEXT_LIGHT };

export const fontTextBook = () => CUSTOM_FONTS && { fontFamily: TEXT_BOOK };
