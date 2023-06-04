import { useState } from "react";
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  TextInput
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [hoverInputEmail, setHoverInputEmail] = useState(false);
  const [hoverInputPassword, setHoverInputPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmitForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    console.log(state);;
  };

  const onFocusEmail =() => {
    setHoverInputEmail(true);
    setIsShowKeyboard(true);
  }

  const onFocusPassword =() => {
    setHoverInputPassword(true);
    setIsShowKeyboard(true);
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/Photo-BG.jpg")}
          style={styles.background}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 10 : 130,
              }}
            >

              <Text style={styles.title}>Вхід</Text>

              <TextInput
                style={{
                        ...styles.input,
                        backgroundColor: hoverInputEmail ? "#FFFFFF" : "#F6F6F6",
                        borderColor: hoverInputEmail ? "#FF6C00" : "#E8E8E8",
                      }}
                keyboardType="email-address"
                placeholder={"Адреса електроної пошти"}
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                onFocus={onFocusEmail}
                onBlur={() => setHoverInputEmail(false)}
              />
              <View>
              <TextInput
                style={{
                  ...styles.input,
                  backgroundColor: hoverInputPassword ? "#FFFFFF" : "#F6F6F6",
                  borderColor: hoverInputPassword ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder={"Пароль"}
                value={state.password}
                secureTextEntry={showPassword ? true : false}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                onFocus={onFocusPassword}
                onBlur={() => setHoverInputPassword(false)}
              />
              <TouchableOpacity style={styles.showPasswordBtn} onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showPasswordText} children ={showPassword ? "Показати" : "Скрити"}></Text>
              </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={onSubmitForm}
              >
                <Text style={styles.btnText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
              <Text style={styles.question}>Немає акаунта? Зареєструватися</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    lineHeight: 35,
    letterSpacing: 0.01,
    marginBottom: 25,
  },
  form: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 130,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  btn: {
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 28,
    marginBottom: 16,
    borderRadius: 100,
  },
  btnText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  showPasswordBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  showPasswordText:{
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 19,
  },
  question: {
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
});
