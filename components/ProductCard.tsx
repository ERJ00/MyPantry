import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  image: string;
  name: string;
  quantity: string;
  time: string;
  storage: string;
}

export default function ProductCard({
  image,
  name,
  quantity,
  time,
  storage,
}: ProductCardProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="h-32 bg-card rounded-2xl flex-row px-3 py-4 shadow-sm border border-accent"
      style={{ width: "48%" }}
      onPress={() => router.replace(`/details/${name}`)}
    >
      {/* image */}
      <View className="w-1/4">
        <Image source={{ uri: image }} className="w-full h-full rounded" />
      </View>

      {/* info */}
      <View className="pl-3 w-9/12 justify-between ">
        <Text className="text-base font-heading text-textPrimary">{name}</Text>
        <View className="flex-row justify-between w-full">
          <Text className="text-sm font-body text-textRed">{quantity}</Text>
          <Text className="text-sm font-soft text-textPrimary">{time}</Text>
        </View>
        <Text className="text-sm font-soft text-textMuted">{storage}</Text>
      </View>
    </TouchableOpacity>
  );
}
