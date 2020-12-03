import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, Cell, CartesianGrid,
    XAxis, YAxis, Tooltip, Legend, LabelList
  } from 'recharts';
import _ from 'lodash';
import '../App.css';

function Statistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => FormatData(data.content))
            .then(formattedData => setData(formattedData))
            .catch(err => console.log(err));
    }
   
    const FormatData = (data) => {
    let formattedData = _(data).groupBy('activity')
                        .map((objects, name) => (
                                    {
                                    'activity': name,
                                    'duration': _.sumBy(objects, 'duration')
                                    }
                                )
                            ).value();
    return formattedData;
    }

    console.log(data)


     return (
        <div id="container">
                <div className="bar-charts"width="99%" style={{ textAlign: 'left'}}>
                    <div className="bar-chart-wrapper" style={{ textAlign: 'right' }}>
                            <BarChart data={data} width={1024} height={512} fill="#3950B6" margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                <XAxis dataKey="activity" />
                                <YAxis yAxisId="a" />
                                <YAxis yAxisId="b" orientation="right" />
                                <Legend />
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Bar yAxisId="a" dataKey="duration" name="Duration "fill="#3950B6">
                                <LabelList fill="#FFFFFF" angle={-45} />
                                {
                                    data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill="#00000"/>
                                    ))
                                }
                                </Bar>  
                            </BarChart>
                    </div>
                </div>
        </div>
    );

};
export default Statistics;
