import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import Login from "./screens/Login";
import { loadFonts } from "./fonts/font";
import MainState from "./context/MainState";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./screens/TabNavigator";
import Constants from "expo-constants";
import { Appearance, useColorScheme } from "react-native";
import ListScreen from "./screens/ListScreen";

const { height, width } = Dimensions.get("screen");
const getPerWidth = (w) => {
  return (width * w) / 100;
};
const getPerHeight = (h) => {
  return (height * h) / 100;
};

export default function App() {
  const [splash, setsplash] = useState(true);
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    loadFonts();
    Constants.systemPreferences &&
      Constants.systemPreferences.setColorScheme("light");
  }, []);
  if (splash) {
    return (
      <View style={styles.splash}>
        <LottieView
          style={{ resizeMode: "cover" }}
          autoPlay={true}
          source={require("./assets/splash_screen.json")}
          loop={false}
          onAnimationFinish={() => {
            setsplash(false);
          }}
        />
      </View>
    );
  } else {
    return (
      <MainState>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{
                headerTitleAlign: "center",
                headerTitle: "Smart Home",
                headerBackButtonMenuEnabled: false,
                headerBackVisible: false,
                headerStyle: { backgroundColor: "#CADCFC" },
                headerTitleStyle: { fontFamily: "Nunito-V", fontWeight: "300" },
              }}
            />
            <Stack.Screen
              name="List"
              component={ListScreen}
              options={{
                headerTitle: "Smart Home",
                headerTitleAlign: "center",
                headerTitleStyle : {fontFamily : 'Nunito-V', fontWeight : "300"},
                headerStyle : {backgroundColor : "#CADCFC"},
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MainState>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getPerHeight(3),
  },
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
