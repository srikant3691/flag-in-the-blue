import { useState } from "react";
import { db } from "../firebase/firebase.jsx";
import { collection, query, where, getDocs} from "firebase/firestore";
import bcrypt from "bcryptjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function loginUser() {
   const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    //query to check if user exists
    const q = query(collection(db, "users"), where("phone", "==", phone));
    const snap = await getDocs(q);
    if (snap.empty) {
        alert("Phone number not registered!");
        return;
    }

    // check password
    let userData; 
    snap.forEach((doc) => {
      userData = doc.data();
    });

    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      alert("Invalid password!");
      return;
    }

    alert("User logged in successfully!");
    setPhone("");
    setPassword("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-50">
      <Card className="w-[400px] shadow-lg ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Login Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="pl-3">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2" >
              <Label htmlFor="password" className="pl-3">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}



