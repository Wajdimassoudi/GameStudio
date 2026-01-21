# 🔧 دليل التطوير والتخصيص

## محتويات الدليل
1. [بنية المشروع](#بنية-المشروع)
2. [نقاط التخصيص الأساسية](#نقاط-التخصيص-الأساسية)
3. [إضافة ألعاب جديدة](#إضافة-ألعاب-جديدة)
4. [تخصيص الألوان والتصميم](#تخصيص-الألوان-والتصميم)
5. [نظام التخزين والبيانات](#نظام-التخزين-والبيانات)
6. [التكامل مع SOFTSWISS](#التكامل-مع-softswiss)

---

## بنية المشروع

```
casino-app/
├── src/
│   ├── App.jsx                    # المكون الرئيسي
│   ├── main.jsx                   # نقطة الدخول
│   ├── index.css                  # الأنماط العامة
│   ├── components/
│   │   ├── Login.jsx              # صفحة الدخول
│   │   ├── GameLobby.jsx          # لوبي الألعاب
│   │   ├── GameLobbyEnhanced.jsx  # لوبي محسّن مع SOFTSWISS
│   │   ├── GameCard.jsx           # بطاقة اللعبة
│   │   ├── GameModal.jsx          # نافذة اللعبة
│   │   ├── AdminDashboard.jsx     # لوحة تحكم Admin
│   │   ├── AdminStatistics.jsx    # إحصائيات Admin
│   │   └── UserManagement.jsx     # إدارة المستخدمين
│   └── utils/
│       ├── storage.js            # نظام التخزين
│       ├── authContext.js        # سياق المصادقة
│       ├── softswissAPI.js       # تكامل SOFTSWISS
│       └── currencySystem.js     # نظام العملات
├── index.html                    # HTML الرئيسية
├── vite.config.js               # إعدادات Vite
├── tailwind.config.js           # إعدادات Tailwind
├── postcss.config.js            # إعدادات PostCSS
└── package.json                 # المكتبات
```

---

## نقاط التخصيص الأساسية

### 1. تغيير اسم التطبيق

**الملف:** `index.html`
```html
<title>اسمك هنا - العملة الافتراضية</title>
```

**الملف:** `src/App.jsx` و `src/components/Login.jsx`
```javascript
// ابحث عن "كازينو TN" واستبدله
<h1 className="text-4xl font-bold text-white">اسمك هنا</h1>
```

### 2. تغيير اسم العملة

**الملف:** `src/utils/currencySystem.js`
```javascript
export const CURRENCY_NAME = 'YOUR_CURRENCY'
export const CURRENCY_SYMBOL = 'YOUR_SYMBOL'
```

**ثم ابحث واستبدل "TN" في جميع الملفات**

### 3. تغيير الرصيد الافتراضي

**الملف:** `src/utils/storage.js`
```javascript
const newUser = {
  // ...
  balance: 1000, // غيّر هذا الرقم
}
```

### 4. تغيير رصيد Admin

**الملف:** `src/utils/storage.js`
```javascript
{
  id: 'admin001',
  username: 'admin',
  password: 'admin123',
  isAdmin: true,
  balance: 999999, // غيّر هذا الرقم
}
```

---

## إضافة ألعاب جديدة

### الطريقة 1: تعديل البيانات المحاكاة

**الملف:** `src/utils/softswissAPI.js` - دالة `getMockGames()`

```javascript
static getMockGames() {
  return [
    // ألعاب موجودة...
    {
      id: 'game_new_001',
      title: 'اسم لعبتك',
      provider: 'SOFTSWISS',
      rtp: 96.0,
      volatility: 'MEDIUM',
      lines: 25,
      thumbnail: 'رابط الصورة'
    }
  ]
}
```

### الطريقة 2: استخدام SOFTSWISS API الحقيقي

في `GameLobbyEnhanced.jsx`:

```javascript
// ادخل API Key الحقيقي الخاص بك
const apiKey = 'your_softswiss_api_key'
const games = await SoftswissAPIService.fetchGames(apiKey)
```

### متطلبات بطاقة اللعبة:

```javascript
{
  id: 'unique_id',           // معرّف فريد
  title: 'Game Title',        // اسم اللعبة
  provider: 'SOFTSWISS',      // المزود
  rtp: 96.0,                 // نسبة العودة (اختياري)
  volatility: 'MEDIUM',       // التذبذب (اختياري)
  lines: 25,                 // خطوط الدفع (اختياري)
  thumbnail: 'image_url'     // رابط الصورة
}
```

---

## تخصيص الألوان والتصميم

### الألوان الرئيسية

**الملف:** `tailwind.config.js`

```javascript
colors: {
  primary: '#1f2937',      // الأساسي (رمادي داكن)
  secondary: '#4f46e5',    // الثانوي (أزرق)
  accent: '#f59e0b',       // البروز (ذهبي)
  dark: '#111827',         // الأسود
  light: '#f3f4f6'         // الأبيض
}
```

### التخصيص المتقدم

**الملف:** `src/index.css`

```css
/* أنماط مخصصة */
:root {
  --color-primary: #1f2937;
  --color-secondary: #4f46e5;
  --color-accent: #f59e0b;
}
```

---

## نظام التخزين والبيانات

### الوظائف الأساسية

**الملف:** `src/utils/storage.js`

```javascript
// الحصول على جميع البيانات
StorageService.getAllData()

// تسجيل المستخدم
StorageService.addUser(username, password)

// البحث عن مستخدم
StorageService.findUser(username, password)

// تحديث الرصيد
StorageService.updateBalance(userId, amount)

// الحصول على المعاملات
StorageService.getTransactions()

// إعادة تعيين البيانات
StorageService.resetData()
```

### هيكل البيانات

```javascript
{
  users: [
    {
      id: 'user_id',
      username: 'username',
      password: 'password',
      isAdmin: false,
      balance: 1000,
      role: 'لاعب',
      createdAt: 'ISO_DATE'
    }
  ],
  currentUser: { /* بيانات المستخدم الحالي */ },
  transactions: [
    {
      id: 'trans_id',
      userId: 'user_id',
      amount: 100,
      type: 'إيداع',
      oldBalance: 900,
      newBalance: 1000,
      timestamp: 'ISO_DATE'
    }
  ],
  gameStates: {}
}
```

---

## التكامل مع SOFTSWISS

### الخطوة 1: الحصول على API Key

1. اذهب إلى [SOFTSWISS](https://softswiss.com)
2. سجل حساباً للمطورين
3. انسخ API Key الخاص بك

### الخطوة 2: استخدام API

**الملف:** `src/utils/softswissAPI.js`

```javascript
// جلب الألعاب
const games = await SoftswissAPIService.fetchGames(API_KEY)

// جلب تفاصيل لعبة
const details = await SoftswissAPIService.fetchGameDetails(gameId, API_KEY)

// جلب الموفرين
const providers = await SoftswissAPIService.fetchProviders(API_KEY)

// التحقق من API Key
const isValid = await SoftswissAPIService.validateApiKey(API_KEY)
```

### الخطوة 3: دمج في التطبيق

**الملف:** `src/components/GameLobbyEnhanced.jsx`

```javascript
// في المكون
const [apiKey, setApiKey] = useState('YOUR_API_KEY')

const loadGames = async () => {
  const games = await SoftswissAPIService.fetchGames(apiKey)
  setGames(games)
}
```

---

## نظام العملات المخصص

**الملف:** `src/utils/currencySystem.js`

```javascript
// تنسيق المبلغ
CurrencySystem.formatAmount(1000)  // "1,000 TN"

// حساب الأرباح
CurrencySystem.calculateProfit(initialAmount, finalAmount)

// توليد نتيجة الرهان
const outcome = CurrencySystem.generateBetOutcome(betAmount)

// التحقق من صحة المبلغ
CurrencySystem.validateAmount(amount)
```

---

## إضافة ميزات جديدة

### إضافة قائمة جديدة في Admin

**الملف:** `src/components/AdminDashboard.jsx`

```javascript
// أضف تبويب جديد
const [activeTab, setActiveTab] = useState('newTab')

// أضف زر في قائمة التبويبات
<button onClick={() => setActiveTab('newTab')}>
  قائمتك الجديدة
</button>

// أضف محتوى التبويب
{activeTab === 'newTab' && (
  <div>محتوى جديد</div>
)}
```

### إضافة مكون جديد

```javascript
// src/components/MyNewComponent.jsx
import React from 'react'

export default function MyNewComponent() {
  return (
    <div>محتوى جديد</div>
  )
}

// ثم استورده واستخدمه
import MyNewComponent from './MyNewComponent'
```

---

## الأداء والتحسينات

### تحسينات Vite

**الملف:** `vite.config.js`

```javascript
build: {
  minify: 'terser',         // ضغط الكود
  sourcemap: false,         // بدون خريطة المصدر
  chunkSizeWarningLimit: 1000
}
```

### تحسينات Tailwind

- استخدم فئات معروفة بدل arbitrary values
- تجنب الأنماط المكررة
- استخدم المتغيرات المخصصة

---

## الاختبار والتصحيح

### استخدام Console

```javascript
// في Developer Console (F12)
// عرض جميع البيانات
localStorage.getItem('casino_data_tn')

// إعادة تعيين البيانات
localStorage.removeItem('casino_data_tn')

// اختبار دوال Storage
StorageService.getAllUsers()
StorageService.getTransactions()
```

### إضافة رسائل Debug

```javascript
// في الملفات
console.log('[casino] معلومة هنا', data)
console.error('[casino] خطأ هنا', error)
```

---

## نشر التحديثات

### على Netlify

```bash
# بناء المشروع
npm run build

# نشر التحديثات
netlify deploy --prod
```

### على GitHub Pages

```bash
# بناء المشروع
npm run build

# دفع الملفات
git add .
git commit -m "تحديثات جديدة"
git push origin main
```

---

## مشاكل شائعة وحلولها

| المشكلة | الحل |
|-------|------|
| البيانات لا تحفظ | تفعيل localStorage في المتصفح |
| صور اللعب لا تظهر | التحقق من رابط الصورة |
| API غير متجاوب | التحقق من API Key والاتصال |
| الألوان غير صحيحة | تحديث tailwind.config.js |
| الرصيد يعود للقيمة الأولية | التحقق من storage.js |

---

## موارد إضافية

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [SOFTSWISS API](https://softswiss.com/api)
- [Netlify Docs](https://docs.netlify.com)

---

**استمتع بالتطوير! 🚀**
