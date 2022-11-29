/**
 * @param {NS} ns
 **/

export function main(ns) {
  // SCAN INITIAL SET FROM HOME
  let nodes = new Set(ns.scan());

  // FIND CHILDREN OF INITIAL SET
  nodes.forEach(function (value) {
    ns.scan(value).forEach(function (value) {
      nodes.add(value);
    });
  });

  // RETURN ALPHABETICALLY SORTED VALUES
  return Array.from(nodes.values()).sort();
}
