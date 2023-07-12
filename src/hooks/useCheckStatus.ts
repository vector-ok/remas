import { useCallback, useEffect, useRef } from "react"

import { PROCESSING } from "../helpers/AppConstants"
import Transaction from "../models/transaction"
import { errorTrue } from "../features/error/slice/errorSlice"
import { getErrorMessage } from "../utils/getErrorMessage"
import { getTransactionDetails } from "../modules/Dashboard/Transactions/Components/Cards/TransactionDetailCard/Services/transactionDetailApi"
import { setSingleTransaction } from "../features/transaction/slice/transactionSlice"
import { useDispatch } from "react-redux"

export default function useCheckStatus(transaction: Transaction): void {
  const dispatch = useDispatch()
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>()
  useEffect(() => {
    if (!transaction || transaction.status !== PROCESSING)
      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current)
        }
      }

    pollingRef.current = setInterval(() => {
      void handleGetTransaction()
    }, 10000)
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
      }
    }
  }, [transaction])

  const handleGetTransaction = useCallback(async (): Promise<void> => {
    if (transaction) {
      try {
        const updatedTransaction = await getTransactionDetails(transaction.id)
        if (updatedTransaction.status !== PROCESSING) {
          dispatch(setSingleTransaction(updatedTransaction))
        }
      } catch (err) {
        dispatch(errorTrue({ message: getErrorMessage(err) }))
      }
    }
  }, [dispatch])
}
