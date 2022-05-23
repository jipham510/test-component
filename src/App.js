import { useState } from 'react';
import Dropdown from './components/Dropdown'
import './App.css';

const singleOptions = [
  {
    label: "Twenty",
    value: "1",
  },
  {
    label: "Twenty one",
    value: "2",
  },
  {
    label: "Twenty one and a half",
    value: "3",
  },
];

const multipleOptions = [
  {
    label: "Oliver Hansen",
    value: "1",
  },
  {
    label: "Van Henry",
    value: "2",
  },
  {
    label: "April Tucker",
    value: "3",
  },
];

function App() {
  const [selected, setSelected] = useState([]);
  const [selectedMulti, setSelectedMulti] = useState([]);

  return (
    <div className="App">
      <Dropdown
        title="How old are you?"
        options={singleOptions}
        selected={selected}
        handleSelected={(newSelected) => setSelected(newSelected)}
      />
      { [...Array(10).keys()].map(() => <br />) }
      <Dropdown
        title="Do you recognize any of these people?"
        options={multipleOptions}
        selected={selectedMulti}
        handleSelected={(newSelected) => setSelectedMulti(newSelected)}
        multiple
      />
    </div>
  );
}

export default App;
