import { NavLink } from "react-router-dom";
import { useAuth } from "../../Autenticacion";
import "../../style/Dashboard.css";
import React, { useState, useEffect } from 'react';
import Politico from "../../img/politico.jpg";
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
const Dashboard_callcenter = () => {
    const auth = useAuth();

    const [barData, setBarData] = useState({
        labels: ['Lideres', 'Votantes'],
        datasets: [
            {
                label: 'Usuarios Registrados',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
            },
        ],
    });

    const [pieData, setPieData] = useState({
        labels: ['Activos', 'Inactivos'],
        datasets: [
            {
                label: 'Estado de Usuarios',
                data: [],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [lideresResponse, votantesResponse] = await Promise.all([
                    axios.get('http://localhost:3001/administrador/Lideres/'),
                    axios.get('http://localhost:3001/administrador/Votantes/')
                ]);

                setBarData(prevState => ({
                    ...prevState,
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: [
                                lideresResponse.data.data.length,
                                votantesResponse.data.data.length
                            ]
                        }
                    ]
                }));

                const activosCount = lideresResponse.data.data.filter(usuario => usuario.estado === 'activo').length
                    + votantesResponse.data.data.filter(usuario => usuario.estado === 'activo').length;

                const inactivosCount = lideresResponse.data.data.filter(usuario => usuario.estado === 'inactivo').length
                    + votantesResponse.data.data.filter(usuario => usuario.estado === 'inactivo').length;

                setPieData(prevState => ({
                    ...prevState,
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: [activosCount, inactivosCount]
                        }
                    ]
                }));
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <h1 className="navbar-title">Electoportal</h1>
                <ul className="nav-list">
                    <li><NavLink to="/dashboard_callcenter" activeClassName="active-link" className="nav-link">Inicio</NavLink></li>
                    <li><NavLink to="/callcenter/Lideres" activeClassName="active-link" className="nav-link">Lideres</NavLink></li>
                    <li><NavLink to="/callcenter/Votantes" activeClassName="active-link" className="nav-link">Votantes</NavLink></li>
                </ul>
                <button onClick={() => auth.logOut()} className="btn-logout">Cerrar sesión</button>
            </nav>
            <div className="content">
                <h3 className="welcome-message">Bienvenido! {auth.user}</h3>
                <div className="statistics">
                    <div className="chart">
                        <h4>Usuarios Registrados</h4>
                        <Bar data={barData} options={{ responsive: true }} />
                    </div>
                    <div className="chart">
                    <h4>Candidato</h4>
                        <img src={Politico} alt="Logo" style={{width: '150px'}}/>
                        <h6>Estado de usuarios</h6>
                        <Pie data={pieData} options={{ responsive: true }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard_callcenter;