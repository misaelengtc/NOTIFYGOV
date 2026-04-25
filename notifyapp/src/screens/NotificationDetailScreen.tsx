import { Ionicons } from "@expo/vector-icons"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { FOLDER_LABELS, MOCK_NOTIFICATIONS } from "../data/notifications"
import type { HomeStackParamList } from "../navigation/types"
import { colors } from "../theme/colors"

type Props = NativeStackScreenProps<HomeStackParamList, "NotificationDetail">

export function NotificationDetailScreen({ route, navigation }: Props) {
  const item = MOCK_NOTIFICATIONS.find((n) => n.id === route.params.id)

  if (!item) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.missing}>Notificação não encontrada.</Text>
      </SafeAreaView>
    )
  }

  const folderLabel = FOLDER_LABELS[item.folder].label

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.meta}>
          <Text style={styles.entity}>{item.entity}</Text>
          <View style={styles.folderPill}>
            <Text style={styles.folderPillText}>{folderLabel}</Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>

        <View style={styles.actions}>
          {item.requiresSignature && (
            <Pressable
              style={({ pressed }) => [
                styles.primaryBtn,
                pressed && styles.primaryBtnPressed,
              ]}
              onPress={() =>
                navigation.navigate("CmdSignature", {
                  notificationId: item.id,
                  title: item.title,
                })
              }
            >
              <Ionicons name="key" size={20} color={colors.onPrimary} />
              <Text style={styles.primaryBtnText}>Assinar com Chave Móvel Digital</Text>
            </Pressable>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && styles.secondaryBtnPressed,
            ]}
            onPress={() =>
              Alert.alert(
                "Carregar documento",
                "Utilize o separador Documentos para enviar ficheiros em PDF ou imagem. O envio ficará associado a esta notificação quando o back-end estiver ligado.",
                [{ text: "OK" }],
              )
            }
          >
            <Ionicons name="document-attach-outline" size={20} color={colors.secondary} />
            <Text style={styles.secondaryBtnText}>Como enviar documentos</Text>
          </Pressable>

          {item.hasOpenInvoice && item.invoiceAmount && item.invoiceRef && (
            <Pressable
              style={({ pressed }) => [
                styles.payBtn,
                pressed && styles.payBtnPressed,
              ]}
              onPress={() =>
                navigation.navigate("Payment", {
                  notificationId: item.id,
                  amount: item.invoiceAmount!,
                  invoiceRef: item.invoiceRef!,
                })
              }
            >
              <Ionicons name="card-outline" size={20} color={colors.onSecondaryContainer} />
              <Text style={styles.payBtnText}>
                Pagar {item.invoiceAmount} — {item.invoiceRef}
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  missing: { padding: 24, color: colors.onSurfaceVariant },
  meta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  entity: { fontSize: 13, fontWeight: "600", color: colors.secondary },
  folderPill: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  folderPillText: { fontSize: 12, fontWeight: "600", color: colors.onSurfaceVariant },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  body: { fontSize: 16, lineHeight: 24, color: colors.onSurface },
  actions: { marginTop: 28, gap: 12 },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
  },
  primaryBtnPressed: { opacity: 0.9 },
  primaryBtnText: {
    color: colors.onPrimary,
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  secondaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },
  secondaryBtnPressed: { opacity: 0.92 },
  secondaryBtnText: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  payBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.secondaryContainer,
    paddingVertical: 14,
    borderRadius: 10,
  },
  payBtnPressed: { opacity: 0.95 },
  payBtnText: {
    color: colors.onSecondaryContainer,
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
  },
})
