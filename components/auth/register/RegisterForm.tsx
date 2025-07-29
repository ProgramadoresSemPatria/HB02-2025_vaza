'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RegisterFormSchema, { RegisterFormSchemaType } from '@/lib/validators/RegisterFormSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Image from 'next/image'
import { useSignup } from '@/hooks/auth/useSignup'

export default function RegisterForm() {
  const signup = useSignup()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const onSubmit = (data: RegisterFormSchemaType) => {
    signup.mutate(data)
  }

  const isSubmitting = signup.isPending


  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <Image src="/vaza-logo.webp" alt="Vaza Logo" width={100} height={100} className="mx-auto" />
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>
          Join Vaza to start planning your journey
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              {...register('fullName')}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

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
              {...register('email')}
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
                type={'password'}
                placeholder="Create a password"
                {...register('password')}
                aria-invalid={!!errors.password}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              >
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Creating Account...'
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="font-medium text-primary hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}