import {
  addCards,
  addRequestCard,
  updateCard,
  updateRequestCard,
} from "../../features/cards/slice/cardsSlice"
import {
  mainInitAddCard,
  mainInitUpdateCard,
  mainUpdateUserAccountCallback,
  mainUpdateUserAuthApp,
  mainUpdateUserMobileApp,
} from "../../features/init/slice/initSlice"

import { ActivationStatus } from "../../models/userAccount.constants"
import BulkPaymentV2StatusItem from "../../models/bulkPaymentV2StatusItem"
import Card from "../../models/card"
import CardRequest from "../../models/cardRequest"
import { GenericObject } from "../types"
import Parsers from "../../utils/parsers"
import { TransactionStatus } from "../../models/transaction.constants"
import UserAccount from "../../models/userAccount"
import UserApp from "../../models/userApp"
import { WebSocketEvent } from "./websocket.constants"
import Websocket from "../../utils/websocket"
import store from "../../features/store"
import { updateTransferDetailStatus } from "../../features/payments/bulkTransfer/slice/bulkTransferSlice"

function updateAccountBalance(payload: GenericObject) {
  const userAccountId = Parsers.string(payload.userAccountId)
  const balance = Parsers.number(payload.balance)
  const todayTransfersTotal = Parsers.number(payload.todayTransfersTotal)

  if (userAccountId) {
    store.dispatch(
      mainUpdateUserAccountCallback({
        id: userAccountId,
        callback: (userAccount: UserAccount) => {
          userAccount.balance = balance
          userAccount.todayTransfersTotal = todayTransfersTotal
        },
      }),
    )
  }
}
function updateAccountActivationStatus(
  payload: GenericObject,
  status: ActivationStatus,
) {
  const userAccountId = Parsers.string(payload.userAccountId)

  if (userAccountId) {
    store.dispatch(
      mainUpdateUserAccountCallback({
        id: userAccountId,
        callback: (userAccount: UserAccount) => {
          userAccount.activationStatus = status
        },
      }),
    )
  }
}
function authAppLinked(payload: GenericObject) {
  const authApp = Parsers.classObjectNonNullable(payload.authApp, UserApp)

  if (authApp) {
    store.dispatch(mainUpdateUserAuthApp(authApp))
  }
}
function authAppUnlinked() {
  store.dispatch(mainUpdateUserAuthApp(UserApp.createDefault()))
}

function mobileAppLinked(payload: GenericObject) {
  const mobileApp = Parsers.classObjectNonNullable(payload.mobileApp, UserApp)

  if (mobileApp) {
    store.dispatch(mainUpdateUserMobileApp(mobileApp))
  }
}

function mobileAppUnlinked() {
  store.dispatch(mainUpdateUserMobileApp(UserApp.createDefault()))
}

function newCard(payload: GenericObject) {
  const card = Parsers.classObjectNonNullable(payload.card, Card)

  if (card) {
    store.dispatch(mainInitAddCard(card))
    store.dispatch(addCards(card))
  }
}
function cardUpdated(payload: GenericObject) {
  const card = Parsers.classObjectNonNullable(payload.card, Card)

  if (card) {
    store.dispatch(updateCard(card))
    store.dispatch(mainInitUpdateCard(card))
  }
}

function newCreateCardRequest(payload: GenericObject) {
  const createCardRequest = Parsers.classObjectNonNullable(
    payload.createCardRequest,
    CardRequest,
  )

  if (createCardRequest) {
    store.dispatch(addRequestCard(createCardRequest))
  }
}

function createCardRequestUpdated(payload: GenericObject) {
  const createCardRequest = Parsers.classObjectNonNullable(
    payload.createCardRequest,
    CardRequest,
  )

  if (createCardRequest) {
    store.dispatch(updateRequestCard(createCardRequest))
  }
}

function bulkTransferUpdated(payload: GenericObject) {
  const payments = Parsers.classObjectArray(
    payload.payments,
    BulkPaymentV2StatusItem,
  )

  if (payments.length > 0) {
    for (const payment of payments) {
      store.dispatch(
        updateTransferDetailStatus({
          key: Number(payment.key),
          status: payment.status || TransactionStatus.PROCESSING,
          transactionId: payment.transactionId || "",
        }),
      )
    }
  }
}

function bulkTransferPaymentUpdated(payload: GenericObject) {
  const payment = Parsers.classObject(payload.payment, BulkPaymentV2StatusItem)

  if (payment) {
    store.dispatch(
      updateTransferDetailStatus({
        key: Number(payment.key),
        status: payment.status || TransactionStatus.PROCESSING,
        transactionId: payment.transactionId || "",
      }),
    )
  }
}
// function updateTransaction(payload: GenericObject) {
// const transaction = Parsers.classObjectNonNullable(payload.transaction, Transaction);

// if (transaction) {
// store.dispatch(updatedTransactionSuccess(transaction));
// }
// }

export function registerEventHandlers(websocket: Websocket): void {
  websocket.registerEventHandler(
    WebSocketEvent.ACCOUNT_BALANCE_UPDATED,
    updateAccountBalance,
  )
  websocket.registerEventHandler(WebSocketEvent.AUTH_APP_LINKED, authAppLinked)
  websocket.registerEventHandler(
    WebSocketEvent.AUTH_APP_UNLINKED,
    authAppUnlinked,
  )
  websocket.registerEventHandler(
    WebSocketEvent.MOBILE_APP_LINKED,
    mobileAppLinked,
  )
  websocket.registerEventHandler(
    WebSocketEvent.MOBILE_APP_UNLINKED,
    mobileAppUnlinked,
  )

  websocket.registerEventHandler(WebSocketEvent.NEW_CARD, newCard)
  websocket.registerEventHandler(WebSocketEvent.CARD_UPDATED, cardUpdated)
  websocket.registerEventHandler(
    WebSocketEvent.NEW_CREATE_CARD_REQUEST,
    newCreateCardRequest,
  )
  websocket.registerEventHandler(
    WebSocketEvent.CREATE_CARD_REQUEST_UPDATED,
    createCardRequestUpdated,
  )

  websocket.registerEventHandler(
    WebSocketEvent.BULK_TRANSFER_UPDATED,
    bulkTransferUpdated,
  )
  websocket.registerEventHandler(
    WebSocketEvent.BULK_TRANSFER_PAYMENT_UPDATED,
    bulkTransferPaymentUpdated,
  )

  websocket.registerEventHandler(
    WebSocketEvent.ENROLMENT_ONGOING,
    (payload: GenericObject) => {
      updateAccountActivationStatus(payload, ActivationStatus.ONGOING)
    },
  )
  websocket.registerEventHandler(
    WebSocketEvent.ENROLMENT_COMPLETED,
    (payload: GenericObject) => {
      updateAccountActivationStatus(payload, ActivationStatus.ACTIVATED)
    },
  )
  /*
	websocket.registerEventHandler(WebSocketEvent.TRANSACTION_UPDATED, transactionUpdated);
	websocket.registerEventHandler(WebSocketEvent.NEW_PENDING_TRANSACTION, transactionUpdated);
	websocket.registerEventHandler(WebSocketEvent.SUCCESSFUL_TRANSACTION, successfulTransaction);

	websocket.registerEventHandler(WebSocketEvent.SUB_ACCOUNT_CREATED, handleSubAccountEvent);







	*/
}
