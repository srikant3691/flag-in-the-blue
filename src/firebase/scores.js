import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { toast } from "react-hot-toast";

export async function submitScore(timeTaken, penalty) {
    const userId = localStorage.getItem("uid");
    if (!userId) {
        throw new Error("User is not logged in!");
    }
    const totalScore = timeTaken + penalty;
    try {
        const scoresCollRef = doc(db, "users", userId);
        await updateDoc(scoresCollRef, { totalScore: totalScore });
        console.log("Score submitted successfully!");
        toast.success("Score submitted successfully!");
    } catch (err) {
        toast.error("Failed to submit score");
        console.error("Error submitting score: ", err);
    }
}
