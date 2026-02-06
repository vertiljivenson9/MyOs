// workers/wallet/dev.wallet.js

const devs = new Map();

/**
 * Inicializa wallet del desarrollador
 */
export function initDevWallet(devId) {
  if (!devId) throw new Error("INVALID_DEVELOPER");
  if (!devs.has(devId)) {
    devs.set(devId, {
      balance: 0,
      createdAt: Date.now()
    });
  }
}

/**
 * Obtiene balance del dev
 */
export function getDevBalance(devId) {
  const wallet = devs.get(devId);
  if (!wallet) throw new Error("DEV_WALLET_NOT_FOUND");
  return wallet.balance;
}

/**
 * Acredita ingreso por venta
 */
export function creditDev(devId, amount) {
  if (amount <= 0) throw new Error("INVALID_AMOUNT");
  initDevWallet(devId);
  devs.get(devId).balance += amount;
}
