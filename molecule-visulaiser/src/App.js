import './App.css';
import {buildMolecule, drawMolecule, findCentralAtoms, getCoordinates} from './components/Molecule'

function App() {
  const molecule = buildMolecule();
  drawMolecule(molecule);
  const centralAtoms = findCentralAtoms(molecule);
  for (let atom of centralAtoms){
    let neighbourList = molecule.getNeighbours(atom);
    console.log("neigbours of ", atom.atomName, neighbourList);
  }
  getCoordinates(molecule);
  drawMolecule(molecule)
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
