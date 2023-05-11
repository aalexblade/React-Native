import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

export default function App() {
  console.log(Platform.OS);
  
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./assets/images/stars-on-night.jpg")}
      >
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>EMAIL ADDRES</Text>
          <TextInput style={styles.input} textAlign={"center"} />
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.inputTitle}>PASSWORD</Text>
            <TextInput 
            style={styles.input} 
            textAlign={"center"} 
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity activeOpacity={0.5} style={styles.btn}>
            <Text style={styles.btnTitle}>SING IN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center", 
  },
  input: {
    borderWidth: 2,
    borderColor: "#deb887",
    height: 40,
    borderRadius: 6,
    // marginHorizontal: 40,
    color: "#f0f8ff",
    fontSize: 20,
  },
  form: {
    marginHorizontal: 40,
  },
  inputTitle: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 18,
  },

  btn: {
    backgroundColor: Platform.OS === "ios" ? "transporter" : "#1e90ff",
    height: 40,
    borderRadius: 6,
    marginTop: 40,
    borderWidth: 1,
    borderColor: Platform.OS === "ios" ? "#f0f8ff" : "transporter",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 80,
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#fff",
    fontSize: 18,
  }
});