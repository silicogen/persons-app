import { Counter } from './features/counter/Counter';
import { Persons } from './features/persons/Persons';
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        <header className="App-main">
          <Persons />
          <Counter />
        </header>
      </main>
    </div>
  );
}

export default App;
