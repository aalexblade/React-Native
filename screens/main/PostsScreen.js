import { createStackNavigator } from "@react-navigation/stack";
import { DefaultPostsScreen } from "../nested/DefaultPostsScreen";
import { CommentsScreen } from "../nested/CommentsScreen";
import { MapScreen } from "../nested/MapScreen";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{
          title: "Publications",
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
