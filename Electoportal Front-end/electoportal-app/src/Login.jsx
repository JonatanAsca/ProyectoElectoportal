import { useState } from "react";
import { useAuth } from "./Autenticacion";
import "./style/Login.css";
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import Logo from "./img/Logo.jpeg";
import Candidato from "./img/politico.jpg";

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            try {
                auth.loginAction(input);
            } catch (error) {
                setMensaje(error.message);
            }
            return;
        }
        alert("El usuario y la contraseña es obligatorio");
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
          <div className="container" id="container">
            <div className="form-container sign-up">
              <form>
                <h1>Create Account</h1>
                <div className="social-icons">
                  <a href="#" className="icon"><FaGooglePlusG /></a>
                  <a href="#" className="icon"><FaFacebookF /></a>
                  <a href="#" className="icon"><FaGithub /></a>
                  <a href="#" className="icon"><FaLinkedinIn /></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="button">Sign Up</button>
              </form>
            </div>
            <div className="form-container sign-in">

              <form onSubmit={handleSubmitEvent}>

                <h1>Iniciar Sesion</h1>
                <div className="social-icons">
                  <a href="#" className="icon"><FaGooglePlusG /></a>
                  <a href="#" className="icon"><FaFacebookF /></a>
                  <a href="#" className="icon"><FaGithub /></a>
                  <a href="#" className="icon"><FaLinkedinIn /></a>
                </div>
                <span>Utiliza el usuario para iniciar sesion</span>
                <input type="text"  id="user-name" name="username" onChange={handleInput} placeholder="User" />
                <input type="password"  id="password" name="password" onChange={handleInput} placeholder="Password" />
                <a href="#">Olvido la contraseña?</a>
                <button type="btn-submit">Iniciar sesion</button>

              </form>

            </div>

            <div className="toggle-container">
                <img src={Logo} style={{width: '150px'}} alt="Logo"/>
            </div>


          </div>
        </>
        
      );
        
};

export default Login;

