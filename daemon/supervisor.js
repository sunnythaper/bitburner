/**
 * @param {NS} ns
 **/

import * as daemonCheck from "/common/daemonCheck.js";

export async function main(ns) {
  while (true) {
    let settings = JSON.parse(ns.read("/db/settings.script"));

    if (
      daemonCheck.main(
        ns,
        settings.daemons.workerUpdate,
        settings.controller.home
      )
    ) {
      ns.exec(settings.daemons.workerUpdate, settings.controller.home, 1);
    }

    await ns.sleep(1000);
  }
}
