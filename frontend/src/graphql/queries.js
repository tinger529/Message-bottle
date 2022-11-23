import { gql } from "@apollo/client";

export const GET_LETTERS_QUERY = gql`
  query letters(
  $attr1: String!
  $attr2: String!
  $attr3: String!) {
    letters(
    attr1: $attr1,
    attr2: $attr2,
    attr3: $attr3,
    ) {
      sender{
        username
      }# TODO 2 Please modify the query to get more properties
      title
      content
      texture
      
    }
  }
`;
export const MESSAGES_QUERY = gql`
    query messages(
        $chatBoxName: String!
    ) {
        messages(chatBoxName: $chatBoxName) {
            sender {
                username
            }
            body
        }
    }
`;

export const FRIENDS_QUERY = gql`
    query friends(
        $username: String!
    ) {
        friends(username: $username) {
            friendName
            lastmsg{
                sender{
                    username
                }
                body
                timestamp
            }
        }
    }
`;

export const TMPATTR = gql`
query tmpattr(
    $username: String!
) {
    tmpattr(username: $username) {
      content
      title
      texture
      attr1
      attr2
      attr3
    }
    
}
`;
