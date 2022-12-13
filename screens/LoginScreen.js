import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Add from "../assets/images/add.svg";

const initialeUserState = {
  name: "",
  email: "",
  password: "",
};

export default function SignIn() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [userState, setUserState] = useState(initialeUserState);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [fontsLoaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  // fonts

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // end fonts

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setIsFocusedEmail(false);
    setIsFocusedPassword(false);
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(userState);
    setUserState(initialeUserState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ScrollView style={styles.container} onLayout={onLayout}>
        <ImageBackground
          style={styles.imgBgr}
          source={require("../assets/images/imageBgr.png")}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.formBgr,
                marginTop: isShowKeyboard ? 273 : 323,
              }}
            >
              <View style={styles.avatar}>
                <Add style={styles.addButton} width={25} height={25}></Add>
              </View>
              <Text style={styles.title}>Sign in</Text>
              <View
                style={{
                  ...styles.form,

                  width: windowWidth,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    backgroundColor: isFocusedEmail ? "#fff" : "#F6F6F6",
                    borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Email"
                  value={userState.email}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsFocusedEmail(true);
                  }}
                  onChangeText={(value) =>
                    setUserState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: isFocusedPassword ? "#fff" : "#F6F6F6",
                      borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                    }}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={userState.password}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setIsFocusedPassword(true);
                    }}
                    onChangeText={(value) =>
                      setUserState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity>
                    <Text style={styles.passwordInput}>Show password</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonTitle}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTextContainer}>
                  <Text style={styles.bottomText}>
                    Have no account? Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  imgBgr: {
    flex: 1,
    justifyContent: "flex-end",
  },
  formBgr: {
    height: 549,
    // flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addButton: {
    position: "absolute",
    left: 107,
    bottom: 15,
  },
  title: {
    fontFamily: "RobotoBold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 33,
    // marginTop: 92,
  },
  form: {
    flex: 1,
    // alignItems: "center",
    // marginHorizontal: 16,
    // justifyContent: "center",
  },
  input: {
    height: 50,
    fontFamily: "RobotoRegular",
    borderWidth: 1,
    // borderColor: "#E8E8E8",
    borderRadius: 8,
    // backgroundColor: "#F6F6F6",
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  passwordInput: {
    position: "absolute",
    top: -54,
    right: 0,
    paddingRight: 16,
    color: "#1B4371",
    fontFamily: "RobotoRegular",
    fontSize: 16,
  },

  button: {
    marginHorizontal: 16,
    marginTop: 27,
    marginBottom: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
    textAlign: "center",
  },
  bottomTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    fontFamily: "RobotoRegular",
    color: "#1B4371",
    fontSize: 16,
  },
});
