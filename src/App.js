import React from 'react';
// import News from './components/News';
import styled, { createGlobalStyle } from 'styled-components';
import NewsList from './components/NewsList';

const GlobalStyle = createGlobalStyle`
  body{
    background:#ccc7c7;
  }
`;
function App() {
  console.log('App test');
  return (
    <div>
      <GlobalStyle />
      <NewsList />
    </div>
  );
}

export default App;
