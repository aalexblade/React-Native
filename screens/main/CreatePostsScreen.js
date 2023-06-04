import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  Image
} from "react-native";
import { Feather, SimpleLineIcons, Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import uuid from "react-native-uuid";

const initialState = {
  title: "",
  location: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [inputState, setInputState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { userId, email, name, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  const addFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  const sendPost = () => {
    uploadPostToServer();
    navigation.navigate("DefaultPostsScreen");
    setInputState(initialState);
    setPhoto(null);
  };

  const deletePhoto = () => {
    setPhoto(null);
    setInputState(initialState);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = uuid.v4();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageRef, file);
    const processedPhoto = await getDownloadURL(storageRef);
    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    try {
      await addDoc(collection(db, "posts"), {
        userId,
        name,
        email,
        avatar,
        photo,
        title: inputState.title,
        place: inputState.location,
        location: location,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera} type={type} ratio="1:1">
          {photo && (
            <View style={styles.photoContainer}>
              <Image style={styles.photo} source={{ uri: photo }}></Image>
            </View>
          )}
          <View style={styles.iconCameraContainer}>
            <TouchableOpacity onPress={takePhoto}>
              <Feather name="camera" size={24} color="#F6F6F6" />
            </TouchableOpacity>
          </View>
        </Camera>

        <TouchableOpacity
          style={styles.toggleCameraBtn}
          onPress={toggleCameraType}
        >
          <Octicons name="sync" size={24} color="#F6F6F6" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fromGallery}
          onPress={addFromGallery}
        >
          <Text style={styles.fromGalleryText}>Завантажити з галереї</Text>
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={"Назва..."}
              value={inputState.title}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setInputState((prev) => ({ ...prev, title: value }))
              }
            />
            <View style={styles.locationInputContainer}>
              <SimpleLineIcons
                style={styles.locationIcon}
                name="location-pin"
                size={24}
                color="#BDBDBD"
              />
              <TextInput
                style={styles.locationInput}
                placeholder={"Локація..."}
                value={inputState.location}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setInputState((prev) => ({ ...prev, location: value }))
                }
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        <TouchableOpacity
          onPress={sendPost}
          activeOpacity={0.8}
          style={styles.sendPostButton}
        >
          <Text style={styles.buttonText}>Опублікувати</Text>
        </TouchableOpacity>
        
        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity
              onPress={deletePhoto}
              activeOpacity={0.8}
              style={styles.deleteButton}
              >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    
  },
  camera: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center", 
    height: 240,
    marginHorizontal: 16,
    marginTop: 24,
  },
  photoContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    left: 0,
  },
  photo: {
    flex: 1,
    height: 240,
  },
  iconCameraContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)"
  },
  toggleCameraBtn: {
    position: "absolute",
    top: 234,
    right: 35,
    opacity: 0.8,
  },
  fromGallery: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  fromGalleryText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD"
  },
  form: {
    marginHorizontal: 16,
    marginTop: 28,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    marginRight: 8,
  },
  locationInput: {
    flex: 1,
    height: 50,
  },
  sendPostButton: {
    justifyContent: "center",
    height: 50,
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF"
  },
  deleteButtonContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    paddingBottom: 15,
  },
  deleteButton: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 10,
    paddingBottom: 10
  },
});
