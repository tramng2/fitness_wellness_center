import React, { useEffect, useContext } from 'react'

import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Nav from './components/Nav'
import Home from './components/Home'
import Trainning from './components/Tranning'
import Calendar from './components/Calendar'
import { DataContext } from './DataContext'
import axios from "axios"

function App() {
  const [{ links, customerInfo }, dispatch] = useContext(DataContext)
  useEffect(() => {
    const getData = async () => {
      const { data: { links } } = await axios
        .get('https://customerrest.herokuapp.com/api')
      dispatch({
        type: 'SET_LINK',
        links: links
      })
    }
    getData()
  }, [dispatch])
 
  const [customers] = links.filter(el => el.rel === "customers")

  useEffect(() => {
    if (customers) {
      const getCustomerInfo = async () => {
        const {data : { content }} = await axios
          .get(customers.href)
        dispatch({
          type: 'SET_CUSTOMER_INFO',
          customerInfo: content
        })
      }
      getCustomerInfo()
    }
  }, [customers, dispatch])
// console.log("line40",customers );
// console.log("line41",links );

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} customerInfomation={customerInfo}/>}></Route>
          <Route path="/trainning" component={Trainning}></Route>
          <Route path="/calendar" component={Calendar}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
