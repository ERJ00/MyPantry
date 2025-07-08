import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

// Prevent auto-hiding the splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          PlayfairBold: require("../assets/fonts/PlayfairDisplay-Bold.ttf"),
          OutfitRegular: require("../assets/fonts/Outfit-Regular.ttf"),
          DMSansRegular: require("../assets/fonts/DMSans-Regular.ttf"),
          SpaceGroteskRegular: require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
        });

        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("Error loading fonts", e);
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) return null; // Prevent app from rendering until fonts are loaded

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
