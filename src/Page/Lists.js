import React from "react"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import NavStor from "../components/NavStorekeeper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Lists = () => {
  const [del, setDel] = useState(false);
  const handleCloseDel = () => setDel(false);
  const handleShowDel = () => setDel(true);
  const [number, setNumber] = useState(0)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

    const [datStart, setdatStart] = useState('')
    const [datEnd, setdatEnd] = useState('')
    const start = (e) => setdatStart(e.target.value)
    const end = (e) => setdatEnd(e.target.value)
    let [lists, setlists] =  useState([])
    let [products, setProducts] =  useState([])
    let [mod, setMod] =  useState([])
    const token = localStorage.getItem('token')
    const nameUser = localStorage.getItem('username')
    const Details =(id) =>{
      setMod('1')
      
      const data = {id};
      const requestOptions = {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization : 'Bearer '+token
        },
        body: JSON.stringify(data)
        
    };
    fetch("http://localhost:8080/list/details", requestOptions)
      .then(response => {
          return response.json();
      }).then(
          data => {
            setProducts(data)
            handleShow()
    
    }
  
       
  )

}


    const handleSubmit = event => {
        event.preventDefault();
        let dates = [];
        dates.push(datStart)
        dates.push(datEnd)
        const data = {dates };
        const token = localStorage.getItem('token')
        const requestOptions = {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization : 'Bearer '+token
          },
          body: JSON.stringify(data)
      };
      fetch("http://localhost:8080/list/all_lists", requestOptions)
        .then(response => {
            return response.json();
        }).then(
            data => {
                setlists(data)
            }
       
        )
    
      }
      const SetNumber =(id) =>{ 
        handleShowDel()
        setNumber(id)
      }
      const Delete = event => {
        event.preventDefault();
        let id = number;
        const data = {id};
        const requestOptions = {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization : 'Bearer '+token
          },
          body: JSON.stringify(data)
      };
      fetch("http://localhost:8080/list/delete", requestOptions)
        .then(response => {
            return response.json();
        }).then(
          handleCloseDel(),
          alert('Накладная удалена')
           
       
        )
      }
    const content = (
        <div>
      <NavStor />
      <div className="username2">
    <h3>Выберите даты:</h3>
 
   <form className="date_d" onSubmit={handleSubmit}>
  <input className="date_picker" type="date"  value={datStart} onChange={start} />
  <h1> / </h1>
  <input className="date_picker" type="date"  value={datEnd}  onChange={end} />
  <Button type="submit" variant="success" className="select_date" > Выбрать</Button>
  </form>
  </div>
  {lists.length>0 ? 
   <div className="all_lists">
 <TableContainer component={Paper}>
 <Table sx={{ minWidth: 650 }} aria-label="caption table">
   <caption>Вы выбрали {lists.length} накладных</caption>
   <TableHead>
     <TableRow>
       <TableCell>Номер накладной</TableCell>
       <TableCell align="right">Имя кладовщика</TableCell>
       <TableCell align="right">Сумма</TableCell>
       <TableCell align="right">Дата</TableCell>
       <TableCell align="right"></TableCell>
     </TableRow>
   </TableHead>
   <TableBody>
     {lists.map((row) => (
       <TableRow key={row.name}>
         <TableCell>
           {row.id}
         </TableCell>
         <TableCell align="right">{row.nameUser}</TableCell>
         <TableCell align="right">{row.sum}</TableCell>
         <TableCell align="right">{row.date}</TableCell>
         <TableCell align="right"><AssignmentIcon fontSize="large" onClick={()=>Details(row.id)}/> </TableCell>
         <TableCell align="right"><DeleteForeverIcon fontSize="large" onClick={()=>SetNumber(row.id)}/></TableCell>
       </TableRow>
     ))}
   </TableBody>
 </Table>
</TableContainer>
       

          </div>
          : null}
  
  <Modal show={show} onHide={handleClose}>
        <form >
        <Modal.Header closeButton>
          
        </Modal.Header>
        {products.products ? 
        <Modal.Body >
          <table className="table_modal">
       
    
         
          
        {products.products.map((item)=>(
          <tbody  key={item.id}>
            <tr>
           <td>{item.item}</td>
           <td>{item.amount}</td>
           </tr>
           </tbody>
              
              
             
          ))}
           </table>
       </Modal.Body>
      
   : null}
        <Modal.Footer>
          
        </Modal.Footer>
        </form>
      </Modal>

      <Modal show={del} onHide={handleCloseDel} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы точно хотите удалить накладную №{number}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDel}>
            Закрыть окно
          </Button>
          <Button variant="danger" onClick={Delete}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      
    )
    return content
}
export default Lists