// App.jsx
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apollo"; // Ensure this is the correct path to your Apollo client instance
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
