import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase.jsx";
import { useEffect, useState, useMemo } from "react";
import { useCallback } from 'react';

function Leaderboard() {
  //DEFINING STATES
  const [board, setBoard] = useState([]);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const getScores = useCallback(async () => {
    try {
      //Defining collection reference
      const refScores = collection(db, "scores");
      const data = await getDocs(refScores);
      const scores = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBoard(scores);
      // console.log(scores);
    } catch (error) {
      console.error("Error fetching scores: ", error);
    }
  }, []);

  const getUserInfo = useCallback(async () => {
    try {
      //Defining collection reference
      const refUsers = collection(db, "users");
      const data = await getDocs(refUsers);
      const users = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setInfo(users);
    } catch (error) {
      console.error("Error fetching user info: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const combined = useMemo(() => {
    return board
      .map((score) => ({
        ...score,
        user: info.find((u) => u.id === score.userId),
      }))
      .sort((a, b) => a.timeTaken - b.timeTaken);
  }, [board, info]);

  // console.log(combined);

  useEffect(() => {
    getScores();
    getUserInfo();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time Taken</th>
            <th>Penalty</th>
          </tr>
        </thead>
        <tbody>
          {combined.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.user?.name || "Unknown User"}</td>
              <td>{entry.timeTaken}</td>
              <td>{entry.penalty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
