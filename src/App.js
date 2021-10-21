import { useState } from 'react';
import './App.css';
import Dashboard from './component/Dashboard';
import Signin from './component/Signin';
import Signup from './component/Signup';

function App() {
  const [loggedin, setlog] = useState(false)
  const [signedup, setsign] = useState(false)
  const [logId, setId] = useState('')

  return (
    <div className="App">
      <header className="App-header"><div className='nav'> {loggedin ? <button onClick={()=>{setlog(false); setsign(true)}}>Logout</button> : ''}</div></header>
      {
        loggedin ? <Dashboard logid={logId}/> : 
                   signedup ? <Signin logid={logId} setid={setId} signed={setsign} log={setlog}/> : 
                              <Signup logid={logId} setid={setId} signed={setsign} log={setlog}/>
      }
    </div>
  );
}

export default App;
