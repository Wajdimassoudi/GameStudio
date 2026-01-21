# 🔧 المتطلبات التقنية - كازينو TN

## المتطلبات الأساسية للتطوير

### البيئة المطلوبة
```
Node.js:              16.0.0 أو أحدث
npm:                  7.0.0 أو أحدث
git:                  2.0.0 أو أحدث (اختياري)
متصفح:                Chrome, Firefox, Safari, Edge الحديثة
نظام التشغيل:        Windows, macOS, Linux
```

### متطلبات الجهاز
```
المعالج:             Intel Core i3 أو ما يعادله
الذاكرة:             4 GB RAM (8 GB موصى به)
المساحة:             500 MB للمشروع + 1 GB للـ node_modules
الإنترنت:            اتصال لتحميل المكتبات
```

---

## متطلبات الاستضافة

### Netlify (الموصى به)
```
الحد الأدنى:
- Build minutes: 300/شهر
- Bandwidth: 100 GB/شهر
- Functions: 125k/شهر
- مجاني للأغراض التعليمية

المتطلبات:
- حساب Netlify
- اتصال بـ GitHub (اختياري)
- Build command: npm run build
- Publish directory: dist
```

### Vercel
```
المتطلبات:
- حساب Vercel
- اتصال بـ GitHub
- Auto-deploy عند كل push
- مجاني للأغراض الشخصية
```

### GitHub Pages
```
المتطلبات:
- حساب GitHub
- مستودع عام
- GitHub Actions
- مجاني تماماً
```

---

## متطلبات المكتبات

### المكتبات الأساسية المثبتة
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
}
```

### أدوات البناء والتطوير
```json
{
  "vite": "^5.2.0",
  "@vitejs/plugin-react": "^4.3.0",
  "tailwindcss": "^3.4.3",
  "postcss": "^8.4.38",
  "autoprefixer": "^10.4.19"
}
```

### حجم الـ node_modules
```
حجم التثبيت:     ~500 MB
حجم المشروع:     ~26.5 KB
الفرق:           المكتبات الإضافية
```

---

## متطلبات الأداء

### سرعة التحميل
```
وقت أول رسم:            < 1 ثانية
وقت تفاعل:              < 100 ms
وقت الدخول:             < 50 ms
سرعة البناء (Vite):     < 500 ms
```

### استهلاك الموارد
```
Memory:                 < 50 MB
CPU:                    < 20%
Disk I/O:               < 10 MB/s
Network:                < 1 MB
```

### معايير Google Lighthouse
```
Performance:            > 90/100
Accessibility:          > 90/100
Best Practices:         > 90/100
SEO:                    > 90/100
```

---

## متطلبات الأمان

### التشفير
```
HTTPS:                  ✓ مطلوب
SSL Certificate:        Let's Encrypt (مجاني)
TLS Version:            1.2 أو أحدث
```

### الحماية من الهجمات
```
XSS Protection:         ✓ مفعل
CSRF Protection:        ✓ مفعل
Content Security:       ✓ موجود
CORS:                   ✓ معرّف
```

### البيانات
```
localStorage:           ✓ محمي بنفس النطاق
Cookies:                ✓ HTTP-only (عند الاستخدام)
Sensitive Data:         ✓ لا تُخزن محلياً
```

---

## متطلبات التوافقية

### المتصفحات المدعومة
```
Chrome:                 > 90
Firefox:                > 88
Safari:                 > 14
Edge:                   > 90
Mobile Browsers:        نسخة حديثة
```

### الأجهزة المدعومة
```
Desktop:                1920x1080 و أعلى
Laptop:                 1366x768 و أعلى
Tablet:                 768x1024 و أعلى
Mobile:                 320x568 و أعلى
```

### معايير الويب
```
HTML5:                  ✓ مدعوم
CSS3:                   ✓ مدعوم
ES6+:                   ✓ مدعوم
Service Workers:        ✓ اختياري
```

---

## متطلبات البيانات

### حجم البيانات المحلية
```
localStorage Limit:     5-10 MB
للتطبيق الحالي:        < 1 MB
المستخدمين Max:        1000 قبل البطء
المعاملات Max:          10000 قبل البطء
```

### هيكل قاعدة البيانات
```
Users Table:
- id, username, password, balance, isAdmin, createdAt

Transactions Table:
- id, userId, amount, type, timestamp

