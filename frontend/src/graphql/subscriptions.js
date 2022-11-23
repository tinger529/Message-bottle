import { gql } from '@apollo/client';

export const MESSAGE_SUBSCRIPTION = gql`
    subscription message(
        $chatBoxName: String!
    ) {
        message(
            chatBoxName: $chatBoxName
        ) {
            mutation
            message{
                sender{
                    username
                }
                body
            }
        }
    }
`;

export const FRIEND_SUBSCRIPTION = gql`
    subscription friend(
        $username1: String!,
        $username2: String!
    ) {
        friend(
            username1: $username1,
            username2: $username2
        ) {
            mutation
            lastmsg{
                sender{
                    username
                }
                body
            }
        }
    }
`;