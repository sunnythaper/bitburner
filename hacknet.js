/** @param {NS} ns */
export async function main(ns) {
  let ram = 16;
  let i = 0;

  while (i < getPurchasedServerLimit()) {
      // Check if we have enough money to purchase a server
      if (getServerMoneyAvailable("home") > getPurchasedServerCost(ram)) {
          // If we have enough money, then:
          //  1. Purchase the server
          //  2. Copy our hacking script onto the newly-purchased server
          //  3. Run our hacking script on the newly-purchased server with 3 threads
          //  4. Increment our iterator to indicate that we've bought a new server
          var hostname = purchaseServer("sunnet-" + i, ram);
          scp("early-hack-template.script", hostname);
          exec("early-hack-template.script", hostname, 3);
          ++i;
      }
  }
}