/**
 * @param {NS} ns
 **/

export async function main(ns) {
  while (true) {
    // DEFINE HACKING TARGETS
    let targets = getTargets(ns);

    for (let target of targets) {
      // HACK TARGET
      hackTarget(target, ns);

      // RUN SCRIPTS ON TARGET
      runScriptOnTarget(target, ns);
    }

    await ns.sleep(10);
  }
}

/**
 * getTargets
 */

export function getTargets(ns) {
  // SCAN INITIAL SET FROM HOME
  let targets = new Set(ns.scan());

  // FIND CHILDREN
  targets.forEach(function (value) {
    ns.scan(value).forEach(function (value) {
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
    let portCount = ns.getServerNumPortsRequired(target);

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

    // RELAYSMTP
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(target);
      portCount -= 1;
    }

    // HTTPWORM
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(target);
      portCount -= 1;
    }

    // SQLINJECT
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(target);
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
  // let mainScript = "getMoney.js"
  let mainScript = "/node/getMoney.js";
  let hackTarget = "phantasy";
  let moneyThresh = ns.getServerMaxMoney(hackTarget) * 0.75;
  let securityThresh = ns.getServerMinSecurityLevel(hackTarget) + 5;

  if (ns.hasRootAccess(target) == true) {
    // COPY SCRIPTS TO TARGET
    if (!ns.fileExists(mainScript, target)) {
      ns.scp(mainScript, target, "home");
    }

    // GET MAX THREADS FOR SCRIPT
    const threads = Math.floor(
      ns.getServerMaxRam(target) / ns.getScriptRam(mainScript, "home")
    );

    // RUN SCRIPTS ON TARGET
    if (threads > 0) {
      ns.exec(
        mainScript,
        target,
        threads,
        hackTarget,
        moneyThresh,
        securityThresh
      );
    }
  }
}
