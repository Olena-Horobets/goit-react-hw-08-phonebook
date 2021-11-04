import 'App.css';

import { Component } from 'react';

import Section from 'components/Section/Section';
import { Header } from 'components/Header/Header';
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
        <Header />
        <div className="container">
          <ContactForm onSubmit={this.formSubmitHandler} />

          {/* <Filter ... /> */}
          <Section class="contacts" title="Contacts">
            <ContactsList contacts={this.state.contacts} />
          </Section>
        </div>
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
