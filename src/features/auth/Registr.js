import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './authApiSlice'
import NavNull from '../../components/NavNull';







const Register = () => {
    
    const userRef = useRef()
    const EmailRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    let [username, setUsername] = useState('')
    const [repassword, setRePassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPwd(e.target.value)
    const handleRePwdInput = (e) => setRePassword(e.target.value)
    let token = null;
        let [role, setRole] = useState('')
const handleSubmit = event => {
        event.preventDefault();
       if(password==repassword){
        
        const data = { email, username, password, };
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        fetch("http://localhost:8080/auth/new", requestOptions)
            .then(response => {
                return response.json();
            }).then(
                data => {
                    if(data.role == 100){ 
            alert('Пользователь с таким Email существует')

        } if(data.role==1||data.role==2||data.role==3) {
            token = data.token
            username = data.username
            setRole(data.role)
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
        } else{
            alert('Ошибка связи с сервером')
        }
                }
            )
        

        
            
    } else {
        setErrMsg('Пароли не совпадают');
    }
} 
if(role == 1){
    navigate('/cash_register')
}
if(role == 2){
    navigate('/composition')
 }
 if(role == 3){
    navigate('/welcome')
 }
    const content = isLoading ? <h1>Загрузка...</h1> : (
        <div>

<NavNull />
            <div className="login">
<form className="form-horizontal" onSubmit={handleSubmit}>
<p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

<label>Регистрация</label>


<input   
                        placeholder='Электронная почта'            
                        type="hidden"
                        id="email"
                        value={email}
                        onChange={handleEmailInput}
                        autoComplete="off"
                        required
                    />

                                  
<input   
                        placeholder='Имя'            
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />
<input                  placeholder='Пароль'
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <input                  placeholder='Повторите пароль'
                        type="password"
                        id="repassword"
                        onChange={handleRePwdInput}
                        value={repassword}
                        required
                    />
      
          
                     <button type="submit" className="buttonlogin">Создать аккаунт</button>
       

</form>




</div>

        
        </div>
    )

    return content
}
export default Register
