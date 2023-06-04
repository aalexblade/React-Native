import { TouchableOpacity } from "react-native";
import { PostsScreen } from "../main/PostsScreen";
import { CreatePostsScreen } from "../main/CreatePostsScreen";
import { ProfileScreen } from "../main/ProfileScreen";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Entypo, AntDesign } from '@expo/vector-icons';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const MainTab = createBottomTabNavigator();

export const HomeScreen = () => {
  dispatch = useDispatch();
  
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{ tabBarShowLabel: false }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Entypo style ={{color: focused ? "#FF6C00" : "#212121"}} name="images" size={26} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={signOut}>
              <Entypo name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign style ={{color: focused ? "#FF6C00" : "#212121"}} name="pluscircleo" size={32} color={color} />
          ),
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign style ={{color: focused ? "#FF6C00" : "#212121"}} name="user" size={26} color={color} />
          ),
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};


