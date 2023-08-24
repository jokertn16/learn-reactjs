import './App.css';
import Expense from './components/Expense/Expense';
import { useEffect, useState } from 'react';
import NewExpense from './components/NewExpense/NewExpense';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';

function App() {
  const initialExpenses = [
    {id: 1, title: 'Petrol Gas', amount: 2, date: new Date(2023, 8, 8)},
    {id: 2, title: 'Cinema', amount: 10, date: new Date(2022, 7, 4)},
    {id: 3, title: 'Coffee', amount: 5, date: new Date(2023, 4, 5)},
    {id: 4, title: 'Dinner', amount: 20, date: new Date(2023, 2, 6)},
  ];

  // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('is_login'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expenses, setExpenses] = useState(initialExpenses);

  useEffect(() => {
    if(localStorage.getItem('is_login') === '1') {
      setIsLoggedIn(true);
    }
  }, [])

  const loginHandler = (username, password) => {
    /// TO-DO: check login
    setIsLoggedIn(true);
    localStorage.setItem('is_login', '1')
  }
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.setItem('is_login', '0')


  }
  // const [expenses, setExpenses] = useState(initialExpenses);

  // const loginHandler = (username, password) => {
  //   /// TO-DO: check login
  //   setIsLoggedIn(true);
  //   localStorage.setItem('is_login', true)
  // }
  // const logoutHandler = () => {
  //   setIsLoggedIn(false);
  //   localStorage.setItem('is_login', false)

  // }

  const addExpenseHandler = (data) => {
    setExpenses(previousState => {
      return [data, ...previousState];
    });
  }

  return (
    <>
      {isLoggedIn && 
        <Navigation onLogout={logoutHandler} >
          <NewExpense onAddExpense={addExpenseHandler} />
          <Expense expenses={expenses}></Expense>
        </Navigation>
      }

      {!isLoggedIn && <Login onLogin={loginHandler} />}


      
    </>
  );
}

export default App;
