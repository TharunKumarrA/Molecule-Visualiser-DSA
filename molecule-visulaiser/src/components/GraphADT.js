export class atomNode {
  constructor(atomName, hybridisation, atomSymbol) {
    this.atomName = atomName;
    this.hybridisation = hybridisation;
    this.atomSymbol = atomSymbol;
    this.coordinates = [0, 0, 0];
    this.connections = [];
  }
}

// export class Molecule {
//   constructor() {
//     this.adjacencyList = {};
//     this.atomList = [];
//   }

//   getNeighbours(atom) {
//     return this.adjacencyList[atom.atomName];
//   }

//   addAtoms(atom) {
//     if (!this.adjacencyList[atom.atomName]) {
//       this.adjacencyList[atom.atomName] = [];
//       this.atomList.push(atom);
//     }
//   }

//   addBond(atom1, atom2, isDoubleBond = false) {
//     if (
//       this.adjacencyList[atom1.atomName] &&
//       this.adjacencyList[atom2.atomName]
//     ) {
//       let flag1 = 0;
//       for (let i = 0; i < this.adjacencyList[atom1.atomName].length; i++) {
//         if (this.adjacencyList[atom1.atomName][i] === atom2.atomName) {
//           flag1 = 1;
//           break;
//         }
//       }
//       if (!flag1) {
//         this.adjacencyList[atom1.atomName].push(atom2);
//         atom1.connections.push(atom2);
//         atom2.connections.push(atom1);
//         atom1.isDoubleBond = isDoubleBond; // Set isDoubleBond flag
//         atom2.isDoubleBond = isDoubleBond; // Set isDoubleBond flag
//       }
//     }
//   }
// }


export class Molecule {
  constructor() {
    this.adjacencyList = {};
    this.atomList = [];
  }

  getNeighbours(atom) {
    return this.adjacencyList[atom.atomName];
  }

  addAtoms(atom) {
    if (!this.adjacencyList[atom.atomName]) {
      this.adjacencyList[atom.atomName] = [];
      this.atomList.push(atom);
    } else {
    }
  }

  addBond(atom1, atom2) {
    if (
      this.adjacencyList[atom1.atomName] &&
      this.adjacencyList[atom2.atomName]
    ) {
      let flag1 = 0;
      // Corrected code using a traditional for loop
      for (let i = 0; i < this.adjacencyList[atom1.atomName].length; i++) {
        if (this.adjacencyList[atom1.atomName][i] === atom2.atomName) {
          flag1 = 1;
          break; 
        }
      }
      if (!flag1) {
        this.adjacencyList[atom1.atomName].push(atom2);
      }

      let flag2 = 0;
      for (let i = 0; i < this.adjacencyList[atom2.atomName].length; i++) {
        if (this.adjacencyList[atom2.atomName][i] === atom1.atomName) {
          flag2 = 1;
          break;
        }
      }
      if (!flag2) {
        this.adjacencyList[atom2.atomName].push(atom1);
      }
    } else {
    }
  }

  addBondDup(atom1, atom2, isDoubleBond = false) {
    if (
      this.adjacencyList[atom1.atomName] &&
      this.adjacencyList[atom2.atomName]
    ) {
      let flag1 = 0;
      // Corrected code using a traditional for loop
      for (let i = 0; i < this.adjacencyList[atom1.atomName].length; i++) {
        if (this.adjacencyList[atom1.atomName][i].atomName === atom2.atomName) {
          flag1 = 1;
          break;
        }
      }
      if (!flag1) {
        this.adjacencyList[atom1.atomName].push({ atomName: atom2.atomName, isDoubleBond });
      }
  
      let flag2 = 0;
      for (let i = 0; i < this.adjacencyList[atom2.atomName].length; i++) {
        if (this.adjacencyList[atom2.atomName][i].atomName === atom1.atomName) {
          flag2 = 1;
          break;
        }
      }
      if (!flag2) {
        this.adjacencyList[atom2.atomName].push({ atomName: atom1.atomName, isDoubleBond });
      }
    }
  }
  
}
