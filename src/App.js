import './App.css';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './component/Navbar';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import ProductsPage from './pages/ProductsPage';
import { CartContext } from './CartContext';
import { useEffect, useState } from 'react';



function App() {
  const [cart,setCart]= useState({})

  useEffect(() => {;
    const cart=window.localStorage.getItem('cart')
    setCart(JSON.parse(cart));

  },[])

  useEffect(() => {
    window.localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])




  return (
    <div className="container">
    <Router>
    <CartContext.Provider value={{cart,setCart}}>
    <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={ProductsPage} exact />
        <Route path="/cart" component={Cart} />
        <Route exact path="/products/:_id" component={SingleProduct} />
      </Switch>
      </CartContext.Provider>
    </Router>
    </div>
  );
}

export default App;
