import react from 'react'
const Persons=(props)=>{
    return <>
    
        {props.persons.map((name, i) => (
          <li key={i}>{name.name} {name.number}</li>
        ))}
      
    
    </>
}
export default Persons