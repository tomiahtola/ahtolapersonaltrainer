import React from 'react';
import '../App.css';
import moment from 'moment'

function Home () {
    const thisdate = Date.now();
    let myDate = moment(thisdate).add(2, 'hours').utc().format('DD.MM.YYYY');
    
    let myTime = moment(thisdate).add(2, 'hours').utc().format('HH:mm');
    
    return (
        <div>
            <h1>This is the Home page</h1>
    <p>
        Today is: {myDate}<br></br>
        Time is: {myTime}
    </p>
        </div>
    );
}

export default Home;