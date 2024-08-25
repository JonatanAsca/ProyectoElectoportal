import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import AuthProvider from "./Autenticacion";
import PrivateRoute from "./PrivateRoute";
import Dashboard_admin from "./pages/administrador/Dashboard_admin";
import Dashboard_digitador from "./pages/digitador/Dashboard_digitador";
import Dashboard_callcenter from "./pages/callcenter/Dashboard_callcenter";
import Digitador from "./pages/administrador/Digitadores";
import Callcenter from "./pages/administrador/Callcenter";
import AdminLideres from "./pages/administrador/Lideres";
import AdminVotantes from "./pages/administrador/Votantes";
import CallLideres from "./pages/callcenter/Lideres";
import CallVotantes from "./pages/callcenter/Votantes";
import DigLideres from "./pages/digitador/Lideres";
import DigVotantes from "./pages/digitador/Votantes";

import Contacto from "./pages/callcenter/contacto";

function App() {
  return (
    <div className="">
      <AuthProvider>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard_admin" element={<Dashboard_admin />} />
          </Route>
          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard_digitador" element={<Dashboard_digitador />} />
          </Route>

          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard_callcenter" element={<Dashboard_callcenter />} />
          </Route>

          <Route path="/administrador/Digitadores" element={< Digitador/>}/>

          
          <Route path="/administrador/Callcenter" element={< Callcenter/>}/>

          <Route path="/administrador/Lideres" element={< AdminLideres/>}/>

          <Route path="/administrador/Votantes" element={< AdminVotantes/>}/>

          <Route path="/callcenter/Lideres" element={< CallLideres/>}/>

          <Route path="/callcenter/Votantes" element={< CallVotantes/>}/>

          <Route path="/digitador/Lideres" element={< DigLideres/>}/>

          <Route path="/digitador/Votantes" element={< DigVotantes/>}/>

          <Route path="/Contacto" element={<Contacto/>}/>
          
        </Routes>
      </AuthProvider>
    </div>
  );
}


export default App;


