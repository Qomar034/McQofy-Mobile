import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://9ae2-103-162-63-86.ap.ngrok.io', //Use Ngrok
    cache: new InMemoryCache(),
});

export default client