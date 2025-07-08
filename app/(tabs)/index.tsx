import { productStats } from "@/data/productStats";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const StatCard = ({
    icon,
    title,
    subtitle,
    value,
    status = "default",
    isLast = false,
  }: {
    icon: string;
    title: string;
    subtitle: string;
    value: string | number;
    status?: "default" | "green" | "yellow" | "red" | "orange";
    isLast?: boolean;
  }) => {
    const statusBg = {
      green: "bg-cardGreen",
      yellow: "bg-cardYellow",
      red: "bg-cardRed",
      orange: "bg-cardOrange",
      default: "bg-accent",
    }[status];

    const statusText = {
      green: "text-textGreen",
      yellow: "text-textYellow",
      red: "text-textRed",
      orange: "text-textOrange",
      default: "text-green-900",
    }[status];

    const borderClass = isLast ? "" : "border-b-[2px] border-background";

    return (
      <View
        className={`w-full h-24 px-4 py-3 items-center flex-row ${borderClass}`}
      >
        <Text className="text-3xl mr-4">{icon}</Text>
        <View className="flex-grow">
          <Text className="text-lg font-heading text-textPrimary">{title}</Text>
          <Text className="text-sm font-soft text-textMuted">{subtitle}</Text>
        </View>
        <View className={`px-3 py-1 rounded-xl ${statusBg}`}>
          <Text className={`text-base font-body text-center ${statusText}`}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

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
      className="h-32 bg-card rounded-2xl flex-row px-3 py-4 shadow-sm"
      style={{ width: "48%" }}
    >
      {/* image */}
      <View className="w-1/4">
        <Image source={{ uri: image }} className="w-full h-full rounded" />
      </View>

      {/* info */}
      <View className="pl-3 w-9/12 justify-between">
        <Text className="text-base font-heading text-textPrimary">{name}</Text>
        <View className="flex-row justify-between w-full">
          <Text className="text-sm font-body text-textRed">{quantity}</Text>
          <Text className="text-sm font-soft text-textPrimary">{time}</Text>
        </View>
        <Text className="text-sm font-soft text-textMuted">{storage}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background px-4" edges={["top"]}>
      <Text className="text-2xl font-heading text-center text-textPrimary mb-3">
        Dashboard
      </Text>

      {/* Overview */}
      <View className="w-full rounded-2xl bg-card h-auto overflow-hidden">
        <StatCard
          icon="📦"
          title="Total Inventory Items"
          subtitle="Last updated 2 hrs ago"
          value={152}
          status="green"
        />
        <StatCard
          icon="💵"
          title="Total Inventory Value"
          subtitle="Within 7 days"
          value="$12,735"
          status="green"
        />
        <StatCard
          icon="⚠️"
          title="Low Stock"
          subtitle="Needs restock"
          value={3}
          status="orange"
        />
        <StatCard
          icon="🚨"
          title="Near Expiry"
          subtitle="Use soon!"
          value={3}
          status="red"
          isLast
        />
      </View>

      <Text className="text-lg font-heading text-textPrimary my-3">
        Time-Sensitive Inventory
      </Text>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row flex-wrap justify-between gap-y-3">
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
      </ScrollView>
    </SafeAreaView>
  );
}
