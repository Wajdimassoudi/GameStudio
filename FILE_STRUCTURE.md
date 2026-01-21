# 📂 هيكل الملفات الكامل - كازينو TN

## هيكل المشروع النهائي

```
casino-app/
│
├── 📄 index.html                    # صفحة HTML الرئيسية
│   └── Meta tags + السكريبت الرئيسي
│
├── 📦 src/                          # مجلد المصدر الرئيسي
│   │
│   ├── 📄 main.jsx                  # نقطة الدخول
│   ├── 📄 App.jsx                   # المكون الرئيسي
│   ├── 📄 index.css                 # الأنماط العامة
│   │
│   ├── 📁 components/               # مجلد المكونات
│   │   ├── 📄 Login.jsx             # صفحة الدخول
│   │   ├── 📄 GameLobby.jsx         # لوبي الألعاب الأساسي
│   │   ├── 📄 GameLobbyEnhanced.jsx # لوبي محسّن مع SOFTSWISS
│   │   ├── 📄 GameCard.jsx          # بطاقة اللعبة
│   │   ├── 📄 GameModal.jsx         # نافذة اللعبة
│   │   ├── 📄 AdminDashboard.jsx    # لوحة تحكم Admin
│   │   ├── 📄 AdminStatistics.jsx   # إحصائيات Admin
│   │   └── 📄 UserManagement.jsx    # إدارة المستخدمين
│   │
│   └── 📁 utils/                    # مجلد المساعدات
│       ├── 📄 storage.js            # نظام التخزين
│       ├── 📄 authContext.js        # سياق المصادقة
│       ├── 📄 softswissAPI.js       # تكامل SOFTSWISS
│       └── 📄 currencySystem.js     # نظام العملات
│
├── 📄 vite.config.js                # إعدادات Vite
├── 📄 tailwind.config.js            # إعدادات Tailwind
├── 📄 postcss.config.js             # إعدادات PostCSS
├── 📄 netlify.toml                  # إعدادات Netlify
│
├── 📄 package.json                  # المكتبات والسكريبتات
├── 📄 casino-package.json           # نسخة بديلة من package.json
└── 📄 casino.gitignore              # قائمة الملفات المتجاهلة
│
├── 📚 التوثيق:
│   ├── 📄 README.md                 # دليل المشروع الأساسي
│   ├── 📄 CASINO_README.md          # دليل شامل
│   ├── 📄 QUICK_START.md            # البدء السريع
│   ├── 📄 INSTALLATION.md           # دليل التثبيت
│   ├── 📄 DEVELOPMENT_GUIDE.md      # دليل التطوير
│   ├── 📄 PROJECT_SUMMARY.md        # ملخص المشروع
│   └── 📄 FILE_STRUCTURE.md         # هذا الملف
│
└── 📁 dist/                         # مجلد الإخراج (بعد البناء)
    ├── 📄 index.html
    ├── 📁 assets/
    │   └── 📄 index-[hash].js
    └── 📄 vite.svg
```

---

## تفاصيل الملفات

### 🏗️ ملفات الإعداد

#### `package.json`
```json
{
  "name": "casino-app",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": ["react", "react-dom"],
  "devDependencies": ["vite", "tailwindcss", ...]
}
```

#### `vite.config.js`
```javascript
// إعدادات أداة البناء
// - تفعيل React plugin
// - إعدادات الأداء
// - حجم الـ bundle
```

#### `tailwind.config.js`
```javascript
// تكوين Tailwind CSS
// - الألوان المخصصة
// - الخطوط والأحجام
// - المتغيرات والتوسيعات
```

#### `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 🎨 مجلد المكونات (components/)

#### `Login.jsx` (155 سطر)
- واجهة تسجيل الدخول
- نموذج التسجيل
- التحقق من البيانات
- الرسائل والتنبيهات

**الاستخدام:**
```jsx
import Login from './components/Login'
<Login onLoginSuccess={handleLogin} />
```

#### `GameLobby.jsx` (273 سطر)
- عرض قائمة الألعاب
- البحث والفلترة
- عرض الرصيد
- إدارة الألعاب

**الاستخدام:**
```jsx
<GameLobby currentUser={user} onLogout={logout} />
```

#### `GameLobbyEnhanced.jsx` (264 سطر)
- لوبي محسّن
- دعم SOFTSWISS API
- إدخال API Key
- تبديل بين المحاكاة والحقيقي

#### `GameCard.jsx` (52 سطر)
- عرض بطاقة اللعبة
- الصورة والمعلومات
- زر اللعب

#### `GameModal.jsx` (248 سطر)
- نافذة اللعبة الرئيسية
- نظام الرهان
- محاكاة النتائج
- عرض الأرباح

#### `AdminDashboard.jsx` (364 سطر)
- الواجهة الرئيسية لـ Admin
- التبويبات المختلفة
- إدارة المستخدمين والأموال
- عرض المعاملات

#### `AdminStatistics.jsx` (174 سطر)
- الإحصائيات الشاملة
- الرسوم البيانية
- معلومات النظام

#### `UserManagement.jsx` (282 سطر)
- جدول المستخدمين
- البحث والفلترة
- الفرز المتقدم
- عمليات التعديل

---

### 🛠️ مجلد المساعدات (utils/)

#### `storage.js` (173 سطر)
**الوظائف:**
- `getAllData()` - الحصول على جميع البيانات
- `addUser()` - إضافة مستخدم جديد
- `findUser()` - البحث عن مستخدم
- `updateBalance()` - تحديث الرصيد
- `getTransactions()` - جلب المعاملات
- `resetData()` - إعادة تعيين

