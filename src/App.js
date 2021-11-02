import { Counter } from './components/Counter';
import { Dropdown } from './components/Dropdown';
import { ColorPicker } from './components/ColorPicker';

const colors = [
  { lable: 'orange', hex: '#ee5500' },
  { lable: 'green', hex: '#55ee00' },
  { lable: 'red', hex: '#ff0000' },
  { lable: 'blue', hex: '#11aaaa' },
  { lable: 'grey', hex: '#cccccc' },
];

function App() {
  return (
    <div className="App">
      <Counter />
      <Dropdown />
      <ColorPicker options={colors} />
    </div>
  );
}

export default App;
