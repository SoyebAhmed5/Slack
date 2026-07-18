import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import AuthPage from "./pages/AuthPage";
import { Navigate, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <header>
      <Show when="signed-in">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </Routes>
      </Show>

      <Show when="signed-out">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to={"/auth"} replace />} />
        </Routes>
        {/* <SignInButton mode="modal" /> */}
        {/* <SignUpButton mode="modal" /> */}
      </Show>
    </header>
  );
};

export default App;
