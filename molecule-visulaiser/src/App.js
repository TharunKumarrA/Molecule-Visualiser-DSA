import './App.css';
import {buildMolecule, drawMolecule, findCentralAtoms} from './components/Molecule'

function App() {
  const molecule = buildMolecule();
  drawMolecule(molecule);
  const centralAtoms = findCentralAtoms(molecule);
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
