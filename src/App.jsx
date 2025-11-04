import FinalAnswerPopup from "./components/finish";

import OceanScene from "./components/OceanScene";
import { ThemeProvider } from "@/components/theme-provider";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const RegisterUser = lazy(() => import("./pages/register.jsx"));

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
