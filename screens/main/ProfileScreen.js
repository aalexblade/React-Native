import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import { doc, collection, onSnapshot, query, where, deleteDoc } from "firebase/firestore";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import { Entypo, FontAwesome, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";


export const ProfileScreen = ({ navigation }) => {
  const { userId, name, avatar } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  dispatch = useDispatch();
 
  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const posts = collection(db, "posts");
    const q = query(posts, where("userId", "==", userId));
    onSnapshot(q, (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/Photo-BG.jpg")}
    >
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={avatar ? { uri: avatar } : require("../../assets/img/noavatar.png")}
        />
        <Entypo
          style={styles.signOutButton}
          onPress={signOut}
          name="log-out"
          size={24}
          color="#BDBDBD"
        />
        <Text style={styles.userName}>{name}</Text>
        
        {posts && (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postsContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deletePost(item.id)}
                  >
                    <MaterialIcons name="close" size={32} color="#FF6C00" />
                  </TouchableOpacity>
                <Image style={styles.postPhoto} source={{ uri: item.photo }} />
                <Text style={styles.postTitle}>{item.title}</Text>

               <View style={styles.postInformationContainer}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={{ ...styles.postComments, marginRight: 25 }}
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate("Comments", {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }
                  >
                    <FontAwesome name="comment-o" size={24} color={item.comments ? "#FF6C00" : "#BDBDBD"} />
                    <Text style={{
                        ...styles.numberComments,
                        color: item.comments ? "#212121" : "#BDBDBD",
                      }}>{item.comments || 0}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.postLocation}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate("Map", {
                      coords: {
                        latitude: item.location.coords.latitude,
                        longitude: item.location.coords.longitude,
                      },
                      place: item.place,
                    })
                  }
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.locationText}>{item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
            )}
          ></FlatList>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    paddingnHorizontal: 16,
    marginTop: 147,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatar: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
    borderRadius: 16,
  },
  signOutButton: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  userName: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    color: "#212121",
    marginTop: 92,
    marginBottom: 33,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
  },
  postsContainer: {
    marginBottom: 32,
  },
  postPhoto: {
    minWidth: 343,
    minHeight: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 12,
    zIndex: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  postTitle: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 11,
  },
  postInformationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postComments: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberComments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginLeft: 9,
  },
  postLocation: {
    flexDirection: "row",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
    color: "#212121",
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 19,
  },
});