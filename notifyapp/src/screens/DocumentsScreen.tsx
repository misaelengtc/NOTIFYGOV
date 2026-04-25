import { Ionicons } from "@expo/vector-icons"
import * as DocumentPicker from "expo-document-picker"
import { useState } from "react"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors } from "../theme/colors"

type Picked = { name: string; size?: number | null; uri: string }

export function DocumentsScreen() {
  const [files, setFiles] = useState<Picked[]>([])

  const pick = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
      multiple: true,
    })
    if (res.canceled) return
    const next: Picked[] = res.assets.map((a) => ({
      name: a.name,
      size: a.size,
      uri: a.uri,
    }))
    setFiles((prev) => [...next, ...prev])
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Carregar documentos</Text>
        <Text style={styles.sub}>
          Envie PDF ou imagens para completar processos associados às suas
          notificações. O vínculo ao processo será feito no servidor.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.uploadZone, pressed && styles.uploadZonePressed]}
        onPress={pick}
      >
        <Ionicons name="cloud-upload" size={40} color={colors.primary} />
        <Text style={styles.uploadTitle}>Toque para escolher ficheiros</Text>
        <Text style={styles.uploadHint}>PDF, JPEG ou PNG</Text>
      </Pressable>

      <Text style={styles.sectionLabel}>Ficheiros selecionados</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        ListEmptyComponent={
          <Text style={styles.empty}>Ainda não escolheu nenhum documento.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.fileRow}>
            <Ionicons name="document-text-outline" size={22} color={colors.secondary} />
            <View style={styles.fileMeta}>
              <Text style={styles.fileName} numberOfLines={2}>
                {item.name}
              </Text>
              {item.size != null && (
                <Text style={styles.fileSize}>
                  {(item.size / 1024).toFixed(1)} KB
                </Text>
              )}
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingBottom: 16 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
  },
  sub: { fontSize: 14, color: colors.onSurfaceVariant, lineHeight: 20 },
  uploadZone: {
    marginHorizontal: 20,
    paddingVertical: 36,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.outline,
    backgroundColor: colors.surface,
    alignItems: "center",
    gap: 8,
  },
  uploadZonePressed: { opacity: 0.92 },
  uploadTitle: { fontSize: 16, fontWeight: "600", color: colors.primary },
  uploadHint: { fontSize: 13, color: colors.onSurfaceVariant },
  sectionLabel: {
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  empty: { color: colors.onSurfaceVariant, fontSize: 14, paddingVertical: 8 },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  fileMeta: { flex: 1 },
  fileName: { fontSize: 15, fontWeight: "600", color: colors.onSurface },
  fileSize: { fontSize: 12, color: colors.onSurfaceVariant, marginTop: 2 },
})
