export class atomNode {
  constructor(atomName, hybridisation, atomSymbol) {
    this.atomName = atomName;
    this.hybridisation = hybridisation;
    this.atomSymbol = atomSymbol;
    this.coordinates = [0, 0, 0];
    this.connections = [];
    this.bondAngles = new Map(); // Store bond angles for each connected atom
  }
}

export class Molecule {
  constructor() {
    this.adjacencyList = {};
    this.atomList = [];
    this.bondAngles = new Map(); // Store all bond angles in the molecule
  }

  calculateBondAngle(atom1, atom2, atom3) {
    if (!atom1.coordinates || !atom2.coordinates || !atom3.coordinates) {
      return null;
    }

    // Calculate vectors
    const vector1 = [
      atom1.coordinates[0] - atom2.coordinates[0],
      atom1.coordinates[1] - atom2.coordinates[1],
      atom1.coordinates[2] - atom2.coordinates[2]
    ];

    const vector2 = [
      atom3.coordinates[0] - atom2.coordinates[0],
      atom3.coordinates[1] - atom2.coordinates[1],
      atom3.coordinates[2] - atom2.coordinates[2]
    ];

    const mag1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));

    //  dot product
    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);

    // Calculate angle in radians and convert
    const angle = Math.acos(dotProduct / (mag1 * mag2)) * (180 / Math.PI);
    
    return angle;
  }

  //Store bond angle
  storeBondAngle(centralAtom, atom1, atom2) {
    const angle = this.calculateBondAngle(atom1, centralAtom, atom2);
    if (angle !== null) {
      //created keys 
      const angleKey = `${atom1.atomName}-${centralAtom.atomName}-${atom2.atomName}`;
      this.bondAngles.set(angleKey, angle);
      
      // Store in the central atom's 
      centralAtom.bondAngles.set(angleKey, angle);
    }
  }

  // Get bond angle between specific atoms
  getBondAngle(centralAtom, atom1, atom2) {
    const angleKey = `${atom1.atomName}-${centralAtom.atomName}-${atom2.atomName}`;
    return this.bondAngles.get(angleKey);
  }

  // Get all bond angles for a specific atom
  getAtomBondAngles(centralAtom) {
    const angles = {};
    if (!centralAtom.bondAngles) return angles;

    for (const [key, angle] of centralAtom.bondAngles) {
      angles[key] = angle;
    }
    return angles;
  }

//stroitng
  storeExpectedAngles(atom) {
    const hybridAngles = {
      'sp': 180,
      'sp2': 120,
      'sp3': 109.5,
      'sp3d2': 90 // Octahedral geometry
    };

    if (hybridAngles[atom.hybridisation]) {
      atom.expectedAngle = hybridAngles[atom.hybridisation];
    }
  }

  // Existing methods...
  getNeighbours(atom) {
    if (atom && this.adjacencyList[atom.atomName]) {
      return this.adjacencyList[atom.atomName].map(({ atomName }) =>
        this.atomList.find((a) => a.atomName === atomName)
      );
    }
    return [];
  }

  addAtoms(atom) {
    if (!this.adjacencyList[atom.atomName]) {
      this.adjacencyList[atom.atomName] = [];
      this.atomList.push(atom);
      this.storeExpectedAngles(atom); // Store expected angles when adding atom
    }
  }

  addBond(atom1, atom2, isSingleBond = false, isDoubleBond = false, isTripleBond = false) {
    if (this.adjacencyList[atom1.atomName] && this.adjacencyList[atom2.atomName]) {
      let flag1 = 0;
      for (let i = 0; i < this.adjacencyList[atom1.atomName].length; i++) {
        if (this.adjacencyList[atom1.atomName][i].atomName === atom2.atomName) {
          flag1 = 1;
          break;
        }
      }
      if (!flag1) {
        this.adjacencyList[atom1.atomName].push({
          atomName: atom2.atomName,
          isSingleBond,
          isDoubleBond,
          isTripleBond
        });
      }

      let flag2 = 0;
      for (let i = 0; i < this.adjacencyList[atom2.atomName].length; i++) {
        if (this.adjacencyList[atom2.atomName][i].atomName === atom1.atomName) {
          flag2 = 1;
          break;
        }
      }
      if (!flag2) {
        this.adjacencyList[atom2.atomName].push({
          atomName: atom1.atomName,
          isSingleBond,
          isDoubleBond,
          isTripleBond
        });
      }

      // Calculate and store bond angles after adding new bond
      const neighbours1 = this.getNeighbours(atom1);
      const neighbours2 = this.getNeighbours(atom2);

      // Store angles for atom1's bonds
      for (let i = 0; i < neighbours1.length - 1; i++) {
        for (let j = i + 1; j < neighbours1.length; j++) {
          this.storeBondAngle(atom1, neighbours1[i], neighbours1[j]);
        }
      }

      // Store angles for atom2's bonds
      for (let i = 0; i < neighbours2.length - 1; i++) {
        for (let j = i + 1; j < neighbours2.length; j++) {
          this.storeBondAngle(atom2, neighbours2[i], neighbours2[j]);
        }
      }
    }
  }
}