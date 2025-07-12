import { productData } from "@/data/productStats";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Header
const Header = ({ onBack }: { onBack: () => void }) => (
  <View className="relative w-full flex-row items-center justify-center py-4 mb-2">
    <TouchableOpacity
      onPress={onBack}
      className="absolute left-4 top-2 w-12 h-12 justify-center items-center bg-primary/10 rounded-full border border-primary/20"
    >
      <Ionicons name="arrow-back" size={24} color="#7DD3A0" />
    </TouchableOpacity>
    <Text className="text-2xl font-heading text-textPrimary">Pantry Item</Text>
  </View>
);

// Product Image
const ProductImage = ({ uri }: { uri: string }) => (
  <View className="w-full h-64 rounded-2xl overflow-hidden mb-6 shadow-food-card">
    <ImageBackground
      className="w-full h-full bg-cardFruit"
      resizeMode="cover"
      blurRadius={8}
      source={{ uri }}
    >
      <View className="w-full h-full justify-center items-center">
        <Image className="w-full h-full" style={{ resizeMode: "contain" }} source={{ uri }} />
      </View>
    </ImageBackground>
  </View>
);

// InfoCard for product attributes
const InfoCard = ({ label, value }: { label: string; value: string | number }) => (
  <View className="w-[48%] bg-card border border-cardBorder rounded-xl p-4 mb-3 shadow-soft">
    <Text className="text-xs font-soft text-textMuted mb-2">{label}</Text>
    <Text className="text-lg font-body font-semibold text-textPrimary">{value}</Text>
  </View>
);

// Product Info Grid
const ProductInfo = ({ product }: { product: typeof productData[0] }) => (
  <View className="flex-row flex-wrap justify-between mb-4">
    <InfoCard label="Category" value={product.category} />
    <InfoCard label="Last Restocked" value={product.lastRestocked} />
    <InfoCard label="Total Quantity" value={`${product.totalQuantity} ${product.unit}`} />
    <InfoCard label="Remaining Stock" value={`${product.remainingStock} left`} />
    <InfoCard label="Storage Location" value={product.storage} />
    <InfoCard label="Price per Unit" value={`$${product.pricePerUnit}`} />
  </View>
);

// Get status colors and styles
const getStatusStyles = (status: string) => {
  switch (status) {
    case "fresh":
      return {
        bgColor: "bg-cardVegetable",
        textColor: "text-textVegetable",
        borderColor: "border-fresh/30",
        statusText: "Fresh",
        icon: "checkmark-circle" as const,
        iconColor: "#38A169",
      };
    case "expiringSoon":
      return {
        bgColor: "bg-warningLight",
        textColor: "text-textGrain",
        borderColor: "border-warning/30",
        statusText: "Expires Soon",
        icon: "time" as const,
        iconColor: "#D69E2E",
      };
    case "expired":
      return {
        bgColor: "bg-errorLight",
        textColor: "text-textMeat",
        borderColor: "border-error/30",
        statusText: "Expired",
        icon: "close-circle" as const,
        iconColor: "#E53E3E",
      };
    default:
      return {
        bgColor: "bg-surface",
        textColor: "text-textPrimary",
        borderColor: "border-cardBorder",
        statusText: "Unknown",
        icon: "help-circle" as const,
        iconColor: "#718096",
      };
  }
};

