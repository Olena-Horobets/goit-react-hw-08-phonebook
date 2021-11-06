import 'App.css';

import { Component } from 'react';
import shortId from 'short-id';

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
    const contactId = shortId.generate();
    data.id = contactId;
    data.isBlocked = false;

    this.setState(({ contacts }) => {
      return { contacts: [...contacts, data] };
    });
  };

  deleteContactHandler = id => {
    this.setState(({ contacts }) => {
      return { contacts: [...contacts].filter(el => el.id !== id) };
    });
  };

  blockContactHandler = id => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.map(el => {
          console.log(el);
          if (el.id === id) {
            el.isBlocked = !el.isBlocked;
            console.log(el);
          }
          return el;
        }),
      };
    });
  };
  //  this.setState(prevState => ({
  //     isVisible: !prevState.isVisible,
  //   }));
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Section class="section" title="Create new contact">
            <ContactForm onSubmit={this.formSubmitHandler} />
          </Section>

          {/* <Filter ... /> */}
          <Section class="contacts" title="Contacts">
            <ContactsList
              contacts={this.state.contacts}
              onDelete={this.deleteContactHandler}
              onBlock={this.blockContactHandler}
            />
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
