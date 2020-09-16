import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetail from './components/ProductDetails/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const userContext = createContext();

function App() {
   const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value = {[loggedInUser,setLoggedInUser]} >
       {/* <h2> email" {loggedInUser.email}"</h2> */}
       
       <Router>
         <Header></Header>
         <Switch>
           <Route exact path='/shop'>
              <Shop></Shop>
           </Route>
           <Route exact path='/review'>
              <Review></Review>
           </Route>
           <PrivateRoute exact path='/inventory'>
              <Inventory></Inventory>
           </PrivateRoute>
           <Route exact path='/login'>
              <Login></Login>
           </Route>
           <PrivateRoute exact path='/shipment'>
              <Shipment></Shipment>
           </PrivateRoute>
           <Route  path='/product/:productKey'>
              <ProductDetail></ProductDetail>
           </Route>
           <Route exact path='/'>
              <Shop></Shop>
           </Route>
           <Route path='*'>
              <h2> 4O4  not found</h2>
           </Route>
         </Switch>
       </Router>
    </userContext.Provider>
  );
}

export default App;
