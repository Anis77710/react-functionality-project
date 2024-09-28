import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Contex from './utils/Contex.jsx'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <Contex>

    <BrowserRouter>

       <App />
       <ToastContainer />

    </BrowserRouter>

  </Contex>
  
)
