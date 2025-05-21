import { HashRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home.jsx';
import LayoutBase from './layout/LayoutBase.jsx';
import Config from './pages/Config.jsx';
import Provider from './pages/Provider.jsx';
import LogsTable from './pages/Logs.jsx';
import ProviderLoader from './pages/ProviderLoader.jsx';

const Main = () => (
    <HashRouter>
    <Routes>
      <Route element={<LayoutBase />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/config" element={<Config />} />
        <Route path="/provider" element={<Provider />} />
        <Route path="/logs" element={<LogsTable />} />
        <Route path="/provider/:id" element={<ProviderLoader />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default Main;
