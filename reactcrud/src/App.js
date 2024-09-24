import { useState } from 'react';
import './App.css';
import ALert from './components/ALert';
import Home from './components/Home';
import Navbar from './components/Navbar';
import CrudState from './context/crud/crudState';
import DeleteAlert from './components/DeleteAlert';

function App() {
  const [alert,setAlert] = useState(null);

  const showALert = (message,type)=>{
    setAlert({
      msg:  message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  

 
  return (
    <>
      <CrudState>
        <Navbar />
        <ALert alert={alert}/>
        
        <Home showALert={showALert} />
      </CrudState>
    </>
  );
}

export default App;
