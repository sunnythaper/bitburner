/**
 * @param {NS} ns
 **/

export function main(ns, node) {
  // CHECK IF WE HAVE ROOT ACCESS
  if (ns.hasRootAccess(node) == false) {
    // GET NUMBER OF PORTS REQUIRED
    let portsRequiredCount = ns.getServerNumPortsRequired(node);

    // BRUTESSH
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.brutessh(node);
      portsRequiredCount -= 1;
    }

    // FTPCRACK
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(node);
      portsRequiredCount -= 1;
    }

    // RELAYSMTP
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(node);
      portsRequiredCount -= 1;
    }

    // HTTPWORM
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(node);
      portsRequiredCount -= 1;
    }

    // SQLINJECT
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(node);
      portsRequiredCount -= 1;
    }

    // NUKE TARGET
    if (portsRequiredCount == 0) {
      ns.nuke(node);
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
