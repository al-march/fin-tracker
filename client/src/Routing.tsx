import { Route, Routes } from 'solid-app-router';
import { Component } from 'solid-js';
import { PageAuth, PageHome, PageNotFound } from '@app/pages';

export const Routing: Component = () => {
  return (
    <Routes>
      <Route path={`/`} element={<PageHome/>}/>
      <Route path={`/auth`} element={<PageAuth/>}/>

      <Route path="/*all" element={<PageNotFound/>}/>
    </Routes>
  );
};
