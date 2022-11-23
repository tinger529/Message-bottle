import axios from 'axios'

const instance = axios.create
({ baseURL: 'http://localhost:4000/api/create' })

/*存取材質和標題 */
const store_page1 = async (title, tex, usr) => {
    try{
        const { data: { msg } } = await instance.get
        ('/store_tit', { params: { title , tex , usr} })
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

/*復原材質和標題 */
const render_page1 = async (usr) => {
    try{
        const { data: { msg } } = await instance.get
        ('/restore_tit', { params: {usr} })
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

/*存取信件內容 */
const store_page2 = async (art) => {
    try{
        const { data: { msg } } = await instance.get
        ('/store_art', { params: { art } })
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

/*還原信件內容 */
const render_page2 = async () => {
    try{
        const { data: { msg } } = await instance.get
        ('/restore_art', { params: null })
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

/*寄出信件 */
const send_letter = async(attr1, attr2, attr3) => {
    try{
        const { data: { msg } } = await instance.get
        ('/send_letter', { params: { attr1, attr2, attr3 } })
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

export { store_page1 , render_page1, store_page2 , render_page2, send_letter}