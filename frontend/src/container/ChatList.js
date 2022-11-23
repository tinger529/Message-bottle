import { useEffect, useState } from 'react';
import 'react-chat-elements/dist/main.css';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {ConversationList, Conversation,Avatar} from "@chatscope/chat-ui-kit-react";
import {format,} from'timeago.js';
import { useQuery } from '@apollo/client';
import { FRIENDS_QUERY } from "../graphql";
import { Button } from 'antd'

export default ({chatwparticular, setChatwparticular, setChatBoxName, currentUser, chatlistdata, setChatlistdata, setSeaorbox}) => {
    const [friendsInfo,setFriendsInfo] = useState([])

    const makeName = (name1, name2) => {
        const temp = [name1, name2].sort().join('_');
        console.log(temp);
        return [name1, name2].sort().join('_');
    };
    const chatBoxName = makeName("123","456")
    
    //const { loading, error, data, subscribeToMore } = useQuery(FRIENDS_QUERY, {variables:{username: currentUser}});
    
    
    // const onClick = (e,friendName) => {
    //     // setChatwparticular(true)
    //     // setChatBoxName(makeName())
    //     console.log(e.target)
    // }
    // useEffect(()=>{
    //   refetch()
    //   try{
    //     setChatlistdata(data.friends)
    //   }catch(e){}
        
    // },[chatwparticular])
    const { loading, error, data,refetch} = useQuery(FRIENDS_QUERY, {variables:{username: currentUser}});
    useEffect(()=>{
      refetch()
      try{
        //let difference = data.friends.filter((i)=>chatlistdata.includes({lastmsg:i.lastmsg}))
        console.log("data.friends : ",data)
        console.log("chatlistdata : ", chatlistdata)
        //console.log('difference : ',difference)
        //let tmp = data.friends.map(i => {return {...i}})
        //let tmp2 = data.friends.map((i)=>{return  [i.friendName, i.lastmsg]})
        // let tmp = []
        // for(let i = 0; i < data.friends.length; ++i){
        //   tmp.push([data.friends[i].friendName, data.friends[i].lastmsg.sender.username, data.friends[i].lastmsg.body])
        // }
        // console.log(tmp)
        // tmp.forEach(element => {
        //   return {friendName: element.friendName, lastmsg: element.lastmsg}
        // });
        //console.log('tmp2 : ',tmp2[0])
        //tmp.forEach(i => {i.[[Prototype]]});
        setChatlistdata(data.friends)
      }
      catch(e){}
    },[chatwparticular])
    return(
        <div>
                <ConversationList>        
                  {console.log(chatlistdata)}
                  <div className="board">
                       Chat list:
                        </div>
                   { 
                      chatlistdata.map(({friendName, lastmsg},i)=>
                        {
                        return (
                          <div className="board">
                        <Conversation key = {i} name={friendName} lastSenderName={lastmsg.sender.username} 
                                    info = {lastmsg.body} 
                                    onClick = {() => {
                                        setChatBoxName(makeName(currentUser,friendName))
                                        setChatwparticular(false)
                                    }} 
                                    lastActivityTime={<span style={{
                                        color: "teal"
                                      }}>{format(lastmsg.timestamp)}</span>} >
                            {/* <Avatar src={null} name={friendName} /> */}
                        </Conversation>
                        </div>)
                        }
                      )
                  }                  
                </ConversationList>
                <Button type="primary"  onClick={()=>{   
                setSeaorbox("")
                }}>
                back
                </Button>
                </div>
    )
}