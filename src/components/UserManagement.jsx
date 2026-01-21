'use client';

import React, { useState, useEffect } from 'react'
import { StorageService } from '../utils/storage'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [sortBy, setSortBy] = useState('username')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    setUsers(StorageService.getAllUsers())
  }

  const handleCreateUser = () => {
    if (!newUsername || !newPassword) {
      setMessage('يرجى ملء جميع الحقول')
      return
    }

    const result = StorageService.addUser(newUsername, newPassword)
    if (result.success) {
      setMessage(`تم إنشاء المستخدم ${newUsername} بنجاح`)
      setNewUsername('')
      setNewPassword('')
      loadUsers()
    } else {
      setMessage(result.message)
    }

    setTimeout(() => setMessage(''), 3000)
  }

  const handleDeleteUser = (userId) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      StorageService.deleteUser(userId)
      setMessage('تم حذف المستخدم بنجاح')
      loadUsers()
      setSelectedUser(null)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleResetPassword = (user) => {
    const newPass = prompt(`أدخل كلمة سر جديدة للمستخدم ${user.username}:`)
    if (newPass && newPass.length >= 4) {
      StorageService.updateUser(user.id, { password: newPass })
      setMessage(`تم تغيير كلمة السر بنجاح`)
      loadUsers()
      setTimeout(() => setMessage(''), 3000)
    }
  }

  // تصفية المستخدمين
  const filteredUsers = users
    .filter(u => {
      const matchesSearch = u.username.includes(searchQuery) || u.id.includes(searchQuery)
      const matchesFilter = filterRole === 'all' || 
        (filterRole === 'admin' && u.isAdmin) ||
        (filterRole === 'player' && !u.isAdmin)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortBy === 'username') return a.username.localeCompare(b.username)
      if (sortBy === 'balance') return b.balance - a.balance
      if (sortBy === 'created') return new Date(b.createdAt) - new Date(a.createdAt)
      return 0
    })

  return (
    <div className="space-y-6">
      {/* رسالة الحالة */}
      {message && (
        <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-3 text-green-400 text-sm">
          {message}
        </div>
      )}

      {/* قسم إنشاء مستخدم جديد */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">إنشاء مستخدم جديد</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="اسم المستخدم"
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="كلمة السر"
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400"
          />
          <button
            onClick={handleCreateUser}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            إنشاء
          </button>
          <p className="text-gray-400 text-sm self-center">الرصيد الافتراضي: 1000 TN</p>
        </div>
      </div>

      {/* أدوات البحث والفلترة */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="ابحث عن مستخدم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 col-span-2"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="all">جميع المستخدمين</option>
            <option value="admin">مديرين فقط</option>
            <option value="player">لاعبين فقط</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="username">الترتيب: الاسم</option>
            <option value="balance">الترتيب: الرصيد</option>
            <option value="created">الترتيب: التاريخ</option>
          </select>
        </div>
      </div>

      {/* جدول المستخدمين */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-right py-3 px-4 text-gray-300">اسم المستخدم</th>
                <th className="text-right py-3 px-4 text-gray-300">الرصيد (TN)</th>
                <th className="text-right py-3 px-4 text-gray-300">النوع</th>
                <th className="text-right py-3 px-4 text-gray-300">تاريخ الإنشاء</th>
                <th className="text-center py-3 px-4 text-gray-300">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer ${
                    selectedUser?.id === user.id ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="py-3 px-4 text-white font-semibold">{user.username}</td>
                  <td className="py-3 px-4 text-accent font-bold">{user.balance.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.isAdmin 
                        ? 'bg-red-500 bg-opacity-20 text-red-400' 
                        : 'bg-blue-500 bg-opacity-20 text-blue-400'
                    }`}>
                      {user.isAdmin ? 'مدير' : 'لاعب'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs">
                    {new Date(user.createdAt).toLocaleString('ar-SA')}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleResetPassword(user)
                      }}
                      className="text-blue-400 hover:text-blue-300 text-xs font-semibold"
                    >
                      كلمة سر
                    </button>
                    {!user.isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteUser(user.id)
                        }}
                        className="text-red-400 hover:text-red-300 text-xs font-semibold"
                      >
                        حذف
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            لا توجد مستخدمين تطابق البحث
          </div>
        )}
      </div>

      {/* تفاصيل المستخدم المختار */}
      {selectedUser && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-4">تفاصيل المستخدم</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">معرّف المستخدم</p>
              <p className="text-white font-mono text-sm bg-gray-700 rounded px-3 py-2 mt-1">
                {selectedUser.id}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">اسم المستخدم</p>
              <p className="text-white font-semibold text-lg mt-1">{selectedUser.username}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">الرصيد الحالي</p>
              <p className="text-accent font-bold text-2xl mt-1">{selectedUser.balance.toLocaleString()} TN</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">النوع</p>
              <p className="text-white font-semibold text-lg mt-1">
                {selectedUser.isAdmin ? 'مدير النظام' : 'لاعب'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">تاريخ الإنشاء</p>
              <p className="text-gray-300 text-sm mt-1">
                {new Date(selectedUser.createdAt).toLocaleString('ar-SA')}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">الدور</p>
              <p className="text-gray-300 text-sm mt-1">{selectedUser.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">عدد المستخدمين المعروضين</p>
          <p className="text-3xl font-bold text-accent mt-2">{filteredUsers.length}</p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">إجمالي الأرصدة</p>
          <p className="text-3xl font-bold text-secondary mt-2">
            {filteredUsers.reduce((sum, u) => sum + u.balance, 0).toLocaleString()} TN
          </p>
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">متوسط الرصيد</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {filteredUsers.length > 0 
              ? (filteredUsers.reduce((sum, u) => sum + u.balance, 0) / filteredUsers.length).toLocaleString()
              : '0'
            } TN
          </p>
        </div>
      </div>
    </div>
  )
}
