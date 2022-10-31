import React from 'react';
import 'antd/dist/antd.min.css'
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoMatch from './pages/NoMatch';
import CaseItem from './components/CaseItem';
import Dashboard from './components/Dashboard';
import CaseList from './components/CaseList';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

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
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route element={<Home />}>
            <Route path="/*" element={<Dashboard />}></Route>
            <Route path="/cases" element={<CaseList />}></Route>
            <Route path="/cases/:id" element={<CaseItem />}></Route>
          </Route>
          <Route path="*" element={<NoMatch />}></Route>
        </Routes>
      </StoreProvider>

    </ApolloProvider>
  );
};


export default App;
