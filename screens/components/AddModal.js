import { StyleSheet, Text, View, Modal, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import DeviceAdd from "./DeviceAdd";
import RoomAdd from "./RoomAdd";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import MainContext from "../../context/MainContext";

const Tab = createMaterialTopTabNavigator();

const getPerheight = (h) => {
  return (Dimensions.get("screen").height * h) / 100;
};
const getPerwidth = (w) => {
  return (Dimensions.get("screen").width * w) / 100;
};
const AddModal = () => {
  const { skyBule, darkBlue, setmodalVisiblity } = useContext(MainContext);
  return (
    <View style={[styles.modalStyle]}>
      <Pressable
        onPress={() => setmodalVisiblity((prev) => !prev)}
        style={styles.close}
      >
        <Image
          source={require("../../assets/close.png")}
          style={{ width: getPerwidth(7), height: getPerheight(3) }}
        />
      </Pressable>
      <Tab.Navigator
        initialRouteName="Devices"
        style={{
          borderColor : '#87ceeb',
          borderWidth: getPerwidth(0.4),
          borderRadius: getPerwidth(3),
          elevation : 5
        }}
        screenOptions={{
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor: "#000000",
          tabBarLabelStyle: { fontSize: 12, fontWeight : 'bold' },
          tabBarStyle: {
            backgroundColor: "#7d7d7d",
            height: getPerheight(6), // Height of the tab bar
            justifyContent: "center", // Vertical alignment of tab items
            borderTopLeftRadius: getPerwidth(3),
            borderTopRightRadius: getPerwidth(3),
          },
          tabBarIndicatorStyle: {
            backgroundColor: skyBule,
            height: getPerheight(6),
            borderBottomWidth: getPerheight(0.2),
            borderBottomColor: skyBule,
            borderTopLeftRadius: getPerwidth(2),
            borderTopRightRadius: getPerwidth(2),
          },
          tabBarPressColor: "#7d7d7d",
          tabBarLabelStyle: { fontFamily: "Nunito-V", fontWeight: "600" },
        }}
      >
        <Tab.Screen name="Add Devices" component={DeviceAdd} />
        <Tab.Screen name="Add Room" component={RoomAdd} />
      </Tab.Navigator>
    </View>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  modalStyle: {
    flex: 0.9,
    justifyContent: "center",
    marginHorizontal: getPerwidth(5),
    marginVertical: getPerheight(6),
  },
  close: {
    alignItems: "flex-end",
  },
});
