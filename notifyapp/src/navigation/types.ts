import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { NavigatorScreenParams } from "@react-navigation/native"

export type HomeStackParamList = {
  NotificationsList: undefined
  NotificationDetail: { id: string }
  CmdSignature: { notificationId: string; title: string }
  Payment: { notificationId: string; amount: string; invoiceRef: string }
}

export type RootTabParamList = {
  Inicio: NavigatorScreenParams<HomeStackParamList>
  Documentos: undefined
  Perfil: undefined
}

export type HomeStackNav = NativeStackNavigationProp<HomeStackParamList>
