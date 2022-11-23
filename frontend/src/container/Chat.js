import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {message as popUpMessage, Input} from 'antd';
import styled from 'styled-components';
import useChat from '../Hooks/useChat';
import ChatRoom from './ChatRoom';
import music from '../music.mp3'
import './Chat.css';
//import Tabs from './Tab';
import {
    LOGIN,
    SIGNUP,
    CREATE_CHATBOX,
    CREATE_MESSAGE,
} from "../graphql";
import ChatList from './ChatList.js';
import { FRIENDS_QUERY} from "../graphql";

const LOCALSTORAGE_KEY = "save-username";
const signIn_Key = "signIn";

function App({usr, inin, setInin, chatwparticular, setChatwparticular, setSeaorbox}) {
    const savedUsername = localStorage.getItem(LOCALSTORAGE_KEY);
    const isSignIn = JSON.parse(localStorage.getItem(signIn_Key));//localStorage is string fku
    const { logOut, isModalVisible, anotherUser, setAnotherUser, handleOk, handleCancel, activeKey, panes, onChange, onEdit, add} = useChat();
    const [username, setUsername] = useState(savedUsername || "");
    const [hashedPassword, setHashedPassword] = useState("");
    const [body, setBody] = useState('')  // textBody
    const [signedIn, setSignedIn] = useState(isSignIn || false);
    /*############################################################################*/
    const [chatBoxName, setChatBoxName] = useState('')
    const [chatlistdata, setChatlistdata] = useState([])
    // 弄個SETANOTHERUSER出來
    const [currentUser, setCurrentUser] = useState(usr)
    //const [inin, setInin] = useState(false)
    const [loginname, setLoginname] = useState('')

    const backmusic = (
        <audio src={music} autoPlay loop/>
      )

    const [login, {loading: loginLoading, error: loginError, data: loginData}] = useMutation(LOGIN);
    const [signUp, {loading: signUpLoading, error: signUpError, data: signUpData}] = useMutation(SIGNUP);
    const [createChatBox, {loading: createChatBoxLoading, error: createChatBoxError, data: createChatBoxData}] = useMutation(CREATE_CHATBOX);
    const [sendMessage, {loading: sendMessageLoading, error: sendMessageError, data: sendMessageData}] = useMutation(CREATE_MESSAGE);
    const { loading, error, data,refetch} = useQuery(FRIENDS_QUERY, {variables:{username: currentUser}});

    const displayStatus = (payload) => {
        // console.log(payload)
        if (payload.message) {
            const { status, message } = payload;
            const content = { content: message, duration: 1 };
            switch (status) {
                case 'Success':
                    if(message === 'Login Success'){
                        setSignedIn(true);
                    }
                    popUpMessage.success(content);
                    break;
                case 'Failed':
                    popUpMessage.error(content);
                    break;
                default:
                    break;
            }
        }
    };
    // useEffect(() => {
    //     refetch()
    //     if (data) {
    //     let tmp = data.friends.map(i => {return {...i}})
    //     tmp.forEach((i)=>{i.unreadDot = false});
    //     setChatlistdata(tmp)
    //       //console.log('in useeffect',data.friends)
    //     }
    //   }, [chatwparticular,inin])
    // useEffect(() => { 
    //     if(!signUpLoading&& !signUpError && signUpData!==undefined){
    //         displayStatus(signUpData.signUp)
    //     }
    // }, [signUpLoading, signUpError, signUpData]);
    // useEffect(() => { 
    //     if(!loginLoading&& !loginError && loginData!==undefined){
    //         displayStatus(loginData.login)
    //     }
    // }, [loginLoading, loginError, loginData]);
    // useEffect(() => { 
    //     if(!createChatBoxLoading&& !createChatBoxError && createChatBoxData!==undefined){
    //         displayStatus(createChatBoxData.createChatBox.response);
    //         if(createChatBoxData.createChatBox.response.status === 'Success'){
    //             handleOk();
    //             add(createChatBoxData.createChatBox.chatBox.name);
    //         }
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [createChatBoxLoading, createChatBoxError, createChatBoxData]);
    // useEffect(() => { 
    //     if(!sendMessageLoading&& !sendMessageError && sendMessageData!==undefined){
    //         displayStatus(sendMessageData.createMessage.response)
    //     }
    // }, [sendMessageLoading, sendMessageError, sendMessageData]);
    // useEffect(() => {
    //     if (signedIn) {
    //         localStorage.setItem(LOCALSTORAGE_KEY, username);
    //         localStorage.setItem(signIn_Key, true);
    //     }else{
    //         localStorage.setItem(signIn_Key, false);
    //     }
    // }, [signedIn, username]
    // );
    
    return (
        <div className="side" style={{width: "100%",
        height: "100%", backgroundImage: `url("https://www.pixeden.com/media/k2/galleries/236/002-bublle-ball-blow-clear-glossy-vector-psd.jpg")`,
        backgroundSize: 'cover'}}>
            {    chatwparticular?
                <ChatList setSeaorbox = {setSeaorbox} chatlistdata = {chatlistdata} setChatlistdata = {setChatlistdata} chatwparticular = {chatwparticular} setChatwparticular = {setChatwparticular} setChatBoxName = {setChatBoxName} currentUser = {currentUser}/>:
                <ChatRoom chatwparticular = {chatwparticular} setChatlistdata = {setChatlistdata} setChatwparticular = {setChatwparticular} sendMessage = {sendMessage} username = {currentUser} body = {body} setBody = {setBody} displayStatus = {displayStatus}
                chatBoxName = {chatBoxName} setChatBoxName = {setChatBoxName}
                />
            }
        {backmusic}
        </div>
    )
}

export default App
