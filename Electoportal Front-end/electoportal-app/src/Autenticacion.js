import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const loginAction = (data) => {
        if (data.username === "admin" && data.password === "12345") {
            setUser(data.username);
            setToken(data.password);
            localStorage.setItem("site", data.password);
            navigate("/dashboard_admin");
        }else if(data.username === "digitador" && data.password === "12345"){
            setUser(data.username);
            setToken(data.password);
            localStorage.setItem("site", data.password);
            navigate("/dashboard_digitador");
        }else if(data.username === "callcenter" && data.password === "12345"){
            setUser(data.username);
            setToken(data.password);
            localStorage.setItem("site", data.password);
            navigate("/dashboard_callcenter");
        }
        throw Error("Usuario no encontrado");
    };
    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/login");
    };
    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
//Hook personalizado
export const useAuth = () => {
    return useContext(AuthContext);
};

