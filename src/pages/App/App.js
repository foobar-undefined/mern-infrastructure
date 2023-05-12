
import './App.css';
import { useState } from 'react';
import Nav from '../../components/Nav/Nav';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import { Route, Routes } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

function App() {
  const [user, setUser ] = useState(getUser());
  return (
    <main className="App"> 
      {user ? (
        <> 
       <Nav user = {user}/>
          <Routes>
              <Route path='/orders/new' element = {<NewOrderPage />}/> 
              <Route path='/orders' element = {<OrderHistoryPage />}/> 
          </Routes>
          </>
        ):(
          <AuthPage path="/" setUser={setUser}/>
        )}
    </main>
  );
}

export default App;
