import ProductCard from "@/components/ProductCard";
import { productData } from "@/data/productStats";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface statCardTypes {
  icon: string;
  title: string;
  subtitle: string;
  value: string | number;
  status: string;
  isLast?: boolean;
}

export default function Index() {
  const StatCard = ({
    icon,
    title,
    subtitle,
    value,
    status = "default",
    isLast = false,
  }: statCardTypes) => {
    const statusBg = {
      fresh: "bg-cardVegetable",
      expiring: "bg-warningLight",
      expired: "bg-errorLight",
      warning: "bg-cardGrain",
      default: "bg-primaryLight",
    }[status];

    const statusText = {
      fresh: "text-textVegetable",
      expiring: "text-textGrain",
      expired: "text-textMeat",
      warning: "text-textSpice",
      default: "text-primaryDark",
    }[status];

    const borderClass = isLast ? "" : "border-b border-cardBorder";

    return (
      <View className={`w-full px-5 py-4 items-center flex-row ${borderClass}`}>
        <View className="w-12 h-12 rounded-full bg-warmWhite items-center justify-center mr-4 shadow-soft">
          <Text className="text-2xl">{icon}</Text>
        </View>
        <View className="flex-grow">
          <Text className="text-lg font-body font-semibold text-textPrimary">
            {title}
          </Text>
          <Text className="text-sm font-soft text-textSecondary">
            {subtitle}
          </Text>
        </View>
        <View className={`px-4 py-2 rounded-full ${statusBg} shadow-soft`}>
          <Text className={`text-base font-body font-semibold ${statusText}`}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

  const calculateStats = () => {
    // Total unique products
    const totalProducts = productData.length;

    // Total items across all batches (this is the correct total inventory)
    const totalItems = productData.reduce((sum, product) => {
      return (
        sum +
        product.batch.reduce((batchSum, batch) => batchSum + batch.quantity, 0)
      );
    }, 0);

    // Total value of all items (using totalValue from each product)
    const totalValue = productData.reduce(
      (sum, product) => sum + product.totalValue,
      0
    );

    // Products with low stock (using remainingStock and minStockLevel)
    const lowStockProducts = productData.filter(
      (product) => product.remainingStock <= product.minStockLevel
    ).length;

    // Count batches by status
    const batchStatusCounts = productData.reduce(
      (counts, product) => {
        product.batch.forEach((batch) => {
          counts[batch.status] = (counts[batch.status] || 0) + 1;
        });
        return counts;
      },
      {} as Record<string, number>
    );

    const expiringSoonBatches = batchStatusCounts.expiringSoon || 0;
    const expiredBatches = batchStatusCounts.expired || 0;

    // Products that have any expiring or expired batches
    const productsWithUrgentBatches = productData.filter((product) =>
      product.batch.some(
        (batch) => batch.status === "expiringSoon" || batch.status === "expired"
      )
    ).length;

    // Additional useful stats
    const freshBatches = batchStatusCounts.fresh || 0;
    const totalBatches = productData.reduce(
      (sum, product) => sum + product.batch.length,
      0
    );

    return {
      totalProducts,
      totalItems,
      totalValue,
      lowStockProducts,
      expiringSoonBatches,
      expiredBatches,
      productsWithUrgentBatches,
      freshBatches,
      totalBatches,
    };
  };

  const stats = calculateStats();

  return (
    <SafeAreaView className="flex-1 bg-background px-5" edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6 mt-2">
          <Text className="text-3xl font-heading font-bold text-textPrimary mb-2">
            MyPantry 🥬
          </Text>
          <Text className="text-base font-soft text-textSecondary">
            Keep track of your kitchen inventory and reduce food waste
          </Text>
        </View>

        {/* Overview Stats */}
        <View className="w-full rounded-2xl bg-card overflow-hidden shadow-food-card border border-cardBorder mb-6">
          <View className="px-5 py-4" style={{ backgroundColor: "#7DD3A0" }}>
            <Text className="text-lg font-body font-bold text-textInverse mb-1">
              Pantry Overview
            </Text>
            <Text className="text-sm font-soft text-textInverse">
              Your kitchen inventory at a glance
            </Text>
          </View>

          <StatCard
            icon="📦"
            title="Total Items"
            subtitle={`${stats.totalProducts} products • ${stats.totalBatches} batches`}
            value={stats.totalItems}
            status="fresh"
          />
          <StatCard
            icon="💰"
            title="Total Value"
            subtitle="Current inventory worth"
            value={`$${stats.totalValue.toFixed(2)}`}
            status="fresh"
          />
          <StatCard
            icon="⚠️"
            title="Low Stock Alert"
            subtitle="Products need restocking"
            value={stats.lowStockProducts}
            status={stats.lowStockProducts > 0 ? "warning" : "fresh"}
          />
          <StatCard
            icon="🚨"
            title="Expiring Soon"
            subtitle={`${stats.expiringSoonBatches} batches • ${stats.expiredBatches} expired`}
            value={stats.expiringSoonBatches}
            status={stats.expiringSoonBatches > 0 ? "expiring" : "fresh"}
            isLast
          />
        </View>

        {/* Time Sensitive Items */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-heading font-bold text-textPrimary">
            Time-Sensitive Items
          </Text>
          {stats.productsWithUrgentBatches > 0 ? (
            <View className="bg-errorLight px-3 py-1 rounded-full border border-error">
              <Text className="text-sm font-soft font-medium text-textMeat">
                {stats.productsWithUrgentBatches} products urgent
              </Text>
            </View>
          ) : (
            <View className="bg-successLight px-3 py-1 rounded-full border border-success">
              <Text className="text-sm font-soft font-medium text-textVegetable">
                All items fresh
              </Text>
            </View>
          )}
        </View>

        {/* Product Cards */}
        <View className="flex flex-row flex-wrap justify-between gap-y-4">
          {productData.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
