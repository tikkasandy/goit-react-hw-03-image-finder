import { Component } from 'react';

class App extends Component {
  state = {};

  componentDidMount() {
    // const contacts = localStorage.getItem('contacts');
    // const parsedContacts = JSON.parse(contacts);
    // if (parsedContacts) {
    //   this.setState({ contacts: parsedContacts });
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    // const nextContacts = this.state.contacts;
    // const prevContacts = prevState.contacts;
    // if (nextContacts !== prevContacts) {
    //   console.log('Обновилось поле todos, записываю contacts в хранилище');
    //   localStorage.setItem('contacts', JSON.stringify(nextContacts));
    // }
  }

  render() {
    return <></>;
  }
}

export default App;
