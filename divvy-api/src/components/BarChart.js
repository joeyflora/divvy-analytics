import React, { useState, useEffect } from 'react';
// import * as d3 from 'd3';
import {Bar} from 'react-chartjs-2';
    
const BarChart = ({ dataSet, labels, maxSet, chartTitle, dataLabel }) => {
    const [chartLabels, setChartLabels] = useState({
        chartData:{
            labels: ['loading'],
            datasets:[
                {
                    label:'Cost Per Trip',
                    data: [0,1]
                }
            ],
        }
    })
    useEffect( ()=> {
    setChartLabels({...chartLabels,
        chartData:{
            labels: labels,
            datasets:[
                {
                    label:dataLabel,
                    data: dataSet,
                    backgroundColor: '#3db7e4'
                }
            ],
        }
    })
}, [labels, dataSet])
    
    return (
            <div>
                <Bar data={chartLabels.chartData} 
                    options={{
                        maintainAspectRatio:true,
                        title: {
                            display: true,
                            text: chartTitle
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        min:0,
                                        // max: maxSet,
                                        // stepSize: 500
                                    }
                                }
                            ]
                        }
                    }} 
                />
            </div>
    )
}

    export default BarChart;