// Batch Card
const BatchCard = ({
  batch,
}: {
  batch: { 
    id: string; 
    quantity: number; 
    unit: string;
    restockedAt: string; 
    expiresAt: string; 
    status: string;
    purchaseLocation?: string;
    lotNumber?: string;
  };
}) => {
  const statusStyles = getStatusStyles(batch.status);
  
  return (
    <View className={`${statusStyles.bgColor} border ${statusStyles.borderColor} rounded-2xl p-5 mb-4 shadow-soft`}>
      <View className="flex-row items-center justify-between mb-4">
        <Text className="font-body font-bold text-lg text-textPrimary">
          Batch {batch.lotNumber || batch.id}
        </Text>
        <View className="flex-row items-center">
          <Ionicons 
            name={statusStyles.icon} 
            size={16} 
            color={statusStyles.iconColor} 
          />
          <Text className={`text-sm font-soft font-medium ${statusStyles.textColor} ml-2`}>
            {statusStyles.statusText}
          </Text>
        </View>
      </View>
      
      <View className="bg-warmWhite/50 rounded-xl p-3 mb-3">
        <Text className="text-base font-body font-semibold text-textPrimary text-center">
          {batch.quantity} {batch.unit} remaining
        </Text>
      </View>
      
      <View className="space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-soft text-textSecondary">Added to pantry</Text>
          <Text className="text-sm font-body font-medium text-textPrimary">
            {batch.restockedAt}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-soft text-textSecondary">Best before</Text>
          <Text className="text-sm font-body font-medium text-textPrimary">
            {batch.expiresAt}
          </Text>
        </View>
        {batch.purchaseLocation && (
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-soft text-textSecondary">Purchased from</Text>
            <Text className="text-sm font-body font-medium text-textPrimary">
              {batch.purchaseLocation}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

// Batch List
const BatchList = ({ batches }: { batches: typeof productData[0]["batch"] }) => (
  <View className="mt-2">
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-xl font-heading font-bold text-textPrimary">
        Expiration Tracking
      </Text>
      <View className="bg-primary/10 px-4 py-2 rounded-full">
        <Text className="text-sm font-soft font-medium text-primary">
          {batches.length} batches
        </Text>
      </View>
    </View>
    {batches.map((batch) => (
      <BatchCard key={batch.id} batch={batch} />
    ))}
  </View>
);

// Get category styles
const getCategoryStyles = (category: string) => {
  switch (category.toLowerCase()) {
    case "fruit":
      return {
        bgColor: "bg-cardFruit",
        textColor: "text-textFruit",
        borderColor: "border-textFruit/20",
        emoji: "🍎",
      };
    case "vegetable":
      return {
        bgColor: "bg-cardVegetable",
        textColor: "text-textVegetable",
        borderColor: "border-textVegetable/20",
        emoji: "🥬",
      };
    case "dairy":
      return {
        bgColor: "bg-cardDairy",
        textColor: "text-textDairy",
        borderColor: "border-textDairy/20",
        emoji: "🥛",
      };
    case "meat":
      return {
        bgColor: "bg-cardMeat",
        textColor: "text-textMeat",
        borderColor: "border-textMeat/20",
        emoji: "🥩",
      };
    case "grain":
      return {
        bgColor: "bg-cardGrain",
        textColor: "text-textGrain",
        borderColor: "border-textGrain/20",
        emoji: "🌾",
      };
    default:
      return {
        bgColor: "bg-cardFruit",
        textColor: "text-textFruit",
        borderColor: "border-textFruit/20",
        emoji: "🍎",
      };
  }
};

// Additional Info Section
const AdditionalInfo = ({ product }: { product: typeof productData[0] }) => (
  <View className="mb-6">
    <Text className="text-xl font-heading font-bold text-textPrimary mb-4">
      Additional Information
    </Text>
    <View className="bg-card border border-cardBorder rounded-2xl p-4 shadow-soft">
      <View className="space-y-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-soft text-textSecondary">Brand</Text>
          <Text className="text-sm font-body font-medium text-textPrimary">
            {product.brand}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-soft text-textSecondary">Subcategory</Text>
          <Text className="text-sm font-body font-medium text-textPrimary">
            {product.subcategory}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-soft text-textSecondary">Total Value</Text>
          <Text className="text-sm font-body font-medium text-textPrimary">
            ${product.totalValue}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-sm font-soft text-textSecondary">Consumed</Text>
          <Text className="text-sm font-body font-medium text-textPrimary">
            {product.consumedQuantity} {product.unit}
          </Text>
        </View>
        {product.notes && (
          <View className="pt-2 border-t border-cardBorder">
            <Text className="text-sm font-soft text-textSecondary mb-1">Notes</Text>
            <Text className="text-sm font-body text-textPrimary">
              {product.notes}
            </Text>
          </View>
        )}
      </View>
    </View>
  </View>
);

// Main Screen
export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Normalize ID from query params
  const parsedId = Array.isArray(id) ? id[0] : id;

  // Find matching product
  const product = productData.find((item) => item.id === parsedId);

  // Handle case where no product is found
  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-background px-5 justify-center items-center">
        <Text className="text-xl font-heading text-textPrimary mb-4">Product not found</Text>
        <TouchableOpacity
          onPress={router.back}
          className="bg-primary/20 px-4 py-2 rounded-full"
        >
          <Text className="text-primary font-soft text-base">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const categoryStyles = getCategoryStyles(product.category);

  return (
    <SafeAreaView className="flex-1 bg-background px-5">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header onBack={router.back} />
        <ProductImage uri={product.image} />

        {/* Product Title Section */}
        <View className="mb-6">
          <Text className="text-3xl font-heading font-bold mb-3 text-textPrimary">
            {product.name}
          </Text>
          <View className={`${categoryStyles.bgColor} border ${categoryStyles.borderColor} self-start px-4 py-2 rounded-full`}>
            <Text className={`text-sm font-soft font-medium ${categoryStyles.textColor}`}>
              {categoryStyles.emoji} {product.category}
            </Text>
          </View>
        </View>

        <ProductInfo product={product} />
        <AdditionalInfo product={product} />
        <BatchList batches={product.batch} />

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}