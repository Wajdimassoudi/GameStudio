/**
 * SOFTSWISS Game Aggregator API
 * وحدة للتكامل مع SOFTSWISS Game Aggregator
 * 
 * API Documentation: https://api.softswiss.com/v1/games
 * 
 * الاستخدام:
 * const games = await SoftswissAPI.fetchGames(apiKey)
 */

const SOFTSWISS_API_BASE = 'https://api.softswiss.com/v1'

class SoftswissAPIService {
  /**
   * جلب قائمة الألعاب من SOFTSWISS
   * @param {string} apiKey - مفتاح API SOFTSWISS
   * @param {object} options - خيارات البحث
   * @returns {Promise<Array>} قائمة الألعاب
   */
  static async fetchGames(apiKey, options = {}) {
    try {
      if (!apiKey) {
        console.warn('[SOFTSWISS] لم يتم توفير API Key، سيتم استخدام بيانات محاكاة')
        return this.getMockGames()
      }

      const params = new URLSearchParams()
      
      // إضافة معاملات البحث الاختيارية
      if (options.limit) params.append('limit', options.limit)
      if (options.offset) params.append('offset', options.offset)
      if (options.provider) params.append('provider', options.provider)
      if (options.search) params.append('search', options.search)

      const response = await fetch(
        `${SOFTSWISS_API_BASE}/games?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`SOFTSWISS API Error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.games || data || []
    } catch (error) {
      console.error('[SOFTSWISS] خطأ في جلب الألعاب:', error)
      // في حالة الخطأ، استخدم البيانات المحاكاة
      return this.getMockGames()
    }
  }

  /**
   * جلب تفاصيل لعبة معينة
   * @param {string} gameId - معرّف اللعبة
   * @param {string} apiKey - مفتاح API
   * @returns {Promise<Object>} تفاصيل اللعبة
   */
  static async fetchGameDetails(gameId, apiKey) {
    try {
      const response = await fetch(
        `${SOFTSWISS_API_BASE}/games/${gameId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`SOFTSWISS API Error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('[SOFTSWISS] خطأ في جلب تفاصيل اللعبة:', error)
      return null
    }
  }

  /**
   * جلب الموفرين المتاحين
   * @param {string} apiKey - مفتاح API
   * @returns {Promise<Array>} قائمة الموفرين
   */
  static async fetchProviders(apiKey) {
    try {
      const response = await fetch(
        `${SOFTSWISS_API_BASE}/providers`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`SOFTSWISS API Error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.providers || []
    } catch (error) {
      console.error('[SOFTSWISS] خطأ في جلب الموفرين:', error)
      return ['SOFTSWISS']
    }
  }

  /**
   * البيانات المحاكاة للاستخدام في الاختبار
   * @returns {Array} قائمة الألعاب المحاكاة
   */
  static getMockGames() {
    return [
      {
        id: 'softswiss_001',
        title: 'Book of Ra',
        provider: 'SOFTSWISS',
        rtp: 96.4,
        volatility: 'HIGH',
        lines: 9,
        thumbnail: 'https://via.placeholder.com/300x200?text=Book+of+Ra'
      },
      {
        id: 'softswiss_002',
        title: 'Starburst',
        provider: 'SOFTSWISS',
        rtp: 96.09,
        volatility: 'LOW',
        lines: 10,
        thumbnail: 'https://via.placeholder.com/300x200?text=Starburst'
      },
      {
        id: 'softswiss_003',
        title: 'Gonzo Quest',
        provider: 'SOFTSWISS',
        rtp: 96.0,
        volatility: 'HIGH',
        lines: 25,
        thumbnail: 'https://via.placeholder.com/300x200?text=Gonzo+Quest'
      },
      {
        id: 'softswiss_004',
        title: 'Dead or Alive',
        provider: 'SOFTSWISS',
        rtp: 96.82,
        volatility: 'HIGH',
        lines: 9,
        thumbnail: 'https://via.placeholder.com/300x200?text=Dead+or+Alive'
      },
      {
        id: 'softswiss_005',
        title: 'Twin Spin',
        provider: 'SOFTSWISS',
        rtp: 96.1,
        volatility: 'LOW',
        lines: 243,
        thumbnail: 'https://via.placeholder.com/300x200?text=Twin+Spin'
      },
      {
        id: 'softswiss_006',
        title: 'Aloha Cluster Pays',
        provider: 'SOFTSWISS',
        rtp: 96.4,
        volatility: 'MEDIUM',
        lines: 40,
        thumbnail: 'https://via.placeholder.com/300x200?text=Aloha'
      },
      {
        id: 'softswiss_007',
        title: 'Piggy Riches',
        provider: 'SOFTSWISS',
        rtp: 96.59,
        volatility: 'MEDIUM',
        lines: 15,
        thumbnail: 'https://via.placeholder.com/300x200?text=Piggy+Riches'
      },
      {
        id: 'softswiss_008',
        title: 'South Park',
        provider: 'SOFTSWISS',
        rtp: 96.79,
        volatility: 'HIGH',
        lines: 25,
        thumbnail: 'https://via.placeholder.com/300x200?text=South+Park'
      },
      {
        id: 'softswiss_009',
        title: 'Immortal Romance',
        provider: 'SOFTSWISS',
        rtp: 96.86,
        volatility: 'MEDIUM',
        lines: 243,
        thumbnail: 'https://via.placeholder.com/300x200?text=Immortal+Romance'
      }
    ]
  }

  /**
   * التحقق من صحة API Key
   * @param {string} apiKey - مفتاح API
   * @returns {Promise<boolean>} صحة المفتاح
   */
  static async validateApiKey(apiKey) {
    try {
      const response = await fetch(
        `${SOFTSWISS_API_BASE}/games?limit=1`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
      return response.ok
    } catch (error) {
      console.error('[SOFTSWISS] خطأ في التحقق من API Key:', error)
      return false
    }
  }

  /**
   * معالجة اللعبة والتحضير للعب
   * @param {Object} game - بيانات اللعبة
   * @param {string} apiKey - مفتاح API
   * @returns {Promise<Object>} بيانات اللعبة المعالجة
   */
  static async prepareGame(game, apiKey) {
    try {
      // إذا كانت لدينا API Key، نحصل على تفاصيل إضافية
      if (apiKey) {
        const details = await this.fetchGameDetails(game.id, apiKey)
        return { ...game, ...details }
      }
      return game
    } catch (error) {
      console.error('[SOFTSWISS] خطأ في تحضير اللعبة:', error)
      return game
    }
  }

  /**
   * حساب الرهان المحتمل
   * @param {number} bet - مبلغ الرهان
   * @param {number} rtp - نسبة العودة للاعب (RTP)
   * @returns {number} الربح المتوقع
   */
  static calculateExpectedWin(bet, rtp = 96) {
    return (bet * rtp) / 100
  }

  /**
   * الحصول على معلومات SOFTSWISS
   * @returns {Object} معلومات التكامل
   */
  static getInfo() {
    return {
      provider: 'SOFTSWISS Game Aggregator',
      apiVersion: 'v1',
      baseUrl: SOFTSWISS_API_BASE,
      features: [
        'جلب قائمة الألعاب',
        'جلب تفاصيل اللعبة',
        'جلب الموفرين',
        'البحث والفلترة',
        'محاكاة الألعاب'
      ],
      status: 'جاهز للتكامل'
    }
  }
}

export default SoftswissAPIService
