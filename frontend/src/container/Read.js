import './Sea.css';
import { Layout } from 'antd';
import {useState} from "react";
import Sea from "./Sea";
import mainlogo from "./MSB.png";

function App({username, setSeaorbox}) {
    const [step, setStep] = useState(1);
    const [attr1, setAttr1] = useState("Problem to Solve");
    const [attr2, setAttr2] = useState("2");
    const [attr3, setAttr3] = useState("");

    const { Header, Content, Footer, Sider } = Layout;


    function next(){
        setStep(prev => prev + 1);
    }
    function back(){
        setStep(prev => prev - 1);
    }

    var info = {
        content: 'haha',
        title: 'hello',
        texture: 'texture',
        attr: 'Job'
    }

    var page = (


        <Layout className="red" style={{height:'100vh', width:'100vw'}}>
            <Layout>
                <div>
                    <Header className="logo" style={{ padding: "3vh", height: '18vh', marginTop: "0vh" , marginBottom: "0vh"}}>
                        <img src={mainlogo} width={100}/>
                    </Header>
                    <Sea step={step} setStep={setStep} attr1={attr1} attr2={attr2} attr3={attr3} 
                        setAttr1={setAttr1} setAttr2={setAttr2} setAttr3={setAttr3} username = {username} setSeaorbox = {setSeaorbox}/>

                </div>
            </Layout>
        </Layout>


    );

  return (
      <div>
          {page}
      </div>

  );
}

export default App;
