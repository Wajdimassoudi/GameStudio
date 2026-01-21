'use client';

import React, { useState } from 'react'
import { StorageService } from '../utils/storage'

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (!username || !password) {
        setError('يرجى ملء جميع الحقول')
        setLoading(false)
        return
      }

      const user = StorageService.findUser(username, password)
      if (user) {
        StorageService.setCurrentUser(user)
        onLoginSuccess(user)
      } else {
        setError('بيانات الدخول غير صحيحة')
      }
      setLoading(false)
    }, 500)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (!username || !password) {
        setError('يرجى ملء جميع الحقول')
        setLoading(false)
        return
      }

      if (password.length < 4) {
        setError('كلمة السر يجب أن تكون 4 أحرف على الأقل')
        setLoading(false)
        return
      }

      const result = StorageService.addUser(username, password)
      if (result.success) {
        StorageService.setCurrentUser(result.user)
        onLoginSuccess(result.user)
      } else {
        setError(result.message)
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* الرأس */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">كازينو TN</h1>
          <p className="text-gray-400">منصة الألعاب الافتراضية المميزة</p>
        </div>

        {/* بطاقة تسجيل الدخول */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {isRegistering ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </h2>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-3 mb-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
            {/* حقل اسم المستخدم */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                اسم المستخدم
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-accent focus:bg-gray-600"
              />
            </div>

            {/* حقل كلمة السر */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                كلمة السر
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة السر"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-accent focus:bg-gray-600"
              />
            </div>

            {/* زر الدخول/التسجيل */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جارٍ المعالجة...' : (isRegistering ? 'إنشاء الحساب' : 'دخول')}
            </button>

            {/* رابط التبديل بين الدخول والتسجيل */}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering)
                setError('')
                setUsername('')
                setPassword('')
              }}
              className="w-full text-accent hover:text-accent text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              {isRegistering ? 'لديك حساب بالفعل؟ دخول' : 'ليس لديك حساب؟ إنشاء واحد'}
            </button>
          </form>

          {/* تلميح للـ Admin */}
          <div className="mt-6 pt-6 border-t border-gray-700 text-xs text-gray-500 text-center">
            <p className="mb-1">الحساب الافتراضي للاختبار:</p>
            <p>المستخدم: <span className="text-gray-300">admin</span></p>
            <p>كلمة السر: <span className="text-gray-300">admin123</span></p>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>العملة الافتراضية للنظام: <span className="text-accent font-bold">TN</span></p>
        </div>
      </div>
    </div>
  )
}
