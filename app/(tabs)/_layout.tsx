import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7DD3A0", // primary color
        tabBarInactiveTintColor: "#A0AEC0", // textMuted
        tabBarStyle: {
          backgroundColor: "#FFFFFF", // surface
          borderTopWidth: 1,
          borderTopColor: "#E8E5E0", // cardBorder
          paddingBottom: 8,
          paddingTop: 6,
          shadowColor: "#7DD3A0",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontFamily: "OutfitRegular",
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="space-dashboard" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          headerShown: false,
          title: "Inventory",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="inventory" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
