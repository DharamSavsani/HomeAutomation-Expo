import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import MainContext from "../../context/MainContext";
import { ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import ToastManager, { Toast } from "toastify-react-native";
const getPerheight = (h) => {
  return (Dimensions.get("screen").height * h) / 100;
};
const getPerwidth = (w) => {
  return (Dimensions.get("screen").width * w) / 100;
};

const DeviceAdd = () => {
  const {
    skyBlue,
    getStatus,
    setAndAddDevices,
    rooms,
    setrooms,
    deviceflag,
    setDeviceAddflag,
    loding,
    setLoding,
  } = useContext(MainContext);
  const [pickerValue, setpickerValue] = useState(rooms[0]);
  const [deviceName, setDeviceName] = useState("");
  const [userState, setUserState] = useState({});
  useEffect(() => {
    const status = async () => {
      try {
        const s = await getStatus();
        delete s._id;
        delete s.userId;
        delete s.password;
        delete s.__v;
        setUserState(s);
        setrooms(Object.keys(s));
      } catch (e) {
        console.log(e);
      }
    };
    status();
  }, []);
  return (
    <View style={[styles.main]}>
      <ToastManager />
      <ScrollView>
        <Text style={{ fontFamily: "Nunito-V", fontSize: getPerheight(2) }}>
          Enter Device Name
        </Text>
        <TextInput
          placeholder="Ex : Light"
          style={[styles.devicesValue]}
          onChangeText={(e) => setDeviceName(e)}
          value={deviceName}
        />
        <Text
          style={{
            fontFamily: "Nunito-V",
            fontSize: getPerheight(2),
            marginTop: getPerheight(5),
          }}
        >
          Select Room of Your Device
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pickerValue}
            onValueChange={(itemValue) => setpickerValue(itemValue)}
          >
            {rooms.map((room, index) => (
              <Picker.Item key={index} label={room} value={room} />
            ))}
          </Picker>
        </View>

        <Pressable
          style={[styles.addBtnContainer]}
          onPress={async () => {
            try {
              setLoding(true);
              if (deviceName === "") {
                alert("Please Enter a Name for your device");
              } else {
                const room = userState[pickerValue];
                room[deviceName] = false;
                console.log(room);
                await setAndAddDevices(pickerValue, room)
                  .then((v) => {
                    Toast.success(`Device Added`);
                    setDeviceAddflag(!deviceflag);
                    setDeviceName("");
                  })
                  .catch((e) => {
                    Toast.error("ERROR");
                  });
              }
              setLoding(false)
            } catch (e) {
              console.log(e);
              Toast.error("ERROR");
            }
          }}
        >
          <Text style={[styles.addBtn]}>Add Device</Text>
        </Pressable>
        <Text style={{ fontFamily: "Nunito-V", marginTop: getPerheight(3) }}>
          *Note : Adding Devics would take some time to Manage the Devices on server side so After adding device please Restart the App or refres the Room interface.
        </Text>
      </ScrollView>
    </View>
  );
};

export default DeviceAdd;

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
  pickerContainer: {
    borderWidth: getPerwidth(0.5),
    borderColor: "#87ceeb",
    borderRadius: 5,
    marginTop: getPerheight(1.5),
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
