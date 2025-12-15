import { Dimensions } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

global.scale = (size) => (SCREEN_W / guidelineBaseWidth) * size;
global.verticalScale = (size) => (SCREEN_H / guidelineBaseHeight) * size;
global.moderateScale = (size, factor = 0.5) => size + (global.scale(size) - size) * factor;

export {};
