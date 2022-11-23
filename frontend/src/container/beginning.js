import logo from '../MSB.png';
import music from '../music.mp3';
import Page1 from './Page1.js';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { SIGNUP,LOGIN } from '../graphql';
import '../App.css';
import './beginning.css';
import 'antd/dist/antd.css';


export default (props) =>{
const {init, setInit, init2, setInit2, init3, setInit3, account, setAccount, password, setPassword,
    checkpass, setCheckpass, mode, setMode, seaorbox, setSeaorbox, setChatwparticular} = props

const [login, {loading: loginLoading, error: loginError, data: loginData}] = useMutation(LOGIN)
const [signup, {loading: signupLoading, error: signupError, data: signupData}] = useMutation(SIGNUP)

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const submit = async() => {
      console.log("password: ",password)
    const response = await login({variables:{
        username: account,
        password: password
    }});
    if(response.data.login.status != "Failed"){
      setInit2(1);
      message.success(`${account} login successfully`)
    }
    else{
        console.log("wrong account");
        message.error(`Wrong account or password`);
    }
}

const addacc = async() => {
  if(checkpass != password){
    message.error(`Inconsistent password and password confirmation!`);
    return;
  }
  const response = await signup({variables:{
    username: account,
    password: password
}});
    if(response != "Failed"){
      console.log(response);
      setInit3(0);
      message.success(`${account} create successfully`)
    }
    else{
        console.log("wrong account");
        message.error(`Username already exist, please try another one`);
    }
}

  const backmusic = (
    <audio src={music} autoPlay controls loop/>
  )

  const beginning = (
    <div>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Begin">Click on to Begin</div>
    </div>
  )

  const home = (
    <div>
      <div className="Begin">Login to Begin</div>
      <p/>
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        style={{color: 'white'}}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input style={{height: '4vh', width: '16vw'}} value={account} onChange={(e)=>{setAccount(e.target.value)}}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password style={{height: '4vh', width: '16vw'}} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={()=>{submit()}}>
          Submit
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{
          offset: 8,
          span: 16,
        }} className="ask" onClick={()=>{setInit3(1)}}><div>first time? create account</div></Form.Item>
    </Form>
    </div>
  );

  const set = (
    <div>
      <div className="Begin">Create Account</div>
      <p/>
      <Form
      name="basic"
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 20,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        style={{color: 'white', width: '30vw'}}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input style={{height: '4vh', width: '16vw'}} value={account} onChange={(e)=>{setAccount(e.target.value)}}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password style={{height: '4vh', width: '16vw'}} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Item>

      <Form.Item
        label="Password confirm"
        name="password confirm"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password style={{height: '4vh', width: '16vw'}} value={checkpass} onChange={(e)=>{setCheckpass(e.target.value)}}/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={()=>{addacc()}}>
          Submit
        </Button>
        <Button style={{margin: '2vw'}} type="primary" htmlType="back" onClick={()=>{setInit3(0)}}>
          Back
        </Button>
      </Form.Item>
    </Form>
    </div>
  );

  const [backurl, setBackurl] = useState(`url("https://www.10wallpaper.com/wallpaper/2560x1600/1606/Summer_blue_ocean_scenery_HD_desktop_wallpaper_03_2560x1600.jpg")`);
  //const [backkey, setBackkey] = useState(0);
  
  //backurl = `url("https://www.10wallpaper.com/wallpaper/2560x1600/1606/Summer_blue_ocean_scenery_HD_desktop_wallpaper_03_2560x1600.jpg")`

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

  useEffect(()=>{
    //console.log(backurl);
    let backkey = getRandomInt(3);
    if(backkey === 0){
      setBackurl(`url("https://pic.52112.com/2019/05/22/JPG-190522_766/z43qZ3DGMF_small.jpg")`);
      //setBackkey(1);
    }
    else if(backkey === 1){
      setBackurl(`url("https://img-baofun.zhhainiao.com/fs/255e79ab044144ef647327bab8a72cd0.jpg")`);
      //setBackkey(2);
    }
    else{
      setBackurl(`url("https://www.10wallpaper.com/wallpaper/2560x1600/1606/Summer_blue_ocean_scenery_HD_desktop_wallpaper_03_2560x1600.jpg")`);
      //setBackkey(0);
    }
    
  })

  const main = (
    <div className="mainpage" style={{ 
      width: "100%",
      height: "100%",
    backgroundImage: backurl,
    backgroundSize: 'cover'
  }}
  >
    <div className="blocks">
      <div className="block" style={{backgroundImage: `url("http://srdesign.com.tw/design/data/attachment/forum/201308/07/121344eb4vtdvvegvot1b5.jpg")`,
    backgroundSize: '108%', opacity:"0.6"}} 
      onClick={()=>{setMode(1);console.log("hi")}} >Write Letter</div>
      <div className="block" style={{backgroundImage: `url("https://www.monmouth.edu/magazine/wp-content/uploads/sites/7/2018/06/26-Scuba-Diving-ORLA-ISTOCK-826245986.jpg")`,
    backgroundSize: '110% 130%', opacity: "0.6"}}  onClick={()=>{setSeaorbox("sea")}}>Explore the Sea</div>
      <div className="block" style={{backgroundImage: `url("https://www.itl.cat/pngfile/big/323-3236738_vintage-letters-postcard-eiffel-tower-vintage-photo-vintage.jpg")`,
    backgroundSize: '120% 120%', opacity: "0.6"}} onClick={()=>{setSeaorbox("box");setChatwparticular(true)}}>Mail Box</div>
    </div>
    {backmusic}
    </div>
  );

  const page = (
    <div>{mode === 0 ? main : <Page1 mode={mode} onmode={setMode} usr={account}/>}</div>
  )

  const log = (
    <div>{init3 === 0 ? home :set}</div>
  )

  const LOG1N = (
    <div>{init2 === 0 ? log : page}</div>
  )


  return (
    <div className="App" onClick={()=>{setInit(1)}}>
      <header className="App-header">
        {init === 0 ? beginning : LOG1N}
      </header>
    </div>
  );
  }