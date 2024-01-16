import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EtudiantHome from '../Component/EtudiantHome';
import ListQcm from '../Component/listQcm'
import QcmDisplay from'../Component/QcmDisplay'

function QcmRoutes(){
return(
    <>

    <Routes>
        <Route path="/" element={<EtudiantHome/>}
        ></Route>
       <Route path="/QCMs/:id/:nom" element={<ListQcm/>}>
        </Route>
        <Route path="/QCM/QUIZ/:qcmId" element={<QcmDisplay/>}>
        </Route>
    </Routes>

    </> 

)
}
export default QcmRoutes;