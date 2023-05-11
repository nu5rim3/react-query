import React, { Suspense, useState } from 'react';
import { ConfigProvider, Space, Spin, theme } from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import Routes from './routes';
import Loader from './components/Loader';

function App() {



  return (
    <ConfigProvider
      // theme={{
      //   token: {
      //     colorPrimary: '#00b96b',
      //   },
      // }}
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
        algorithm: theme.compactAlgorithm
      }}
    >
      <Suspense fallback={<Loader />}>
        <Routes />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
