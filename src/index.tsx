import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VisualizationList from './Components/VisualizationList';
import VisualizerConfigerer from './Components/VisualizerConfigerer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <VisualizationList />
  },
  {
    path: "/:id",
    element: <VisualizerConfigerer />
  }
])

root.render(
  <RouterProvider router={router} />
);
