/** @param {NS} ns */
export async function main(ns) {
  let ram = 64;
  let i = 0;

  while (i < ns.getPurchasedServerLimit()) {
      if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
          var hostname = await ns.purchaseServer("SunNet-node-" + i, ram);
          ++i;
      }

      await ns.sleep(10);
  }
}