import React, { Component } from 'react';
import axios from 'axios';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://localhost:3001/administrador/lideres/";
//Complementos 
const urlBarrio = "http://localhost:3001/administrador/barrios/";
const urlMesas = "http://localhost:3001/administrador/mesasvotacion/";
const urlPuestos = "http://localhost:3001/administrador/puestovotacion/";
const urlDigitador = "http://localhost:3001/administrador/digitadores/";

class Lideres extends Component {

    state = {
        data: [],

        dataB: [],
        dataM: [],
        dataP: [],
        dataD: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            Cedula: '',
            Nombre: '',
            Apellido: '',
            Telefono: '',
            Correo: '',
            Id_barrio: 0,
            Id_mesa_votacion: 0,
            Id_puesto_votacion: 0,
            Id_digitadores: 0,
            tipoModal: ''
        },
    }



    //MOSTRAR
    peticionGet = () => {
        axios.get(url).then(response => {
            console.log(response.data.data);
            this.setState({ data: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //MOSTRAR BARRIO
    peticionGetBarrios = () => {
        axios.get(urlBarrio).then(response => {
            console.log(response.data.dataB);
            this.setState({ dataB: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //MOSTRAR MESAS DE VOTACION
    peticionGetMesas = () => {
        axios.get(urlMesas).then(response => {
            console.log(response.data.dataM);
            this.setState({ dataM: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //MOSTRAR PUESTOS DE BOTACION
    peticionGetPuestos = () => {
        axios.get(urlPuestos).then(response => {
            console.log(response.data.dataP);
            this.setState({ dataP: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //MOSTRAR DIGITADORES
    peticionGetDigitadores = () => {
        axios.get(urlDigitador).then(response => {
            console.log(response.data.dataD);
            this.setState({ dataD: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    handleChange = async e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'Cedula') {
            value = parseInt(value, 10); // Convertir a entero
        }
        if (e.target.name === 'id_administrador') {
            value = value ? parseInt(value, 10) : ''; // Convertir a entero si no está vacío, de lo contrario, dejar vacío
        }
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: value
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
        this.peticionGetBarrios();
        this.peticionGetMesas();
        this.peticionGetPuestos();
        this.peticionGetDigitadores();
    }


    render() {
        return (
            <div className='App'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Cedula</th>
                            <th>Nombre Lider</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Barrio</th>
                            <th>Mesa votacion</th>
                            <th>Puesto votacion</th>
                            <th>Digitador</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(lider => (
                            <tr key={lider.Cedula}>
                                <td>{lider.Cedula}</td>
                                <td>{lider.NombreLideres}</td> 
                                <td>{lider.Apellido}</td>
                                <td>{lider.Telefono}</td> 
                                <td>{lider.Correo}</td>
                                <td>{lider.NombreBarrio}</td>
                                <td>{lider.NumeroMesa}</td>
                                <td>{lider.PuestoVotacion}</td>
                                <td>{lider.NombreDigitador}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Lideres;
