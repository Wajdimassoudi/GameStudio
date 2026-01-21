'use client';

import React, { useState } from 'react'
import { StorageService } from '../utils/storage'

export default function GameModal({ game, user, onClose, onBalanceUpdate }) {
  const [betAmount, setBetAmount] = useState(10)
  const [gameStarted, setGameStarted] = useState(false)
  const [result, setResult] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentBalance, setCurrentBalance] = useState(user.balance)
  const [totalWin, setTotalWin] = useState(0)

  const handleBet = () => {
    if (betAmount > currentBalance) {
      alert('رصيد غير كافي')
      return
    }

    if (betAmount <= 0) {
      alert('يرجى إدخال مبلغ صحيح')
      return
    }

    // خصم الرهان
    const newBalance = currentBalance - betAmount
    StorageService.updateBalance(user.id, -betAmount)
    setCurrentBalance(newBalance)

    // محاكاة الدوران
    setIsSpinning(true)
    
    setTimeout(() => {
      // توليد نتيجة عشوائية
      const random = Math.random()
      let win = 0

      if (random < 0.3) {
        // فوز بـ 2x
        win = betAmount * 2
      } else if (random < 0.5) {
        // فوز بـ 3x
        win = betAmount * 3
      } else if (random < 0.6) {
        // فوز بـ 5x
        win = betAmount * 5
      } else if (random < 0.65) {
        // فوز بـ 10x
        win = betAmount * 10
      }

      setIsSpinning(false)

      if (win > 0) {
        setResult({
          win,
          message: `🎉 مبروك! فزت بـ ${win} TN`,
          color: 'green'
        })
        StorageService.updateBalance(user.id, win)
        setCurrentBalance(newBalance + win)
        setTotalWin(totalWin + win)
      } else {
        setResult({
          win: 0,
          message: '😞 حاول مرة أخرى',
          color: 'red'
        })
      }

      onBalanceUpdate()
    }, 2000)
  }

  const handleQuickBet = (amount) => {
    if (amount <= currentBalance) {
      setBetAmount(amount)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl max-w-md w-full border border-gray-700">
        {/* الرأس */}
        <div className="bg-gradient-to-r from-secondary to-accent p-4 rounded-t-xl flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{game.title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        {/* المحتوى */}
        <div className="p-6 space-y-4">
          {/* صورة اللعبة */}
          <div className="relative w-full h-40 bg-gray-700 rounded-lg overflow-hidden">
            <img
              src={game.thumbnail || "/placeholder.svg"}
              alt={game.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Game'
              }}
            />
          </div>

          {/* معلومات المزود */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">المزود:</span>
            <span className="text-accent font-semibold">{game.provider}</span>
          </div>

          {/* الرصيد الحالي */}
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <p className="text-gray-300 text-sm">رصيدك الحالي</p>
            <p className="text-2xl font-bold text-accent">{currentBalance.toLocaleString()} TN</p>
          </div>

          {/* معلومات الفوز */}
          {totalWin > 0 && (
            <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-3 text-center">
              <p className="text-green-400 text-sm">إجمالي أرباحك</p>
              <p className="text-2xl font-bold text-green-400">+ {totalWin.toLocaleString()} TN</p>
            </div>
          )}

          {/* لعبة الدوران */}
          {gameStarted && (
            <div className="space-y-4">
              {/* عرض الدوران */}
              <div className="bg-gray-700 rounded-lg p-6 text-center">
                <div className={`text-4xl mb-4 transition-all duration-300 ${isSpinning ? 'animate-spin' : ''}`}>
                  {isSpinning ? '🎰' : result?.message.includes('مبروك') ? '🎉' : '😞'}
                </div>

                {isSpinning && (
                  <p className="text-gray-300 text-sm animate-pulse">جارٍ الدوران...</p>
                )}

                {!isSpinning && result && (
                  <div>
                    <p className={`text-lg font-bold ${result.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>
                      {result.message}
                    </p>
                    {result.win > 0 && (
                      <p className="text-2xl font-bold text-green-400 mt-2">
                        + {result.win} TN
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* زر العودة */}
              {!isSpinning && (
                <button
                  onClick={() => {
                    setGameStarted(false)
                    setResult(null)
                    setBetAmount(10)
                  }}
                  className="w-full bg-secondary hover:bg-accent text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  لعب مرة أخرى
                </button>
              )}
            </div>
          )}

          {/* واجهة الرهان */}
          {!gameStarted && (
            <div className="space-y-4">
              {/* حقل الرهان */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">مبلغ الرهان</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 0))}
                    min="1"
                    max={currentBalance}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-center"
                  />
                  <span className="text-gray-300 py-2">TN</span>
                </div>
              </div>

              {/* أزرار الرهانات السريعة */}
              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map(amount => (
                  <button
                    key={amount}
                    onClick={() => handleQuickBet(amount)}
                    disabled={amount > currentBalance}
                    className={`py-2 rounded font-semibold transition-all ${
                      amount > currentBalance
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : betAmount === amount
                        ? 'bg-accent text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              {/* الأرباح المحتملة */}
              <div className="bg-gray-700 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-xs">الأرباح المحتملة</p>
                <p className="text-sm font-semibold text-accent">
                  حتى {(betAmount * 10).toLocaleString()} TN
                </p>
              </div>

              {/* زر البدء */}
              <button
                onClick={handleBet}
                disabled={isSpinning}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isSpinning
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-secondary to-accent text-white hover:from-accent hover:to-secondary'
                }`}
              >
                {isSpinning ? 'جارٍ الدوران...' : 'ابدأ اللعبة'}
              </button>
            </div>
          )}

          {/* زر الإغلاق */}
          {!gameStarted && (
            <button
              onClick={onClose}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              إغلاق
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
