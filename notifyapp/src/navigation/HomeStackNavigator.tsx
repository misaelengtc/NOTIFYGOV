import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { colors } from "../theme/colors"
import { CmdSignatureScreen } from "../screens/CmdSignatureScreen"
import { NotificationDetailScreen } from "../screens/NotificationDetailScreen"
import { NotificationsScreen } from "../screens/NotificationsScreen"
import { PaymentScreen } from "../screens/PaymentScreen"
import type { HomeStackParamList } from "./types"

const Stack = createNativeStackNavigator<HomeStackParamList>()

export function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerTitleStyle: { fontWeight: "600", fontSize: 17, color: colors.onPrimary },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="NotificationsList"
        component={NotificationsScreen}
        options={{ title: "Notificações" }}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetailScreen}
        options={{ title: "Detalhe" }}
      />
      <Stack.Screen
        name="CmdSignature"
        component={CmdSignatureScreen}
        options={{ title: "Assinatura CMD", presentation: "modal" }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Pagamento", presentation: "modal" }}
      />
    </Stack.Navigator>
  )
}
