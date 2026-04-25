import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { HomeStackParamList } from "../navigation/types"
import { colors } from "../theme/colors"

type Props = NativeStackScreenProps<HomeStackParamList, "CmdSignature">

/** Fluxo de demonstração: PIN de 6 dígitos. Integração real com CMD exige serviço certificado. */
export function CmdSignatureScreen({ route, navigation }: Props) {
  const [pin, setPin] = useState("")
  const [otp, setOtp] = useState("")

  const canSubmit = pin.length === 6 && otp.length >= 4

  const submit = () => {
    Alert.alert(
      "Assinatura registada",
      "Em produção, o pedido seria enviado ao serviço de Chave Móvel Digital (autenticação forte + carimbo temporal).",
      [{ text: "OK", onPress: () => navigation.goBack() }],
    )
  }

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <View style={styles.card}>
        <Text style={styles.label}>Documento</Text>
        <Text style={styles.docTitle}>{route.params.title}</Text>
        <Text style={styles.hint}>
          Introduza o PIN da sua CMD e o código de uso único (SMS ou app do
          Cartão de Cidadão).
        </Text>

        <Text style={styles.fieldLabel}>PIN da CMD (6 dígitos)</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          secureTextEntry
          maxLength={6}
          value={pin}
          onChangeText={setPin}
          placeholder="••••••"
          placeholderTextColor={colors.outline}
        />

        <Text style={styles.fieldLabel}>Código de uso único</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={8}
          value={otp}
          onChangeText={setOtp}
          placeholder="Ex.: 482910"
          placeholderTextColor={colors.outline}
        />

        <Pressable
          style={({ pressed }) => [
            styles.submit,
            !canSubmit && styles.submitDisabled,
            pressed && canSubmit && styles.submitPressed,
          ]}
          onPress={submit}
          disabled={!canSubmit}
        >
          <Text
            style={[styles.submitText, !canSubmit && styles.submitTextDisabled]}
          >
            Confirmar assinatura
          </Text>
        </Pressable>

        <Text style={styles.legal}>
          Os dados são tratados de acordo com a RGPD. Este ecrã é uma simulação
          de UX; ligue o vosso gateway CMD no backend.
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  label: { fontSize: 12, fontWeight: "600", color: colors.onSurfaceVariant, textTransform: "uppercase" },
  docTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 4,
    marginBottom: 12,
  },
  hint: { fontSize: 14, color: colors.onSurfaceVariant, lineHeight: 20, marginBottom: 20 },
  fieldLabel: { fontSize: 13, fontWeight: "600", color: colors.onSurface, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.onSurface,
    marginBottom: 16,
    backgroundColor: colors.surfaceContainer,
  },
  submit: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  submitDisabled: { backgroundColor: colors.outlineVariant },
  submitPressed: { opacity: 0.92 },
  submitText: { color: colors.onPrimary, fontSize: 16, fontWeight: "700" },
  submitTextDisabled: { color: colors.onSurfaceVariant },
  legal: {
    marginTop: 20,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
})
