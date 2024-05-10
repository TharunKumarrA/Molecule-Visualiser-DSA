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

export function drawMolecule(molecule){
  console.log(molecule);
}