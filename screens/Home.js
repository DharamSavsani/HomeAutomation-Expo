import { StyleSheet, Text, View, Modal, Dimensions, BackHandler } from "react-native";
import React, { useContext, useEffect } from "react";
import MainContext from "../context/MainContext";
import AddModal from "./components/AddModal";

const getPerWidth = (w) => {
  return (Dimensions.get("screen").width * w) / 100;
};

const getPerHeight = (h) => {
  return (Dimensions.get("screen").height * h) / 100;
};
const Home = (props) => {
  useEffect(() => {
    const backhandler = BackHandler.addEventListener("hardwareBackPress" , ()=>{
      BackHandler.exitApp();
    })
  }, []);
  const { setmodalVisiblity, modalVisiblity } = useContext(MainContext);
  return (
    <View style={[styles.main]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblity}
        onRequestClose={() => {
          setmodalVisiblity((prev) => !prev);
        }}
      >
        <AddModal />
      </Modal>
      <Text
        style={{
          fontFamily: "Nunito-V",
          fontSize: getPerWidth(4),
          backgroundColor: "#CADCFC",
          paddingVertical: getPerHeight(1),
          textAlign: "center",
          borderRadius: 5,
        }}
      >
        THIS SCREEN IS STILL UNDER DEVLOPMENT
      </Text>
      <Text
        style={{
          fontFamily: "Nunito-I",
          marginTop: getPerHeight(3),
          fontSize: getPerWidth(3.5),
        }}
      >
        In this Screen you will be able to access different types of Mode such
        like Exit Mode, Night Mode, etc...(You would be able to add your
        desirable Modes as well).
      </Text>
      <Text
        style={{
          fontFamily: "Nunito-I",
          marginTop: getPerHeight(3),
          fontSize: getPerWidth(3.5),
        }}
      >
        This is a sample app for learning purposes only and should not be used
        in production environment.
      </Text>
      <Text
        style={{
          fontFamily: "Nunito-I",
          marginTop: getPerHeight(3),
          fontSize: getPerWidth(3.5),
        }}
      >
        The code has been written to demonstrate the use of React Native with
        MongoDB as Database service provider.
      </Text>
      <Text
        style={{
          fontFamily: "Nunito-I",
          marginTop: getPerHeight(3),
          fontSize: getPerWidth(3.5),
        }}
      >
        The Back-End has been written using Express-JS framwork which held on
        Render backend service provider.
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: getPerWidth(5),
    elevation: 5,
    borderColor: "#7d7d7d",
    margin: getPerHeight(1),
  },
});
