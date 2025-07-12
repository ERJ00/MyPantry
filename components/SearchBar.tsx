import { Feather } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  className,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <View
      className={`flex-row items-center bg-card rounded-xl px-4 py-3 shadow-soft border border-cardBorder ${className}`}
    >
      <Feather name="search" size={20} color="#7DD3A0" />
      <TextInput
        className="ml-3 flex-1 text-base font-body text-textPrimary"
        placeholder={placeholder}
        placeholderTextColor="#A0AEC0"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
