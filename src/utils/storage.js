// نظام التخزين الداخلي للبيانات
const STORAGE_KEY = 'casino_data_tn'

export const defaultStorageData = {
  users: [
    {
      id: 'admin001',
      username: 'admin',
      password: 'admin123',
      isAdmin: true,
      balance: 999999,
      role: 'مدير النظام',
      createdAt: new Date().toISOString()
    }
  ],
  currentUser: null,
  transactions: [],
  gameStates: {}
}

export const StorageService = {
  // الحصول على جميع البيانات
  getAllData: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : defaultStorageData
    } catch (error) {
      console.error('[Storage] Error reading data:', error)
      return defaultStorageData
    }
  },

  // حفظ البيانات
  saveData: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('[Storage] Error saving data:', error)
      return false
    }
  },

  // إضافة مستخدم جديد
  addUser: (username, password) => {
    const data = StorageService.getAllData()
    
    // التحقق من عدم وجود المستخدم
    if (data.users.find(u => u.username === username)) {
      return { success: false, message: 'المستخدم موجود بالفعل' }
    }

    const newUser = {
      id: `user_${Date.now()}`,
      username,
      password,
      isAdmin: false,
      balance: 1000,
      role: 'لاعب',
      createdAt: new Date().toISOString()
    }

    data.users.push(newUser)
    StorageService.saveData(data)
    return { success: true, user: newUser }
  },

  // البحث عن مستخدم
  findUser: (username, password) => {
    const data = StorageService.getAllData()
    return data.users.find(u => u.username === username && u.password === password)
  },

  // تحديث رصيد المستخدم
  updateBalance: (userId, amount) => {
    const data = StorageService.getAllData()
    const user = data.users.find(u => u.id === userId)
    
    if (!user) return false

    const oldBalance = user.balance
    user.balance += amount

    // تسجيل المعاملة
    data.transactions.push({
      id: `trans_${Date.now()}`,
      userId,
      amount,
      type: amount > 0 ? 'إيداع' : 'سحب',
      oldBalance,
      newBalance: user.balance,
      timestamp: new Date().toISOString()
    })

    StorageService.saveData(data)
    return true
  },

  // الحصول على مستخدم بواسطة ID
  getUserById: (userId) => {
    const data = StorageService.getAllData()
    return data.users.find(u => u.id === userId)
  },

  // حذف مستخدم
  deleteUser: (userId) => {
    const data = StorageService.getAllData()
    data.users = data.users.filter(u => u.id !== userId)
    StorageService.saveData(data)
    return true
  },

  // الحصول على المعاملات
  getTransactions: () => {
    const data = StorageService.getAllData()
    return data.transactions
  },

  // الحصول على جميع المستخدمين
  getAllUsers: () => {
    const data = StorageService.getAllData()
    return data.users
  },

  // تعيين المستخدم الحالي
  setCurrentUser: (user) => {
    const data = StorageService.getAllData()
    data.currentUser = user
    StorageService.saveData(data)
  },

  // الحصول على المستخدم الحالي
  getCurrentUser: () => {
    const data = StorageService.getAllData()
    return data.currentUser
  },

  // تسجيل الخروج
  logout: () => {
    const data = StorageService.getAllData()
    data.currentUser = null
    StorageService.saveData(data)
  },

  // إضافة رصيد من قبل Admin
  addBalance: (userId, amount) => {
    return StorageService.updateBalance(userId, amount)
  },

  // سحب رصيد من قبل Admin
  subtractBalance: (userId, amount) => {
    return StorageService.updateBalance(userId, -amount)
  },

  // تحديث بيانات المستخدم
  updateUser: (userId, updates) => {
    const data = StorageService.getAllData()
    const user = data.users.find(u => u.id === userId)
    
    if (!user) return false

    Object.assign(user, updates)
    StorageService.saveData(data)
    return true
  },

  // إعادة تعيين البيانات (للتطوير)
  resetData: () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStorageData))
  }
}
