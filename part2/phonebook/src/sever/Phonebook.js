import axios from 'axios'
import helper  from '../heplerMethod/helper'
const baseuri='/api/persons'


const getAll=()=>{
  const response=axios.get(baseuri)
  return response.then((res)=>res.data)
}
const createPerson=newPerson=>{
  const response=  axios.post(baseuri,newPerson)
  return response.then((res)=>res.data)
}
const deletePerson=(id)=>{
    return axios.delete(`${baseuri}/${id}`)
    
    //return response.then((res)=>res.data)
}
const update=(newObject)=>{
 const response=   axios.put(`${baseuri}`,newObject)
 return response.then((res)=>res.data)
}
const get=(SerachName)=>{
  
return  axios.get(baseuri,{
    params:{
      name:helper(SerachName) 
    }
  }).then((res)=>
    
    res.data
  
  )
}
export default {getAll,createPerson,deletePerson,update,get}