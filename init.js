/**
 * @param {NS} ns
 **/

import * as nodeScan from "/common/nodeScan.js";

export function main(ns) {
  let nodesDatabase = "/db/nodes.txt";
  let supervisorDaemon = "/daemon/supervisor.js";
  let nodeHome = "home";
  let nodes = nodeScan.main(ns);

  ns.write(nodesDatabase, JSON.stringify(nodes), "w");
  ns.exec(supervisorDaemon, nodeHome, 1);
}
