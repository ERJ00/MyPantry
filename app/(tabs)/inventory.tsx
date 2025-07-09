import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { productStats } from "@/data/productStats";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inventory() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background px-4" edges={["top"]}>
      <Text className="text-2xl font-heading text-center text-textPrimary mb-3">
        Inventory
      </Text>

      {/* search bar */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search an item"
        className=" mb-3"
      />

      {/* notification, can be hide */}
      <View
        className={`w-full px-4 py-3 items-center flex-row bg-cardRed rounded-xl mb-3`}
      >
        <Text className="text-3xl mr-4">🚨</Text>
        <View className="flex-grow">
          <Text className="text-lg font-heading text-textPrimary">
            Critical Items
          </Text>
          <Text className="text-sm font-soft text-textMuted">
            Need restock or near expiry
          </Text>
        </View>
        <View className={`px-3 py-1 rounded-xl bg-card`}>
          <Text className={`text-base font-body text-center text-textRed`}>
            5
          </Text>
        </View>
      </View>

      {/* product items */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-row flex-wrap justify-between gap-y-3">
          {productStats.map((item, index) => (
            <ProductCard
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

      {/* add button */}
      <TouchableOpacity
        onPress={() => {
          console.log("Add Button");
        }}
        className="absolute w-16 h-16 bg-textGreen right-4 bottom-4 rounded-full justify-center items-center"
      >
        <Ionicons name="add-sharp" size={36} color="#E5F9E0" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
