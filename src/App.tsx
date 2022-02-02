import { Counter } from './features/counter/Counter';
import { Persons } from './features/persons/Persons';
import './App.css';

function App() {
  return <div className="App">
    <main className="App-main">
      <Persons />
      {/* <Counter /> */}
    </main>
  </div>
}

export default App;
