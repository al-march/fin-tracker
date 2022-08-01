import { Route, Routes } from 'solid-app-router';
import { Component } from 'solid-js';
import { PageHome } from './pages/home/PageHome';
import { PageAuth } from './pages/auth/PageAuth';
import { PageNotFound } from './pages/not-found/PageNotFound';

export const Routing: Component = () => {
  return (
    <Routes>
      <Route path={`/`} element={<PageHome/>}/>
      <Route path={`/auth`} element={<PageAuth/>}/>

      <Route path="/*all" element={<PageNotFound/>}/>
    </Routes>
  );
};
