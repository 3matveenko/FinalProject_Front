import React from "react"
import Logout from "../components/Button_logout"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom"
import CashYear from "../components/CashYear";
import { Char } from "../components/ItemChar";
import NavStor from '../components/NavStorekeeper'



const Composition = () => {
 

    const content = (
        <div>
      <NavStor />
      <Char />
  
      </div>
      
    )
    return content
}
export default Composition

