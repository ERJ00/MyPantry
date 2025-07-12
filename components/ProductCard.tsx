import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  product: {
    id: string;
    image: string;
    name: string;
    category: string;
    storage: string;
    remainingStock: number;
    minStockLevel: number;
    batch: {
      id: string;
      quantity: number;
      unit: string;
      restockedAt: string;
      expiresAt: string;
      status: string;
    }[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case "fruit":
        return {
          cardBg: "bg-cardFruit",
          textColor: "text-textFruit",
          borderColor: "border-cardFruit",
          emoji: "🍎",
        };
      case "vegetable":
        return {
          cardBg: "bg-cardVegetable",
          textColor: "text-textVegetable",
          borderColor: "border-cardVegetable",
          emoji: "🥬",
        };
      case "dairy":
        return {
          cardBg: "bg-cardDairy",
          textColor: "text-textDairy",
          borderColor: "border-cardDairy",
          emoji: "🥛",
        };
      case "meat":
        return {
          cardBg: "bg-cardMeat",
          textColor: "text-textMeat",
          borderColor: "border-cardMeat",
          emoji: "🥩",
        };
      case "grain":
        return {
          cardBg: "bg-cardGrain",
          textColor: "text-textGrain",
          borderColor: "border-cardGrain",
          emoji: "🌾",
        };
      default:
        return {
          cardBg: "bg-card",
          textColor: "text-textPrimary",
          borderColor: "border-cardBorder",
          emoji: "📦",
        };
    }
  };

  const getEarliestExpirationInfo = (): { daysLeft: number; expirationText: string; batch: any } => {
    if (!product.batch || product.batch.length === 0) {
      return { daysLeft: 999, expirationText: "No data", batch: null };
    }

    const soonestBatch = product.batch.reduce((earliest, current) =>
      new Date(current.expiresAt) < new Date(earliest.expiresAt) ? current : earliest
    );

    const now = new Date();
    const exp = new Date(soonestBatch.expiresAt);
    const diff = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    let expirationText = "";
    if (diff < 0) {
      expirationText = "Expired";
    } else if (diff === 0) {
      expirationText = "Expires today";
    } else if (diff === 1) {
      expirationText = "1 day left";
    } else {
      expirationText = `${diff} days left`;
    }

    return { daysLeft: diff, expirationText, batch: soonestBatch };
  };

  const getBatchStats = () => {
    if (!product.batch || product.batch.length === 0) {
      return { totalBatches: 0, expiredCount: 0, expiringSoonCount: 0, freshCount: 0 };
    }

    const totalBatches = product.batch.length;
    const expiredCount = product.batch.filter(batch => batch.status === "expired").length;
    const expiringSoonCount = product.batch.filter(batch => batch.status === "expiringSoon").length;
    const freshCount = product.batch.filter(batch => batch.status === "fresh").length;

    return { totalBatches, expiredCount, expiringSoonCount, freshCount };
  };

  const getTotalBatchQuantity = () => {
    if (!product.batch || product.batch.length === 0) return 0;
    return product.batch.reduce((total, batch) => total + batch.quantity, 0);
  };

  const getExpirationStatus = (daysLeft: number) => {
    if (daysLeft < 0) {
      return {
        statusBg: "bg-errorLight",
        statusText: "text-textMeat",
        statusIcon: "alert-circle" as const,
        shadowStyle: "shadow-expired",
        iconColor: "#E53E3E",
      };
    } else if (daysLeft <= 3) {
      return {
        statusBg: "bg-warningLight",
        statusText: "text-textGrain",
        statusIcon: "time" as const,
        shadowStyle: "shadow-expiring",
        iconColor: "#D69E2E",
      };
    } else {
      return {
        statusBg: "bg-successLight",
        statusText: "text-textVegetable",
        statusIcon: "checkmark-circle" as const,
        shadowStyle: "shadow-soft",
        iconColor: "#38A169",
      };
    }
  };

  const getStockStatus = () => {
    const isLowStock = product.remainingStock <= product.minStockLevel;
    return {
      isLowStock,
      stockIcon: isLowStock ? "alert-circle" as const : "cube" as const,
      stockColor: isLowStock ? "#D69E2E" : "#718096",
      stockText: isLowStock ? "Low stock!" : `${product.remainingStock} remaining`,
    };
  };

  const expirationInfo = getEarliestExpirationInfo();
  const batchStats = getBatchStats();
  const totalBatchQuantity = getTotalBatchQuantity();
  const categoryStyles = getCategoryStyles(product.category);
  const expirationStatus = getExpirationStatus(expirationInfo.daysLeft);
  const stockStatus = getStockStatus();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/details/${product.id}`);
      }}
      className={`w-[48%] ${categoryStyles.cardBg} rounded-2xl p-4 border ${categoryStyles.borderColor} ${expirationStatus.shadowStyle}`}
      activeOpacity={0.8}
    >
      {/* Product Image */}
      <View className="w-full h-28 rounded-xl overflow-hidden mb-3 bg-warmWhite">
        <Image
          source={{ uri: product.image }}
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
        />
      </View>

      {/* Category Badge */}
      <View className="absolute top-2 right-2 bg-warmWhite px-2 py-1 rounded-full shadow-soft">
        <Text className="text-xs font-soft">{categoryStyles.emoji}</Text>
      </View>

      {/* Low Stock Warning Badge */}
      {stockStatus.isLowStock && (
        <View className="absolute top-2 left-2 bg-warningLight px-2 py-1 rounded-full shadow-soft border border-warning">
          <Text className="text-xs font-soft text-textGrain">Low Stock</Text>
        </View>
      )}

      {/* Product Name */}
      <Text className="text-lg font-body font-bold text-textPrimary mb-2" numberOfLines={1}>
        {product.name}
      </Text>

      {/* Stock Information */}
      <View className="flex-row items-center mb-2">
        <Ionicons name={stockStatus.stockIcon} size={14} color={stockStatus.stockColor} />
        <Text className={`text-sm font-soft ml-2 ${stockStatus.isLowStock ? 'text-textGrain' : 'text-textSecondary'}`}>
          {stockStatus.stockText}
        </Text>
      </View>

      {/* Total Items from All Batches */}
      <View className="flex-row items-center mb-2">
        <Ionicons name="layers-outline" size={14} color="#718096" />
        <Text className="text-sm font-soft text-textSecondary ml-2">
          {totalBatchQuantity} total items
        </Text>
      </View>

      {/* Number of Batches */}
      <View className="flex-row items-center mb-2">
        <Ionicons name="file-tray-stacked-outline" size={14} color="#718096" />
        <Text className="text-sm font-soft text-textSecondary ml-2">
          {batchStats.totalBatches} {batchStats.totalBatches === 1 ? 'batch' : 'batches'}
        </Text>
      </View>

      {/* Storage Location */}
      <View className="flex-row items-center mb-3">
        <Ionicons name="location-outline" size={14} color="#718096" />
        <Text className="text-sm font-soft text-textSecondary ml-2" numberOfLines={1}>
          {product.storage}
        </Text>
      </View>

      {/* Batch Status Summary */}
      {(batchStats.expiredCount > 0 || batchStats.expiringSoonCount > 0) && (
        <View className="mb-3 bg-background rounded-lg p-2">
          {batchStats.expiredCount > 0 && (
            <View className="flex-row items-center mb-1">
              <Ionicons name="alert-circle" size={12} color="#E53E3E" />
              <Text className="text-xs font-soft text-textMeat ml-1">
                {batchStats.expiredCount} expired
              </Text>
            </View>
          )}
          {batchStats.expiringSoonCount > 0 && (
            <View className="flex-row items-center mb-1">
              <Ionicons name="time" size={12} color="#D69E2E" />
              <Text className="text-xs font-soft text-textGrain ml-1">
                {batchStats.expiringSoonCount} expiring soon
              </Text>
            </View>
          )}
          {batchStats.freshCount > 0 && (
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={12} color="#38A169" />
              <Text className="text-xs font-soft text-textVegetable ml-1">
                {batchStats.freshCount} fresh
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Expiration Status, Earliest Expiring Batch */}
      <View
        className={`${expirationStatus.statusBg} px-3 py-2 rounded-full flex-row items-center justify-center border ${expirationStatus.statusBg.includes('error') ? 'border-error' : expirationStatus.statusBg.includes('warning') ? 'border-warning' : 'border-success'}`}
      >
        <Ionicons
          name={expirationStatus.statusIcon}
          size={14}
          color={expirationStatus.iconColor}
        />
        <Text
          className={`text-xs font-soft font-medium ${expirationStatus.statusText} ml-2`}
          numberOfLines={1}
        >
          {expirationInfo.expirationText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;