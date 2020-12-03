import React, { useState, useEffect } from 'react';
import moment from 'moment'
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

function MyCalendar() {
    const [calEvents, setCalEvents] = useState([]);
    const localizer = momentLocalizer(moment)

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(trainings => {
                return setCalEvents(
                    trainings.map((training, index) => ({
                        id: index,
                        title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
                        start: moment.utc(training.date)._d,
                        end: moment.utc(training.date).add(training.duration, 'minutes')._d                        
                }))

                )

            })
            .catch(err => console.log(err));
    }
    
    return (
        <Calendar
        events={calEvents}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
      />
    )
}
export default MyCalendar;
