import MainContext from "./MainContext";
import { useState } from "react";
import { useColorScheme } from "react-native";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MainState(props) {
  const colorSchema = useColorScheme();
  const skyBule = "#CADCFC";
  const darkBule = "#00246B";
  const brand = Device.manufacturer;
  const [modalVisiblity, setmodalVisiblity] = useState(false);
  const [rooms, setrooms] = useState([]);
  const [deviceAddflag, setDeviceAddflag] = useState(false);
  const [loding, setLoding] = useState(false);
  const authUser = async (userId, password) => {
    console.log(userId, password);
    const response = await fetch("https://homeautomation.onrender.com/auth", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, password: password }),
    });
    const a = await response.json();
    await AsyncStorage.setItem("_id", a[0]._id);
    return a;
  };

  const getStatus = async () => {
    const _id = await AsyncStorage.getItem("_id");
    const response = await fetch(
      "https://homeautomation.onrender.com/getStatus",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      }
    );
    const a = await response.json();
    return a[0];
  };

  const setAndAddDevices = async (room, val) => {
    try {
      const _id = await AsyncStorage.getItem("_id");
      const response = await fetch(
        "https://homeautomation.onrender.com/addDevice",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, room, val }),
        }
      );
      const a = await response.json();
      return a[0];
    } catch (error) {
      console.log(error);
    }
  };

  const addRooms = async (room, val) => {
    try {
      const _id = await AsyncStorage.getItem("_id");
      console.log(room);
      console.log(val);
      const response = await fetch(
        "https://homeautomation.onrender.com/addRoom",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id, room, val }),
        }
      );
      const a = await response.json();
      return a[0];
    } catch (e) {
      console.log(e);
    }
  };
  // ------->

  return (
    <MainContext.Provider
      value={{
        authUser,
        skyBule,
        darkBule,
        colorSchema,
        brand,
        getStatus,
        setAndAddDevices,
        modalVisiblity,
        setmodalVisiblity,
        addRooms,
        rooms,setrooms,
        deviceAddflag,
        setDeviceAddflag,
        loding,
        setLoding
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
