/**
 * نظام العملات الافتراضية
 * إدارة العملة الافتراضية TN والعمليات المالية
 */

export const CURRENCY_NAME = 'TN'
export const CURRENCY_SYMBOL = 'TN'

export const CurrencySystem = {
  // معلومات العملة
  info: {
    name: CURRENCY_NAME,
    symbol: CURRENCY_SYMBOL,
    fullName: 'Token Coins',
    decimals: 0,
    minTransaction: 1,
    maxTransaction: 1000000
  },

  /**
   * تنسيق المبلغ المالي
   * @param {number} amount - المبلغ
   * @returns {string} المبلغ المنسق
   */
  formatAmount: (amount) => {
    return `${amount.toLocaleString('ar-SA')} ${CURRENCY_SYMBOL}`
  },

  /**
   * تنسيق مختصر للمبلغ
   * @param {number} amount - المبلغ
   * @returns {string} المبلغ المختصر
   */
  formatAmountShort: (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M ${CURRENCY_SYMBOL}`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K ${CURRENCY_SYMBOL}`
    }
    return `${amount.toLocaleString('ar-SA')} ${CURRENCY_SYMBOL}`
  },

  /**
   * التحقق من صحة المبلغ
   * @param {number} amount - المبلغ
   * @returns {Object} نتيجة التحقق
   */
  validateAmount: (amount) => {
    if (!Number.isFinite(amount)) {
      return { valid: false, error: 'المبلغ يجب أن يكون رقماً' }
    }
    if (amount < CurrencySystem.info.minTransaction) {
      return { valid: false, error: `الحد الأدنى: ${CurrencySystem.info.minTransaction} ${CURRENCY_SYMBOL}` }
    }
    if (amount > CurrencySystem.info.maxTransaction) {
      return { valid: false, error: `الحد الأقصى: ${CurrencySystem.info.maxTransaction} ${CURRENCY_SYMBOL}` }
    }
    return { valid: true }
  },

  /**
   * حساب الضريبة أو الرسوم
   * @param {number} amount - المبلغ
   * @param {number} feePercentage - نسبة الرسم (افتراضي 0%)
   * @returns {Object} التفاصيل
   */
  calculateFees: (amount, feePercentage = 0) => {
    const fee = (amount * feePercentage) / 100
    const total = amount + fee
    return {
      amount,
      fee,
      feePercentage,
      total,
      formattedAmount: CurrencySystem.formatAmount(amount),
      formattedFee: CurrencySystem.formatAmount(fee),
      formattedTotal: CurrencySystem.formatAmount(total)
    }
  },

  /**
   * حساب الربح والخسارة
   * @param {number} initialAmount - المبلغ الأولي
   * @param {number} finalAmount - المبلغ النهائي
   * @returns {Object} النتائج
   */
  calculateProfit: (initialAmount, finalAmount) => {
    const profit = finalAmount - initialAmount
    const percentage = (profit / initialAmount) * 100
    return {
      initialAmount,
      finalAmount,
      profit,
      percentage,
      isProfit: profit > 0,
      formattedProfit: CurrencySystem.formatAmount(profit),
      percentageText: `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`
    }
  },

  /**
   * تحويل من عملة أخرى
   * @param {number} amount - المبلغ
   * @param {number} exchangeRate - سعر الصرف
   * @returns {number} المبلغ المحول
   */
  convertFromCurrency: (amount, exchangeRate) => {
    return Math.round(amount * exchangeRate)
  },

  /**
   * تحويل إلى عملة أخرى
   * @param {number} amount - المبلغ بـ TN
   * @param {number} exchangeRate - سعر الصرف
   * @returns {number} المبلغ المحول
   */
  convertToCurrency: (amount, exchangeRate) => {
    return amount / exchangeRate
  },

  /**
   * توليد معرّف فريد للمعاملة
   * @returns {string} معرّف المعاملة
   */
  generateTransactionId: () => {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  },

  /**
   * حساب الأرباح بناءً على RTP
   * @param {number} bet - الرهان
   * @param {number} rtp - نسبة العودة (RTP)
   * @returns {number} الربح المتوقع
   */
  calculateExpectedWin: (bet, rtp = 96) => {
    return Math.round((bet * rtp) / 100)
  },

  /**
   * توليد رهان عشوائي بناءً على احصائيات
   * @param {number} bet - مبلغ الرهان
   * @param {number} rtp - نسبة العودة
   * @returns {number} نتيجة الرهان
   */
  generateBetOutcome: (bet, rtp = 96) => {
    const random = Math.random() * 100
    
    // توزيع الاحتمالات بناءً على RTP
    if (random < 30) {
      return 0 // خسارة
    } else if (random < 50) {
      return bet * 2 // ربح 2x
    } else if (random < 60) {
      return bet * 3 // ربح 3x
    } else if (random < 65) {
      return bet * 5 // ربح 5x
    } else if (random < 68) {
      return bet * 10 // ربح 10x
    } else if (random < 69) {
      return bet * 50 // ربح كبير 50x
    }
    return 0
  },

  /**
   * دالة تحويل الأرقام الكبيرة لصيغة مختصرة
   * @param {number} num - الرقم
   * @returns {string} الرقم المختصر
   */
  abbreviateNumber: (num) => {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'ألف' },
      { value: 1e6, symbol: 'مليون' },
      { value: 1e9, symbol: 'مليار' },
      { value: 1e12, symbol: 'تريليون' }
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    let item
    for (let i = lookup.length - 1; i >= 0; i--) {
      item = lookup[i]
      if (num >= item.value) {
        return (num / item.value).toFixed(1).replace(rx, '$1') + ' ' + item.symbol
      }
    }
    return num.toString()
  },

  /**
   * الحصول على معلومات العملة
   * @returns {Object} معلومات العملة
   */
  getInfo: () => {
    return {
      ...CurrencySystem.info,
      formattedName: `${CURRENCY_NAME} - ${CurrencySystem.info.fullName}`,
      description: 'عملة افتراضية للنظام'
    }
  }
}

// أنماط المعاملات
export const TransactionTypes = {
  DEPOSIT: 'إيداع',
  WITHDRAWAL: 'سحب',
  BET: 'رهان',
  WIN: 'فوز',
  BONUS: 'مكافأة',
  TRANSFER: 'تحويل',
  PENALTY: 'غرامة'
}

// حالات المعاملات
export const TransactionStatus = {
  PENDING: 'قيد الانتظار',
  COMPLETED: 'مكتملة',
  FAILED: 'فشلت',
  CANCELLED: 'ملغاة'
}

/**
 * فئة المعاملة
 */
export class Transaction {
  constructor(userId, amount, type, description = '') {
    this.id = CurrencySystem.generateTransactionId()
    this.userId = userId
    this.amount = amount
    this.type = type
    this.description = description
    this.status = TransactionStatus.PENDING
    this.timestamp = new Date().toISOString()
    this.metadata = {}
  }

  markCompleted() {
    this.status = TransactionStatus.COMPLETED
  }

  markFailed(reason = '') {
    this.status = TransactionStatus.FAILED
    this.metadata.failReason = reason
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      amount: this.amount,
      type: this.type,
      description: this.description,
      status: this.status,
      timestamp: this.timestamp,
      metadata: this.metadata
    }
  }
}
