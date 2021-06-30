import react from "react";
const Filter = (props) => {
  return (
    <>
      <lable>
        Search phonebook:
        <input value={props.newSearch} onChange={props.handleInputSearch} />
      </lable>
      <div>
        {props.persons
          .filter((x) => x.name.toLowerCase() ===props. newSearch.toLowerCase())
          .map((x) => (
            <li>
              {x.name} {x.number}
            </li>
          ))}
      </div>
    </>
  );
};
export default Filter;
