import './App.css';
import { useEffect } from 'react';
import { buildMolecule, findCentralAtoms, getCoordinates } from './components/Molecule';
import Plotly from 'plotly.js/lib/core';

function App() {
  useEffect(() => {
    const molecule = buildMolecule();
    getCoordinates(molecule);

    for(let atoms of molecule.atomList){
      console.log(atoms);
    }

    // Extract coordinates
    const atoms = molecule.atomList;
    const atomCoordinates = atoms.map(atom => atom.coordinates);

    console.log('Atom Coordinates:', atomCoordinates);

    // Unpack coordinates
    function unpack(coords, key) {
      return coords.map(coord => coord[key]);
    }

    const x = unpack(atomCoordinates, 0);
    const y = unpack(atomCoordinates, 1);
    const z = unpack(atomCoordinates, 2);

    console.log('X Coordinates:', x);
    console.log('Y Coordinates:', y);
    console.log('Z Coordinates:', z);

    const trace1 = {
      x: x,
      y: y,
      z: z,
      mode: 'markers',
      marker: {
        size: 12,
        line: {
          color: 'rgba(217, 217, 217, 0.14)',
          width: 0.5,
        },
        opacity: 0.8,
      },
      type: 'scatter3d',
    };

    const trace2 = {
      x: x,
      y: y,
      z: z,
      mode: 'markers',
      marker: {
        color: 'rgb(127, 127, 127)',
        size: 12,
        symbol: 'circle',
        line: {
          color: 'rgb(204, 204, 204)',
          width: 1,
        },
        opacity: 0.8,
      },
      type: 'scatter3d',
    };

    const data = [trace1, trace2];
    const layout = { margin: { l: 0, r: 0, b: 0, t: 0 } };

    console.log('Data:', data);
    console.log('Layout:', layout);

    Plotly.newPlot('scene-container', data, layout);

    // Clean up
    return () => {
      Plotly.purge('scene-container');
    };
  }, []);

  return (
    <div className="App">
      <div id="scene-container"></div>
    </div>
  );
}

export default App;
