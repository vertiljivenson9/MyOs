// workers/wallet/transactions.js

const transactions = [];

/**
 * Registra una transacción
 */
export function recordTransaction(tx) {
  transactions.push({
    id: crypto.randomUUID(),
    ...tx,
    createdAt: Date.now()
  });
}

/**
 * Lista transacciones por owner
 */
export function listTransactions(ownerId) {
  return transactions.filter(
    (t) => t.from === ownerId || t.to === ownerId
  );
}
