/** @param {NS} ns */
export async function main(ns) {
  // DEFINE HOST VARIABLES
  let hostname = ns.getHostname();
  let moneyThresh = ns.getServerMaxMoney(hostname) * 0.75;
  let securityThresh = ns.getServerMinSecurityLevel(hostname) + 5;

  // BEGIN MAKING MONEY
  while (true) {
      if (ns.getServerSecurityLevel(hostname) > securityThresh) {
          await ns.weaken(hostname);
      } else if (ns.getServerMoneyAvailable(hostname) < moneyThresh) {
          await ns.grow(hostname);
      } else {
          await ns.hack(hostname);
      }
  }
}