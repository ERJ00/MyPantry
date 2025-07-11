import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Sample product data
const productData = [
  {
    name: "Apple",
    category: "Fruit",
    lastRestocked: "March 1, 2025",
    totalQuantity: 25,
    remainingStock: 25,
    storage: "Produce Section",
    price: 5,
    totalPrice: 125,
    batch: [
      {
        id: "1",
        quantity: 15,
        restockedAt: "2025-07-08",
        expiresAt: "2025-07-14",
      },
      {
        id: "2",
        quantity: 10,
        restockedAt: "2025-07-09",
        expiresAt: "2025-07-15",
      },
    ],
  },
];

// Header
const Header = ({ onBack }: { onBack: () => void }) => (
  <View className="relative w-full flex-row items-center justify-center py-4">
    <TouchableOpacity
      onPress={onBack}
      className="absolute left-4 top-2 w-10 h-10 justify-center items-center bg-primary/10 rounded-full border border-primary/20"
    >
      <Ionicons name="arrow-back" size={24} color="#6366F1" />
    </TouchableOpacity>
    <Text className="text-2xl font-heading text-textPrimary">Product Details</Text>
  </View>
);

// Product Image
const ProductImage = ({ uri }: { uri: string }) => (
  <View className="w-full h-56 rounded-2xl overflow-hidden mb-6 shadow-medium">
    <ImageBackground
      className="w-full h-full"
      resizeMode="cover"
      blurRadius={10}
      source={{ uri }}
    >
      <Image className="w-full h-full" style={{ resizeMode: "contain" }} source={{ uri }} />
    </ImageBackground>
  </View>
);

// InfoCard for product attributes
const InfoCard = ({ label, value }: { label: string; value: string | number }) => (
  <View className="w-[48%] bg-card border border-cardBorder rounded-xl p-4 mb-3 shadow-soft">
    <Text className="text-xs font-soft text-textMuted mb-1">{label}</Text>
    <Text className="text-base font-body font-semibold text-textPrimary">{value}</Text>
  </View>
);

// Product Info Grid
const ProductInfo = ({ product }: { product: typeof productData[0] }) => (
  <View className="flex-row flex-wrap justify-between mb-2">
    <InfoCard label="Category" value={product.category} />
    <InfoCard label="Last Restocked" value={product.lastRestocked} />
    <InfoCard label="Total Quantity" value={product.totalQuantity} />
    <InfoCard label="Remaining Stock" value={product.remainingStock} />
    <InfoCard label="Storage" value={product.storage} />
    <InfoCard label="Price/Unit" value={`$${product.price}`} />
    <InfoCard label="Total Value" value={`$${product.totalPrice}`} />
  </View>
);

// Batch Card
const BatchCard = ({
  batch,
}: {
  batch: { id: string; quantity: number; restockedAt: string; expiresAt: string };
}) => (
  <View className="bg-cardGreen border border-accent/20 rounded-xl p-4 mb-3 shadow-soft">
    <View className="flex-row items-center justify-between mb-3">
      <Text className="font-body font-bold text-textPrimary">
        Batch #{batch.id}
      </Text>
      <View className="bg-accent/20 px-3 py-1 rounded-full">
        <Text className="text-xs font-soft font-medium text-textGreen">
          {batch.quantity} units
        </Text>
      </View>
    </View>
    <View className="space-y-2">
      <View className="flex-row justify-between">
        <Text className="text-sm font-soft text-textSecondary">Restocked</Text>
        <Text className="text-sm font-body font-medium text-textPrimary">
          {batch.restockedAt}
        </Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-sm font-soft text-textSecondary">Expires</Text>
        <Text className="text-sm font-body font-medium text-textPrimary">
          {batch.expiresAt}
        </Text>
      </View>
    </View>
  </View>
);

// Batch List
const BatchList = ({ batches }: { batches: typeof productData[0]["batch"] }) => (
  <View className="mt-6">
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-xl font-heading font-bold text-textPrimary">
        Batch Information
      </Text>
      <View className="bg-primary/10 px-3 py-1 rounded-full">
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

// Main Screen
export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const product = productData[0]; // replace with dynamic lookup via `id`

  const imageUri =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/640px-Red_Apple.jpg";

  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header onBack={router.back} />
        <ProductImage uri={imageUri} />
        
        {/* Product Title Section */}
        <View className="mb-6">
          <Text className="text-3xl font-heading font-bold mb-2 text-textPrimary">
            {product.name}
          </Text>
          <View className="bg-primary/10 self-start px-3 py-1 rounded-full">
            <Text className="text-sm font-soft font-medium text-primary">
              {product.category}
            </Text>
          </View>
        </View>
        
        <ProductInfo product={product} />
        <BatchList batches={product.batch} />
        
        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}