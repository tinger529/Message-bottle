import { message } from 'antd'
import axios from 'axios'

const instance = axios.create
({ baseURL: 'http://localhost:5000/api/create' })

/*尋找帳號 */
const find_account = async (account, password) => {
    try{
        const { data: { msg } } = await instance.get
        ('/find', { params: { account , password } })
        console.log(msg);
        return msg
    }
    catch(error){
        console.log(error.message);
        if(error.message === "Network Error"){
            return "server ERROR"
        }
        return "unexpected error, please try again later."
    }
}

/*註冊帳號 */
const create_account = async (account, password) => {
    try{
        const { data: { msg } } = await instance.get
        ('/create_acc', { params: { account , password } })
        console.log(msg);
        return msg
    }
    catch(error){
        console.log(error.message);
        if(error.message === "Network Error"){
            return "server ERROR"
        }
        return "unexpected error, please try again later."
    }
}

export {find_account, create_account}