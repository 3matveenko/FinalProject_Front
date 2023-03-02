import React from "react"
import Logout from "../components/Button_logout"
import NavAdmin from "./../components/NavAdmin"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom"
import CashYear from "../components/CashYear";
import { Char } from "../components/ItemChar";




const Welcome = () => {
 
    const content = (
        <div>
      <NavAdmin />
      <CashYear />
      </div>
      
    )
    return content
}
export default Welcome

