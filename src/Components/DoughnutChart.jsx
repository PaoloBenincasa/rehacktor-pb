import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ ratings }) => {
    const data = {
        labels: ratings.map(rating => rating.title), // Titoli delle categorie
        datasets: [
            {
                label: 'Percentuale',
                data: ratings.map(rating => rating.percent), // Percentuali
                backgroundColor: ['#6db533', '#0b577e', '#FFCE56', '#f93c4b'], // Colori personalizzabili
                hoverBackgroundColor: ['#5ca42d', '#094c6f', '#f7bd45', '#e1363f'], // Colori al passaggio del mouse
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // Posizione della legenda (es: 'top', 'bottom', 'left', 'right')

            },


            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw}%`; // Mostra la percentuale nel tooltip
                    },
                },
            },
        },
    };

    return (
        <div>
            {/* <h3>Valutazioni (Percentuali)</h3> */}
                <Doughnut 
                data={data} 
                options={options}
                />
               
          


        </div>
    );
};

export default DoughnutChart;
