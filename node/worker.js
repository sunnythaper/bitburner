/**
 * @param {NS} ns
 **/

export async function main(ns, workerSettingsPath) {
  while (true) {
    let workerSettings = JSON.parse(ns.read("/db/workerSettings.script"));

    if (workerSettings.command == "weaken") {
      await ns.weaken(workerSettings.targetNode);
    } else if (workerSettings.command == "grow") {
      await ns.grow(workerSettings.targetNode);
    } else if (workerSettings.command == "hack") {
      await ns.hack(workerSettings.targetNode);
    } else {
      await ns.sleep(1000);
    }
  }
}
