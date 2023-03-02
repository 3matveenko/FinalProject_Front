import React from "react"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import NavAdmin from "../components/NavAdmin";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Wokers = () => {
  let[id,setId] = useState(0)
  let[newRole, setNewRole] = useState();
  const handleselect = (e) => setNewRole(e.target.value)
  let [users, setUsers] =  useState([])
  const token = localStorage.getItem('token')
  const requestOptions = {
    method: "GET",
    headers: { 
      "Content-Type": "application/json",
      Authorization : 'Bearer '+token
    },
};
  async function getData(){

    let users = await fetch("http://localhost:8080/auth/users", requestOptions)
      .then(response => {
          return response.json();
      }).then(
          data => {
            setUsers(data)
          }
     
      )
        }
        useEffect( () => {
            getData();
          }, []);
  
    for( let i = 0; i<users.length; i++){
      if(users[i].role == '1'){
        users[i].role =           <select value={newRole} className="selectmod" onChange={handleselect}>
                                    <option selected value="1">Кассир</option>
                                    <option  value="2">Кладовщик</option>
                                    <option  value="3">Админ</option>
                                  </select>
      }
            if(users[i].role == '2'){
        users[i].role =        <select value={newRole} className="selectmod" onChange={handleselect}>
        <option  value="1">Кассир</option>
        <option selected value="2">Кладовщик</option>
        <option  value="3">Админ</option>
      </select>
      }
            if(users[i].role == '3'){
        users[i].role =        <select value={newRole} className="selectmod" onChange={handleselect}>
        <option value="1">Кассир</option>
        <option  value="2">Кладовщик</option>
        <option selected value="3">Админ</option>
      </select>
      }
    }

    const Details =(id) =>{
        setId(id)
       
    }
    const chenge = event => {
      event.preventDefault();
      const data = { id , newRole, };
      const requestOptions = {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization : 'Bearer '+token
        },
        body: JSON.stringify(data)
    };

    fetch("http://localhost:8080/auth/change_role", requestOptions)
        .then(response => {
            return response.json();
        }).then(
            data => {
               if(data){
                alert('Назначена новая роль')
               }
            }
        )
       
          }


    const content = (
        <div>
<NavAdmin />
<form  onSubmit={chenge} className="chart">
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>В шатате {users.length} сотрудников</caption>
        <TableHead>
          <TableRow>
          <TableCell>ID сотрудника</TableCell>
            <TableCell align="center">Имя сотрудника</TableCell>
        
            <TableCell align="center">Роль</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.role}</TableCell>
              <TableCell align="center"><Button type="sabmit" variant="success" className="button_def" onClick={()=>Details(row.id)}>Назначить новую роль</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </form>
      </div>
      
    )
    return content
}
export default Wokers