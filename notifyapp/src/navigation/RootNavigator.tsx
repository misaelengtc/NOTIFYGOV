import { Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { colors } from "../theme/colors"
import { DocumentsScreen } from "../screens/DocumentsScreen"
import { ProfileScreen } from "../screens/ProfileScreen"
import { HomeStackNavigator } from "./HomeStackNavigator"
import type { RootTabParamList } from "./types"

const Tab = createBottomTabNavigator<RootTabParamList>()

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.onSurface,
    border: colors.outlineVariant,
    notification: colors.error,
  },
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.onSurfaceVariant,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.outlineVariant,
          },
          tabBarLabelStyle: { fontSize: 12, fontWeight: "500" },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeStackNavigator}
          options={{
            title: "Início",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Documentos"
          component={DocumentsScreen}
          options={{
            title: "Documentos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloud-upload-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
