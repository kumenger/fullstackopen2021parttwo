import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import FormData from "./components/FormData";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phoneBookMethod from "./sever/Phonebook";
import helper from "./heplerMethod/helper";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [serchResult, setSerchResult] = useState([]);
  const [notification, setNotification] = useState(null);
  const [notificatioStyle, setNotificatioStyle] = useState(false);

  useEffect(() => {
    phoneBookMethod.getAll().then((res) => setPersons(res));
  }, []);

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleInputSearch = (e) => {
    setNewSearch(e.target.value);
    setTimeout(() => {
      setSerchResult(persons.filter((p) => p.name === helper(e.target.value)));
      
    }, 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
   if (
      persons.some((x) => x.name.toLowerCase() === newName.toLowerCase() && x.number === newNumber)
    ) {
      setNotification(`${newName} is already exis in phonebook`);
      setNotificatioStyle("error");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } else if (
      persons.some((x) => x.name.toLowerCase() === newName.toLowerCase() && x.number !== newNumber)
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook ,update the old phone number with the new one?`
        )
      ) {
        let currentId = persons.filter((p) => p.name === helper(newName))[0].id;

        let currentPerson = persons.find((p) => p.id === currentId);
        let updateDCurrentperson = { ...currentPerson, number: newNumber };
        phoneBookMethod
          .update(updateDCurrentperson, currentId)
          .then((res) => {
            setPersons(persons.map((p) => (p.id === currentId ? res : p)));
            setNotification(
              `${newName}'s phone number sucessfuly changed to ${newNumber}`
            );
            setNotificatioStyle("succes");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((err) => {
            setNotification(
              `${newName} has been alrady removed from the system`
            );
            setNotificatioStyle("error");
            setPersons(persons.filter((p) => p.name !== newName));
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }
    } else {
      {
        let newPerson = { name: helper(newName), number: newNumber };

        phoneBookMethod.createPerson(newPerson).then((res) => {
          setPersons(persons.concat(res));
          setNewName(" ");
          setNewNumber(" ");
          setNotification(`${newName} is added to phonebook`);
          setNotificatioStyle("succes");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
      }
    }
  };
  const deletePerson = (id) => {
    let p = persons.filter((p) => p.id === id);
    console.log(p);
    if (window.confirm(`Are sure to delete this ${p[0].name}`)) {
      phoneBookMethod.deletePerson(id).then((res) => {
        setPersons(persons.filter((p) => p.id !== id));
        setNotification(`${p[0].name} is deleted from  phonebook`);
        setNotificatioStyle("error");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  return (
<div className="container bg-light ">
      <div className="col-md-6 offset-md-3" >
      <Filter newSearch={newSearch} handleInputSearch={handleInputSearch} />
      <div className="">
        {newSearch && serchResult.length > 0
          ? `${serchResult[0].name} ${serchResult[0].number}`
          : ""}
      </div>
      
      <FormData
        handleSubmit={newName&&newNumber?handleSubmit:null}
        newName={newName}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Notification message={notification} styele={notificatioStyle} />
     
      <Persons persons={persons}  deletePerson={deletePerson} />
    </div>
    </div>
  );
};

export default App;
