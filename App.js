import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react/cjs/react.development";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Main } from "./components/Main";

export default function App() {
  const [customFonts] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (customFonts) {
      await SplashScreen.hideAsync();
    }
  }, [customFonts]);

  if (!customFonts) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Main onLayout={onLayoutRootView} />
    </Provider>
  );
}
