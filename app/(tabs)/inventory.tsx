import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inventory() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background px-4" edges={["top"]}>
      <Text className="text-2xl font-heading text-center text-textPrimary mb-3">
        Inventory
      </Text>

      {/* search bar */}
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search an item"/>
    </SafeAreaView>
  );
}
