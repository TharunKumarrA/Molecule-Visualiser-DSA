import './App.css';
import {buildMolecule, drawMolecule, findCentralAtoms} from './components/Molecule'

function App() {
  const molecule = buildMolecule();
  drawMolecule(molecule);
  const centralAtoms = findCentralAtoms(molecule);
  for (let atom of centralAtoms){
    let neighbourList = molecule.getNeighbours(atom);
    console.log("neigbours of ", atom.atomName, neighbourList);
  }
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
