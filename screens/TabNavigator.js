import {
  BackHandler,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Modal,
  Button,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Page from "./Page";
import { useContext, useEffect, useState } from "react";
import MainContext from "../context/MainContext";
import Home from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createMaterialTopTabNavigator();
const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;
import LottieView from "lottie-react-native";
import DeviceAdd from "./components/DeviceAdd";
import RoomAdd from "./components/RoomAdd";
import AddModal from "./components/AddModal";

const getPerheight = (h) => {
  return (height * h) / 100;
};
const getPerwidth = (w) => {
  return (width * w) / 100;
};

const TabNavigator = ({ navigation }) => {
  const {
    skyBule,
    darkBlue,
    colorSchema,
    getStatus,
    setmodalVisiblity,
    modalVisiblity,
    rooms,
    setrooms,
  } = useContext(MainContext);

  const getTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 1 && currentHour < 12) {
      return "Good Morning 🌅";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon 🍜";
    } else {
      return "Good Evening 🌃";
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.setItem("LoginFlag", "false");
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s = await getStatus();
        delete s._id;
        delete s.userId;
        delete s.password;
        delete s.__v;
        const r = Object.keys(s);
        setrooms(r);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [rooms]);
  return (
    <>
      <Text
        style={{
          backgroundColor: "#FFFF",
          fontFamily: "Nunito-I",
          padding: getPerwidth(3),
          fontSize: getPerheight(2.5),
        }}
      >
        {getTime()};
      </Text>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#000000",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: {
            backgroundColor: "#FFFF",
            height: getPerheight(6), // Height of the tab bar
            justifyContent: "center", // Vertical alignment of tab items
          },
          tabBarIndicatorStyle: {
            backgroundColor: skyBule,
            height: getPerheight(6),
            borderBottomWidth: getPerheight(0.2),
            borderBottomColor: colorSchema === "dark" ? "#FFFFFF" : "#000000",
            borderTopLeftRadius: getPerwidth(2),
            borderTopRightRadius: getPerwidth(2),
          },
          tabBarPressColor: "#7d7d7d",
          tabBarLabelStyle: { fontFamily: "Nunito-V", fontWeight: "600" },
        }}
      >
        <Tab.Screen name="Home">{(props) => <Home {...props} />}</Tab.Screen>
        {rooms.map((e, index) => {
          return (
            <Tab.Screen key={index} name={e}>
              {(props) => <Page {...props} page={e} />}
            </Tab.Screen>
          );
        })}
      </Tab.Navigator>

      <View style={[styles.footer, { backgroundColor: skyBule }]}>
        <Pressable
          onPress={() => {
            setmodalVisiblity((prev) => !prev);
          }}
        >
          <Image
            style={styles.footerItem}
            source={require("../assets/add_icon.png")}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("List");
          }}
        >
          <Image
            style={styles.footerItem}
            source={require("../assets/list.png")}
          />
        </Pressable>
        <Pressable onPress={logout}>
          <Image
            style={styles.footerItem}
            source={require("../assets/logout.png")}
          />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerItem: {
    height: getPerheight(8),
    width: getPerwidth(8),
    resizeMode: "contain",
    borderColor : "#7d7d7d",
  },
});

export default TabNavigator;
