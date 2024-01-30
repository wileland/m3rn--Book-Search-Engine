// App.jsx
import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/apollo"; // Import from the correct path
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
