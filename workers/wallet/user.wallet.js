// workers/wallet/user.wallet.js

const users = new Map();

/**
 * Inicializa wallet de usuario
 */
export function initUserWallet(userId) {
  if (!userId) throw new Error("INVALID_USER");
  if (!users.has(userId)) {
    users.set(userId, {
      balance: 0,
      createdAt: Date.now()
    });
  }
}

/**
 * Obtiene balance
 */
export function getUserBalance(userId) {
  const wallet = users.get(userId);
  if (!wallet) throw new Error("USER_WALLET_NOT_FOUND");
  return wallet.balance;
}

/**
 * Recarga dinero real (mock controlado)
 */
export function creditUser(userId, amount) {
  if (amount <= 0) throw new Error("INVALID_AMOUNT");
  initUserWallet(userId);
  users.get(userId).balance += amount;
}

/**
 * Debita dinero
 */
export function debitUser(userId, amount) {
  const wallet = users.get(userId);
  if (!wallet) throw new Error("USER_WALLET_NOT_FOUND");
  if (wallet.balance < amount) {
    throw new Error("INSUFFICIENT_FUNDS");
  }
  wallet.balance -= amount;
}
