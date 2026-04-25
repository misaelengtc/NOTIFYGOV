import { Ionicons } from "@expo/vector-icons"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useMemo, useState } from "react"
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  FOLDER_LABELS,
  getFolderMeta,
  MOCK_NOTIFICATIONS,
  normalizeEntityFolder,
} from "../data/notifications"
import type { HomeStackParamList } from "../navigation/types"
import { colors } from "../theme/colors"
import type { CitizenNotification, EntityFolder } from "../types/notification"

type Props = NativeStackScreenProps<HomeStackParamList, "NotificationsList">

const FOLDER_ORDER: EntityFolder[] = [
  "governo",
  "edec",
  "ads",
  "tme",
  "pagamentos",
  "outros",
]

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("pt-CV", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function NotificationsScreen({ navigation }: Props) {
  const [activeFolder, setActiveFolder] = useState<EntityFolder | "todos">(
    "todos",
  )

  const data = useMemo(() => {
    if (activeFolder === "todos") return MOCK_NOTIFICATIONS
    return MOCK_NOTIFICATIONS.filter((n) => n.folder === activeFolder)
  }, [activeFolder])

  const renderItem = ({ item }: { item: CitizenNotification }) => (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        !item.read && styles.cardUnread,
        pressed && styles.cardPressed,
      ]}
      onPress={() =>
        navigation.navigate("NotificationDetail", { id: item.id })
      }
    >
      <View style={styles.cardTop}>
        <Text style={styles.entity}>{item.entity}</Text>
        <Text style={styles.date}>{formatDate(item.receivedAt)}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.preview} numberOfLines={2}>
        {item.body}
      </Text>
      <View style={styles.tags}>
        <View style={[styles.tag, tagStyle(normalizeEntityFolder(item.folder))]}>
          <Text style={styles.tagText}>{getFolderMeta(item.folder).short}</Text>
        </View>
        {item.requiresSignature && (
          <View style={styles.tagOutline}>
            <Ionicons name="key-outline" size={14} color={colors.secondary} />
            <Text style={styles.tagOutlineText}>CMD</Text>
          </View>
        )}
        {item.hasOpenInvoice && (
          <View style={styles.tagPayment}>
            <Text style={styles.tagPaymentText}>ECV</Text>
          </View>
        )}
      </View>
    </Pressable>
  )

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <View style={styles.headerBand}>
        <Text style={styles.headline}>Caixa de entrada</Text>
        <Text style={styles.subtitle}>
          Pastas por entidade: Governo, EDEC, ADS e outras. Pagamentos em
          escudos cabo-verdianos (ECV).
        </Text>
      </View>
      <View style={styles.chipsRow}>
        <Pressable
          style={[styles.chip, activeFolder === "todos" && styles.chipActive]}
          onPress={() => setActiveFolder("todos")}
        >
          <Text
            style={[
              styles.chipLabel,
              activeFolder === "todos" && styles.chipLabelActive,
            ]}
          >
            Todos
          </Text>
        </Pressable>
        {FOLDER_ORDER.map((folder) => (
          <Pressable
            key={folder}
            style={[
              styles.chip,
              activeFolder === folder && styles.chipActive,
            ]}
            onPress={() => setActiveFolder(folder)}
          >
            <Text
              style={[
                styles.chipLabel,
                activeFolder === folder && styles.chipLabelActive,
              ]}
              numberOfLines={1}
            >
              {FOLDER_LABELS[folder].short}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma notificação nesta pasta.</Text>
        }
      />
    </SafeAreaView>
  )
}

function tagStyle(folder: EntityFolder) {
  switch (folder) {
    case "governo":
      return { backgroundColor: colors.primaryContainer + "55" }
    case "edec":
      return { backgroundColor: "#fff4e0" }
    case "ads":
      return { backgroundColor: colors.secondaryContainer }
    case "pagamentos":
      return { backgroundColor: colors.tertiary + "22" }
    case "tme":
      return { backgroundColor: colors.onPrimaryContainer + "33" }
    default:
      return { backgroundColor: colors.surfaceContainerHigh }
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  headerBand: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headline: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: -0.3,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurface,
  },
  chipLabelActive: { color: colors.onPrimary },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  cardUnread: { borderLeftWidth: 4, borderLeftColor: colors.primary },
  cardPressed: { opacity: 0.92 },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  entity: { fontSize: 12, fontWeight: "600", color: colors.secondary },
  date: { fontSize: 12, color: colors.onSurfaceVariant },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.onSurface,
    marginBottom: 6,
  },
  preview: { fontSize: 14, color: colors.onSurfaceVariant, lineHeight: 20 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 12, fontWeight: "600", color: colors.onSurface },
  tagOutline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  tagOutlineText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.secondary,
  },
  tagPayment: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.primaryContainer,
  },
  tagPaymentText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.onPrimaryContainer,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: colors.onSurfaceVariant,
    fontSize: 15,
  },
})
