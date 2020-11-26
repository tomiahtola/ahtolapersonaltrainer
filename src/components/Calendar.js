import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher, 
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment'

function Calendar() {
    const currentDate = moment().toISOString();
    const views = ['week','day','month'];
    const [training, setTraining] = useState([]);

    function getTraining() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTraining(data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getTraining();
        
    }, [])

    console.log(training)

    return (
        <Paper>
        <Scheduler
            data={training}
            defaultCurrentDate={currentDate}
            defaultCurrentView="week"
            views={views}
            height={600}
            showAllDayPanel={false}
            firstDayOfWeek={1}
            startDayHour={8}
            endDayHour={18}
        >
            <ViewState />
            <WeekView
                startDayHour={8}
                endDayHour={18}
            />
            <DayView />
            <MonthView />
            <Toolbar />
            <ViewSwitcher />
        </Scheduler>
      </Paper>
    )
}
export default Calendar;
