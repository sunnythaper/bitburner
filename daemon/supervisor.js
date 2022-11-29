/**
 * @param {NS} ns
 **/

import * as ramCheck from "/common/ramCheck.js";

export async function main(ns) {
  let nukeDaemon = "/daemon/nuke.js";
  let nodeHome = "home";

  while (true) {
    if (ramCheck.main(ns, nukeDaemon, nodeHome) && !ns.isRunning(nukeDaemon, nodeHome)) {
      ns.exec(nukeDaemon, nodeHome, 1);
    }

    await ns.sleep(1000);
  }
}
