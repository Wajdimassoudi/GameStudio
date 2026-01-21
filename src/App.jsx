'use client';

import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import GameLobby from './components/GameLobby'
import AdminDashboard from './components/AdminDashboard'
import { StorageService } from './utils/storage'

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // تحميل المستخدم الحالي من التخزين
  useEffect(() => {
    const savedUser = StorageService.getCurrentUser()
    if (savedUser) {
      setCurrentUser(savedUser)
    }
    setLoading(false)
  }, [])

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
  }

  const handleLogout = () => {
    StorageService.logout()
    setCurrentUser(null)
  }

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser)
    StorageService.setCurrentUser(updatedUser)
  }

  // حالة التحميل
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-accent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400 mt-4 text-lg">جارٍ التحميل...</p>
        </div>
      </div>
    )
  }

  // عرض صفحة تسجيل الدخول إذا لم يكن هناك مستخدم
  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />
  }

  // عرض لوحة تحكم Admin إذا كان المستخدم مدير
  if (currentUser.isAdmin) {
    return (
      <AdminDashboard
        currentUser={currentUser}
        onLogout={handleLogout}
      />
    )
  }

  // عرض لوبي الألعاب للاعبين العاديين
  return (
    <GameLobby
      currentUser={currentUser}
      onLogout={handleLogout}
      onUserUpdate={handleUserUpdate}
    />
  )
}
