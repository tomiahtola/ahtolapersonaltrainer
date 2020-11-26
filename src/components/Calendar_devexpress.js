/* import React, { useState } from 'react';
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
    const currentDate = moment();
    const views = ['week','day','month'];
    const [appointments, setAppointments] = useState([]);
    const [training, setTraining] = useState([]);
    
    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTraining(data))
            .then(data => {
                return setAppointments(
                    data.map((training, index) => ({
                        id: index,
                        title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
                        end: moment.utc(training.date).add(data.duration, 'minutes')._d,
                        start: moment.utc(training.date)._d
                }))

                )

            })
            .catch(err => console.log(err));
    }

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
            <Appointments getTrainings={getTrainings}/>
        </Scheduler>
      </Paper>
    )
}
export default Calendar;
 */