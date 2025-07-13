import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="addProduct" options={{ headerShown: false }} />
    </Stack>
  );
}
