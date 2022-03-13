
const Notificaton=({message,styele})=>{
    if(message===null){
        return null
    }
    else 
     return <div className={`${styele}`}>{message}</div>
}
export default Notificaton