import { Route, Routes } from 'solid-app-router';
import { Component } from 'solid-js';
import { PageAuth, PageDashboard, PageHome, PageNotFound, PageProfile } from '@app/pages';

export const Routing: Component = () => {
  return (
    <Routes>
      <Route path={`/`} element={<PageHome/>}/>
      <Route path={`/auth`} element={<PageAuth/>}/>

      <Route path={`/dashboard`} element={<PageDashboard/>}/>
      <Route path={`/profile`} element={<PageProfile/>}/>

      <Route path="/*all" element={<PageNotFound/>}/>
    </Routes>
  );
};