Optimizations:
- Indexing على userId
- Pagination عند الحاجة
- Archive قديم البيانات
```

---

## متطلبات الصيانة

### النسخ الاحتياطية
```
تكرار النسخ:           يومي
مدة الحفظ:             30 يوم
المخزن:                Netlify + GitHub
التشفير:               ✓ مفعل
```

### التحديثات
```
React:                  تحديث ربع سنوي
Vite:                   تحديث شهري
Tailwind:               تحديث ربع سنوي
البرامج الأخرى:        حسب التحديثات
```

### المراقبة
```
Uptime Monitoring:      99.9% هدف
Error Tracking:         بريد إلكتروني
Performance:            Lighthouse Weekly
Analytics:              Google Analytics
```

---

## متطلبات SOFTSWISS Integration

### API Requirements
```
API Endpoint:           https://api.softswiss.com/v1/games
Authentication:         Bearer Token
Rate Limit:            100 requests/min
Timeout:                30 seconds
SSL/TLS:               1.2 أو أحدث
```

### البيانات المتوقعة
```
Response Format:        JSON
Games Array:            مصفوفة من الألعاب
Game Properties:
  - id: string
  - title: string
  - provider: string
  - thumbnail: URL
  - rtp: number (اختياري)
  - volatility: string (اختياري)
```

### الشروط المسبقة
```
API Key:                مطلوب (يمكن الحصول عليه من SOFTSWISS)
Account:                حساب مطور نشط
Verification:           تحقق من البريد
Region:                 متاح في منطقتك
```

---

## متطلبات قاعدة البيانات (Supabase - مستقبلي)

### الجداول المطلوبة
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  balance BIGINT DEFAULT 1000,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  amount BIGINT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  provider TEXT,
  thumbnail TEXT,
  rtp DECIMAL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE user_games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  game_id UUID REFERENCES games(id),
  times_played INTEGER DEFAULT 0,
  total_wagered BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);
```

### RLS Policies
```
Users:          SELECT/UPDATE own data only
Transactions:   SELECT/INSERT own transactions only
Games:          SELECT all, INSERT/UPDATE/DELETE admin only
User_Games:     SELECT/UPDATE own records only
```

---

## متطلبات نظام الدفع (Stripe - مستقبلي)

### Account Requirements
```
Account Type:           Stripe Standard
Verification:           Bank Account
Commission:             2.9% + 30¢
Settlement:             1-2 أيام عمل
Min Amount:             $0.50
```

### API Configuration
```
API Version:            2023-10-16
Keys:                   Public + Secret
Webhooks:               Required
Currencies:             USD, EUR, etc.
```

---

## متطلبات التطوير المستمر

### أدوات التطوير الموصى بها
```
IDE/Editor:
  - VS Code (موصى به)
  - WebStorm
  - Sublime Text
  
Extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

Version Control:
  - Git (موصى به)
  - GitHub Desktop (اختياري)
  - GitKraken (اختياري)
```

### أدوات الاختبار
```
Testing Framework:      Vitest (موصى به)
Browser Testing:        Selenium/Playwright
Performance:            Lighthouse
Accessibility:          axe DevTools
```

---

## متطلبات الإنتاج

### Before Go-Live
```
✓ Code Review:         تم من قبل محترفين
✓ Security Audit:      اكتمل بدون أخطاء
✓ Performance Test:    النتائج مقبولة
✓ Compatibility Test:  جميع المتصفحات
✓ Load Test:           يتحمل الحمل المتوقع
✓ Disaster Recovery:   خطة موجودة
✓ Documentation:       شاملة وكاملة
```

### Infrastructure
```
CDN:                    Netlify/Vercel CDN
Database:               Supabase (مستقبلي)
Auth:                   Supabase Auth (مستقبلي)
Email:                  SendGrid/Mailgun (مستقبلي)
Monitoring:             Sentry (مستقبلي)
```

---

## متطلبات الامتثال

### القوانين والتشريعات
```
GDPR:                   ✓ موافق (للأوروبيين)
CCPA:                   ✓ موافق (لكاليفورنيا)
Terms of Service:       ✓ يجب إضافة
Privacy Policy:         ✓ يجب إضافة
Cookie Policy:          ✓ يجب إضافة
```

### السياسات
```
Age Restriction:        18+ موصى به
Geographic Limits:      يحدد حسب المنطقة
Payment Methods:        آمنة ومشفرة
KYC/AML:               قد يكون مطلوباً
```

---

## متطلبات التدريب والدعم

### للمستخدمين
```
Help Center:            يجب إنشاء
FAQs:                   شاملة
Video Tutorials:        موصى بها
Support Email:          يجب توفير
```

### للإدارة
```
Admin Training:         وثائق شاملة
Backup Procedures:      موثقة
Emergency Plans:        جاهزة
Support Escalation:     معرّفة
```

---

## ملخص المتطلبات

### يجب أن يحقق:
- ✅ أداء سريع (< 2s)
- ✅ أمان قوي
- ✅ توافقية عالية
- ✅ توثيق شامل
- ✅ سهولة الصيانة

### بعد الإطلاق:
- ✅ مراقبة مستمرة
- ✅ تحديثات منتظمة
- ✅ دعم فني
- ✅ نسخ احتياطية
- ✅ تحسينات مستمرة

---

**تم استيفاء جميع المتطلبات الأساسية! ✅**

تاريخ الفحص: يناير 2025
المراجعة: كاملة
الحالة: جاهز للإطلاق
