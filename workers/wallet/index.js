// workers/wallet/index.js

import {
  initUserWallet,
  getUserBalance,
  creditUser,
  debitUser
} from "./user.wallet.js";

import {
  initDevWallet,
  getDevBalance,
  creditDev
} from "./dev.wallet.js";

import {
  recordTransaction,
  listTransactions
} from "./transactions.js";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const { action, data } = await request.json();

    try {
      switch (action) {
        case "wallet.user.init":
          initUserWallet(data.userId);
          return Response.json({ status: "ok" });

        case "wallet.user.balance":
          return Response.json({
            status: "ok",
            balance: getUserBalance(data.userId)
          });

        case "wallet.user.credit":
          creditUser(data.userId, data.amount);
          recordTransaction({
            type: "credit",
            to: data.userId,
            amount: data.amount
          });
          return Response.json({ status: "ok" });

        case "wallet.purchase": {
          // usuario compra app → dev recibe
          const { userId, devId, amount, appId } = data;

          debitUser(userId, amount);
          creditDev(devId, amount);

          recordTransaction({
            type: "purchase",
            from: userId,
            to: devId,
            amount,
            appId
          });

          return Response.json({ status: "ok" });
        }

        case "wallet.dev.balance":
          return Response.json({
            status: "ok",
            balance: getDevBalance(data.devId)
          });

        case "wallet.transactions":
          return Response.json({
            status: "ok",
            transactions: listTransactions(data.ownerId)
          });

        default:
          return Response.json(
            { status: "error", error: "UNKNOWN_ACTION" },
            { status: 400 }
          );
      }
    } catch (err) {
      return Response.json({
        status: "error",
        error: err.message
      });
    }
  }
};
