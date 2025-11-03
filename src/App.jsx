import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import RegisterUser from "./firebase/register/register.jsx";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        {/* Flag in the Blue
        <Button>DSCxOC</Button> */}
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegisterUser />} />
        </Routes>
      </main>
    </ThemeProvider>
  );
}

export default App;
