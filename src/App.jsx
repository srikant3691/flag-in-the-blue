import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <main className="flex min-h-screen flex-col items-center justify-center p-4">
                Flag in the Blue
                <Button>DSCxOC</Button>
                
            </main>
        </ThemeProvider>
    );
}

export default App;
