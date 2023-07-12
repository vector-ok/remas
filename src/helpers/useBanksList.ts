import { useEffect, useState } from "react"

import Bank from "../models/bank"
import { BankType } from "../models/bank.constants"
import { IRootState } from "../features/rootReducer"
import { useSelector } from "react-redux"

interface UseBanksListInterface {
  banksList: Array<Bank>
}

export default function useBanksList(): UseBanksListInterface {
  const banks = useSelector(
    (state: IRootState) => state.init.main?.options.banks,
  )

  const [commercialBanks, setCommercialBanks] = useState<Array<Bank>>([])
  const [microFinanceBanks, setMicroFinanceBankss] = useState<Array<Bank>>([])
  const [mobileMoney, setMobileMoney] = useState<Array<Bank>>([])
  const [merchantBanks, setMerchantBanks] = useState<Array<Bank>>([])
  const [communityBanks, setCommunityBanks] = useState<Array<Bank>>([])
  const [paymentSolution, setPaymentSolution] = useState<Array<Bank>>([])
  const [discountHouse, setDiscountHouse] = useState<Array<Bank>>([])
  const [otherFinancialInstitution, setOtherFinancialInstitution] = useState<
    Array<Bank>
  >([])
  const [banksList, setBanksList] = useState<Array<Bank>>([])

  useEffect(() => {
    if (!banks) return
    setCommercialBanks(
      banks
        .filter((bank) => bank.type === BankType.COMMERCIAL_BANK)
        .sort((a, b) => a.name.localeCompare(b.name)) || [],
    )
    setMicroFinanceBankss(
      banks
        .filter((bank) => bank.type === BankType.MICRO_FINANCE_BANK)
        .sort((a, b) => a.name.localeCompare(b.name)) || [],
    )
    setMobileMoney(
      banks
        .filter((bank) => bank.type === BankType.MOBILE_MONEY)
        .sort((a, b) => a.name.localeCompare(b.name)) || [],
    )
    setMerchantBanks(
      banks
        .filter((bank) => bank.type === BankType.MERCHANT_BANK)
        .sort((a, b) => a.name.localeCompare(b.name)) || [],
    )
    setCommunityBanks(
      banks
        .filter((bank) => bank.type === BankType.COMMUNITY_BANK)
        .sort((a, b) => a.name.localeCompare(b.name)) || [],
    )
    setPaymentSolution(
      banks
        .filter((bank) => bank.type === BankType.PAYMENT_SOLUTION)
        .sort((a, b) => a.name.localeCompare(b.name)) || [],
    )
    setDiscountHouse(
      banks
        .filter((bank) => bank.type === BankType.DISCOUNT_HOUSE)
        .sort((a, b) => a.name.localeCompare(b.name)) || [],
    )
    setOtherFinancialInstitution(
      banks
        .filter((bank) => bank.type === BankType.OTHER_FINANCIAL_INSTITUTION)
        .sort((a, b) => a.name.localeCompare(b.name)) || [],
    )
  }, [banks])

  useEffect(() => {
    if (
      commercialBanks.length < 1 ||
      microFinanceBanks.length < 1 ||
      mobileMoney.length < 1 ||
      merchantBanks.length < 1 ||
      communityBanks.length < 1 ||
      paymentSolution.length < 1 ||
      discountHouse.length < 1 ||
      otherFinancialInstitution.length < 1
    )
      return
    setBanksList(
      [
        ...commercialBanks,
        ...microFinanceBanks,
        ...mobileMoney,
        ...merchantBanks,
        ...communityBanks,
        ...paymentSolution,
        ...discountHouse,
        ...otherFinancialInstitution,
      ] || [],
    )
  }, [
    commercialBanks,
    microFinanceBanks,
    mobileMoney,
    merchantBanks,
    communityBanks,
    paymentSolution,
    discountHouse,
    otherFinancialInstitution,
  ])

  return { banksList }
}
