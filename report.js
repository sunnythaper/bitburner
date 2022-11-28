/** @param {NS} ns */
import { getTargets } from "early-hack.js";

export async function main(ns) {
  let targets = getTargets(ns);

  for (let target of targets) {
    printInfo(target, ns);
  }
}

export function printInfo(target, ns) {
  let targetInfo = spaceInfo(target);
  let hackingCandidate = spaceInfo("", "right", "short");
  let maxMoneyInfo = spaceInfo(
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(ns.getServerMaxMoney(target)),
    "right"
  );
  let hackingLevelInfo = spaceInfo(
    ns.getServerRequiredHackingLevel(target),
    "right",
    "short"
  );
  let serverSecurityLevelInfo = spaceInfo(
    Math.floor(ns.getServerSecurityLevel(target)),
    "right",
    "short"
  );

  if (
    ns.getServerRequiredHackingLevel(target) <= ns.getHackingLevel() / 3 + 10 &&
    ns.getServerRequiredHackingLevel(target) >= ns.getHackingLevel() / 3 - 10
  ) {
    hackingCandidate = spaceInfo("RIPE", "right", "short");

    ns.tprint(
      "| " +
        targetInfo +
        hackingCandidate +
        maxMoneyInfo +
        hackingLevelInfo +
        serverSecurityLevelInfo
    );
  }
}

export function spaceInfo(value, position = "left", columnSize = "long") {
  let width = 21;

  if (columnSize == "short") {
    width = 4;
  }

  let repeatSpace = width - String(value).length;

  if (position == "left") {
    return value + " ".repeat(repeatSpace) + " | ";
  } else if (position == "right") {
    return " ".repeat(repeatSpace) + value + " | ";
  }
}
