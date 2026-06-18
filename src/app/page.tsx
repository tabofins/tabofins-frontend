"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/landing/Hero";
import Trust from "../components/landing/Trust";
import Njangi from "../components/landing/Njangi";
import Transfers from "../components/landing/Transfers";
import Savings from "../components/landing/Savings";
import Ecosystem from "../components/landing/Ecosystem";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModalbackup";

export default function Home() {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);

  return (
    <>
      <Navbar
        onLogin={() => setAuthMode("login")}
        onSignup={() => setAuthMode("signup")}
      />
      <main>
        <Hero
          onGetStarted={() => setAuthMode("signup")}
          onLogin={() => setAuthMode("login")}
        />
        <Trust />
        <Njangi />
        <Transfers />
        <Savings />
        <Ecosystem onGetStarted={() => setAuthMode("signup")} />
      </main>
      <Footer />
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitch={(m) => setAuthMode(m)}
        />
      )}
    </>
  );
}
