import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState, useRef } from "react";
import MainContext from "../context/MainContext";
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastManager, { Toast } from "toastify-react-native";

const getPerheight = (h) => {
  return (Dimensions.get("screen").height * h) / 100;
};
const getPerwidth = (w) => {
  return (Dimensions.get("screen").width * w) / 100;
};
const ListScreen = () => {
  const { skyblue, rooms, setrooms } = useContext(MainContext);
  const [editState, setEditState] = useState(Array(rooms.length).fill(false));
  const [roomsValue, setRoomsValue] = useState(rooms);


  const renameRoom = async (room, newRoom) => {
    try {
      const _id = await AsyncStorage.getItem("_id");
      const response = await fetch(
        "https://homeautomation.onrender.com/reanameRoom",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, room, newRoom }),
        }
      );
      response
        .json()
        .then(() => Toast.success(`DONE`))
        .catch((e) => Toast.error("ERROR"));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoom = async (room) => {
    try {
      const _id = await AsyncStorage.getItem("_id");
      const response = await fetch(
        "https://homeautomation.onrender.com/deleteRoom",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, room}),
        }
      );
      response
        .json()
        .then(() => Toast.success(`DONE`))
        .catch((e) => Toast.error("ERROR"));
    } catch (error) {}
  };
  return (
    <View style={[styles.main]}>
      <Text style={[styles.titleStyle, { backgroundColor: "#CADCFC" }]}>
        Rooms
      </Text>
      <ToastManager />
      <ScrollView style={{ marginTop: getPerheight(2) }}>
        {rooms.map((e, i) => {
          return (
            <View style={[styles.roomContainer]} key={i}>
              <TextInput
                value={roomsValue[i]}
                editable={editState[i]}
                style={{ flex: 2, fontFamily: "Nunito-V", color : "#000000" }}
                onChangeText={(e) => {
                  const newRoomsValue = [...roomsValue];
                  newRoomsValue[i] = e;
                  setRoomsValue(newRoomsValue);
                }}
                
              />
              <View
                style={{
                  flexDirection: "row",
                  flex: 0.7,
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={[styles.editImage]}
                  onPress={() => {
                    if (!editState[i]) {
                      const newEditState = editState;
                      newEditState[i] = !newEditState[i];
                      setEditState(newEditState);
                    } else {
                      const newEditState = editState;
                      newEditState[i] = !newEditState[i];
                      setEditState(newEditState);
                      Alert.alert(
                        "Rename",
                        "Do you want to rename your Room",
                        [
                          {
                            text: "OK",
                            onPress: () => {
                              renameRoom(e, roomsValue[i]);
                            },
                          },
                          {
                            text: "Cancle",
                            onPress: () => console.log("Cancle"),
                          },
                        ],
                        { cancelable: true }
                      );
                    }
                  }}
                >
                  <Image
                    style={{
                      width: getPerwidth(6),
                      height: getPerheight(4),
                      resizeMode: "contain",
                    }}
                    source={
                      editState[i]
                        ? require("../assets/true.png")
                        : require("../assets/edit.png")
                    }
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    Alert.alert(
                      "Delete",
                      "Do you want to delete Room, It will also delete all the devices which are contain by that Room",
                      [
                        { text: "Ok", onPress: () => deleteRoom(e) },
                        {
                          text: "Cancle",
                          onPress: () => {
                            console.log("Cancle");
                          },
                        },
                      ],
                      { cancelable: true }
                    );
                  }}
                >
                  <Image
                    source={require("../assets/delete.png")}
                    style={{ width: getPerwidth(6), height: getPerheight(4) }}
                  />
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 24,
    fontFamily: "Nunito-V",
    color: "#000000",
    textAlign: "center",
    padding: getPerwidth(2),
    borderRadius: 5,
  },
  main: {
    padding: getPerwidth(5),
  },
  roomContainer: {
    flexDirection: "row",
    padding: getPerwidth(3),
    backgroundColor: "#ffff",
    alignItems: "center",
    marginTop: getPerheight(1),
    elevation: 5,
    shadowColor: "#CADCFC",
    shadowOpacity: 0.8,
    justifyContent: "space-between",
  },
});
