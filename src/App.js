import React, { useEffect } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import { Routes, Route } from "react-router-dom";
import StartScreen from './components/StartScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Profile from './components/Profile';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
        if (userAuth) {
          dispatch(login({
            uid: userAuth.uid,
            email: userAuth.email
          }))
        } else {
          dispatch(logout())
        }
      }
    )
    return unsubscribe
  }, [dispatch])
  

  return (
    <div className="App">
      {!user ? <StartScreen /> : 
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
      }
    </div>
  );
}

export default App;
