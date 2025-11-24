"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in with:", formData);
    // TODO: Connect to backend API
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex w-full items-center justify-center bg-white px-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-blue-900">Welcome Back</h1>
            <p className="text-blue-700">Sign in to MedLink360</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="antoine@soch.at"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="h-12 rounded-lg border border-blue-300 bg-blue-50"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="h-12 rounded-lg border border-blue-300 bg-blue-50"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-lg bg-blue-700 text-white hover:bg-blue-800 font-medium"
            >
              Sign In
            </Button>

            <p className="text-center text-sm text-blue-700">
              Don’t have an account?{" "}
              <Link href="/auth/signup" className="font-medium hover:underline">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Wavy Image Placeholder */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-blue-200 rounded-tl-[60%] clip-path-[polygon(0_0,100%_0,100%_100%,0_80%)]">
            {/* Replace this div with your zigzag/wave image */}
          </div>
        </div>
      </div>
    </div>
  );
}
