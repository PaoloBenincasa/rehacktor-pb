import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const HorizontalBarChart = ({ ratings }) => {
    const data = {
        labels: ratings.map(rating => rating.title), 
        datasets: [
            {
                label: 'Percentuale',
                data: ratings.map(rating => rating.percent), // Percentuali
                backgroundColor: ['#6db533', '#0b577e', '#FFCE56', '#f93c4b'], // Colori personalizzabili
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y', // Imposta le barre in orizzontale
        responsive: true,
        plugins: {
            legend: {
                display: false, // Nasconde la legenda se non necessaria
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw}%`; // Mostra solo la percentuale
                    },
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true, // Inizia la scala da 0
                max: 100, // Imposta il massimo al 100%
                ticks: {
                    callback: function (value) {
                        return `${value}%`; // Mostra i valori in percentuale
                    },
                },
            },
        },
    };

    return (
        <div>
            {/* <h3>Valutazioni (Percentuali)</h3> */}
            <Bar data={data} options={options} />
        </div>
    );
};

export default HorizontalBarChart;
