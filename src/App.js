import React, { useState } from "react";
import shortid from "shortid";
import PropTypes from "prop-types";
import s from "./App.css";
import ContactForm from "./components/contactForm/ContactForm";
import Filter from "./components/filter/Filter";
import ContactList from "./components/contactList/ContactList";
import Title from "./components/title/Title";

const App = () => {
  // static propTypes = {
  //   contacts: PropTypes.array,
  //   filter: PropTypes.string,
  // };

  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");

  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  // const componentDidMount =()=> {
  //   const getContacts = localStorage.getItem('contacts');
  //   const parsContacts = JSON.parse(getContacts);
  //   if (parsContacts) {
  //     setContacts(parsContacts);
  //   }
  // }

  // const componentDidUpdate=(prevProps, prevState)=> {
  //   if (prevState.contacts !== contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }

  const formSubmitHendler = (data) => {
    contacts.find((n) => n.name === data.name)
      ? alert(`${data.name} already exists`)
      : setContacts((prevState) => {
          return [{ id: shortid.generate(), ...data }, ...prevState];
        });
  };

  const onButtonDeleteClick = (id) => {
    setContacts(contacts.filter((obj) => obj.id !== id));
  };

  const onChangeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={s.container}>
      <Title text="Phoneboock" />
      <ContactForm propOnSubmit={formSubmitHendler} list={contacts} />
      <Title text="Contacts" />
      <Filter value={filter} onChange={onChangeFilter} />
      <ContactList
        filtred={filteredContacts}
        onButtonDeleteClick={onButtonDeleteClick}
      />
    </div>
  );
};

export default App;
