import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState, useContext } from "react";
import { ScrollView } from "react-native";
import { Dimensions } from "react-native";
import MainContext from "../../context/MainContext";
import ToastManager, {Toast} from "toastify-react-native";

const getPerheight = (h) => {
  return (Dimensions.get("screen").height * h) / 100;
};
const getPerwidth = (w) => {
  return (Dimensions.get("screen").width * w) / 100;
};

const RoomAdd = () => {
  const [roomName, setRoomName] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const { addRooms } = useContext(MainContext);
  return (
    <View style={[styles.main]}>
      <ToastManager />
      <ScrollView>
        <Text style={{ fontFamily: "Nunito-V", fontSize: getPerheight(2) }}>
          Enter Room Name
        </Text>
        <TextInput
          placeholder="Ex : Living Room"
          style={[styles.devicesValue]}
          value={roomName}
          onChangeText={(e) => {
            setRoomName(e);
          }}
        />
        <Text
          style={{
            fontFamily: "Nunito-V",
            fontSize: getPerheight(2),
            marginTop: getPerheight(5),
          }}
        >
          Enter the Device Name(Not Mandatory)
        </Text>
        <TextInput
          placeholder="Ex : Light"
          style={[styles.devicesValue]}
          value={deviceName}
          onChangeText={(e) => {
            setDeviceName(e);
          }}
        />
        <Pressable
          style={[styles.addBtnContainer]}
          onPress={async () => {
            try {
              if (roomName === "") {
                alert("Enter the Room Name 😵‍💫");
              } else {
                if (deviceName === "") {
                  const res = await addRooms(roomName, {});
                  console.log(res);
                  setRoomName("");
                } else {
                  const val = { [deviceName]: false };
                  addRooms(roomName, val)
                    .then(() => Toast.success(`Room Added`))
                    .catch((e) => Toast.error("ERROR"));
                  setDeviceName("");
                  setRoomName("");
                }
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Text style={[styles.addBtn]}>Add Room</Text>
        </Pressable>
        <Text style={{ fontFamily: "Nunito-V", marginTop: getPerheight(3) }}>
          *Note : Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eveniet quia, consequatur provident obcaecati nobis facilis ea
          reprehenderit blanditiis quasi molestiae tenetur, ullam quos veniam
          eaque veritatis rerum perspiciatis illo enim.
        </Text>
      </ScrollView>
    </View>
  );
};

export default RoomAdd;

const styles = StyleSheet.create({
  main: {
    padding: getPerwidth(5),
  },
  devicesValue: {
    borderWidth: getPerwidth(0.5),
    padding: getPerwidth(2.5),
    fontSize: getPerheight(2),
    fontFamily: "Nunito-I",
    marginTop: getPerheight(1.5),
    borderColor: "#87ceeb",
    borderRadius: 5,
    fontWeight: "500",
  },
  addBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87ceeb",
    paddingVertical: getPerheight(1.5),
    width: getPerwidth(35),
    alignSelf: "center",
    marginTop: getPerheight(10),
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#FFF",
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 10,
  },
  addBtn: {
    fontFamily: "Nunito-I",
  },
});
