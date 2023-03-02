import React from 'react';
import Button from 'react-bootstrap/Button';
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function Char() {
  let [cash, setCash] =  useState([])
  const [datStart, setdatStart] = useState('')
  const [datEnd, setdatEnd] = useState('')

  const start = (e) => setdatStart(e.target.value)
  const end = (e) => setdatEnd(e.target.value)

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
  fetch("http://localhost:8080/order/cash_year", requestOptions)
    .then(response => {
        return response.json();
    }).then(
        data => {
          setCash(data)
        }
   
    )

  }
  let items = []
  let amounts = []
  if(cash.listItems){ 
  for(let i= 0; i<cash.listItems.length; i++){
    items.push(cash.listItems[i].name)
    amounts.push(cash.listItems[i].amount)

  }
}
  const labels = items;
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: amounts,
        backgroundColor: '#7aaee2',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Продано позиций',
      },
    },
  };
  
 
  return (
    <>
     <div className="username2">
    <h3>Выберите диапазон дат для аналитики:</h3>
 
   <form className="date_d" onSubmit={handleSubmit}>
  <input className="date_picker" type="date"  value={datStart} onChange={start} />
  <h1> / </h1>
  <input className="date_picker" type="date"  value={datEnd}  onChange={end} />
  <Button type="submit" variant="success" className="select_date" > Выбрать</Button>
  </form>
  </div>
  <div className="chart">
  <Bar options={options} data={data} />
  </div>
  
  </>
  )
}
