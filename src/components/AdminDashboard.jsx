'use client';

import React, { useState, useEffect } from 'react'
import { StorageService } from '../utils/storage'

export default function AdminDashboard({ currentUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([])
  const [transactions, setTransactions] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [amount, setAmount] = useState('')
  const [action, setAction] = useState('add') // add or subtract
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setUsers(StorageService.getAllUsers())
    setTransactions(StorageService.getTransactions().reverse())
  }

  const handleAddBalance = () => {
    if (!selectedUser || !amount) {
      setMessage('يرجى اختيار مستخدم وإدخال المبلغ')
      return
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setMessage('يرجى إدخال مبلغ صحيح')
      return
    }

    const finalAmount = action === 'add' ? numAmount : -numAmount
    StorageService.updateBalance(selectedUser.id, finalAmount)
    
    setMessage(`تم ${action === 'add' ? 'إضافة' : 'سحب'} ${numAmount} TN من حساب ${selectedUser.username}`)
    setAmount('')
    loadData()
    
    setTimeout(() => setMessage(''), 3000)
  }

  const handleCreateUser = () => {
    if (!newUsername || !newPassword) {
      setMessage('يرجى ملء جميع الحقول')
      return
    }

    const result = StorageService.addUser(newUsername, newPassword)
    if (result.success) {
      setMessage(`تم إنشاء المستخدم ${newUsername} بنجاح برصيد 1000 TN`)
      setNewUsername('')
      setNewPassword('')
      loadData()
    } else {
      setMessage(result.message)
    }

    setTimeout(() => setMessage(''), 3000)
  }

  const handleDeleteUser = (userId) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      StorageService.deleteUser(userId)
      setMessage('تم حذف المستخدم بنجاح')
      loadData()
      setSelectedUser(null)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const filteredUsers = users.filter(u =>
    u.username.includes(searchQuery) || u.id.includes(searchQuery)
  )

  const totalBalance = users.reduce((sum, u) => sum + u.balance, 0)
  const totalTransactions = transactions.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* الرأس */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">لوحة تحكم Admin</h1>
            <p className="text-gray-400 text-sm">كازينو TN - إدارة النظام</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">مرحباً</p>
              <p className="text-white font-semibold">{currentUser.username}</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* الرسالة */}
        {message && (
          <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-4 mb-6 text-green-400">
            {message}
          </div>
        )}

        {/* الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm">إجمالي الأرصدة</p>
            <p className="text-3xl font-bold text-accent">{totalBalance.toLocaleString()} TN</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm">عدد المستخدمين</p>
            <p className="text-3xl font-bold text-secondary">{users.length}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm">عدد المعاملات</p>
            <p className="text-3xl font-bold text-blue-400">{totalTransactions}</p>
          </div>
        </div>

        {/* التبويبات */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          {/* قائمة التبويبات */}
          <div className="flex border-b border-gray-700">
            {[
              { id: 'users', label: 'المستخدمون' },
              { id: 'manage', label: 'الإدارة' },
              { id: 'transactions', label: 'المعاملات' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-secondary to-accent text-white border-b-2 border-accent'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* محتوى التبويبات */}
          <div className="p-6">
            {/* تبويب المستخدمين */}
            {activeTab === 'users' && (
              <div className="space-y-4">
                {/* حقل البحث */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="ابحث عن مستخدم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                  />
                </div>

                {/* جدول المستخدمين */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-right py-3 px-4 text-gray-300">اسم المستخدم</th>
                        <th className="text-right py-3 px-4 text-gray-300">الرصيد (TN)</th>
                        <th className="text-right py-3 px-4 text-gray-300">النوع</th>
                        <th className="text-right py-3 px-4 text-gray-300">إجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr
                          key={user.id}
                          className="border-b border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer"
                          onClick={() => setSelectedUser(user)}
                        >
                          <td className="py-3 px-4 text-white">{user.username}</td>
                          <td className="py-3 px-4 text-accent font-bold">{user.balance.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              user.isAdmin ? 'bg-red-500 bg-opacity-20 text-red-400' : 'bg-blue-500 bg-opacity-20 text-blue-400'
                            }`}>
                              {user.isAdmin ? 'مدير' : 'لاعب'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {!user.isAdmin && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteUser(user.id)
                                }}
                                className="text-red-400 hover:text-red-300 text-xs"
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

                {/* تفاصيل المستخدم المختار */}
                {selectedUser && (
                  <div className="bg-gray-700 rounded-lg p-4 mt-6">
                    <h3 className="text-lg font-bold text-white mb-4">إدارة الرصيد: {selectedUser.username}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <select
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white"
                      >
                        <option value="add">إضافة أموال</option>
                        <option value="subtract">سحب أموال</option>
                      </select>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="المبلغ بـ TN"
                        className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white"
                      />
                      <button
                        onClick={handleAddBalance}
                        className="bg-secondary hover:bg-accent text-white font-bold py-2 px-4 rounded transition-colors"
                      >
                        تطبيق
                      </button>
                      <p className="text-gray-300 text-center py-2">
                        الرصيد الحالي: <span className="text-accent font-bold">{selectedUser.balance} TN</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* تبويب الإدارة */}
            {activeTab === 'manage' && (
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">إنشاء مستخدم جديد</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="اسم المستخدم"
                      className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white"
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="كلمة السر"
                      className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white"
                    />
                    <button
                      onClick={handleCreateUser}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      إنشاء
                    </button>
                    <p className="text-gray-300 text-sm">الرصيد الافتراضي: 1000 TN</p>
                  </div>
                </div>

                {/* معلومات النظام */}
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">معلومات النظام</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <p className="text-sm">اسم العملة:</p>
                      <p className="text-lg font-bold text-accent">TN (Token Coins)</p>
                    </div>
                    <div>
                      <p className="text-sm">عدد المستخدمين:</p>
                      <p className="text-lg font-bold text-secondary">{users.length}</p>
                    </div>
                    <div>
                      <p className="text-sm">إجمالي الأرصدة:</p>
                      <p className="text-lg font-bold text-blue-400">{totalBalance.toLocaleString()} TN</p>
                    </div>
                    <div>
                      <p className="text-sm">آخر تحديث:</p>
                      <p className="text-lg font-bold text-gray-400">{new Date().toLocaleString('ar-SA')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* تبويب المعاملات */}
            {activeTab === 'transactions' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-right py-3 px-4 text-gray-300">الوقت</th>
                        <th className="text-right py-3 px-4 text-gray-300">المستخدم</th>
                        <th className="text-right py-3 px-4 text-gray-300">النوع</th>
                        <th className="text-right py-3 px-4 text-gray-300">المبلغ</th>
                        <th className="text-right py-3 px-4 text-gray-300">الرصيد السابق</th>
                        <th className="text-right py-3 px-4 text-gray-300">الرصيد الجديد</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(trans => {
                        const user = users.find(u => u.id === trans.userId)
                        return (
                          <tr key={trans.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                            <td className="py-3 px-4 text-gray-400 text-xs">
                              {new Date(trans.timestamp).toLocaleString('ar-SA')}
                            </td>
                            <td className="py-3 px-4 text-white">{user?.username || 'غير معروف'}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                trans.type === 'إيداع'
                                  ? 'bg-green-500 bg-opacity-20 text-green-400'
                                  : 'bg-red-500 bg-opacity-20 text-red-400'
                              }`}>
                                {trans.type}
                              </span>
                            </td>
                            <td className={`py-3 px-4 font-bold ${trans.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {trans.amount > 0 ? '+' : ''}{trans.amount}
                            </td>
                            <td className="py-3 px-4 text-gray-300">{trans.oldBalance.toLocaleString()}</td>
                            <td className="py-3 px-4 text-accent font-bold">{trans.newBalance.toLocaleString()}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                {transactions.length === 0 && (
                  <p className="text-center text-gray-400 py-8">لا توجد معاملات حتى الآن</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
