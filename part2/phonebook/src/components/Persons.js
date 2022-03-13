const Persons = ({ persons, deletePerson }) => {
  return (
    <>
    <h2 className="text-center">PhoneBook List</h2>
      {persons.map((name, i) => (
        <div className="row " key={name.id}>
           
          <div className="col-8">
          
             <ol>
             <div className='row'><div className='col-6'>{name.name}</div><div className="col-6">{name.number}</div> </div>
             </ol>
          </div>
          <div className=" col-4">
            <button
              className="btn btn-danger"
              onClick={() => deletePerson(name.id)}
            >
              delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
export default Persons;
