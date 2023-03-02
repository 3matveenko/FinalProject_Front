import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AddList from './Page/AddList'
import Login from './features/auth/Login'
import Welcome from './Page/Welcome'
import RequireAuth from './features/auth/RequireAuth'
import RoleAdmin from './features/auth/RoleAdmin'
import  ListOrders from './Page/List_orders'
import Register from './features/auth/Registr'
import CashRegister from './Page/Cash_register'
import Composition from './Page/Composition'
import RoleStorekeeper from './features/auth/RoleStorekeeper'
import Lists from './Page/Lists'
import Wokers from './Page/woker_list'



function App() {
  return (

    <Routes>

      <Route path="register" element={<Register />} />
      <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/cash_register" element={<CashRegister />} />
          <Route path="/list_orders" element={<ListOrders />} />
          <Route element={<RoleStorekeeper />}>
          <Route path="/composition" element={<Composition />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/add_list" element={<AddList />} />
              <Route element={<RoleAdmin />}>
                <Route path="/" element={<Layout />}>
                <Route path="wokers" element={<Wokers />} />
                <Route path="welcome" element={<Welcome />} />
              </Route>
              </Route>
          </Route>
        </Route>
    </Routes>

  
  )
}

export default App;
