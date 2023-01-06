import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {getSingleUser, getAllUsers} from './UserService';
import { Button, Row, Space } from 'antd';

function App() {
  
  const [users, setUsers] = useState()
  const [numberOfUsers, setNumberOfUsers] = useState(0)
  const [user, setUser] = useState();
  const [isLoading, setisLoading] = useState(false);

  const fetchAllUsers = () => {
    getAllUsers()
      .then(users => {
        setUsers(users.data);
        setNumberOfUsers(users.total);
      });
  }

  useEffect(() => {
    getAllUsers()
      .then(users => {
        setUsers(users.data);
        setNumberOfUsers(users.total)
      });
  }, [])

  const fetchSingleUser = (id) => {
    getSingleUser(id)
      .then(user => {
        // rendercard(user.data);
        setUser(user.data);
        setisLoading(false);
      });
  }
  
  fetchAllUsers();

  const usermap = [];
  for (let index = 0; index < numberOfUsers; index++) {
    usermap[index] = index+1;
  }

  const singleUserdata = (userData) =>{
    setisLoading(true);
    fetchSingleUser(userData);
  }

  const renderUserButtons = () => {
      return <div>
        <Row>
       { usermap.map((userData) => (
          <button className="button" key={userData} onClick={() => singleUserdata(userData)}>{userData}</button> //
      ))}</Row>
      </div>
    }

  return (
    <div className="App">
      <header className="App-header">
      {user?
      <div className="card" >
        {isLoading?<center><div class="loader"></div></center>:
        <div className="card1">
          <img className="img" src={user.avatar} alt="Avatar" ></img>
          <div className="container">
            <h4><b>{user.first_name +" "+user.last_name}</b></h4>
            <p>{user.email}</p>
          </div>
        </div>}
      </div>:
      <div>
        <h5>Please click on a button below to see the information.</h5>
      </div>}
      <br/>
        {renderUserButtons()}
      </header>
    </div>
  );
}

export default App;
