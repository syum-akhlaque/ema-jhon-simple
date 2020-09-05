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

function App() {
  return (
    <div className="App">
       <Header></Header>
       <Router>
         <Switch>
           <Route exact path='/shop'>
              <Shop></Shop>
           </Route>
           <Route exact path='/review'>
              <Review></Review>
           </Route>
           <Route exact path='/inventory'>
              <Inventory></Inventory>
           </Route>
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
    </div>
  );
}

export default App;
