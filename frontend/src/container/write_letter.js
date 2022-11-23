import './Page1.css';
//import { store_page2 , render_page2 } from './axios.js';
import { useState , useEffect , useCallback} from 'react';
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Input, Button } from 'antd';
import { TMPATTR, SAVE_ATTRIBUTE } from '../graphql';
import { useMutation, useQuery } from '@apollo/client';
import { DashOutlined } from '@ant-design/icons';
/* https://ant.design/components/button/ */

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

function Write_letter({step, onstep, usr}){

    const [article, setArticle] = useState("");
    const [update, setUpdate] = useState(false)
    const [saveattribute, {loading: saveattributeLoading, error: saveattributeError, data: saveattributeData}] = useMutation(SAVE_ATTRIBUTE)
    const {data, refetch} = useQuery(TMPATTR, {variables:{username: usr}, });

    /*自動切換至下一頁 */
    const nextstep = useCallback(() => {
        onstep(2)
    }, [onstep])

    /*儲存版面內容 */
    const Save_page2 = async (art) => {
            console.log(data.title)
            console.log(data.texture)
        const response = await saveattribute({variables:{
            username:usr,
            title:data.tmpattr.title,
            tex:data.tmpattr.texture,
            content:art,
            art1:"",
            art2:"",
            art3:"",
        }});     
        alert("Content saved!");
        setUpdate(false)
        nextstep();
        
        
    }

    /*復原暫存的版面 */
    const Render_page2 = async() => {
        
        const {content} = data.tmpattr;
        if(content !== "")
            setArticle(content);
        
        else{
            console.log("render failed");
        }
    }

    useEffect(() => {
        if(!update){
            refetch()
            Render_page2();
            setUpdate(true)
        }   
      })

    /*render畫面 */
    var cont = (<div>
        <Content style={{ margin: '40px 50px 0'}}>
          <TextArea className="site-layout-background" rows={16} style={{padding:26, fontSize:'20px'}}
          placeholder="Content:"
          value={article}
          onChange={(e) => setArticle(e.target.value)}>
          </TextArea>
        </Content>
        <Button className="send_buttom" onClick={() => {
            Save_page2(article);
            nextstep();
    }}>Complete</Button>
      </div>)

    return cont;
    
}

export default Write_letter;