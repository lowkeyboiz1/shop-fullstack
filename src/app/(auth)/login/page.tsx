'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Chrome, Lock, User, AlertCircle } from 'lucide-react'

const LoginPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
        general: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      username: '',
      password: '',
      general: ''
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Tên đăng nhập không được để trống'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Mật khẩu không được để trống'
    }

    setErrors(newErrors)
    return !newErrors.username && !newErrors.password
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials
      if (formData.username === 'khang' && formData.password === '123') {
        // Success - redirect to admin
        router.push('/admin')
      } else {
        // Failed - show error
        setErrors((prev) => ({
          ...prev,
          general: 'Tên đăng nhập hoặc mật khẩu không đúng'
        }))
      }
      setIsLoading(false)
    }, 800)
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    console.log('Google login clicked - logic to be implemented')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4'>
      <Card className='w-full max-w-md border-slate-200/50 shadow-xl'>
        <CardHeader className='space-y-1 text-center'>
          <div className='mb-4 flex items-center justify-center'>
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600'>
              <span className='text-xl font-bold text-white'>M</span>
            </div>
          </div>
          <CardTitle className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent'>Đăng nhập</CardTitle>
          <CardDescription className='text-slate-600'>Đăng nhập để truy cập trang quản trị</CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          {/* General Error */}
          {errors.general && (
            <div className='flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600'>
              <AlertCircle className='h-4 w-4' />
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Username Field */}
            <div className='space-y-2'>
              <label htmlFor='username' className='text-sm font-medium text-slate-700'>
                Tên đăng nhập
              </label>
              <div className='relative'>
                <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400' />
                <Input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='Nhập tên đăng nhập'
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`pl-10 ${errors.username ? 'border-red-500 focus-visible:ring-red-500/20' : ''}`}
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className='flex items-center gap-1 text-sm text-red-600'>
                  <AlertCircle className='h-3 w-3' />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <label htmlFor='password' className='text-sm font-medium text-slate-700'>
                Mật khẩu
              </label>
              <div className='relative'>
                <Lock className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400' />
                <Input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Nhập mật khẩu'
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pr-10 pl-10 ${errors.password ? 'border-red-500 focus-visible:ring-red-500/20' : ''}`}
                  disabled={isLoading}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute top-1/2 right-3 -translate-y-1/2 transform text-slate-400 hover:text-slate-600'
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                </button>
              </div>
              {errors.password && (
                <p className='flex items-center gap-1 text-sm text-red-600'>
                  <AlertCircle className='h-3 w-3' />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type='submit'
              className='w-full rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                  Đang đăng nhập...
                </div>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-slate-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-slate-500'>Hoặc</span>
            </div>
          </div>

          {/* Google Login Button */}
          <Button
            type='button'
            variant='outline'
            onClick={handleGoogleLogin}
            className='w-full rounded-md border-slate-300 px-4 py-2 font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50'
            disabled={isLoading}
          >
            <Chrome className='mr-2 h-4 w-4' />
            Đăng nhập bằng Google
          </Button>

          {/* Demo Info */}
          <div className='mt-6 rounded-md border border-blue-200 bg-blue-50 p-3'>
            <p className='mb-1 text-sm font-medium text-blue-700'>Thông tin đăng nhập demo:</p>
            <p className='text-sm text-blue-600'>
              Tên đăng nhập: <span className='font-mono font-bold'>khang</span>
            </p>
            <p className='text-sm text-blue-600'>
              Mật khẩu: <span className='font-mono font-bold'>123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
