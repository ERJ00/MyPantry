import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  return (
    <View className="flex-row items-center bg-card rounded-xl px-4 py-2 shadow-sm border border-accent">
      <Feather name="search" size={28} color="#2E7D32" />
      <TextInput
        className="ml-2 flex-1 text-base font-body text-textPrimary"
        placeholder={placeholder}
        placeholderTextColor="#777777"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
