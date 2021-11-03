import { Component } from 'react';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactsList } from 'components/ContactsList/ContactsList';
import INITIAL_DB from 'db/initialDB.json';

class App extends Component {
  state = {
    contacts: [...INITIAL_DB],
  };

  formSubmitHandler = data => {
    this.setState(({ contacts }) => {
      return { contacts: [...contacts, data] };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        {/* <Filter ... /> */}
        <ContactsList contacts={this.state.contacts} />
      </div>
    );
  }
}

export { App };

// ?=========
// import { Counter } from './components/Counter';
// import { Dropdown } from './components/Dropdown';
// import { ColorPicker } from './components/ColorPicker';

// function App() {
//   return (
//     <div className="App">
//       <Counter />
//       <Dropdown />
//       <ColorPicker
//         options={[
//           { lable: 'orange', hex: '#ee5500' },
//           { lable: 'green', hex: '#55ee00' },
//           { lable: 'red', hex: '#ff0000' },
//           { lable: 'blue', hex: '#11aaaa' },
//           { lable: 'grey', hex: '#cccccc' },
//         ]}
//       />
//     </div>
//   );
// }
