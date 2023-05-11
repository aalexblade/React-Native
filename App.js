import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Text,
  Button,
} from "react-native";

export default function App() {
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
          <Button title='SING IN'/>
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
});