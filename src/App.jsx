import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import HintBox from "./components/hints";
import FinalAnswerPopup from "./components/finish";
import CorrectAnswerPopup from "./components/correct";
import WrongAnswerPopup from "./components/wrong";

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <main className="flex min-h-screen flex-col items-center justify-center p-4">
                Flag in the Blue
                 <Button>DSCxOC</Button>
                 
                <FinalAnswerPopup/>
                {/* 
                <HintBox />
                <CorrectAnswerPopup/>
                
                <WrongAnswerPopup/>  */}


            </main>
        </ThemeProvider>
    );
}

export default App;
