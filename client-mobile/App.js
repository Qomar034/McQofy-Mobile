import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './components/BottomTab';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import client from './config';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <BottomTab/>
      </NavigationContainer>
    </ApolloProvider>
  );
}