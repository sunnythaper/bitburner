/**
 * @param {NS} ns
 **/

import * as nodeInit from "/common/nodeInit.js";
import * as nodeNuke from "/common/nodeNuke.js";

export async function main(ns) {
  while (true) {
    let settings = JSON.parse(ns.read("/db/settings.script"));
    let nodes = JSON.parse(ns.read(settings.controller.database));

    for (let node of nodes) {
      if (nodeNuke.main(ns, node) && node != settings.controller.home) {
        nodeInit.main(
          ns,
          node,
          settings.worker.daemon,
          settings.worker.database,
          settings.controller.home
        );
      }
    }

    await ns.sleep(1000);
  }
}
