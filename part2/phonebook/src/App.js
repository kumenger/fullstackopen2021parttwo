import React, { useState } from "react";
import Filter from "./components/Filter";
import FormData from "./components/FormData";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState(" ");
  const [newNumber, setNewNumber] = useState(" ");
  const [newSearch, setNewSearch] = useState("");

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleInputSearch = (e) => {
    setNewSearch(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.some((x) => x.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      {
        let newPerson = { name: newName, number: newNumber };
        setPersons(persons.concat(newPerson));
        setNewName(" ");
        setNewNumber(" ");
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        newSearch={newSearch}
        handleInputSearch={handleInputSearch}
      />
      <h2>Add new Phonebook</h2>
      <FormData
        handleSubmit={handleSubmit}
        newName={newName}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
