const Filter = (props) => {
  return (
    <>
    <h2 className="text-center">Phonebook</h2>
      <label>
        <span >Search By Name</span>
           <input className="form-control" value={props.newSearch} onChange={props.handleInputSearch} />
      </label>
      
    </>
  );
};
export default Filter;
