import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavNull from '../../components/NavNull'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import * as React from 'react';





const Login = () => {
    
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUser] = useState('')
    const [password, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ username, password }).unwrap()
            dispatch(setCredentials({ ...userData, username }))
            setUser('')
            setPwd('')
            let hello = 'null';
            let r = localStorage.getItem('role')
        
         if(r == '1'){
            navigate('/cash_register')
        }
        if(r == '2'){
            navigate('/composition')
         }
         if(r == '3'){
            navigate('/welcome')
         }
        
          
        } catch (err) {
            if (err.status == 400) {
                setErrMsg('ошибка 400');
            } else if (err.status == 403) {
                setErrMsg('Неверные данные авторизации');
            } else {
                setErrMsg('Нет связи с сервером');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)

    const content = isLoading ? <h1>Загрузка...</h1> : (
        <div>
<NavNull />

    <div className="login">

<form className="form-horizontal" onSubmit={handleSubmit}>
<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

<label>Авторизация</label>

<input               
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        placeholder='Электронная почта'
                        required
                    />
<input              
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        placeholder='Пароль'

                        required
                    />
                        

                     <button type="submit" className="buttonlogin">Регистрация</button>
                     <div className='autorizeLink'>
                     
</div>

</form>




</div>
</div>
        
        
    )

    return content
}
export default Login
