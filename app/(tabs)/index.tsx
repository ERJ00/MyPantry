import { productStats } from "@/data/productStats";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const StatCard = ({
    icon,
    title,
    subtitle,
    value,
  }: {
    icon: string;
    title: string;
    subtitle: string;
    value: string | number;
  }) => (
    <View className="w-full bg-card h-20 px-4 py-2 rounded-xl mb-2 items-center flex-row">
      <Text className="text-4xl text-center mr-4">{icon}</Text>
      <View className="flex-grow">
        <Text className="text-lg font-bold text-left text-textPrimary">
          {title}
        </Text>
        <Text className="text-base text-left text-textMuted">{subtitle}</Text>
      </View>
      <View className="bg-accent px-4 py-1 rounded-2xl">
        <Text className="text-lg font-bold text-center text-green-900">
          {value}
        </Text>
      </View>
    </View>
  );

  const ProductStat = ({
    image,
    name,
    quantity,
    time,
    storage,
  }: {
    image: string;
    name: string;
    quantity: string;
    time: string;
    storage: string;
  }) => (
    <View
      className="h-28 bg-card rounded-xl flex-row px-2 py-4"
      style={{ width: "48%" }}
    >
      {/* image */}
      <View className="w-1/4">
        <Image source={{ uri: image }} className="w-full h-full rounded" />
      </View>

      {/* info */}
      <View className="pl-2 w-9/12 justify-between">
        <Text className="text-base font-bold">{name}</Text>
        <View className="flex-row justify-between  w-full">
          <Text className="text-base font-bold text-red-300">{quantity}</Text>
          <Text className="text-base font-bold text-textPrimary">{time}</Text>
        </View>
        <Text className="text-base font-bold text-textMuted">{storage}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background px-4" edges={["top"]}>
      <Text className="text-2xl font-bold text-center text-textPrimary mb-4">
        Dashboard
      </Text>
      <StatCard
        icon="📦"
        title="Total Inventory Items"
        subtitle="Last updated 2 hrs ago"
        value={152}
      />
      <StatCard
        icon="💵"
        title="Total Iventory Value"
        subtitle="Within 7 days"
        value={12735}
      />
      <StatCard
        icon="⚠️"
        title="Low Stock"
        subtitle="Needs restock"
        value={3}
      />
      <StatCard icon="🚨" title="Near Expiry" subtitle="use soon!" value={3} />

      <Text className="text-lg font-bold my-4">Time-Sensitive Inventory</Text>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row flex-wrap justify-between gap-2">
          <View className="flex flex-row flex-wrap justify-between gap-2">
            {productStats.map((item, index) => (
              <ProductStat
                key={index}
                image={item.image}
                name={item.name}
                quantity={item.quantity}
                time={item.time}
                storage={item.storage}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
