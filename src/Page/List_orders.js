        import React from "react"
        import Button from 'react-bootstrap/Button';
        import { useState, useEffect } from "react";
        import NavCashier from "../components/NavCashier";
        import Table from '@mui/material/Table';
        import TableBody from '@mui/material/TableBody';
        import TableCell from '@mui/material/TableCell';
        import TableContainer from '@mui/material/TableContainer';
        import TableHead from '@mui/material/TableHead';
        import TableRow from '@mui/material/TableRow';
        import Paper from '@mui/material/Paper';
        import moment from "moment";

        const ListOrders = () => {

        let [orders, setOrders] =  useState([])
        let [order_details, setOrder_details] = useState([])
        const username = localStorage.getItem('username')
        const ruDate = new Intl.DateTimeFormat(
        "ru",
        {day: "numeric", month: "long", year: "numeric", weekday: "long"})
        .format(new Date())
        .replace(/(\s?\г\.?)/, "")
        const date =  moment().format('YYYY-MM-DD')

        const token = localStorage.getItem('token')
        const data = { date };
        const requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization : 'Bearer '+token
        },
        body: JSON.stringify(data)
        };

        async function getData(){

        let orders = await fetch("http://localhost:8080/order/all", requestOptions)
        .then(response => {
        return response.json();
        }).then(
        data => {
        setOrders(data)
        }

        )
        }
        useEffect( () => {
        getData();
        }, []);

        let summ = orders
        let count = 0
        for(let i=0;i<summ.length; i++){
        count = orders[i].sum + count
        }
        const Details =(id) =>{
        const data = { id };
        const requestOptionsid = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization : 'Bearer '+token
        },
        body: JSON.stringify(data)
        };

        fetch("http://localhost:8080/order/get_by_id", requestOptionsid)
        .then(response => {
        return response.json();
        }).then(
        data => {
        setOrder_details(data)
        }

        )
        }

        const content = (
<div>
<NavCashier />
<div className="username">
<h3>На смене: {username}</h3>
<h3>{ruDate}</h3>
<h3>Выручка за сегодня: {count}</h3>
<h3>Заказы на сегодня:</h3>


</div>
<div className="display_flex">
<div className="list_orders">

<TableContainer  component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="caption table">
<caption>{orders.length} заказов за сегодня</caption>
<TableHead>
<TableRow>
<TableCell>Номер заказа</TableCell>
<TableCell align="center">Имя кассира</TableCell>
<TableCell align="center">Сумма заказа</TableCell>
<TableCell align="center">Посмотреть детали</TableCell>

</TableRow>
</TableHead>
<TableBody>
          {orders.map((row) => (
<TableRow key={row.name}>
<TableCell component="th" scope="row">
        {row.id}
</TableCell>
<TableCell align="center">{row.username}</TableCell>
<TableCell align="center">{row.sum}</TableCell>

<TableCell align="center"><Button variant="success" className="button_def" onClick={()=>Details(row.id)}>Детали заказа</Button></TableCell>

</TableRow>
        ))}
</TableBody>
</Table>
</TableContainer>
</div>
{order_details.itemsMenu ?
<div>
<table className="details_order" >
        {order_details.itemsMenu.map((item)=>(
<tr  key={item.id}>


<td><h3>{item.itemMenuName}</h3></td>
<td><h3>{item.price}</h3></td>

</tr>
        ))}
</table>
</div>
        : null}
</div>

</div>
        )
        return content
        }
        export default ListOrders