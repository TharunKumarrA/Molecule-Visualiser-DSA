import React from 'react';
import Plot from 'react-plotly.js';
import { buildMolecule, getCoordinates } from './components/Molecule'; // Assuming this is the correct path to your molecule construction functions

const MoleculeVisualizer = () => {
  const molecule = buildMolecule();
  getCoordinates(molecule);

  const traceAtoms = {
    type: 'scatter3d',
    mode: 'markers+text',
    text: molecule.atomList.map(atom => atom.atomSymbol),
    x: molecule.atomList.map(atom => atom.coordinates[0]),
    y: molecule.atomList.map(atom => atom.coordinates[1]),
    z: molecule.atomList.map(atom => atom.coordinates[2]),
    marker: {
      size: 10,
      opacity: 0.8,
      color: molecule.atomList.map(atom => {
        switch (atom.atomSymbol) {
          case 'C':
            return 'black';
          case 'H':
            return 'blue';
          default:
            return 'red';
        }
      }),
    },
  };

  const traceConnections = {
    type: 'scatter3d',
    mode: 'lines',
    x: [],
    y: [],
    z: [],
  };

  // Add connections data to traceConnections
  // Modify traceConnections calculation
  molecule.atomList.forEach((atom) => {
    atom.connections.forEach(connectedAtom => {
      const connectedIndex = molecule.atomList.findIndex(a => a.atomName === connectedAtom.atomName);
      traceConnections.x.push(atom.coordinates[0], molecule.atomList[connectedIndex].coordinates[0], null);
      traceConnections.y.push(atom.coordinates[1], molecule.atomList[connectedIndex].coordinates[1], null);
      traceConnections.z.push(atom.coordinates[2], molecule.atomList[connectedIndex].coordinates[2], null);
  
      // If isDoubleBond is true, add an additional connection
      if (atom.isDoubleBond) {
        traceConnections.x.push(atom.coordinates[0], molecule.atomList[connectedIndex].coordinates[0], null);
        traceConnections.y.push(atom.coordinates[1], molecule.atomList[connectedIndex].coordinates[1], null);
        traceConnections.z.push(atom.coordinates[2], molecule.atomList[connectedIndex].coordinates[2], null);
      }
    });
  });


  return (
    <Plot
      data={[traceAtoms, traceConnections]}
      layout={{ margin: { l: 0, r: 0, b: 0, t: 0 } }}
      style={{ width: '100%', height: '100vh' }}
    />
  );
};

export default MoleculeVisualizer;
