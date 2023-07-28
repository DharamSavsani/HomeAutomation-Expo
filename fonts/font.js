import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    "VinaSans-Regular" : require('./VinaSans-Regular.ttf'),
    "Nunito-I": require('./Nunito-Italic-VariableFont_wght.ttf'),
    "Nunito-V": require('./Nunito-VariableFont_wght.ttf'),
  });
};
