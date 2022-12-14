/**
 * @param {NS} ns
 **/

export function main(ns, script, node) {
  if (
    ns.getScriptRam(script, node) <=
      ns.getServerMaxRam(node) - ns.getServerUsedRam(node) &&
    !ns.isRunning(script, node)
  ) {
    return true;
  } else {
    return false;
  }
}
