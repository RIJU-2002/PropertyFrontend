"use client"
import Image from "next/image";
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Phone, User } from "lucide-react"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import axiosInstance from '@/lib/api/axios'
import { AuthResponse } from '@/lib/api/types'

export default function AuthPage() {
  
  const router = useRouter()
  const { login } = useAuth()
  const [mobileNumber, setMobileNumber] = useState('')
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [otpSent, setOtpSent] = useState(false)

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await axiosInstance.post('/auth/send-otp', {
        phone: mobileNumber,
      })
      setOtpSent(true)
      setStep('otp')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data } = await axiosInstance.post<AuthResponse>('/auth/verify-otp', {
        phone:mobileNumber,
        code:otp.join(""),
      })

      login(data.token, data.user)
      router.push('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteSignup = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Welcome ! Account created successfully.`)
  }

  const resetFlow = () => {
    setStep("phone")
    setOtp(["", "", "", "", "", ""])
    setError("")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <Image 
              src="/images/logo.jpeg" 
              alt="Samriddh Logo" 
              width={48} 
              height={48}
              className="rounded"
            />
            <span className="text-2xl font-semibold text-foreground tracking-widest uppercase">Samriddh</span>
          </div>

          <div className="space-y-6">
            {/* Step 1: Phone Number */}
            {step === "phone" && (
              <>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Welcome to EstateFlow</h1>
                  <p className="text-muted-foreground mt-1">Enter your mobile number to continue</p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="bg-secondary border-border text-foreground placeholder:text-muted-foreground pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">We&apos;ll send you a one-time verification code</p>
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Send OTP
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                  By continuing, you agree to our{" "}
                  <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {step === "otp" && (
              <>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Verify OTP</h1>
                  <p className="text-muted-foreground mt-1">
                    Enter the 6-digit code sent to {mobileNumber}
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-foreground">Enter OTP</Label>
                    <div className="flex gap-2 justify-between">
                      {otp.map((digit, index) => (
                        <Input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-12 text-center text-lg font-semibold bg-secondary border-border text-foreground"
                        />
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Verify OTP
                  </Button>

                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">
                      {"Didn't receive the code?"}{" "}
                      <button 
                        type="button"
                        className="text-primary hover:underline"
                      >
                        Resend OTP
                      </button>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetFlow}
                    className="w-full text-muted-foreground hover:text-foreground text-sm flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change phone number
                  </button>
                </form>
              </>
            )}

            {/* Progress Indicator */}
            <div
            className={`w-2 h-2 rounded-full ${
                step === "phone" ? "bg-primary" : "bg-muted"
            }`}
            />

            <div
            className={`w-2 h-2 rounded-full ${
                step === "otp" ? "bg-primary" : "bg-muted"
            }`}
            />
          </div>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:flex flex-1 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-12">
          <blockquote className="space-y-4">
            <p className="text-2xl font-medium text-foreground leading-relaxed text-balance">
              {'"'}EstateFlow made finding our dream home effortless. The platform is intuitive, and the team was incredibly supportive throughout the entire process.{'"'}
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">JD</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">Jennifer Davis</p>
                <p className="text-muted-foreground text-sm">Homeowner since 2024</p>
              </div>
            </footer>
          </blockquote>

          <div className="mt-12 grid grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold text-primary">15K+</p>
              <p className="text-muted-foreground text-sm">Properties Listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">8K+</p>
              <p className="text-muted-foreground text-sm">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-muted-foreground text-sm">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-2xl"></div>
      </div>
    </div>
  )
}
