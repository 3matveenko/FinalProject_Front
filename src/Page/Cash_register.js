import React from "react"
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import CloseButton from 'react-bootstrap/CloseButton';
import { v1 as uuidv1 } from 'uuid';
import NavCashier from '../components/NavCashier'
import moment from "moment";



    
            

const CashRegister = () => {
  const date =  moment().format('YYYY-MM-DD')
            let [itemsMenu, setitemsMenu] =  useState([])

            const username = localStorage.getItem('username')
            
            const AddItem =(A, B, C) =>{

               let newItem = {
                   id : uuidv1(),
                   itemMenuName: B,
                   price : C,
                   button: <CloseButton onClick={()=>DeleteI(newItem.id)} aria-label="Hide" />
               }
            
            setitemsMenu((prevState) => [... prevState, newItem])
    
  
           };
           let sum =0
           const DeleteI = (A) =>{
            let id=A
            setitemsMenu((prevState) => prevState.filter((itemsMenu) => itemsMenu.id!==id))

          }
       
    
      for(let i=0;i<itemsMenu.length;i++){
        sum = itemsMenu[i].price + sum
      }

      const Delete = () =>{
        setitemsMenu([])


      }
      const Send = event =>{
        setitemsMenu([])
        for(let i =0; i<itemsMenu.length; i++){
          itemsMenu[i].button = null
          itemsMenu[i].id = null
        }
        const token = localStorage.getItem('token')
        const data = { username, sum, date, itemsMenu };
        const requestOptions = {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization : 'Bearer '+token
            },
            body: JSON.stringify(data)
        };

        fetch("http://localhost:8080/order/add", requestOptions)
            .then(response => {
                return response.json();
            }).then(
                data => {
                    if(data){ 
            alert('Заказ успешно добавлен в систему')

        } else{
          alert('При обработке заказа произошел сбой')
        }
                }
            )
              }

    const content = (
        <div>
          <NavCashier />

      <div className="username">
        <h3>На смене: {username}</h3>
      </div>
      <div className="display_flex">
        <div className = "menu">
<table>
    <tbody>
    <tr>
        <td><Button variant="success" className="button_def" onClick={()=>AddItem(1,"эспрессо", 90)}>Эспрессо</Button></td>
        <td><label>90</label></td>
    </tr>
    <tr>
        <td><Button variant="success" className="button_def" onClick={()=>AddItem(1,"американо", 90)} >Американо</Button></td>
        <td><label>90</label></td>
    </tr>
    <tr>
        <td><Button variant="success" className="button_def" onClick={()=>AddItem(1,"капучино", 130)}>Капучино</Button></td>
        <td><label>130</label></td>
    </tr>
    <tr>
        <td><Button variant="success" className="button_def" onClick={()=>AddItem(1,"латте", 140)}>Латте</Button></td>
        <td><label>140</label></td>
    </tr>
    <tr>
        <td><Button variant="success" className="button_def" onClick={()=>AddItem(1,"ванильный_раф", 170)}>Раф ванильный</Button></td>
        <td><label>170</label></td>
    </tr>
    <tr>
        <td><Button variant="success"  className="button_def" onClick={()=>AddItem(1,"фирменный_раф", 190)}>Раф фирменный</Button></td>
        <td><label>190</label></td>
    </tr>
    </tbody>
</table>
            </div>
            <div className="order">
      
            <table className="order_table">
                
      <thead>
      <tr>
     
          <td><h3>Наименование</h3></td>
          <td><h3>Цена</h3></td>
          
        </tr>
      </thead>
      <tbody>
                        {itemsMenu.map((newItem)=>(
                            <tr  key={newItem.id}>
  
             <td><h3>{newItem.itemMenuName}</h3></td>
             <td><h3>{newItem.price}</h3></td>
             <td><h3>{newItem.button}</h3></td>
             </tr>
          ))}
          </tbody>
    </table>
                <div className="sum">
                    <h2>Сумма заказа: {sum}</h2>
                  <Button variant="success" className="button_def" onClick={Send}>Оформить заказ</Button>
                  <Button variant="danger" className="delete_order" onClick={Delete}>Отменить заказ</Button>
                </div>
            </div>
            </div>
        </div>
    )

    return content
}
export default CashRegister

