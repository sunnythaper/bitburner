/**
 * @param {NS} ns
 **/

export function main(ns, node, script, database, home) {
  if (!ns.fileExists(script, node)) {
    ns.scp(script, node, home);
  }

  ns.rm(database, node);
  ns.scp(database, node, home);

  if (!ns.isRunning(script, node)) {
    let threads = Math.floor(
      (ns.getServerMaxRam(node) - ns.getServerUsedRam(node)) /
        ns.getScriptRam(script, home)
    );

    if (threads > 0) {
      ns.exec(script, node, threads, database);
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
