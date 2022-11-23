import { gql } from '@apollo/client';

const LOGIN = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            status
            message
        }
    }
`;

const SIGNUP = gql`
    mutation signUp(
        $username: String!
        $password: String!
    ) {
        signUp(
            username: $username
            password: $password
        ) {
            status
            message
        }
    }
`;

const MAKE_FRIEND = gql`
    mutation makefriend(
        $name1: String!
        $name2: String!
    ) {
        makefriend(
            name1: $name1
            name2: $name2
        ) {
            status
            message
        }
    }
`;

const CREATE_CHATBOX = gql`
    mutation createChatBox(
        $name1: String!
        $name2: String!
    ) {
        createChatBox(
            name1: $name1
            name2: $name2
        ) {
            response{
                status
                message
            }
            chatBox{
                name
            }
        }
    }
`;

const CREATE_MESSAGE = gql`
    mutation createMessage(
        $from: String!
        $to: String!
        $message: String!
    ) {
        createMessage(
            from: $from
            to: $to
            message: $message
        ) {
            response{
                status
                message
            }
            message{
                sender{
                    username
                }
                body
            }
        }
    }
`;

const CREATE_LETTER = gql`
    mutation createletter(
        $username:String!
    )
    {
        createletter(username:$username){
        status
        message
    }
}
`

const SAVE_ATTRIBUTE = gql`
    mutation saveattribute(
        $username:String!
        $content:String!
        $title:String!
        $tex:String!
        $art1:String!
        $art2:String!
        $art3:String!
    ) {
        saveattribute(
            username:$username
            content:$content
            title:$title
            tex:$tex
            art1:$art1
            art2:$art2
            art3:$art3
        ) {
            status
            message
        }
    }
`;



export {LOGIN, SIGNUP, CREATE_CHATBOX, CREATE_MESSAGE,CREATE_LETTER,MAKE_FRIEND,SAVE_ATTRIBUTE};


