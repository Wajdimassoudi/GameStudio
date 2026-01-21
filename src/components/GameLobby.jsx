'use client';

import React, { useState, useEffect } from 'react'
import GameCard from './GameCard'
import GameModal from './GameModal'
import { StorageService } from '../utils/storage'

export default function GameLobby({ currentUser, onLogout, onUserUpdate }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedGame, setSelectedGame] = useState(null)
  const [userBalance, setUserBalance] = useState(currentUser.balance)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterProvider, setFilterProvider] = useState('')
  const [providers, setProviders] = useState([])

  // محاكاة بيانات الألعاب من SOFTSWISS
  const mockGames = [
    {
      id: 'game_001',
      title: 'Book of Ra',
      provider: 'SOFTSWISS',
      thumbnail: 'https://via.placeholder.com/300x200?text=Book+of+Ra'
    },
    {
      id: 'game_002',
      title: 'Starburst',
      provider: 'SOFTSWISS',
      thumbnail: 'https://via.placeholder.com/300x200?text=Starburst'
    },
    {
      id: 'game_003',
      title: 'Gonzo Quest',
      provider: 'SOFTSWISS',
      thumbnail: 'https://via.placeholder.com/300x200?text=Gonzo+Quest'
    },
    {
      id: 'game_004',
      title: 'Dead or Alive',
      provider: 'SOFTSWISS',
      thumbnail: 'https://via.placeholder.com/300x200?text=Dead+or+Alive'
    },
    {
      id: 'game_005',
      title: 'Twin Spin',
      provider: 'SOFTSWISS',
      thumbnail: 'https://via.placeholder.com/300x200?text=Twin+Spin'
    },
    {
      id: 'game_006',
      title: 'Aloha Cluster Pays',
      provider: 'SOFTSWISS',
      thumbnail: 'https://via.placeholder.com/300x200?text=Aloha'
    },
    {
      id: 'game_007',
      title: 'Piggy Riches',
      provider: 'SOFTSWISS',
      thumbnail: 'https://via.placeholder.com/300x200?text=Piggy+Riches'
    },
    {
      id: 'game_008',
      title: 'South Park',
      provider: 'SOFTSWISS',
      thumbnail: 'https://via.placeholder.com/300x200?text=South+Park'
    },
    {
      id: 'game_009',
      title: 'Immortal Romance',
      provider: 'SOFTSWISS',
      thumbnail: 'https://via.placeholder.com/300x200?text=Immortal+Romance'
    }
  ]

  useEffect(() => {
    loadGames()
  }, [])

  const loadGames = async () => {
    try {
      setLoading(true)
      setError('')
      
      // محاكاة التأخير
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setGames(mockGames)
      
      // استخراج قائمة الموفرين
      const uniqueProviders = [...new Set(mockGames.map(g => g.provider))]
      setProviders(uniqueProviders)
    } catch (err) {
      setError('فشل في تحميل الألعاب. يرجى المحاولة لاحقاً.')
      console.error('Error loading games:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePlayGame = (game) => {
    setSelectedGame(game)
  }

  const handleGameClose = () => {
    setSelectedGame(null)
    // تحديث رصيد المستخدم
    const updatedUser = StorageService.getUserById(currentUser.id)
    setUserBalance(updatedUser.balance)
    onUserUpdate(updatedUser)
  }

  const handleAddBalance = () => {
    StorageService.updateBalance(currentUser.id, 500)
    const updatedUser = StorageService.getUserById(currentUser.id)
    setUserBalance(updatedUser.balance)
    onUserUpdate(updatedUser)
  }

  // تصفية الألعاب
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.includes(searchQuery) || game.provider.includes(searchQuery)
    const matchesFilter = !filterProvider || game.provider === filterProvider
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* الرأس */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* الشعار والعنوان */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">🎰 كازينو TN</h1>
              <p className="text-gray-400 text-sm">لوبي الألعاب</p>
            </div>

            {/* معلومات الرصيد والمستخدم */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              {/* الرصيد */}
              <div className="bg-gradient-to-r from-secondary to-accent rounded-lg px-4 py-2 text-center">
                <p className="text-gray-300 text-sm">الرصيد الحالي</p>
                <p className="text-2xl font-bold text-white">{userBalance.toLocaleString()} <span className="text-sm">TN</span></p>
              </div>

              {/* زر إضافة رصيد */}
              <button
                onClick={handleAddBalance}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                + 500 TN
              </button>

              {/* اسم المستخدم وخروج */}
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-sm">مرحباً</p>
                <p className="text-white font-semibold">{currentUser.username}</p>
              </div>

              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* شريط البحث والفلاتر */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="ابحث عن لعبة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-accent"
            />
            <select
              value={filterProvider}
              onChange={(e) => setFilterProvider(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-accent"
            >
              <option value="">جميع الموفرين</option>
              {providers.map(provider => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          {/* عدد النتائج */}
          <div className="text-gray-400 text-sm">
            عدد الألعاب: <span className="text-accent font-bold">{filteredGames.length}</span>
          </div>
        </div>

        {/* رسالة خطأ */}
        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 mb-6 text-red-400">
            {error}
          </div>
        )}

        {/* حالة التحميل */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-accent rounded-full animate-spin"></div>
              </div>
              <p className="text-gray-400 mt-4">جارٍ تحميل الألعاب...</p>
            </div>
          </div>
        )}

        {/* شبكة الألعاب */}
        {!loading && filteredGames.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={handlePlayGame}
              />
            ))}
          </div>
        )}

        {/* رسالة عدم وجود ألعاب */}
        {!loading && filteredGames.length === 0 && games.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">لا توجد ألعاب تطابق البحث</p>
          </div>
        )}

        {/* رسالة عند فشل التحميل */}
        {!loading && games.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">لم يتم تحميل أي ألعاب</p>
            <button
              onClick={loadGames}
              className="mt-4 bg-secondary hover:bg-accent text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              حاول مرة أخرى
            </button>
          </div>
        )}
      </main>

      {/* نافذة اللعبة */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          user={currentUser}
          onClose={handleGameClose}
          onBalanceUpdate={() => {
            const updatedUser = StorageService.getUserById(currentUser.id)
            setUserBalance(updatedUser.balance)
            onUserUpdate(updatedUser)
          }}
        />
      )}
    </div>
  )
}
