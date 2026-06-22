export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatAddress(address: string, maxLength = 60): string {
  return address.length > maxLength ? address.substring(0, maxLength) + '...' : address
}

export function validatePhoneNumber(phone: string): boolean {
  return /^\+?[1-9]\d{1,14}$/.test(phone.replace(/\D/g, ''))
}

export function validateOtp(otp: string): boolean {
  return /^\d{6}$/.test(otp)
}
