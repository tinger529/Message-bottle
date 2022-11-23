
import './App.css';
import { useState} from 'react';
import Beginning from './container/beginning';
import Read from './container/Read'
import Chat from './container/Chat'


function App() {

  const [init, setInit] = useState(0);
  const [init2, setInit2] = useState(0);
  const [init3, setInit3] = useState(0);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [checkpass, setCheckpass] = useState("");
  const [mode, setMode] = useState(0);
  const [seaorbox, setSeaorbox] = useState("")
  /*                                          */
  /*                 起始畫面                  */ 
  /*                                          */
  const [inin, setInin] = useState(false)
  const [chatwparticular,setChatwparticular] = useState(false)




  return(
    <>
    {
      (seaorbox === "sea")?<Read username = {account} setSeaorbox = {setSeaorbox}/>:
      (seaorbox === "box")?<Chat usr = {account} inin = {inin} chatwparticular = {chatwparticular} setChatwparticular = {setChatwparticular} setSeaorbox = {setSeaorbox}/>:
      <Beginning init = {init} setInit = {setInit} init2 = {init2} setInit2 = {setInit2} init3 = {init3} setInit3 = {setInit3}
              account = {account} setAccount = {setAccount} password = {password} setPassword = {setPassword} checkpass = {checkpass} 
              setCheckpass = {setCheckpass} mode = {mode} setMode = {setMode} seaorbox = {seaorbox} setSeaorbox = {setSeaorbox}  setChatwparticular = {setChatwparticular} />
    }
    </>
  )
}

export default App;
