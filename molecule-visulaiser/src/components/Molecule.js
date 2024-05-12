  import {Molecule, atomNode} from './GraphADT.js'

  export function buildMolecule(){
    const atom1 = new atomNode("C1", "sp3", "C");
    const atom2 = new atomNode("H1", "sp", "H");
    const atom3 = new atomNode("H2", "sp", "H");
    const atom4 = new atomNode("H3", "sp", "H");
    const atom5 = new atomNode("C2", "sp2", "C");
    const atom6 = new atomNode("H4", "sp", "H");
    const atom7 = new atomNode("N1", "sp2", "N");
    const atom8 = new atomNode("O1", "sp2", "O");
    const atom9 = new atomNode("O2", "sp2", "O");

    const molecule = new Molecule();
    molecule.addAtoms(atom1);
    molecule.addAtoms(atom2);
    molecule.addAtoms(atom3);
    molecule.addAtoms(atom4);
    molecule.addAtoms(atom5);
    molecule.addAtoms(atom6);
    molecule.addAtoms(atom7);
    molecule.addAtoms(atom8);
    molecule.addAtoms(atom9);


    molecule.addBond(atom1, atom2);
    molecule.addBond(atom1, atom3);
    molecule.addBond(atom1, atom4);
    molecule.addBond(atom1, atom5);
    molecule.addBond(atom5, atom6);
    molecule.addBond(atom5, atom7);
    molecule.addBond(atom7, atom8);
    molecule.addBond(atom7, atom9);

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

  // Calculate Coordiantes of the atoms in 3D Plane.
  export function getCoordinates(molecule) {
  
  // Constant Angles defined for respective hybridisations.
  const angles = {
    "sp": Math.PI,
    "sp2": (2 * Math.PI) / 3,
    "sp3": (73 * Math.PI) / 120, // We'll handle sp3 separately
  };

  // Get Central Atoms of the Molecule.
  const centralAtoms = findCentralAtoms(molecule);
  let visited = [];
  let centralVisited = [];
  for(let atom of centralAtoms){
    centralVisited[atom] = false;
  }
  let queue = [];
  let initialAtom = centralAtoms[0];
  queue.push([initialAtom, null]);
  visited.push(initialAtom);
  let assignedCoordinates = [];

  while (queue.length) {
    let [currentAtom, parentAtom] = queue.shift();
    let neighbours = molecule.getNeighbours(currentAtom);


    if (parentAtom === null) {
      // Set coordinates for the first atom
      currentAtom.coordinates = [0, 0, 0];
    } else {
      // If last atom pushed stack is empty, the new atom will be shifted by bondlength to the x axis.
      if(assignedCoordinates.length === 0){
        let x = parentAtom.coordinates[0] + 1;
        let y = parentAtom.coordinates[1];
        let z = parentAtom.coordinates[2];
        currentAtom.coordinates = [x, y, z];
        assignedCoordinates.push([x, y, z]);
      }
      // Coordinates will be calculated using bondlength and last coordinates pushed to the stack
      else{
        let bondLength = 1;
        let lastCoord = assignedCoordinates[assignedCoordinates.length - 1];
        let angle = angles[parentAtom.hybridisation];
        let newX = lastCoord[0] + bondLength * Math.cos(angle);
        let newY = lastCoord[1] + bondLength * Math.sin(angle);
        let newZ = lastCoord[2] + bondLength * Math.cos(angle) * Math.sin(angle);
        currentAtom.coordinates = [newX, newY, newZ];
        assignedCoordinates.push([newX, newY, newZ]);
      }
    }

    // Pushes all neighbours of the currentatom to the queue.
    for (let neighbour of neighbours) {
      if (!visited.includes(neighbour)) {
        queue.push([neighbour, currentAtom]);
        visited.push(neighbour);
      }
    }

    // Alkene Part - Yet has some logic to be implemented
    if(!centralAtoms.includes(currentAtom) && currentAtom.atomSymbol !== "H"){
      if(checkCentralVisited(centralVisited, centralAtoms) && checkVisited(visited, molecule)){
        let secondMaxHybrid = '';
        for (let atom of molecule.atomList){
          if (atom.hybridisation > secondMaxHybrid && atom.hybridisation < centralAtoms[0].hybridisation){
            secondMaxHybrid = atom.hybridisation;
          }
        }
        for (let atom of molecule.atomList){
          if (atom.hybridisation === secondMaxHybrid && !visited[atom]){
            centralAtoms.push(atom);
          }
        }
      }
    }

    // Updating the stack to be empty if current atom is a central atom
    if (centralAtoms.includes(currentAtom)) {
      centralVisited[currentAtom] = true;
      assignedCoordinates = [];
    }
  }
  console.log("New Central Atoms: ", centralAtoms);
}

  // Returns true if central atoms list doesnt have any atom yet to be visited.
  function checkCentralVisited(centralVisited, centralAtoms){
    for(let atom of centralAtoms){
      if(!centralVisited[atom]) return false;
    }
    return true;
  }

  // Returns true if any of the atom is still yet to be visited.
  function checkVisited(visited, molecule){
    for(let atom of molecule.atomList){
      if(!visited[atom]) return true;
    }
    return false;
  }

  export function drawMolecule(molecule){
    console.log(molecule);
  }