import React from "react"
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { v1 as uuidv1 } from 'uuid';
import NavStor from '../components/NavStorekeeper'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddTaskIcon from '@mui/icons-material/AddTask';
import moment from "moment";
            

const AddList = () => {
  const[products, setProducts] = useState([]);
  let[selectt, setSelect] = useState();
  let[inputamount, setInputAmount] = useState()
  let[inputprice,setInputprice] = useState()
  const handleselect = (e) => setSelect(e.target.value)

  const handleinputamount = (e) => setInputAmount(e.target.value)
  const handleinputprice = (e) => setInputprice(e.target.value)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const date =  moment().format('YYYY-MM-DD')
            let [remainder, setremainder] =  useState([])
            const token = localStorage.getItem('token')
            const nameUser = localStorage.getItem('username')
            const requestOptions = {
                method: "GET",
                headers: { 
                  "Content-Type": "application/json",
                  Authorization : 'Bearer '+token
                },
            };

            async function getData(){

                let remainder = await fetch("http://localhost:8080/list/remainder", requestOptions)
                  .then(response => {
                      return response.json();
                  }).then(
                      data => {
                        setremainder(data)
                      }
                 
                  )
                    }
                    useEffect( () => {
                        getData();
                      }, []);
                      let handleUserInput

      

      const chenge = event => {
        event.preventDefault();
        
     let item = {
        id: uuidv1(),
        item: selectt,
        amount : inputamount,
        price : parseInt(inputprice),
        button: 
        <HighlightOffIcon onClick={()=>Delete(item.id)} />
     }
     setInputAmount('')
     setInputprice('')
      setProducts((prevState) => [... prevState, item])
      }
      const Delete = (A) =>{
        let id=A
        setProducts((prevState) =>
     prevState.filter((products) => products.id!==id)
     )
      }
            let sum = 0;
        for(let i =0; i<products.length;i++){
            sum = products[i].price + sum
           
        }
 
      const Send = event =>{
      for(let i = 0; i<products.length; i++){
        products[i].button = null
        products[i].id = null
       
      }
  
        
        setProducts([])
        const token = localStorage.getItem('token')
        const data = { nameUser, sum, date, products };
        const requestOptions = {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization : 'Bearer '+token
            },
            body: JSON.stringify(data)
        };

        fetch("http://localhost:8080/list/addlist", requestOptions)
            .then(response => {
                return response.json();
            }).then(
                data => {
                    if(data){ 
                      getData()
            alert('Заказ успешно добавлен в систему')

        } else{
          alert('При обработке заказа произошел сбой')
        }
                }
            )
           
              }

    const content = (
        <>
            <NavStor />
            <div className="tablerem">
                <thead>
            <h1>Остаток на складе </h1>
            </thead>
            <tbody>
                        {remainder.map((item)=>(
                            <tr  key={item.id}>
  
             
             <td><h1>{item.item} :</h1></td>
             <td><h1>{item.amount}</h1></td>
             <td><h1>{item.unit}</h1></td>
             </tr>
          ))}
          </tbody>
          
      <Modal show={show} onHide={handleClose}>
        <form onSubmit={chenge}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body >
          <h4>Выберите позицию:</h4>
          <select value={selectt} className="selectmod" onChange={handleselect}>
            <option selected value="">- - -</option>
              <option value="сливки">Сливки</option>
              <option  value="сироп">Сироп</option>
              <option  value="зерно">Зерно</option>
              <option  value="молоко">Молоко</option>
          </select>
        <h4>Введите количество:</h4>
        <input type="number" value={inputamount} onChange={handleinputamount} className="selectmod"  />
        <h4>Введите цену:</h4>
        <input type="number" value={inputprice} onChange={handleinputprice} className="selectmod"  />
       </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="select_date" variant="success"  onClick={handleClose}>
            Добавить в заказ
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

          </div>
<div>



          
      <table className="item_list" >
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption><AddCircleOutlineIcon fontSize="large" onClick={handleShow} /></caption>
        
        <TableHead>
          <TableRow>
            <TableCell>Наименование</TableCell>
            <TableCell align="right">Количесство</TableCell>
            <TableCell align="right">Цена</TableCell>
            <TableCell align="right"><AddTaskIcon fontSize="large"  onClick={Send}/></TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.button}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>

          </table>
         
          </div>
        </>

    )

    return content
}
export default AddList

