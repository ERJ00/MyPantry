import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { productData } from "@/data/productStats";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "fresh" | "expiring" | "expired"
  >("all");

  // Calculate stats from productData
  const stats = useMemo(() => {
    const freshItemsCount = productData.reduce(
      (count, item) =>
        count + item.batch.filter((b) => b.status === "fresh").length,
      0
    );
    const expiringItemsCount = productData.reduce(
      (count, item) =>
        count + item.batch.filter((b) => b.status === "expiringSoon").length,
      0
    );
    const expiredItemsCount = productData.reduce(
      (count, item) =>
        count + item.batch.filter((b) => b.status === "expired").length,
      0
    );

    return {
      fresh: freshItemsCount,
      expiring: expiringItemsCount,
      expired: expiredItemsCount,
      critical: expiringItemsCount + expiredItemsCount,
    };
  }, []);

  // Filter products based on search and filter
  const filteredProducts = useMemo(() => {
    return productData.filter((item) => {
      // Search filter
      const matchesSearch =
        search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());

      // Status filter
      const matchesStatusFilter = (() => {
        switch (selectedFilter) {
          case "fresh":
            return item.batch.some((b) => b.status === "fresh");
          case "expiring":
            return item.batch.some((b) => b.status === "expiringSoon");
          case "expired":
            return item.batch.some((b) => b.status === "expired");
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatusFilter;
    });
  }, [search, selectedFilter]);

  const FilterButton = ({
    label,
    count,
    filterType,
    icon,
  }: {
    label: string;
    count: number;
    filterType: typeof selectedFilter;
    icon: string;
  }) => (
    <TouchableOpacity
      onPress={() => setSelectedFilter(filterType)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 8,
        backgroundColor: selectedFilter === filterType ? "#7DD3A0" : "#FFFFFF",
        borderColor: selectedFilter === filterType ? "#7DD3A0" : "#E5E7EB",
      }}
    >
      <Ionicons
        name={icon as any}
        size={16}
        color={selectedFilter === filterType ? "#FFFFFF" : "#7DD3A0"}
      />
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          marginLeft: 8,
          color: selectedFilter === filterType ? "#FFFFFF" : "#374151",
        }}
      >
        {label} ({count})
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background px-5" edges={["top"]}>
      {/* Search Bar */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search ingredients, brands, or categories..."
        className="mb-5"
      />

      {/* Critical Items Alert */}
      {stats.critical > 0 && (
        <View className="w-full px-5 py-4 items-center flex-row bg-errorLight border border-error rounded-2xl mb-5 shadow-expired">
          <View className="w-12 h-12 bg-error rounded-full justify-center items-center mr-4">
            <Ionicons name="warning" size={24} color="#FFFFFF" />
          </View>
          <View className="flex-grow">
            <Text className="text-lg font-body font-bold text-textPrimary mb-1">
              Items Need Attention
            </Text>
            <Text className="text-sm font-soft text-textSecondary">
              {stats.expiring > 0 && `${stats.expiring} expiring soon`}
              {stats.expiring > 0 && stats.expired > 0 && ", "}
              {stats.expired > 0 && `${stats.expired} expired`}
            </Text>
          </View>
          <View className="bg-card px-4 py-2 rounded-full border border-error">
            <Text className="text-lg font-body font-bold text-textMeat">
              {stats.critical}
            </Text>
          </View>
        </View>
      )}

      {/* Quick Stats Row */}
      <View className="flex-row justify-between mb-5">
        <View className="flex-1 bg-cardVegetable border border-green-200 rounded-xl p-4 mr-2">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-body font-bold text-textVegetable">
                {stats.fresh}
              </Text>
              <Text className="text-xs font-soft text-textSecondary">
                Fresh Items
              </Text>
            </View>
            <View className="w-8 h-8 bg-success rounded-full justify-center items-center">
              <Ionicons name="checkmark" size={16} color="#38A169" />
            </View>
          </View>
        </View>

        <View className="flex-1 bg-warningLight border border-yellow-200 rounded-xl p-4 ml-2">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-body font-bold text-textGrain">
                {stats.expiring}
              </Text>
              <Text className="text-xs font-soft text-textSecondary">
                Expiring Soon
              </Text>
            </View>
            <View className="w-8 h-8 bg-warning rounded-full justify-center items-center">
              <Ionicons name="time" size={16} color="#D69E2E" />
            </View>
          </View>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={{ marginBottom: 16 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
        >
          <FilterButton
            label="All"
            count={productData.length}
            filterType="all"
            icon="grid-outline"
          />
          <FilterButton
            label="Fresh"
            count={stats.fresh}
            filterType="fresh"
            icon="checkmark-circle"
          />
          <FilterButton
            label="Expiring"
            count={stats.expiring}
            filterType="expiring"
            icon="time"
          />
          <FilterButton
            label="Expired"
            count={stats.expired}
            filterType="expired"
            icon="close-circle"
          />
        </ScrollView>
      </View>

      {/* Section Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-heading font-bold text-textPrimary">
          {selectedFilter === "all"
            ? "All Items"
            : selectedFilter === "fresh"
              ? "Fresh Items"
              : selectedFilter === "expiring"
                ? "Expiring Soon"
                : "Expired Items"}
        </Text>
        <Text className="text-sm font-soft text-textSecondary">
          {filteredProducts.length} items
        </Text>
      </View>

      {/* Product Items Grid */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredProducts.length === 0 ? (
          <View className="flex-1 justify-center items-center py-12">
            <View className="w-16 h-16 bg-primary/10 rounded-full justify-center items-center mb-4">
              <Ionicons name="search" size={32} color="#7DD3A0" />
            </View>
            <Text className="text-xl font-heading font-bold text-textPrimary mb-2">
              No items found
            </Text>
            <Text className="text-sm font-soft text-textSecondary text-center">
              {search
                ? "Try adjusting your search terms"
                : "No items match the selected filter"}
            </Text>
          </View>
        ) : (
          <View className="flex flex-row flex-wrap justify-between gap-y-4">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => {
          console.log("Add new item to pantry");
        }}
        className="absolute w-16 h-16 bg-primary right-5 bottom-6 rounded-full justify-center items-center shadow-medium"
        style={{
          shadowColor: "#7DD3A0",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
