import react from 'react'
const Header=(props)=>{
    return <><h1>{props.header}</h1></>
}
const Content=(props)=>{
    return<div>
          {props.parts.map(x=><ul key={x.id}><li><Parts  part={x.name} excersice={x.exercises}/></li></ul>)}
    </div>
}
const Parts=(props)=>{
 return <>{props.part}   {props.excersice}</>
}
const Course =({course})=>{
   
    return (<div>
         <Header header={course.name}/>
         <Content parts={course.parts} />
    </div>)
}
export default Course