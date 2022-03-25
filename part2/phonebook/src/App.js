import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import FormData from "./components/FormData";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phoneBookMethod from "./sever/Phonebook";
import helper from "./heplerMethod/helper";
import {Modal,Button} from 'react-bootstrap'

const App = () => {
  const [showModal ,setShowModal]=useState(false)
  const [deletedId,setDeletedID]=useState(0)
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
   
      if(persons.some(p=>p.name===newName&&p.number!==newNumber)){
    
      let currentPerson = persons.find((p) =>p.name.toLowerCase() === newName.toLowerCase());
    
      let updateDCurrentperson = { ...currentPerson, number: newNumber };
      phoneBookMethod.update(updateDCurrentperson).then(()=>{
       persons.map((p)=>{p.name===newName?p.number=newNumber:p.number=p.number})
       
       setNotification(
        `${newName}'s phone number sucessfuly changed to ${newNumber}`
      );
      setNotificatioStyle("succes");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
       })
     // setPersons(persons.map((p)=>p.id===currentId?p.number=newNumber:p.number))
      
     }
     else {
      let newPerson = { name: newName, number: newNumber };

      phoneBookMethod.createPerson(newPerson).then((res) => {
        setPersons(persons.concat(res));
        setNewName(" ");
        setNewNumber(" ");
        setNotification(`${newName} is added to phonebook`);
        setNotificatioStyle("succes");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }).catch((error)=>{
        
        setNotification(error.response.data.error)
        setNotificatioStyle("error");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };
  const deletePerson = (id) => {
    setShowModal(true)
    setDeletedID(id)
    
 
  };
  const modelConfimDeletion=()=>{ 
    let p = persons.filter((p) => p.id === deletedId);
    
    phoneBookMethod.deletePerson(deletedId).then((res) => {
      setPersons(persons.filter((p) => p.id !== deletedId));
      setShowModal(false)
      setNotification(`${p[0].name} is deleted from  phonebook`);
      setNotificatioStyle("error");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });}
 
    
  return (
    
    <div className="container bg-light ">
     <Modal show={showModal} onHide={()=>setShowModal(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>`are sure you want delete  `</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={
          modelConfimDeletion
          }>
            Delete 
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-md-6 offset-md-3">
        <Filter newSearch={newSearch} handleInputSearch={handleInputSearch} />
        <div className="text-danger"><strong>
          {newSearch && serchResult.length > 0
            ? `${serchResult[0].name} ${serchResult[0].number}`
            : ""}</strong>
        </div>

        <FormData
          handleSubmit={handleSubmit}
          newName={newName}
          handleInputChange={handleInputChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
        <Notification message={notification} styele={notificatioStyle} />

        <Persons persons={persons} deletePerson={deletePerson} />
       
      </div>
    </div>
  );
};

export default App;
