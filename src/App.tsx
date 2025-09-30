import React, { useState } from "react";
import { SignupForm } from "./components/SignupForm";
import { LoadingScreen } from "./components/LoadingScreen";
import { Dashboard } from "./components/Dashboard";

type AppState = "signup" | "loading" | "dashboard";

export default function App() {
  const [currentState, setCurrentState] =
    useState<AppState>("signup");

  const handleSignup = () => {
    setCurrentState("loading");

    // Simulate loading time then redirect to dashboard
    setTimeout(() => {
      setCurrentState("dashboard");
    }, 3000); // 3 seconds loading time
  };

  if (currentState === "loading") {
    return <LoadingScreen />;
  }

  if (currentState === "dashboard") {
    return <Dashboard />;
  }

  return <SignupForm onSignup={handleSignup} />;
}