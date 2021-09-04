import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import s from './App.css';
import ContactForm from './components/contactForm/ContactForm';
import Filter from './components/filter/Filter';
import ContactList from './components/contactList/ContactList';
import Title from './components/title/Title';

const getContacts = localStorage.getItem('contacts');
const parsContacts = JSON.parse(getContacts);
const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return parsContacts ?? initialState;
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length > 0) {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const formSubmitHendler = data => {
    contacts.find(n => n.name === data.name)
      ? alert(`${data.name} already exists`)
      : setContacts(prevState => {
          return [{ id: shortid.generate(), ...data }, ...prevState];
        });
  };

  const onButtonDeleteClick = id => {
    setContacts(contacts.filter(obj => obj.id !== id));
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className={s.container}>
      <Title text="Phoneboock" />
      <ContactForm propOnSubmit={formSubmitHendler} list={contacts} />
      <Title text="Contacts" />
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList filtred={filteredContacts} onButtonDeleteClick={onButtonDeleteClick} />
    </div>
  );
};

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};

export default App;
