/**
* @param {NS} ns
**/

export async function main(ns) {
  // DEFINE HACKING TARGETS
  let targets = getTargets(ns);

  for (let target of targets) {
      // HACK TARGET
      hackTarget(target, ns);

      // RUN SCRIPTS ON TARGET
      runScriptOnTarget(target, ns);
  }
}

/**
* getTargets
*/

export function getTargets(ns) {
  // SCAN INITIAL SET FROM HOME
  let targets = new Set(ns.scan());

  // FIND CHILDREN
  targets.forEach(function(value) {
      ns.scan(value).forEach(function(value) {
          targets.add(value);
      });
  });

  // RETURN VALUES
  return targets.values();
}

/**
* hackTarget
*/

export function hackTarget(target, ns) {
  // CHECK IF WE HAVE ROOT ACCESS
  if (ns.hasRootAccess(target) == false) {
      // GET NUMBER OF PORTS REQUIRED
      let portCount = ns.getServerNumPortsRequired;

      // BRUTESSH
      if (ns.fileExists("BruteSSH.exe", "home")) {
          ns.brutessh(target);
          portCount -= 1;
      }

      // FTPCRACK
      if (ns.fileExists("FTPCrack.exe", "home")) {
          ns.ftpcrack(target);
          portCount -= 1;
      }

      // NUKE TARGET
      if (portCount == 0) {
          ns.nuke(target);
      }
  }
}

/**
* runScriptOnTarget
*/

export function runScriptOnTarget(target, ns) {
  // DEFINE SCRIPTS TO RUN ON TARGETS
  let mainScript = 'getMoney.js';

  if (ns.hasRootAccess(target) == true) {
      // COPY SCRIPTS TO TARGET
      if (ns.fileExists(mainScript, target)) {
          if (ns.getScriptRam(mainScript, "home") != ns.getScriptRam(mainScript, target)) {
              ns.killall(target);
              ns.rm(mainScript, target);
              ns.scp(mainScript, target, "home");
          }
      } else {
          ns.scp(mainScript, target, "home");
      }

      // GET MAX THREADS FOR SCRIPT
      const threads = Math.floor(ns.getServerMaxRam(target)/ns.getScriptRam(mainScript, "home"));

      // RUN SCRIPTS ON TARGET
      ns.exec(mainScript, target, threads);
  }
}