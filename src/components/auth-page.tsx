"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dyci from "../images/DYCI.png";

const images: string[] = [
  "https://www.benarnews.org/english/news/philippine/typhoon-flooding-11122020132940.html/201112-PH-typhoon-620.jpg/@@images/image",
  "https://www.volunteeringsolutions.com/blog/wp-content/uploads/2019/08/teaching-volunteer-in-Ghana.jpg",
  "https://alsonspower.com/wp-content/uploads/2019/07/COASTAL-CLEAN-UP.jpg",
];

interface FormData {
  email: string;
  password: string;
  name: string;
}

export function AuthPageComponent(): JSX.Element {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setShowImages(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formType: string) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = formType === "signin" ? "/api/auth/login" : "/api/auth/register";
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    setIsLoading(false);

    if (response.ok) {
        const data = await response.json();
        console.log(`${formType} successful:`, data);
        
        alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} successful!`);
      
    } else {
        const error = await response.json();
        console.error(`${formType} failed:`, error);
        
        alert(`Error: ${error.message || 'Something went wrong!'}`);
    }

    // Reset form data after submit
    setFormData({ email: "", password: "", name: "" });
};

  return (
    <div className="flex h-screen">
      <div
        className={`${
          showImages ? "w-full md:w-[40%]" : "w-full"
        } flex items-center justify-center bg-gray-100 transition-all duration-300`}
      >
        {" "}
        <Card className="w-[90%] max-w-[400px]">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <img
                src={dyci}
                alt="School Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form
                  className="space-y-4"
                  onSubmit={(e) => handleSubmit(e, "signin")}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-label="Email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      aria-label="Password"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                  <div className="text-center">
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form
                  className="space-y-4"
                  onSubmit={(e) => handleSubmit(e, "register")}
                >
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Name</Label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      aria-label="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-label="Email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      aria-label="Password"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <a href="/" className="text-sm text-gray-600 hover:underline">
              ← Go back to main website
            </a>
          </CardFooter>
        </Card>
      </div>
      {showImages && (
        <div className="hidden md:block w-[60%] relative overflow-hidden">
          {" "}
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Background ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
