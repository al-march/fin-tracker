import { Route, Routes } from 'solid-app-router';
import { Component } from 'solid-js';
import { PageHome } from './pages/home/PageHome';

export const Routing: Component = () => {
  return (
    <Routes>
      <Route path={`/`} element={<PageHome/>}/>
    </Routes>
  );
};
