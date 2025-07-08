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
        <Image
          source={{ uri: `data:image/png;base64,/${image}` }}
          className="w-full h-full rounded"
        />
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
          <ProductStat
            image="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"
            name="Chicken"
            quantity="3 kg"
            time="7 days"
            storage="Freezer"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
