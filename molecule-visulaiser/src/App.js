import React from 'react';
import Plot from 'react-plotly.js';
import { buildMolecule, getCoordinates } from './components/Molecule';

const MoleculeVisualizer = () => {
  const molecule = buildMolecule();
  getCoordinates(molecule);

  const traceAtoms = {
    type: 'scatter3d',
    mode: 'markers+text',
    text: molecule.atomList.map((atom) => atom.atomSymbol),
    x: molecule.atomList.map((atom) => atom.coordinates[0]),
    y: molecule.atomList.map((atom) => atom.coordinates[1]),
    z: molecule.atomList.map((atom) => atom.coordinates[2]),
    marker: {
      size: 10,
      opacity: 0.8,
      color: molecule.atomList.map(atom => {
        switch (atom.atomSymbol) {
          case 'C':
            return 'black';
          case 'H':
            return '#4682B4';
          default:
            return '#CD5C5C';
        }
      }),
    },
  };

  const traceSingleBonds = {
    type: 'scatter3d',
    mode: 'lines',
    line: {
      color: 'gray',
      width: 2,
    },
    x: [],
    y: [],
    z: [],
  };

  const traceDoubleBonds = {
    type: 'scatter3d',
    mode: 'lines',
    line: {
      color: 'red',
      width: 4,
    },
    x: [],
    y: [],
    z: [],
  };

  // Add connections data to traceSingleBonds and traceDoubleBonds
  molecule.atomList.forEach((atom) => {
    atom.connections.forEach(connectedAtom => {
      const connectedIndex = molecule.atomList.findIndex(a => a.atomName === connectedAtom.atomName);
      traceConnections.x.push(atom.coordinates[0], molecule.atomList[connectedIndex].coordinates[0], null);
      traceConnections.y.push(atom.coordinates[1], molecule.atomList[connectedIndex].coordinates[1], null);
      traceConnections.z.push(atom.coordinates[2], molecule.atomList[connectedIndex].coordinates[2], null);
  
      if (atom.isDoubleBond) {
        traceConnections.x.push(atom.coordinates[0], molecule.atomList[connectedIndex].coordinates[0], null);
        traceConnections.y.push(atom.coordinates[1], molecule.atomList[connectedIndex].coordinates[1], null);
        traceConnections.z.push(atom.coordinates[2], molecule.atomList[connectedIndex].coordinates[2], null);
    const atomConnections = molecule.adjacencyList[atom.atomName];
    atomConnections.forEach((connection) => {
      const connectedAtom = molecule.atomList.find(
        (a) => a.atomName === connection.atomName
      );

      if (connection.isDoubleBond) {
        traceDoubleBonds.x.push(
          atom.coordinates[0],
          connectedAtom.coordinates[0],
          null
        );
        traceDoubleBonds.y.push(
          atom.coordinates[1],
          connectedAtom.coordinates[1],
          null
        );
        traceDoubleBonds.z.push(
          atom.coordinates[2],
          connectedAtom.coordinates[2],
          null
        );
      } else {
        traceSingleBonds.x.push(
          atom.coordinates[0],
          connectedAtom.coordinates[0],
          null
        );
        traceSingleBonds.y.push(
          atom.coordinates[1],
          connectedAtom.coordinates[1],
          null
        );
        traceSingleBonds.z.push(
          atom.coordinates[2],
          connectedAtom.coordinates[2],
          null
        );
      }
    });
  });

  const layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    paper_bgcolor: '#1e1e1e', // Dark background for the plot
    plot_bgcolor: '#1e1e1e', // Dark background for the plot
    font: {
      color: '#ffffff', // White font color for better contrast
    },
    scene: {
      xaxis: {
        backgroundcolor: '#1e1e1e',
        gridcolor: '#444444',
        showbackground: true,
        zerolinecolor: '#444444',
      },
      yaxis: {
        backgroundcolor: '#1e1e1e',
        gridcolor: '#444444',
        showbackground: true,
        zerolinecolor: '#444444',
      },
      zaxis: {
        backgroundcolor: '#1e1e1e',
        gridcolor: '#444444',
        showbackground: true,
        zerolinecolor: '#444444',
      },
    },
  };

  return (
    <Plot
      data={[traceAtoms, traceConnections]}
      layout={layout}
      data={[traceAtoms, traceSingleBonds, traceDoubleBonds]}
      layout={{ margin: { l: 0, r: 0, b: 0, t: 0 } }}
      style={{ width: '100%', height: '100vh' }}
    />
  );
};

export default MoleculeVisualizer;