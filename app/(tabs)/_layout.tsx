import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2E7D32", // text-textPrimary
        tabBarInactiveTintColor: "#777777", // text-textMuted
        tabBarStyle: {
          backgroundColor: "#FFF",  
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontFamily: "OutfitRegular", 
          fontSize: 13,
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
