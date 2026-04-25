import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useState } from "react"
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { HomeStackParamList } from "../navigation/types"
import { colors } from "../theme/colors"

type Props = NativeStackScreenProps<HomeStackParamList, "Payment">

/** Formulário de cartão para demonstração — integrar PSP (ex. SIBS, Stripe) no servidor. */
export function PaymentScreen({ route, navigation }: Props) {
  const { amount, invoiceRef } = route.params
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")

  const valid =
    name.trim().length > 2 &&
    number.replace(/\s/g, "").length >= 16 &&
    expiry.length >= 4 &&
    cvc.length >= 3

  const pay = () => {
    Alert.alert(
      "Pagamento simulado",
      `Seria processado o pagamento de ${amount} (escudos cabo-verdianos) para ${invoiceRef}. Nunca guarde o PAN no dispositivo; use tokenização do PSP.`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
    )
  }

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>A pagar (escudos cabo-verdianos)</Text>
          <Text style={styles.amount}>{amount}</Text>
          <Text style={styles.ref}>{invoiceRef}</Text>
          <Text style={styles.ecvHint}>
            O débito ao cartão será efetuado em ECV (CVE), conforme o seu banco e
            o prestador de serviços de pagamento.
          </Text>
        </View>

        <Text style={styles.fieldLabel}>Titular do cartão</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nome como no cartão"
          placeholderTextColor={colors.outline}
          autoCapitalize="words"
        />

        <Text style={styles.fieldLabel}>Número do cartão</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor={colors.outline}
          keyboardType="number-pad"
          maxLength={19}
        />

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.fieldLabel}>Validade</Text>
            <TextInput
              style={styles.input}
              value={expiry}
              onChangeText={setExpiry}
              placeholder="MM/AA"
              placeholderTextColor={colors.outline}
              keyboardType="numbers-and-punctuation"
              maxLength={5}
            />
          </View>
          <View style={[styles.rowItem, styles.rowItemNarrow]}>
            <Text style={styles.fieldLabel}>CVC</Text>
            <TextInput
              style={styles.input}
              value={cvc}
              onChangeText={setCvc}
              placeholder="•••"
              placeholderTextColor={colors.outline}
              keyboardType="number-pad"
              secureTextEntry
              maxLength={4}
            />
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.pay,
            !valid && styles.payDisabled,
            pressed && valid && styles.payPressed,
          ]}
          onPress={pay}
          disabled={!valid}
        >
          <Text style={[styles.payText, !valid && styles.payTextDisabled]}>
            Pagar com cartão (ECV)
          </Text>
        </Pressable>

        <Text style={styles.secure}>
          Ligação segura simulada (HTTPS + 3-D Secure em produção).
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20, paddingBottom: 40 },
  summary: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 12,
    padding: 18,
    marginBottom: 24,
  },
  summaryLabel: { fontSize: 13, color: colors.onPrimaryContainer, opacity: 0.9 },
  amount: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.onPrimaryContainer,
    marginTop: 4,
  },
  ref: { fontSize: 14, color: colors.onPrimaryContainer, marginTop: 4 },
  ecvHint: {
    fontSize: 12,
    color: colors.onPrimaryContainer,
    opacity: 0.92,
    marginTop: 12,
    lineHeight: 17,
  },
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
    backgroundColor: colors.surface,
  },
  row: { flexDirection: "row", gap: 12 },
  rowItem: { flex: 1 },
  rowItemNarrow: { maxWidth: 120 },
  pay: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  payDisabled: { backgroundColor: colors.outlineVariant },
  payPressed: { opacity: 0.94 },
  payText: { color: colors.onSecondary, fontSize: 16, fontWeight: "700" },
  payTextDisabled: { color: colors.onSurfaceVariant },
  secure: {
    marginTop: 16,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 18,
  },
})
