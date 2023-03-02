import { Link } from "react-router-dom"



const role = localStorage.getItem('role')



const F = () => {
    return((role == 0)
    ?
<Link to="/userslist">Go to the Users List</Link>
    :
 <Link to="/userslist"></Link>
    )
}

const RegisterLink = () => {
return(
<Link className="link" to="/register">Создать аккаунт</Link>
)
}



export {F, RegisterLink}