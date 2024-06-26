import {
  checkoutDialogOpenAtom,
  currentAmountAtom,
  currentPaymentTypeAtom,
  modeAtom,
  paymentAmountTypeAtom,
} from "@/store"
import {
  activeOrderIdAtom,
  orderTotalAmountAtom,
  unPaidAmountAtom,
} from "@/store/order.store"
import { paymentSheetAtom } from "@/store/ui.store"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

import { ALL_BANK_CARD_TYPES, HARD_PAYMENT_TYPES } from "@/lib/constants"
import { paidAmounts } from "@/lib/utils"

import useAddPayment from "./useAddPayment"

const useHandlePayment = () => {
  const mode = useAtomValue(modeAtom)
  const setCheckoutDialogOpen = useSetAtom(checkoutDialogOpenAtom)
  const [currentAmount, setCurrentAmount] = useAtom(currentAmountAtom)
  const notPaidAmount = useAtomValue(unPaidAmountAtom)
  const type = useAtomValue(currentPaymentTypeAtom)
  const setOpenSheet = useSetAtom(paymentSheetAtom)
  const _id = useAtomValue(activeOrderIdAtom)
  const paymentAmountType = useAtomValue(paymentAmountTypeAtom)
  const totalAmount = useAtomValue(orderTotalAmountAtom)

  const { addPayment, loading } = useAddPayment()

  const handleValueChange = (val: string) => {
    let value = val

    if (paymentAmountType === "percent") {
      value = ((Number(val) / 100) * totalAmount).toFixed(1)
    }

    const numericValue = parseFloat(
      value.replace(
        HARD_PAYMENT_TYPES.includes(type) ? /[^0-9.]/g : /[^0-9.-]/g,
        ""
      )
    )
    if (!isNaN(numericValue)) {
      setCurrentAmount(
        numericValue > notPaidAmount
          ? type === "cash"
            ? numericValue
            : notPaidAmount
          : numericValue
      )
    } else {
      setCurrentAmount(0)
    }
  }

  const handlePay = () => {
    if (type === "mobile" || ALL_BANK_CARD_TYPES.includes(type)) {
      if (mode === "mobile") {
        setCheckoutDialogOpen(false)
      }
      return setTimeout(() => setOpenSheet(true), 300)
    }
    if (type === "cash") {
      return addPayment({
        variables: {
          _id,
          cashAmount:
            currentAmount > notPaidAmount ? notPaidAmount : currentAmount,
        },
      })
    }

    if (type) {
      addPayment({
        variables: {
          _id,
          paidAmounts: paidAmounts(type, currentAmount),
        },
      })
    }
  }
  return {
    type,
    handleValueChange,
    handlePay,
    loading,
    currentAmount,
    notPaidAmount,
    setCurrentAmount,
  }
}

export default useHandlePayment
