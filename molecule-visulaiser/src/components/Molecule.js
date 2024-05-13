import { Molecule, atomNode } from "./GraphADT.js";

export function buildMolecule() {
  const atom1 = new atomNode("C1", "sp3", "C");
  const atom2 = new atomNode("H1", "sp", "H");
  const atom3 = new atomNode("H2", "sp", "H");
  const atom4 = new atomNode("H3", "sp", "H");
  const atom6 = new atomNode("C2", "sp3", "C");
  const atom7 = new atomNode("H4", "sp", "H");
  const atom8 = new atomNode("H5", "sp", "H");
  const atom9 = new atomNode("H6", "sp", "H");

  const molecule = new Molecule();

  molecule.addAtoms(atom1);
  molecule.addAtoms(atom2);
  molecule.addAtoms(atom3);
  molecule.addAtoms(atom4);
  molecule.addAtoms(atom6);
  molecule.addAtoms(atom7);
  molecule.addAtoms(atom8);
  molecule.addAtoms(atom9);

  molecule.addBond(atom1, atom2);
  molecule.addBond(atom1, atom3);
  molecule.addBond(atom1, atom4);
  molecule.addBond(atom1, atom6);
  molecule.addBond(atom6, atom7);
  molecule.addBond(atom6, atom8);
  molecule.addBond(atom6, atom9);

  return molecule;
}

export function findCentralAtoms(molecule) {
  let centralAtoms = [];
  let maxHybridisation = "";

  // Find the maximum hybridisation
  for (let atom of molecule.atomList) {
    if (atom.hybridisation > maxHybridisation) {
      maxHybridisation = atom.hybridisation;
    }
  }

  // Find atoms with maximum hybridisation
  for (let atom of molecule.atomList) {
    if (atom.hybridisation === maxHybridisation) {
      centralAtoms.push(atom);
    }
  }
  return centralAtoms;
}

// Calculate Coordiantes of the atoms in 3D Plane.
export function getCoordinates(molecule) {
  // Constant Angles defined for respective hybridisations.
  const angles = {
    sp: { angleX: Math.PI, angleY: 0, angleZ: 0 },
    sp2: { angleX: -Math.PI / 6, angleY: (2 * Math.PI) / 3, angleZ: 0 },
    sp3: { angleX: 0.615*Math.PI, angleY: 0.955*Math.PI, angleZ: 0.615*Math.PI },
  };

  // Get Central Atoms of the Molecule.
  const centralAtoms = findCentralAtoms(molecule);
  let visited = [];
  let centralVisited = [];
  for (let atom of centralAtoms) {
    centralVisited[atom] = false;
  }
  let queue = [];
  let initialAtom = centralAtoms[0];
  queue.push([initialAtom, null]);
  visited.push(initialAtom);
  let directionVectorStack = [];

  while (queue.length) {
    let [currentAtom, parentAtom] = queue.shift();
    let neighbours = molecule.getNeighbours(currentAtom);

    if (parentAtom === null) {
      // Set coordinates for the first atom
      currentAtom.coordinates = [0, 0, 0];
      directionVectorStack.push([1, 0, 0]);
    } else {
      let initalDirection = directionVectorStack.pop();
      console.log("Initial Direction: ", initalDirection);
      let parentCoordinates = parentAtom.coordinates;
      let angleX, angleY, angleZ;
      let bondlength = 1;
      let newDirection = [];

      angleX = angles[parentAtom.hybridisation].angleX;
      angleY = angles[parentAtom.hybridisation].angleY;
      angleZ = angles[parentAtom.hybridisation].angleZ;

      if (parentAtom.hybridisation === "sp") {
        newDirection = [
          -initalDirection[0],
          initalDirection[1],
          initalDirection[2],
        ];
      } else  {
        newDirection = [
          initalDirection[0] * (Math.cos(angleY) * Math.cos(angleZ)) +
            initalDirection[1] * (Math.cos(angleY) * Math.sin(angleZ)) -
            initalDirection[2] * Math.sin(angleY),
          initalDirection[0] *
            (-Math.cos(angleX) * Math.sin(angleZ) +
              Math.sin(angleX) * Math.sin(angleY) * Math.cos(angleZ)) +
            initalDirection[1] *
              (Math.cos(angleX) * Math.cos(angleZ) +
                Math.sin(angleX) * Math.sin(angleY) * Math.sin(angleZ)) +
            initalDirection[2] * (Math.sin(angleX) * Math.cos(angleY)),
          initalDirection[0] *
            (Math.sin(angleX) * Math.sin(angleZ) +
              Math.cos(angleX) * Math.sin(angleY) * Math.cos(angleZ)) +
            initalDirection[1] *
              (-Math.sin(angleX) * Math.cos(angleZ) +
                Math.cos(angleX) * Math.sin(angleY) * Math.sin(angleZ)) +
            initalDirection[2] * (Math.cos(angleX) * Math.cos(angleY)),
        ];
      }

      let newCoordinates = [
        parentCoordinates[0] + bondlength * newDirection[0],
        parentCoordinates[1] + bondlength * newDirection[1],
        parentCoordinates[2] + bondlength * newDirection[2],
      ];

      currentAtom.coordinates = newCoordinates;
      directionVectorStack.push(newDirection);
      console.log("New Direction: ", newDirection);
    }

    // Pushes all neighbours of the currentatom to the queue.
    for (let neighbour of neighbours) {
      if (!visited.includes(neighbour)) {
        queue.push([neighbour, currentAtom]);
        visited.push(neighbour);
      }
    }

    // // Alkene Part - Yet has some logic to be implemented
    // console.log(
    //   "Check: ",
    //   currentAtom,
    //   checkCentralVisited(centralVisited, centralAtoms),
    //   checkVisited(visited, molecule)
    // );
    // if (!centralAtoms.includes(currentAtom) && currentAtom.atomSymbol !== "H") {
    //   if (
    //     checkCentralVisited(centralVisited, centralAtoms) &&
    //     checkVisited(visited, molecule)
    //   ) {
    //     let secondMaxHybrid = "";
    //     for (let atom of molecule.atomList) {
    //       if (
    //         atom.hybridisation > secondMaxHybrid &&
    //         atom.hybridisation < centralAtoms[0].hybridisation
    //       ) {
    //         secondMaxHybrid = atom.hybridisation;
    //       }
    //     }
    //     console.log("New MAX Hybridisation: ", secondMaxHybrid);
    //     for (let atom of molecule.atomList) {
    //       if (atom.hybridisation === secondMaxHybrid) {
    //         centralAtoms.push(atom);
    //       }
    //     }
    //   }
    // }

    // Updating the stack to be empty if current atom is a central atom
    if (centralAtoms.includes(currentAtom)) {
      centralVisited[currentAtom] = true;
    }

    // Setting the connections property for the current atom
    currentAtom.connections = neighbours;
  }
  console.log("New Central Atoms: ", centralAtoms);
}

// Returns true if central atoms list doesnt have any atom yet to be visited.
function checkCentralVisited(centralVisited, centralAtoms) {
  for (let atom of centralAtoms) {
    if (!centralVisited.includes(atom)) return true;
  }
  return false;
}

// Returns true if any of the atom is still yet to be visited.
function checkVisited(visited, molecule) {
  for (let atom of molecule.atomList) {
    if (!visited.includes(atom)) return true;
  }
  return false;
}

export function drawMolecule(molecule) {}
