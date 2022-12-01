/**
 * @param {NS} ns
 */

export function main(ns, database, node, home) {
  let workerSettings = new Object();
  workerSettings.command = "weaken";
  workerSettings.targetNode = node;
  ns.write(database, JSON.stringify(workerSettings), "w");
  return true;
}
