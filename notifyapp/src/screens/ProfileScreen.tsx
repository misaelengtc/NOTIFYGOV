import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "../theme/colors"

export function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color={colors.onPrimaryContainer} />
        </View>
        <Text style={styles.name}>Utilizador NotifyGov</Text>
        <Text style={styles.email}>citizen@exemplo.gov.pt</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="key" size={22} color={colors.secondary} />
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>Chave Móvel Digital</Text>
            <Text style={styles.rowSub}>Estado: ativa (simulação)</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>OK</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sobre esta app</Text>
        <Text style={styles.cardBody}>
          NotifyApp é o canal do cidadão para receber avisos oficiais, assinar com
          CMD, anexar documentos e liquidar faturas, com a mesma identidade visual
          do painel NotifyOrg.
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: "center", paddingVertical: 24 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "700", color: colors.primary },
  email: { fontSize: 14, color: colors.onSurfaceVariant, marginTop: 4 },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  rowText: { flex: 1 },
  rowTitle: { fontSize: 16, fontWeight: "600", color: colors.onSurface },
  rowSub: { fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 },
  badge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { fontSize: 12, fontWeight: "700", color: colors.onSecondaryContainer },
  cardTitle: { fontSize: 15, fontWeight: "700", color: colors.primary, marginBottom: 8 },
  cardBody: { fontSize: 14, color: colors.onSurfaceVariant, lineHeight: 21 },
})
