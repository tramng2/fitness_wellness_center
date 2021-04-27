import React from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Nav from './components/Nav'
import Home from './components/Home'
import Training from './components/Training'
import Calendar from './components/Calendar'
// import { DataContext } from './DataContext'
// import axios from "axios"

function App() {
  // const [{ links}, dispatch] = useContext(DataContext)

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data: { links } } = await axios
  //       .get('https://customerrest.herokuapp.com/api')
  //     dispatch({
  //       type: 'SET_LINK',
  //       links: links
  //     })
  //   }
  //   getData()
  // }, [dispatch])

  // const [customers] = links.filter(el => el.rel === "customers")

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Home />}></Route>
          <Route path="/training" render={() => <Training />}></Route>
          <Route path="/calendar" component={Calendar}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
