import { useState } from "react";
import { db } from "../firebase/firebase.js";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
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
import { Toaster, toast } from "react-hot-toast";

export default function registerUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleRegister(e) {
    setLoading(true);
    try {
      e.preventDefault();
      const { name, email, phone, password } = formData;

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address!");
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phone)) {
        toast.error("Please enter a valid 10-digit phone number!");
        return;
      }

      const usersRef = collection(db, "users");

      const phoneQuery = query(usersRef, where("phone", "==", phone));
      const emailQuery = query(usersRef, where("email", "==", email));

      const [phoneSnap, emailSnap] = await Promise.all([
        getDocs(phoneQuery),
        getDocs(emailQuery),
      ]);

      if (!phoneSnap.empty) {
        toast.error("Phone number already registered!");
        return;
      }

      if (!emailSnap.empty) {
        toast.error("Email already registered!");
        return;
      }

      const hashed = await bcrypt.hash(password, 10);

      await addDoc(collection(db, "users"), {
        name,
        phone,
        password: hashed,
        email,
      });

      toast.success("User registered successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      toast.error("Some error occurred");
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-50">
      <Toaster />
      <Card className="w-[400px] shadow-lg ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="pl-3">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => updateField("name")(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="pl-3">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateField("email")(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="pl-3">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => updateField("phone")(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="pl-3">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => updateField("password")(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading...." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
