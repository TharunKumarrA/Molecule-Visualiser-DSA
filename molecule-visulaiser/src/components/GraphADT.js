export class atomNode {
    constructor(atomName, hybridisation, atomSymbol) {
        this.atomName = atomName;
        this.hybridisation = hybridisation;
        this.atomSymbol = atomSymbol;
        this.coordinates = [0, 0, 0];
    }
}

export class Molecule {
    constructor() {
        this.adjacencyList={};
    }


    getNeighbours(atom) {
        return this.adjacencyList[atom.atomName];
    }

    
    addAtoms(atom) {
        if(!this.adjacencyList[atom.atomName]){
            this.adjacencyList[atom.atomName] = [];
        }else{
            console.log("Atom exists already in graph")
        }
    }

    
    addBond(atom1,atom2) {
        if(this.adjacencyList[atom1.atomName] && this.adjacencyList[atom2.atomName]){
            let flag1=0;
            for (i in adjacencyList[atom1.atomName]){
                if(i==atom2.atomName) flag1=1;
            }
            if(!flag1) this.adjacencyList[atom1.atomName].push(atom2.atomName);

            let flag2=0;
            for (i in adjacencyList[atom2.atomName]){
                if(i==atom1.atomName) flag2=1;
            }
            if(!flag2) this.adjacencyList[atom2.atomName].push(atom1.atomName);
        }
        else{
            console.log("Please Add Atoms first");
        }
    }
}