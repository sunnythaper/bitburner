/**
 * @param {NS} ns
 **/

export function main(ns, nodes, home) {
  for (let node of nodes) {
    if (node != home) {
      let files = ns.ls(node);

      ns.killall(node);

      for (let file of files) {
        ns.rm(file, node);
      }
    }
  }

  return true;
}
