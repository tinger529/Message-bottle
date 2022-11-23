import React from 'react';
import { useState , useEffect , useCallback} from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Upload, message, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function Push({step, onstep}){

    /*自動切換至下一頁 */
    const nextstep = useCallback(() => {
        onstep(3)
    }, [onstep])


    const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        }
        console.log(info);
        setFiles(props);
        console.log(files);
    },
    };

    const [files, setFiles] = useState(props);

    /*render 畫面 */
    return (
    <div className="upload"> 
    <Card title="Great! It is almost completed! You can upload files here if needed." >
        <Upload {...files}>
        <Button icon={<UploadOutlined />}>Click here to Upload</Button>
        </Upload>
        <p></p>
        <Button className="send_package" onClick={() => {
        alert("Done uploading");
        nextstep();
    }}>Done</Button>
    </Card>
    <p></p>
    </div>
    )
}

export default Push;