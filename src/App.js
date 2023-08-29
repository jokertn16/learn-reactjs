import './App.css';
import Product from './components/Product/Product';
import { useEffect, useState } from 'react';
import NewProduct from './components/NewProduct/NewProduct';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import AuthContext from './components/store/AuthContext';

function App() {
  const initialProducts = [
    {id: 1, title: 'Petrol Gas', amount: 2, date: new Date(2023, 8, 8)},
    {id: 2, title: 'Cinema', amount: 10, date: new Date(2022, 7, 4)},
    {id: 3, title: 'Coffee', amount: 5, date: new Date(2023, 4, 5)},
    {id: 4, title: 'Dinner', amount: 20, date: new Date(2023, 2, 6)},
  ];

  // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('is_login'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isValidAccount, setIsValidAccount] = useState(true);
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    if(localStorage.getItem('is_login') === '1') {
      setIsLoggedIn(true);
    }
  }, [])

  const loginHandler = (username, password) => {
    /// TO-DO: check login
    if(username === 'thu' && password === '123') {
      setIsLoggedIn(true);
      localStorage.setItem('is_login', '1')
      setIsValidAccount(true)
    } else {
      setIsValidAccount(false)
    }

  }
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem('is_login', '0')


  }
  // const [products, setProducts] = useState(initialProducts);

  // const loginHandler = (username, password) => {
  //   /// TO-DO: check login
  //   setIsLoggedIn(true);
  //   localStorage.setItem('is_login', true)
  // }
  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.setItem('is_login', false)

  // }

  const addProductHandler = (data) => {
    setProducts(previousState => {
      return [data, ...previousState];
    });
  }


  return (
    <AuthContext.Provider value={{ storeIsLoggedIn: isLoggedIn,  login: loginHandler , logout: logoutHandler }}>
      {isLoggedIn && 
        <Navigation  >
          <NewProduct onAddProduct={addProductHandler} />
          <Product products={products}></Product>
        </Navigation>
      }

      {!isLoggedIn && <Login isValidAccount={isValidAccount}/>}


      
    </AuthContext.Provider>
  );
}

export default App;
