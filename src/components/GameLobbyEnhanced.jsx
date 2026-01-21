'use client';

import React, { useState, useEffect } from 'react'
import GameCard from './GameCard'
import GameModal from './GameModal'
import { StorageService } from '../utils/storage'
import SoftswissAPIService from '../utils/softswissAPI'

/**
 * GameLobbyEnhanced - لوبي الألعاب المحسّن مع دعم SOFTSWISS
 * يدعم البيانات المحاكاة والبيانات الحقيقية من API
 */
export default function GameLobbyEnhanced({ currentUser, onLogout, onUserUpdate }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedGame, setSelectedGame] = useState(null)
  const [userBalance, setUserBalance] = useState(currentUser.balance)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterProvider, setFilterProvider] = useState('')
  const [providers, setProviders] = useState([])
  const [apiKey, setApiKey] = useState('')
  const [showApiInput, setShowApiInput] = useState(false)
  const [usingRealAPI, setUsingRealAPI] = useState(false)

  useEffect(() => {
    loadGames()
  }, [])

  const loadGames = async () => {
    try {
      setLoading(true)
      setError('')
      
      // محاولة استخدام SOFTSWISS API إذا كان هناك API Key
      if (apiKey) {
        const realGames = await SoftswissAPIService.fetchGames(apiKey)
        if (realGames.length > 0) {
          setGames(realGames)
          setUsingRealAPI(true)
        } else {
          setGames(SoftswissAPIService.getMockGames())
          setUsingRealAPI(false)
        }
      } else {
        // استخدام البيانات المحاكاة
        setGames(SoftswissAPIService.getMockGames())
        setUsingRealAPI(false)
      }

      // استخراج قائمة الموفرين
      const uniqueProviders = [...new Set(games.map(g => g.provider))]
      setProviders(uniqueProviders)
    } catch (err) {
      setError('فشل في تحميل الألعاب')
      setGames(SoftswissAPIService.getMockGames())
    } finally {
      setLoading(false)
    }
  }

  const handlePlayGame = (game) => {
    setSelectedGame(game)
  }

  const handleGameClose = () => {
    setSelectedGame(null)
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

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiInput(false)
      loadGames()
    }
  }

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
            {/* الشعار */}
            <div className="flex items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">🎰 كازينو TN</h1>
              {usingRealAPI && (
                <span className="bg-green-500 bg-opacity-20 text-green-400 text-xs px-2 py-1 rounded">
                  SOFTSWISS متصل
                </span>
              )}
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
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
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
        {/* رسالة الخطأ */}
        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 mb-6 text-red-400">
            {error}
          </div>
        )}

        {/* شريط البحث والفلاتر */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="ابحث عن لعبة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400"
            />
            <select
              value={filterProvider}
              onChange={(e) => setFilterProvider(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="">جميع الموفرين</option>
              {providers.map(provider => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowApiInput(!showApiInput)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              title="إدخال API Key لـ SOFTSWISS"
            >
              ⚙️ إعدادات API
            </button>
          </div>

          {/* حقل إدخال API Key */}
          {showApiInput && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <label className="block text-sm text-gray-300 mb-2">
                SOFTSWISS API Key (اختياري):
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="أدخل API Key الخاص بك من SOFTSWISS"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
                <button
                  onClick={handleApiKeySubmit}
                  className="bg-secondary hover:bg-accent text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  متصل
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                {usingRealAPI 
                  ? '✓ متصل بـ SOFTSWISS API بنجاح'
                  : 'استخدام بيانات محاكاة. أدخل API Key الحقيقي للتكامل الكامل'}
              </p>
            </div>
          )}

          {/* عدد النتائج */}
          <div className="text-gray-400 text-sm">
            عدد الألعاب: <span className="text-accent font-bold">{filteredGames.length}</span>
          </div>
        </div>

        {/* حالة التحميل */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-700 border-t-accent rounded-full animate-spin mx-auto"></div>
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

        {/* رسائل الحالة */}
        {!loading && filteredGames.length === 0 && games.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">لا توجد ألعاب تطابق البحث</p>
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
