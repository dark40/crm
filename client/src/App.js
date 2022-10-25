import React from 'react';
import 'antd/dist/antd.css';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';

// import pages and components
import Home from './pages/Home';
import Case from './pages/Case';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';

import { Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const App = () => {

  return (
    <ApolloProvider client={client}>

      <StoreProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/cases" element={<Case />}></Route>
          <Route path="/cases/:id" element={<Case />}></Route>
          <Route path="*" element={<NoMatch />}></Route>
        </Routes>
      </StoreProvider>

    </ApolloProvider>
  );
};


export default App;
