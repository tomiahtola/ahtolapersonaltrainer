/*
  Date: 06.11.2020
  Author: Tomi Ahtola
  Info: Frontend Development course project
  Topic: Personal Trainer App
*/

import './App.css';
import React, { useState } from 'react';
import { Tab, Tabs } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import FitnessCenterRoundedIcon from '@material-ui/icons/FitnessCenterRounded';

import Home from './components/Home';
import Customerlist from './components/Customerlist'
import Traininglist from './components/Traininglist'

function App(props) {
  const [value, setValue] = useState("one");

  const handleChange= (event, value) => {
    setValue(value);
  };
  return (
    <div className="App">
          <AppBar position="static">
      <Toolbar>
          <Typography variant="h5">
            <div><p>Personal Trainer app</p></div>
          </Typography>
        </Toolbar>
      <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon label simple tabs example">
        
    <Tab icon={<HomeRoundedIcon />} value="one" label="Home" />
    <Tab icon={<ContactsRoundedIcon />} value="two" label="Customers" />
    <Tab icon={<FitnessCenterRoundedIcon />} value="three" label="Training" />
    <Tab icon={<CalendarTodayRoundedIcon />} value="four" label="Calendar" />
    </Tabs>
      </AppBar>
      {value === 'one' && <div><Home /></div> }
      {value === 'two' && <div><Customerlist /></div> }
      {value === 'three' && <div><Traininglist /></div> }
    {value === 'four' && <div>Calendar</div> }
    </div>
  );
}

export default App;
