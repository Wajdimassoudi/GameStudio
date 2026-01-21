'use client';

import React from 'react'

export default function GameCard({ game, onPlay }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
      {/* صورة اللعبة */}
      <div className="relative w-full h-40 bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden">
        <img
          src={game.thumbnail || 'https://via.placeholder.com/300x200?text=Game+Thumbnail'}
          alt={game.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Game'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300"></div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-4 space-y-3">
        {/* اسم اللعبة */}
        <h3 className="text-lg font-bold text-white truncate hover:text-accent transition-colors">
          {game.title}
        </h3>

        {/* مقدم اللعبة */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">المزود:</span>
          <span className="text-sm font-semibold text-accent">
            {game.provider || 'SOFTSWISS'}
          </span>
        </div>

        {/* زر الدخول للعبة */}
        <button
          onClick={() => onPlay(game)}
          className="w-full bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          العب ديمو
        </button>

        {/* معلومات إضافية */}
        <div className="text-xs text-gray-500 text-center">
          ID: {game.id?.substring(0, 8)}...
        </div>
      </div>
    </div>
  )
}
