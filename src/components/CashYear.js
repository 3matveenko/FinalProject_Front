import React from "react";
import Button from 'react-bootstrap/Button';
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

const CashYear = () => {
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

let count = 0
  
  let newData = [];
  newData = cash.listsum;
   if(cash.listsum){
  count = cash.listsum[0] + cash.listsum[1]
   }

  const lineChartData = {
    labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    datasets: [
      {
        data: newData,
        label: "Выручка",
        borderColor: "#3333ff",
        fill: true,
        lineTension: 0.5
      },
    ]
  };
  
  return (
    <>
    <div className="username2">
    <h3>Выберите диапазон дат для аналитики:</h3>
 
   <form className="date_d" onSubmit={handleSubmit}>
  <input className="date_picker" type="date"  value={datStart} onChange={start} />
  <h1> / </h1>
  <input className="date_picker" type="date"  value={datEnd}  onChange={end} />
  <Button type="submit" variant="primary" className="select_date" > Выбрать</Button>
  </form>

  <h3>Выручка: {count}</h3>
  </div>
  <div className="chart">
  <Line
      type="line"
      width={160}
      height={60}
      options={{
        title: {
          display: true,
          text: "COVID-19 Cases of Last 6 Months",
          fontSize: 2000
        },
        legend: {
          display: true, //Is the legend shown?
          position: "top" //Position of the legend.
        }
      }}
      data={lineChartData}
    />
  </div>

  </>

  );
};
export default CashYear;