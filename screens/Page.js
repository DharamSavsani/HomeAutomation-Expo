import {
  StyleSheet,
  Dimensions,
  Image,
  Switch,
  Text,
  Alert,
  Modal,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState, useMemo } from "react";
import MainContext from "../context/MainContext";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native";
import AddModal from "./components/AddModal";
import { FlatList } from "react-native";
import { Toast } from "toastify-react-native";
const getPerWidth = (w) => {
  return (Dimensions.get("screen").width * w) / 100;
};

const getPerHeight = (h) => {
  return (Dimensions.get("screen").height * h) / 100;
};
const Page = (props) => {
  const [devices, setdevices] = useState([]);
  const {
    skyBule,
    darkBlue,
    getStatus,
    setAndAddDevices,
    deviceAddflag,
    loding,
    setLoding,
  } = useContext(MainContext);
  const [userState, setuserState] = useState(null);
  const [response, setResponse] = useState({});
  const [deleteBtn, setdeleteBtn] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const deleteAlert = (deviceName) => {
    Alert.alert(
      "Delete Device",
      "Do you realy want to delete Device.",
      [
        {
          text: "OK",
          onPress: async () => {
            setLoding((prev) => true);
            const val = await userState[props.page];
            delete val[deviceName];
            await setAndAddDevices([props.page], val);
            setuserState((pre) => ({ ...pre, [props.page]: val }));
            setLoding((pre) => false);
            setdeleteBtn((prev) => (prev = !prev));
          },
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
      ],
      { cancelable: true }
    );
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        setRefreshing(false);
        setLoding(true);
        const s = await getStatus();
        setuserState(s);
        if (userState == null) {
          setRefreshing(true);
        } else {
          const d = Object.entries(userState[props.page]);
          setdevices(d.map(([key, value]) => ({ [key]: value })));
        }
        setLoding((prev) => false);
      } catch (e) {
        Toast.error("Please check the Netwok or Restart the App.");
      }
    };
    fetch();
  }, [response, deleteBtn, deviceAddflag, props.page, refreshing]);

  return useMemo(() => {
    return (
      <View style={styles.body}>
        <FlatList
          data={devices}
          keyExtractor={(item, index) => index}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
              }}
            />
          }
          renderItem={({ item }) => {
            const deviceName = Object.keys(item);
            const deviceValue = Object.values(item);
            return (
              <View
                style={[styles.mainContainer, { backgroundColor: skyBule }]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={
                      deviceValue[0]
                        ? require("../assets/light_on.png")
                        : require("../assets/light.png")
                    }
                    style={styles.images}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      deleteAlert(deviceName[0]);
                    }}
                    style={[styles.btn]}
                  >
                    <Image
                      source={require("../assets/delete.png")}
                      style={{
                        width: getPerWidth(6),
                        height: getPerHeight(4),
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <Text style={styles.devicesName}>{deviceName}</Text>
                  <Switch
                    style={styles.switch}
                    value={deviceValue[0]}
                    trackColor={{ false: "#767577", true: "#34e342" }}
                    thumbColor={deviceValue[0] ? "#00af0f" : "#a193a1"}
                    onValueChange={async () => {
                      setLoding((prev) => true);
                      try {
                        const val = userState[props.page];
                        const d = deviceName[0];
                        val[d] = !val[d];
                        await setAndAddDevices(props.page, val);
                        setResponse(!response);
                      } catch (e) {
                        console.log(e);
                      }
                      setLoding((prev) => false);
                    }}
                  />
                </View>
              </View>
            );
          }}
          numColumns={2}
        />
        <LottieView
          style={[styles.lottie, { opacity: loding ? 1 : 0 }]}
          autoPlay={true}
          source={require("../assets/loding.json")}
          loop={true}
        />
      </View>
    );
  }, [devices, loding]);
};

export default Page;

const styles = StyleSheet.create({
  body: {
    flexWrap: "wrap",
    marginTop: getPerHeight(3),
    alignItems: "center",
  },
  mainContainer: {
    height: getPerHeight(20),
    width: getPerWidth(40),
    borderRadius: getPerWidth(3),
    padding: getPerWidth(2),
    margin: getPerWidth(5),
    flexDirection: "column",
  },
  images: {
    resizeMode: "contain",
    width: getPerWidth(15),
    height: getPerHeight(10),
  },
  switch: {
    width: getPerWidth(13),
  },
  devicesName: {
    fontSize: getPerHeight(2),
    fontFamily: "Nunito-V",
  },
  lottie: {
    position: "absolute",
    height: getPerHeight(30),
    width: getPerWidth(30),
    alignSelf: "center",
    marginVertical: getPerHeight(5),
  },
  btn: {
    height: getPerHeight(5),
    width: getPerWidth(13),
    alignItems: "center",
  },
});
