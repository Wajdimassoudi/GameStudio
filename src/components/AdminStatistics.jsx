'use client';

import React, { useState, useEffect } from 'react'
import { StorageService } from '../utils/storage'

export default function AdminStatistics() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBalance: 0,
    totalTransactions: 0,
    activeUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    avgBalance: 0,
    maxBalance: 0,
    minBalance: 0
  })

  useEffect(() => {
    calculateStats()
  }, [])

  const calculateStats = () => {
    const users = StorageService.getAllUsers()
    const transactions = StorageService.getTransactions()

    const totalBalance = users.reduce((sum, u) => sum + u.balance, 0)
    const totalDeposits = transactions
      .filter(t => t.type === 'إيداع')
      .reduce((sum, t) => sum + t.amount, 0)
    const totalWithdrawals = transactions
      .filter(t => t.type === 'سحب')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const balances = users.map(u => u.balance)
    const avgBalance = users.length > 0 ? totalBalance / users.length : 0
    const maxBalance = users.length > 0 ? Math.max(...balances) : 0
    const minBalance = users.length > 0 ? Math.min(...balances) : 0

    setStats({
      totalUsers: users.length,
      totalBalance,
      totalTransactions: transactions.length,
      activeUsers: users.filter(u => !u.isAdmin).length,
      totalDeposits,
      totalWithdrawals,
      avgBalance,
      maxBalance,
      minBalance
    })
  }

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-6 border-l-4 ${
      color === 'accent' ? 'border-l-accent' :
      color === 'green' ? 'border-l-green-500' :
      color === 'blue' ? 'border-l-blue-500' :
      'border-l-secondary'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="text-3xl opacity-50">{icon}</div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="إجمالي المستخدمين"
          value={stats.totalUsers}
          icon="👥"
          color="secondary"
        />
        <StatCard
          title="المستخدمون النشطون"
          value={stats.activeUsers}
          icon="🎮"
          color="green"
        />
        <StatCard
          title="إجمالي الأرصدة"
          value={`${stats.totalBalance.toLocaleString()} TN`}
          icon="💰"
          color="accent"
        />
        <StatCard
          title="إجمالي المعاملات"
          value={stats.totalTransactions}
          icon="📊"
          color="blue"
        />
        <StatCard
          title="إجمالي الإيداعات"
          value={`${stats.totalDeposits.toLocaleString()} TN`}
          icon="📈"
          color="green"
        />
        <StatCard
          title="إجمالي الانسحابات"
          value={`${stats.totalWithdrawals.toLocaleString()} TN`}
          icon="📉"
          color="accent"
        />
      </div>

      {/* الإحصائيات المتقدمة */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">إحصائيات متقدمة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">متوسط الرصيد</p>
            <p className="text-2xl font-bold text-accent mt-2">
              {stats.avgBalance.toLocaleString()} TN
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">أعلى رصيد</p>
            <p className="text-2xl font-bold text-green-400 mt-2">
              {stats.maxBalance.toLocaleString()} TN
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">أقل رصيد</p>
            <p className="text-2xl font-bold text-blue-400 mt-2">
              {stats.minBalance.toLocaleString()} TN
            </p>
          </div>
        </div>
      </div>

      {/* رسم بياني بسيط للتوزيع */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4">توزيع الرصيد</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>الإيداعات</span>
              <span>{((stats.totalDeposits / (stats.totalDeposits + stats.totalWithdrawals)) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${(stats.totalDeposits / (stats.totalDeposits + stats.totalWithdrawals)) * 100}%`
                }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>الانسحابات</span>
              <span>{((stats.totalWithdrawals / (stats.totalDeposits + stats.totalWithdrawals)) * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: `${(stats.totalWithdrawals / (stats.totalDeposits + stats.totalWithdrawals)) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
