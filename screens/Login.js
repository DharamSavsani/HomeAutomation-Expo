// -----------> IMPORTS
import {
  StyleSheet,
  Text,
  View,
  Appearance,
  Image,
  Pressable,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import LottieView from "lottie-react-native";
import { Dimensions } from "react-native";
import { TextInput } from "react-native";
import { useContext, useState, useEffect } from "react";
import MainContext from "../context/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

// Global Functions
const getPerWidth = (w) => {
  return (width * w) / 100;
};
const getPerHeight = (h) => {
  return (height * h) / 100;
};

const showSuccessToast = (msg) => {
  Toast.success(msg);
};
const showErrorToast = (msg) => {
  Toast.error(msg);
};

const Login = ({ navigation }) => {
  const { authUser, colorSchema } = useContext(MainContext);
  const [id, setid] = useState("");
  const [pass, setpass] = useState("");
  const [loginClick, setloginClick] = useState(false);
  const changeId = (e) => setid(e);
  const changePass = async (e) => setpass(e);
  useEffect(() => {
    const fetch = async () => {
      const loginFlag = await AsyncStorage.getItem("LoginFlag");
      if (loginFlag === "true") {
        navigation.navigate("TabNavigator");
      }
    };
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <ToastManager />
      <View style={styles.animetion}>
        <LottieView
          style={styles.lottei}
          autoPlay={true}
          source={require("../assets/login_page_animation.json")}
          loop={true}
        />
      </View>
      <View
        style={[
          styles.lodingAnimationContainer,
          { display: loginClick ? "flex" : "none" },
        ]}
      >
        <LottieView
          style={styles.lodingAnimation}
          autoPlay={true}
          source={require("../assets/loding.json")}
          loop={true}
        />
      </View>
      <View style={styles.toContainCenter}>
        <View style={styles.appId}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.texts}>App ID</Text>
            <Image
              source={require("../assets/identifier.png")}
              style={styles.imageStyle}
            />
          </View>

          <TextInput
            style={styles.AppIdInput}
            placeholder="XXX-XXX-XXX"
            onChangeText={changeId}
            name="ID"
          />
        </View>
      </View>
      <View style={styles.toContainCenter}>
        <View style={styles.appId}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.texts}>Password</Text>
            <Image
              source={require("../assets/password.png")}
              style={styles.imageStyle}
            />
          </View>
          <TextInput
            secureTextEntry={true}
            style={styles.AppIdInput}
            placeholder="XXXXXX"
            onChangeText={changePass}
          />
        </View>
      </View>
      <View style={styles.toContainCenter}>
        <Pressable
          style={styles.loginButton}
          onPress={async () => {
            try {
              setloginClick(true);
              await authUser(id, pass)
                .then(async (val) => {
                  setloginClick(false);
                  if (id === val[0].userId && pass === val[0].password) {
                    showSuccessToast("Login Success");
                    await AsyncStorage.setItem("LoginFlag", "true");
                    await AsyncStorage.setItem("id", val[0]._id);
                    navigation.navigate("TabNavigator");
                  } else {
                    await AsyncStorage.setItem("LoginFlag", "false");
                    showErrorToast("Error");
                    setloginClick(false);
                  }
                })
                .catch(async (e) => {
                  await AsyncStorage.setItem("LoginFlag", "false");
                  showErrorToast("Error");
                  setloginClick(false);
                });
            } catch (e) {
              setloginClick(false);
              showErrorToast("What have You Done😵");
            }
          }}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  animetion: {
    alignItems: "center",
    marginTop: getPerHeight(3),
  },
  lottei: {
    height: getPerHeight(30),
  },
  toContainCenter: {
    alignItems: "center",
    marginTop: getPerHeight(4),
  },
  lodingAnimationContainer: {
    width: getPerWidth(100),
    position: "absolute",
    alignItems: "center",
    marginVertical: getPerHeight(30),
  },
  lodingAnimation: {
    height: getPerHeight(13),
  },
  appId: {
    flexDirection: "column",
  },
  texts: {
    fontFamily: "VinaSans-Regular",
    fontSize: getPerHeight(2.5),
  },
  imageStyle: {
    width: getPerWidth(6),
    height: getPerHeight(4),
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    marginTop: getPerHeight(0.3),
    marginLeft: getPerWidth(0.7),
  },
  AppIdInput: {
    fontFamily: "VinaSans-Regular",
    backgroundColor: "#ffffff",
    width: getPerWidth(70),
    borderRadius: 5,
    borderWidth: 2,
    fontSize: getPerHeight(2.5),
    padding: getPerWidth(2),
  },
  loginButton: {
    paddingHorizontal: getPerWidth(3),
    backgroundColor: "#1eb67f",
    paddingVertical: getPerHeight(1),
    paddingHorizontal: getPerWidth(13),
    borderColor: "#ffffff",
    borderWidth: getPerWidth(0.5),
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "VinaSans-Regular",
    fontSize: getPerHeight(2.5),
  },

  // ------> LIGHT
});
