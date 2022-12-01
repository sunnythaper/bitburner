/**
 * @param {NS} ns
 **/

export function main(ns, node, moneyThreshold, securityThreshold) {
  if (ns.getServerSecurityLevel(node) > (ns.getServerMinSecurityLevel(node) + securityThreshold)) {
    return "weaken";
  } else if (ns.getServerMoneyAvailable(node) < (ns.getServerMaxMoney(node) * moneyThreshold)) {
    return "grow";
  } else {
    return "hack"
  }
}
