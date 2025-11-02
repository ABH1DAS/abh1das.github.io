"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";

interface AuthFormProps {
  type: "citizen" | "authority";
  mode: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type, mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // For GitHub Pages static hosting, we'll use local storage to simulate authentication
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      if (mode === "login") {
        const user = users.find((u: any) => 
          u.email === email && 
          u.password === password && 
          u.role === type
        );

        if (!user) {
          throw new Error("Invalid credentials");
        }

        localStorage.setItem("user", JSON.stringify(user));
        router.push(`/${type}/dashboard`);
      } else {
        // Register
        if (users.some((u: any) => u.email === email)) {
          throw new Error("Email already exists");
        }

        const newUser = {
          id: `user-${Date.now()}`,
          email,
          password,
          name,
          role: type,
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push(`/${type}/dashboard`);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : mode === "login" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
};

export default AuthForm;
