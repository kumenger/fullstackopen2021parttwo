const FormData = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <div className="row">
          <div className="  col-md-12  ">
            <div className="row ">
              <div className="col-md-1">Name</div>
              <div className="col-md-3">
                <input
                 className="form-control"
                  value={props.newName}
                  onChange={props.handleInputChange}
                />{" "}
              </div>
              <div className="col-md-1 ">Phone</div>
              <div className="col-md-3">
              <input
               className="form-control"
                  value={props.newNumber}
                  onChange={props.handleNumberChange}
                />{" "}
              </div>
              <div className="col-md-4 ">
             
              <button className="btn btn-primary text-center" type="submit">
                Add New Person
              </button>
            </div>
            </div>
          </div>
         
         
           
          
        </div>
      </form>
    </>
  );
};
export default FormData;
