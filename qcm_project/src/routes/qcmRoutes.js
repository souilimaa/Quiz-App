import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EtudiantHome from '../Component/EtudiantHome';
function QcmRoutes(){
return(
    <>

    <Routes>
        <Route path="/" element={<EtudiantHome/>}
        ></Route>
       <Route path="/QCMs/:id" element={<EtudiantHome/>}>
        </Route>
    </Routes>

    </>

)
}
export default QcmRoutes;