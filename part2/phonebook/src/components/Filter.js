const Filter = (props) => {
  return (
    <>
    <h2 className="text-center">Phonebook</h2>
      <div className="row">
        <div className="col-md-4" >Search By Name</div>
         <div className="col-md-8"> <input className="form-control  " placeholder="type name here" value={props.newSearch} onChange={props.handleInputSearch} /></div> 
      </div>
      
    </>
  );
};
export default Filter;
