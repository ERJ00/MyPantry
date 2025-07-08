import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <Text className="text-2xl font-bold text-center text-textPrimary mb-4">
        Dashboard
      </Text>
    </SafeAreaView>
  );
}
