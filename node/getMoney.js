/** @param {NS} ns */
export async function main(
  ns,
  hostname = arguments[0].args[0],
  moneyThresh = arguments[0].args[1],
  securityThresh = arguments[0].args[2]
) {
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
