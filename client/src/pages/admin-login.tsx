import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { adminLoginSchema, AdminLogin as AdminLoginType } from "@shared/schema";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const form = useForm<AdminLoginType>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: AdminLoginType) => {
    setIsLoggingIn(true);
    try {
      const response = await apiRequest("POST", "/api/admin/login", data);
      
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel",
        });
        setLocation("/admin");
      } else {
        const error = await response.json();
        toast({
          title: "Login Failed",
          description: error.message || "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsResetting(true);
    try {
      const response = await apiRequest("POST", "/api/admin/reset-password", {
        email: resetEmail,
      });

      if (response.ok) {
        toast({
          title: "Reset Email Sent",
          description: "Check your email for password reset instructions",
        });
        setShowForgotPassword(false);
        setResetEmail("");
      } else {
        const error = await response.json();
        toast({
          title: "Reset Failed",
          description: error.message || "Failed to send reset email",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Reset Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-trust-blue p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-dark-text">
            Assurly Admin
          </h1>
          <p className="text-professional-gray mt-2">
            Secure administrative access
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {showForgotPassword ? "Reset Password" : "Admin Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showForgotPassword ? (
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@assurly.io"
                      className="pl-10"
                      {...form.register("email")}
                    />
                  </div>
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      {...form.register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-trust-blue text-white hover:bg-blue-700"
                >
                  {isLoggingIn ? (
                    <div className="flex items-center">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-trust-blue hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="resetEmail"
                      type="email"
                      placeholder="admin@assurly.io"
                      className="pl-10"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  onClick={handlePasswordReset}
                  disabled={isResetting}
                  className="w-full bg-trust-blue text-white hover:bg-blue-700"
                >
                  {isResetting ? (
                    <div className="flex items-center">
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Sending reset email...
                    </div>
                  ) : (
                    "Send Reset Email"
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-sm text-trust-blue hover:underline"
                  >
                    Back to login
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-professional-gray">
          <p>© 2025 Assurly.io - Secure Admin Access</p>
        </div>
      </div>
    </div>
  );
}