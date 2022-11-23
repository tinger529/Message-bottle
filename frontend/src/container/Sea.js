import React from 'react';
import { useState , useEffect , useRef, useCallback} from 'react';
import { useQuery, useMutation} from "@apollo/client";
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Space, Card, Button, Select, Tag } from 'antd';
import { GET_LETTERS_QUERY, CREATE_CHATBOX, CREATE_MESSAGE, MAKE_FRIEND } from "../graphql";
import { ConsoleSqlOutlined } from '@ant-design/icons';
import './Sea.css';
import './mailbox.css'
import music from '../music.mp3'

function Alldone({step, setStep, attr1, attr2, attr3, setAttr1, setAttr2, setAttr3, username, setSeaorbox}){

    const [art, setArt] = useState("Please select threes topic that you are interested in")
    const [title, setTitle] = useState("")
    const [sender, setSender] = useState({})
    const [paper, setPaper] = useState(`url("https://cdn.pixabay.com/photo/2015/02/19/14/16/old-paper-642132_1280.jpg")`);
    const [messagetosend, setMessagetosend] = useState("")

    const {data, refetch} = useQuery(GET_LETTERS_QUERY, {variables:{attr1:attr1, attr2:attr2, attr3:attr3},});
    const [createChatBox, {loading: createChatBoxLoading, error: createChatBoxError, data: createChatBoxData}] = useMutation(CREATE_CHATBOX);
    const [sendMessage, {loading: sendMessageLoading, error: sendMessageError, data: sendMessageData}] = useMutation(CREATE_MESSAGE);
    const [makeFriend, {loading: makefriendLoading, error: makefriendError, data: makefriendData}] = useMutation(MAKE_FRIEND);

    const { TextArea } = Input;
    const { Search } = Input;

    const sendOnClick = async() => {
        await makeFriend({ variables:{ name1 : sender.username, name2 : username } });
        await createChatBox({ variables:{name1 : sender.username, name2 : username} });
        await sendMessage({ variables:{from : username, to : sender.username ,message : messagetosend} });
        setSeaorbox("");
    }

    const onCancel = () => {
        setAttr1("Problem to Solve");
        setAttr2("");
        setAttr3("");
        setStep(1);
        setSeaorbox("");
        return;
    }

    const backmusic = (
        <audio src={music} autoPlay loop/>
    )

    const { Option } = Select;


    var show = (<><Layout style={{height:'100vh', width:'100vw' ,backgroundImage: `url("https://eastonialeopards.com/wp-content/uploads/2018/03/casey-900x589.jpg")`,
    backgroundSize: '100% 100%'}}>
        {step == 1 ?  <Card title="Select topics" style={{ width: '30vw', height: '70vh', marginLeft: 'auto', marginRight: 'auto', marginTop: '3vh'}} >
            <Select defaultValue="Problem to Solve" style={{ width: '15vw' }} onChange={(e) => {setAttr1(e)}}>
                <Option value="Problem to Solve">Problem to Solve</Option>
                <Option value="Sharing Feelings">Sharing Feelings</Option>
                <Option value="disabled" disabled>
                    Play Games
                </Option>
                <Option value="Send Data">Send Data</Option>
            </Select>
            <div style={{height: '10vh'}}></div>
            <Select defaultValue="About" style={{ width: '15vw' }} onChange={(e) => {setAttr2(e)}}>
                <Option value="About">About</Option>
                <Option value="Job">Job</Option>
                <Option value="School">School</Option>
                <Option value="Relationship">Relationship</Option>
                <Option value="Love">Love</Option>
                <Option value="Family">Family</Option>
                <Option value="Hobbies">Hobbies</Option>
                <Option value="Glossories">Glossories</Option>
            </Select>
            <div style={{height: '10vh'}}></div>
            <Card style={{ width: '15vw', height: '10vh'}} >
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-2vh', marginLeft: '-1vw'}}>
                    Selfdefined Attribute
                </div>
                <Input style={{ width: '14vw', height: '5vh', marginLeft: '-1.2vw'}} placeholder="Attribute..." allowClear value={attr3} onChange={(e) => {setAttr3(e.target.value)}} />
            </Card>
            <div style={{height: '10vh'}}></div>
            <Button style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={() => {
                console.log(attr1, attr2,attr3)
                refetch();
                console.log("data: ",data)
                if (data){
                    console.log(data);
                    setTitle(data.letters.title);
                    setArt(data.letters.content);
                    setSender(data.letters.sender)
                    console.log("sender :",data.letters.sender)
                    setStep(2)

                }}}>Search</Button>
        </Card> : <div className="final">

                    <div>
                    <Card title={title} style={{ margin: 'auto', width: '58vw', height: '49vh',backgroundImage: paper,
                        backgroundSize: 'cover', fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif' , fontSize: 20}} >
                        {art == 'Please select threes topic that you are interested in' ? <div style={{height: '38vh'}}>{art}</div> : <div style={{overflowY: 'scroll', height: '38vh'}}>{art}</div>}

                    </Card>
                    <div style={{textAlign: 'center'}}>
                <Button style={{marginTop: '3vh', marginRight:'2vmin'}} className='reply' type="dashed" danger size='large' onClick={onCancel}>
                    Cancel
                </Button>
                <Button style={{marginTop: '3vh'}} className='reply' type="dashed" size='large' onClick={()=>{sendOnClick()}}>
                    Send
                </Button>
            </div>
                    </div>
                    <TextArea className="textplace" placeholder='Reply...' style={{marginLeft: '5vw',marginTop: '10vh', width: '58vw', height: '50vh', fontSize: '100px'}} showCount maxLength={200} onChange={e => setMessagetosend(e.target.value)} />
            <div style={{height: '3vh'}}></div>
        </div>}
        {backmusic}
        </Layout>
    </>)
    return show
}

export default Alldone;


