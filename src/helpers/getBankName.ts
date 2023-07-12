import store from "../features/store"
import titleCase from "../hooks/titleCase"

export default function getBankName(bankCode: string | undefined): string {
  if (!bankCode) {
    return ""
  }
  return titleCase(
    store
      .getState()
      .init.main?.options.banks.filter((bank) => bank.code === bankCode)[0]
      ?.name || "",
  )
}
