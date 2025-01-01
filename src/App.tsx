import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home";
import Expenses from "./pages/expenses";
import Categories from "./pages/categories";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
