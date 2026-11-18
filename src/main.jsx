// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import { Toaster } from "sonner";

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//      <Toaster position="top-right" richColors />
//   </BrowserRouter>,
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { injectStore } from "./lib/axios";
import { PersistGate } from "redux-persist/integration/react";
import {  QueryClientProvider } from "@tanstack/react-query";


import { queryClient } from "./lib/utils";


injectStore(store);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </PersistGate>
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
