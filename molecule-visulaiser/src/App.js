import React from 'react';
import Plot from 'react-plotly.js';
import { buildMolecule, getCoordinates } from './components/Molecule';
import { checkCycle } from './components/CheckCycle';

const MoleculeVisualizer = () => {
  const molecule = buildMolecule();
  getCoordinates(molecule);

  console.log("Cycle Check: ", checkCycle(molecule));

  const traceAtoms = {
    type: 'scatter3d',
    mode: 'markers+text',
    text: molecule.atomList.map((atom) => atom.atomSymbol),
    x: molecule.atomList.map((atom) => atom.coordinates[0]),
    y: molecule.atomList.map((atom) => atom.coordinates[1]),
    z: molecule.atomList.map((atom) => atom.coordinates[2]),
    marker: {
      size: 12,
      opacity: 0.8,
      color: molecule.atomList.map((atom) => {
        switch (atom.atomSymbol) {
          case 'C':
            return 'black';
          case 'H':
            return '#87CEEB'; // Medium Light Blue
          default:
            return '#CD5C5C'; // Indian Red
        }
      }),
    },
  };

  const traceSingleBonds = {
    type: 'scatter3d',
    mode: 'lines',
    line: {
      color: 'red',
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
      color: 'green',
      width: 4,
    },
    x: [],
    y: [],
    z: [],
  };

  const traceTripleBonds = {
    type: 'scatter3d',
    mode: 'lines',
    line: {
      color: 'black',
      width: 4,
    },
    x: [],
    y: [],
    z: [],
  };

  // Add connections data to traceSingleBonds, traceDoubleBonds, and traceTripleBonds
  molecule.atomList.forEach((atom) => {
    const atomConnections = molecule.adjacencyList[atom.atomName];
    atomConnections.forEach((connection) => {
      const connectedAtom = molecule.atomList.find(
        (a) => a.atomName === connection.atomName
      );

      if (connection.isDoubleBond) {
        // Main line
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

        // Offset line
        traceDoubleBonds.x.push(
          atom.coordinates[0] + 0.1,
          connectedAtom.coordinates[0] + 0.1,
          null
        );
        traceDoubleBonds.y.push(
          atom.coordinates[1] + 0.1,
          connectedAtom.coordinates[1] + 0.1,
          null
        );
        traceDoubleBonds.z.push(
          atom.coordinates[2] + 0.1,
          connectedAtom.coordinates[2] + 0.1,
          null
        );
      } else if (connection.isSingleBond && !connection.isTripleBond) {
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
      } else if (connection.isTripleBond) {
        // Main line
        traceTripleBonds.x.push(
          atom.coordinates[0],
          connectedAtom.coordinates[0],
          null
        );
        traceTripleBonds.y.push(
          atom.coordinates[1],
          connectedAtom.coordinates[1],
          null
        );
        traceTripleBonds.z.push(
          atom.coordinates[2],
          connectedAtom.coordinates[2],
          null
        );

        // Offset lines
        traceTripleBonds.x.push(
          atom.coordinates[0] + 0.1,
          connectedAtom.coordinates[0] + 0.1,
          null
        );
        traceTripleBonds.y.push(
          atom.coordinates[1] + 0.1,
          connectedAtom.coordinates[1] + 0.1,
          null
        );
        traceTripleBonds.z.push(
          atom.coordinates[2] + 0.1,
          connectedAtom.coordinates[2] + 0.1,
          null
        );

        traceTripleBonds.x.push(
          atom.coordinates[0] - 0.1,
          connectedAtom.coordinates[0] - 0.1,
          null
        );
        traceTripleBonds.y.push(
          atom.coordinates[1] - 0.1,
          connectedAtom.coordinates[1] - 0.1,
          null
        );
        traceTripleBonds.z.push(
          atom.coordinates[2] - 0.1,
          connectedAtom.coordinates[2] - 0.1,
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
      data={[traceAtoms, traceSingleBonds, traceDoubleBonds, traceTripleBonds]}
      layout={layout}
      style={{ width: '100%', height: '100vh' }}
    />
  );
};

export default MoleculeVisualizer;
