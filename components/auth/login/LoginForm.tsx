"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/auth/useLogin";
import LoginFormSchema, {
  LoginFormSchemaType,
} from "@/lib/validators/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = (data: LoginFormSchemaType) => {
    login.mutate(data);
  };

  const isSubmitting = login.isPending;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <Image
          src="/vaza-logo.webp"
          alt="Vaza Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your account to continue your journey
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">
              <Lock className="w-4 h-4" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={"password"}
                placeholder="Enter your password"
                {...register("password")}
                aria-invalid={!!errors.password}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              ></Button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              "Signing In..."
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
