'use client';

import React, { createContext, useContext, useState, useEffect } from 'react'
import { StorageService } from './storage'

// إنشاء Auth Context
const AuthContext = createContext()

// Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // تحميل المستخدم من التخزين عند بدء التطبيق
  useEffect(() => {
    const savedUser = StorageService.getCurrentUser()
    if (savedUser) {
      setUser(savedUser)
    }
    setLoading(false)
  }, [])

  // دالة تسجيل الدخول
  const login = (username, password) => {
    setError(null)
    try {
      const foundUser = StorageService.findUser(username, password)
      if (foundUser) {
        StorageService.setCurrentUser(foundUser)
        setUser(foundUser)
        return { success: true, user: foundUser }
      } else {
        setError('بيانات الدخول غير صحيحة')
        return { success: false, error: 'بيانات الدخول غير صحيحة' }
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول')
      return { success: false, error: 'حدث خطأ أثناء تسجيل الدخول' }
    }
  }

  // دالة التسجيل
  const register = (username, password) => {
    setError(null)
    try {
      if (!username || !password) {
        setError('يرجى ملء جميع الحقول')
        return { success: false, error: 'يرجى ملء جميع الحقول' }
      }

      if (password.length < 4) {
        setError('كلمة السر يجب أن تكون 4 أحرف على الأقل')
        return { success: false, error: 'كلمة السر يجب أن تكون 4 أحرف على الأقل' }
      }

      const result = StorageService.addUser(username, password)
      if (result.success) {
        StorageService.setCurrentUser(result.user)
        setUser(result.user)
        return { success: true, user: result.user }
      } else {
        setError(result.message)
        return { success: false, error: result.message }
      }
    } catch (err) {
      setError('حدث خطأ أثناء التسجيل')
      return { success: false, error: 'حدث خطأ أثناء التسجيل' }
    }
  }

  // دالة تحديث الرصيد
  const updateBalance = (amount) => {
    if (user) {
      StorageService.updateBalance(user.id, amount)
      const updatedUser = StorageService.getUserById(user.id)
      setUser(updatedUser)
      StorageService.setCurrentUser(updatedUser)
      return updatedUser
    }
  }

  // دالة تسجيل الخروج
  const logout = () => {
    StorageService.logout()
    setUser(null)
    setError(null)
  }

  // دالة تحديث بيانات المستخدم
  const updateUser = (updates) => {
    if (user) {
      StorageService.updateUser(user.id, updates)
      const updatedUser = StorageService.getUserById(user.id)
      setUser(updatedUser)
      StorageService.setCurrentUser(updatedUser)
      return updatedUser
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateBalance,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom Hook للوصول إلى Auth Context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
