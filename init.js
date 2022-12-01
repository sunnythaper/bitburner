/**
 * @param {NS} ns
 **/

import * as controllerInit from "/common/controllerInit.js";
import * as nodeReset from "/common/nodeReset.js";
import * as nodeScan from "/common/nodeScan.js";

export function main(ns) {
  let settings = JSON.parse(ns.read("/db/settings.script"));
  let nodes = nodeScan.main(ns);

  if (nodeReset.main(ns, nodes, settings.controller.home)) {
    if (
      controllerInit.main(
        ns,
        settings.worker.database,
        settings.worker.defaultTarget,
        settings.controller.home
      )
    ) {
      ns.write(settings.controller.database, JSON.stringify(nodes), "w");
      ns.exec(settings.daemons.supervisor, settings.controller.home, 1);
      ns.tprint("SUCCESS: Launched Supervisor daemon");
    }
  } else {
    ns.tprint("ERROR: Failed to launch Supervisor daemon.");
  }
}
