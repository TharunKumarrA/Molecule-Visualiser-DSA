  import {Molecule, atomNode} from './GraphADT.js'

  export function buildMolecule(){
    const atom1 = new atomNode("C1", "sp3", "C");
    const atom2 = new atomNode("H1", "sp", "H");
    const atom3 = new atomNode("H2", "sp", "H");
    const atom4 = new atomNode("H3", "sp", "H");
    const atom5 = new atomNode("C2", "sp3", "C");
    const atom6 = new atomNode("H4", "sp", "H");
    const atom7 = new atomNode("H5", "sp", "H");
    const atom8 = new atomNode("H6", "sp", "H");

    const molecule = new Molecule();
    molecule.addAtoms(atom1);
    molecule.addAtoms(atom2);
    molecule.addAtoms(atom3);
    molecule.addAtoms(atom4);
    molecule.addAtoms(atom5);
    molecule.addAtoms(atom6);
    molecule.addAtoms(atom7);
    molecule.addAtoms(atom8);


    molecule.addBond(atom1, atom2);
    molecule.addBond(atom1, atom3);
    molecule.addBond(atom1, atom4);
    molecule.addBond(atom1, atom5);
    molecule.addBond(atom5, atom6);
    molecule.addBond(atom5, atom7);
    molecule.addBond(atom5, atom8);

    return molecule;
  }

  export function findCentralAtoms(molecule){

    let centralAtoms = [];
    let maxHybridisation = '';

    // Find the maximum hybridisation
    for (let atom of molecule.atomList){
      if (atom.hybridisation > maxHybridisation){
        maxHybridisation = atom.hybridisation;
      }
    }

    // Find atoms with maximum hybridisation
    for (let atom of molecule.atomList){
      if (atom.hybridisation === maxHybridisation){
        centralAtoms.push(atom);
      }
    }
    return centralAtoms;
  }

  export function getCoordinates(molecule) {
  const angles = {
    "sp": Math.PI,
    "sp2": (2 * Math.PI) / 3,
    "sp3": null, // We'll handle sp3 separately
  };
  const centralAtoms = findCentralAtoms(molecule);
  let visited = [];
  let queue = [];
  let initialAtom = centralAtoms[0];
  queue.push([initialAtom, null]);
  visited.push(initialAtom);
  let assignedCoordinates = [];

  while (queue.length) {
    let [currentAtom, parentAtom] = queue.shift();
    let neighbours = molecule.getNeighbours(currentAtom);

    if (currentAtom in centralAtoms) {
      assignedCoordinates = [];
    }

    if (parentAtom === null) {
      currentAtom.coordinates = [0, 0, 0];
    } else {
      if (parentAtom.hybridisation === "sp3") {
        // Special case for sp3 hybridization
        let bondLength = 1;
        let numNeighbours = assignedCoordinates.length;
        let phi = Math.acos(-1 / 3);
        let theta = (Math.PI * (numNeighbours + 1)) / (numNeighbours + (5 / 4));
        let x = bondLength * Math.sin(theta) * Math.cos(phi);
        let y = bondLength * Math.sin(theta) * Math.sin(phi);
        let z = bondLength * Math.cos(theta);
        currentAtom.coordinates = [x, y, z];
        assignedCoordinates.push([x, y, z]);
      } else {
        if (assignedCoordinates.length === 0) {
          let x = parentAtom.coordinates[0] + 1;
          let y = parentAtom.coordinates[1];
          let z = parentAtom.coordinates[2];
          currentAtom.coordinates = [x, y, z];
          assignedCoordinates.push([x, y, z]);
        } else {
          let bondLength = 1;
          let lastCoord = assignedCoordinates[assignedCoordinates.length - 1];
          let angle = angles[parentAtom.hybridisation] / (assignedCoordinates.length - 1);
          let newX = lastCoord[0] + bondLength * Math.cos(angle);
          let newY = lastCoord[1] + bondLength * Math.sin(angle);
          let newZ = lastCoord[2];
          currentAtom.coordinates = [newX, newY, newZ];
          assignedCoordinates.push([newX, newY, newZ]);
        }
      }
    }

    for (let neighbour of neighbours) {
      if (!visited.includes(neighbour)) {
        queue.push([neighbour, currentAtom]);
        visited.push(neighbour);
      }
    }
  }
}

  export function drawMolecule(molecule){
    console.log(molecule);
  }