```javascript
StorageService.addUser('user', 'pass')
StorageService.updateBalance(userId, amount)
```

#### `authContext.js` (129 سطر)
**للتوسع المستقبلي:**
- `AuthProvider` - توفير بيانات المصادقة
- `useAuth()` - custom hook
- إدارة الحالة العامة

#### `softswissAPI.js` (286 سطر)
**الوظائف:**
- `fetchGames()` - جلب الألعاب
- `fetchGameDetails()` - تفاصيل اللعبة
- `fetchProviders()` - الموفرين
- `getMockGames()` - بيانات محاكاة
- `validateApiKey()` - التحقق من المفتاح

```javascript
const games = await SoftswissAPIService.fetchGames(apiKey)
```

#### `currencySystem.js` (258 سطر)
**الوظائف:**
- `formatAmount()` - تنسيق المبالغ
- `validateAmount()` - التحقق
- `calculateFees()` - حساب الرسوم
- `calculateProfit()` - حساب الأرباح
- `generateBetOutcome()` - نتيجة الرهان

```javascript
CurrencySystem.formatAmount(1000) // "1,000 TN"
```

---

### 📄 ملفات HTML و CSS

#### `index.html` (18 سطر)
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>كازينو TN</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### `src/index.css` (62 سطر)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* أنماط مخصصة */
.coin-animation { animation: spin 0.6s ease-in-out; }
.pulse-glow { animation: pulse 2s cubic-bezier(...) infinite; }
```

---

### 📚 ملفات التوثيق

#### `QUICK_START.md` (170 سطر)
- 3 خطوات للبدء
- حسابات الاختبار
- حل المشاكل الشائعة

#### `INSTALLATION.md` (381 سطر)
- التثبيت المحلي
- النشر على Netlify
- استكشاف الأخطاء

#### `DEVELOPMENT_GUIDE.md` (432 سطر)
- نقاط التخصيص
- إضافة ألعاب
- تكامل SOFTSWISS

#### `CASINO_README.md` (278 سطر)
- دليل شامل
- الميزات الكاملة
- التطوير المستقبلي

#### `PROJECT_SUMMARY.md` (291 سطر)
- ملخص المشروع
- الميزات المنجزة
- قائمة المراجعة

---

## حجم الملفات التقريبي

### قبل الضغط (Development)
```
src/components/     ~15 KB
src/utils/          ~5 KB
src/index.css       ~2 KB
src/main.jsx        ~0.5 KB
src/App.jsx         ~2 KB
────────────────────────
Total src/         ~24.5 KB

Configurations      ~2 KB
════════════════════════
Project Total      ~26.5 KB
```

### بعد الضغط (Production)
```
dist/index.html     ~5 KB
dist/assets/*.js    ~3-5 KB
dist/assets/*.css   ~1-2 KB
────────────────────────
Total              ~10-15 KB
```

---

## سير تطور الملفات

### عند التطوير
```
Source Files (src/) → Vite → Dev Server (localhost:5173)
```

### عند النشر
```
Source Files → Vite Build → Minified Files → dist/ → Netlify CDN
```

---

## تسلسل الاستيراد

### في `src/main.jsx`
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'        // ← المكون الرئيسي
import './index.css'               // ← الأنماط
```

### في `src/App.jsx`
```javascript
import Login from './components/Login'
import GameLobby from './components/GameLobby'
import AdminDashboard from './components/AdminDashboard'
import { StorageService } from './utils/storage'
```

### في المكونات
```javascript
import { StorageService } from '../utils/storage'
import SoftswissAPIService from '../utils/softswissAPI'
import { CurrencySystem } from '../utils/currencySystem'
```

---

## ملفات يتم إنشاؤها تلقائياً

### بعد `npm install`
```
node_modules/       (المكتبات المثبتة)
package-lock.json   (إصدارات المكتبات)
```

### بعد `npm run build`
```
dist/
├── index.html
├── vite.svg
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

---

## الملفات المتجاهلة (.gitignore)

```
node_modules/
dist/
.env
.env.local
*.swp
*.swo
.DS_Store
npm-debug.log*
.cache
.parcel-cache
```

---

## تحسينات البناء

### في `vite.config.js`
```javascript
build: {
  outDir: 'dist',
  sourcemap: false,           // بدون خريطة المصدر
  minify: 'terser',          // ضغط الكود
  chunkSizeWarningLimit: 1000
}
```

---

## خريطة الأداء

### أكبر 5 ملفات (بعد الضغط)
1. `App.jsx` + Components - ~8-10 KB
2. `storage.js` - ~2 KB
3. `softswissAPI.js` - ~1.5 KB
4. `currencySystem.js` - ~1 KB
5. `index.css` - ~1 KB

---

## ملاحظات هامة

- ✅ جميع الملفات مع ملاحظات توضيحية
- ✅ الكود منظم وقابل للصيانة
- ✅ سهل الفهم والتطوير
- ✅ توثيق شامل لكل جزء
- ✅ آمن وجاهز للإنتاج

---

## الملفات التي قد تحتاج تعديل

| الملف | السبب |
|------|-------|
| `tailwind.config.js` | تخصيص الألوان |
| `index.html` | تغيير الاسم والوصف |
| `src/utils/softswissAPI.js` | إضافة ألعاب جديدة |
| `src/utils/storage.js` | تغيير الرصيد الافتراضي |
| `src/components/Login.jsx` | تخصيص الرسائل |

---

**هيكل المشروع جاهز وكامل! استمتع بـ كازينو TN 🎰**
