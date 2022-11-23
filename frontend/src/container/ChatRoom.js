import { Button, Input, Modal, Form, Tabs} from 'antd';
import Title from '../Components/Title';
import Message from '../Components/Message';
import { ChatBoxMessages } from '../Components/ChatBoxMessages';
import { useQuery } from '@apollo/client';
import { FRIENDS_QUERY } from "../graphql";
import { useState } from 'react';
import './Chat.css'

const chatboxnamedecompose = (chatBoxName) => {
    let tmp = chatBoxName.split('_')
    return tmp
}

const ChatRoom = (props) => {
    const { chatwparticular ,setChatlistdata, setChatwparticular, sendMessage, username, body, setBody, displayStatus, 
         chatBoxName, setChatBoxName} = props;
    
    const { loading, error, data,refetch} = useQuery(FRIENDS_QUERY, {variables:{username}});

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      }

    const urls = [`url("https://news.aut.ac.nz/__data/assets/image/0004/371569/bubbles-850x567.jpg")`,
    `url("https://d25tv1xepz39hi.cloudfront.net/2020-06-01/files/natural-light-sunset-beach_2044-tb.jpg")`
,`url("https://365psd.com/images/previews/dcf/psd-water-bubbles-56305.jpg")`]

    const [back_pic, setBack_pic] = useState(urls[0]);

    const change_page = () => {
        var temp = getRandomInt(3);
        console.log(temp);
        setBack_pic(urls[temp]);
        console.log(back_pic);
    }

    let two = chatboxnamedecompose(chatBoxName)
    const anotherUser = two[0] === username ? two[1] :two[0]

    return (
        <div style={{width: "100%",
        height: "100%", backgroundImage: back_pic,
        backgroundSize: 'cover'}}>
        <Title>
            <h1>{anotherUser}</h1>
            <Button type="primary" danger onClick={()=>{   
                setChatwparticular(true);
                setChatBoxName('');
                change_page();
            }}>
            back
            </Button>
        </Title>
        <ChatBoxMessages className="chat" username = {username} chatBoxName = {chatBoxName} chatwparticular = {chatwparticular}/>
        <Input.Search
        style={{width: '50vw'}}
            enterButton="Send"
            placeholder="Type a message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onSearch={async (msg) => {
                if (!msg) {
                    displayStatus({
                        status: 'Failed',
                        message: 'Please enter a message body.'
                    });
                    return;
                }
                let twonames = chatboxnamedecompose(chatBoxName)
                const receiver = twonames[0] === username?twonames[1]:twonames[0]
                await sendMessage({
                    variables: {
                        from: username,
                        to: receiver,
                        message: msg
                    },
                });
        //         setBody('');

        //         refetch()
        //         if (data) {
        //         let tmp = data.friends.map(i => {return {...i}})
        //         tmp.forEach((i)=>{i.unreadDot = false});    
        //         setChatlistdata(tmp)
        //         //console.log('in chatroom useeffect',data.friends)
        // }
            }}
        ></Input.Search>
        </div>
    )
}

export default ChatRoom;
