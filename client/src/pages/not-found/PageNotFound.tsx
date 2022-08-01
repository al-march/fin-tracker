import { Component } from 'solid-js';
import { Link } from 'solid-app-router';

export const PageNotFound: Component = () => {
  return (
    <div class="hero min-h-screen" style="background-image: url(https://placeimg.com/1000/800/arch);">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
          <p class="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat
            ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <Link href="" class="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
};
