// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import RegisterForm from './fetures/auth/components/RegisterForm'
// import Login from './fetures/auth/pages/Login'

// const App = () => {
//   return (
//    <div>
//     <Routes>
//         <Route path='/register' element={<RegisterForm/>}/>
//         <Route path='/login' element={<Login/>}/>
//     </Routes>
//    </div>
//   )
// }

// export default App

import AppRoutes from "@/routes/AppRoutes";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(ref);
  // }, [dispatch]);
  return <AppRoutes />;
}

export default App;
