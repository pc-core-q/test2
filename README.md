# متجر الأناقة — توثيق المشروع

موقع تجارة إلكترونية عربي كامل لبيع الملابس، مبني على Firebase.

---

## 🗂️ هيكل الملفات

```
store/
├── index.html              ← الموقع العام (صفحة العملاء)
├── firebase-rules.json     ← قواعد أمان Firebase Realtime Database
├── README.md               ← هذا الملف
├── js/
│   ├── firebase-config.js  ← إعدادات Firebase (تعديله مطلوب)
│   └── image-upload.js     ← منطق رفع الصور إلى ImageBB
└── admin/
    ├── login.html          ← صفحة تسجيل دخول المدير
    └── index.html          ← لوحة الإدارة الكاملة
```

---

## ⚙️ الإعداد خطوة بخطوة

### 1. إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. انقر **Add project** → أدخل اسماً للمشروع → أنشئه
3. من القائمة الجانبية: **Build → Realtime Database → Create database**
   - اختر موقع الخادم (يُنصح بـ `us-central1`)
   - ابدأ في **test mode** مؤقتاً (سنضبط القواعد لاحقاً)
4. من القائمة الجانبية: **Build → Authentication → Get started**
   - فعّل **Email/Password**
   - انقر **Add user** وأضف حساب المدير (بريد إلكتروني + كلمة مرور قوية)
   - ⚠️ لا تضع كلمة المرور في الكود — فقط في Firebase Authentication

### 2. الحصول على بيانات الاتصال

1. من الصفحة الرئيسية للمشروع → ⚙️ **Project settings**
2. انتقل إلى **Your apps → Web app** → انقر `</>`
3. أدخل اسماً ثم انسخ الكائن `firebaseConfig`

### 3. ضبط `js/firebase-config.js`

افتح الملف واستبدل القيم:

```javascript
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyXXXXXXXXXXXXXXXXXXXXXX",
  authDomain:        "my-store-abc12.firebaseapp.com",
  databaseURL:       "https://my-store-abc12-default-rtdb.firebaseio.com",
  projectId:         "my-store-abc12",
  storageBucket:     "my-store-abc12.appspot.com",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abcdef123456"
};

const IMAGEHOST_KEY = "your_imagehost_key"; // ← أضفه من imagehost.io
```

### 4. إعداد ImageBB لرفع الصور

1. اذهب إلى [api.imgbb.com](https://api.imgbb.com/)
2. سجّل حساباً مجانياً
3. من الإعدادات، احصل على **API Key**
4. ضعه في `js/firebase-config.js` كقيمة `IMAGEHOST_KEY`

### 5. تطبيق قواعد أمان Firebase

1. افتح **Realtime Database → Rules**
2. استبدل المحتوى بالقواعد في ملف `firebase-rules.json`:

```json
{
  "rules": {
    "products":   { ".read": true, ".write": "auth != null" },
    "categories": { ".read": true, ".write": "auth != null" },
    "settings":   { ".read": true, ".write": "auth != null" }
  }
}
```

3. انقر **Publish**

---

## 🗄️ هيكل قاعدة البيانات (JSON مثال)

```json
{
  "settings": {
    "siteName":      "متجر الأناقة",
    "whatsapp":      "9647801234567",
    "description":   "متجر متخصص في بيع الملابس الفاخرة",
    "promoBanner":   "توصيل مجاني للطلبات فوق 50,000 د.ع",
    "logoUrl":       "https://i.ibb.co/xxxx/logo.png",
    "bannerUrl":     "https://i.ibb.co/xxxx/banner.jpg",
    "heroBadge":     "مجموعة جديدة",
    "heroTitle":     "أناقتك تبدأ من هنا",
    "heroSubtitle":  "اكتشف أجمل التشكيلات الفاخرة",
    "instagram":     "https://instagram.com/yourstore",
    "tiktok":        "https://tiktok.com/@yourstore",
    "facebook":      "https://facebook.com/yourstore"
  },

  "categories": {
    "-ABC123": {
      "name":      "رجالي",
      "imageUrl":  "https://i.ibb.co/xxxx/men.jpg",
      "order":     1,
      "active":    true,
      "createdAt": 1700000000000
    },
    "-DEF456": {
      "name":      "نسائي",
      "imageUrl":  "https://i.ibb.co/xxxx/women.jpg",
      "order":     2,
      "active":    true,
      "createdAt": 1700000001000
    }
  },

  "products": {
    "-GHI789": {
      "name":        "قميص قطن فاخر",
      "price":       45000,
      "stock":       20,
      "description": "قميص من القطن عالي الجودة بتصميم عصري",
      "categoryId":  "-ABC123",
      "sizes":       ["S", "M", "L", "XL"],
      "colors":      ["أبيض", "أسود", "رمادي"],
      "images":      ["https://i.ibb.co/xxxx/img1.jpg", "https://i.ibb.co/xxxx/img2.jpg"],
      "imageUrl":    "https://i.ibb.co/xxxx/img1.jpg",
      "active":      true,
      "featured":    true,
      "isNew":       false,
      "createdAt":   1700000002000,
      "updatedAt":   1700000002000
    }
  }
}
```

---

## 📱 كيف يعمل طلب واتساب

عندما ينقر العميل على زر **"طلب المنتج"**:

1. يفتح النموذج بتفاصيل المنتج
2. يختار المقاس واللون والكمية
3. ينقر **"طلب المنتج عبر واتساب"**
4. يُبنى رابط `wa.me/` مع رسالة جاهزة تحتوي:
   - اسم المنتج
   - السعر بالدينار العراقي
   - الكمية
   - المقاس والأكمل المختار
5. يُفتح واتساب تلقائياً مع الرسالة

رقم واتساب يُحمَّل دائماً من Firebase → `settings/whatsapp` ، لا يوجد في الكود.

---

## 🚀 النشر (Deployment)

### خيار 1: Firebase Hosting (مجاني وسريع)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# اختر المجلد: store/
firebase deploy
```

### خيار 2: أي استضافة عادية

ارفع جميع ملفات مجلد `store/` إلى الاستضافة كما هي.

### خيار 3: GitHub Pages

اضغط الملفات على GitHub وفعّل GitHub Pages.

---

## 🔐 الأمان

- **كلمة مرور المدير**: محفوظة في Firebase Authentication حصراً، لا تظهر أبداً في الكود
- **قواعد قاعدة البيانات**: الكتابة محمية بـ `auth != null` — فقط المستخدم المسجّل يمكنه التعديل
- **مفاتيح API**: مفتاح Firebase في الواجهة الأمامية هو أمر طبيعي ومقصود لمشاريع Firebase — الحماية الحقيقية تأتي من قواعد قاعدة البيانات
- **ImageBB key**: يظهر في الكود لأنه مطلوب للرفع من المتصفح — هذا مقبول للمشاريع الصغيرة

---

## 📝 الملفات التي لا يجب تعديلها يدوياً

| الملف | السبب |
|-------|-------|
| `admin/index.html` | اللوحة كاملة — التعديل من خلال الواجهة |
| `firebase-rules.json` | فقط انسخها إلى Firebase Console |

الملف الوحيد الذي **يجب** تعديله: `js/firebase-config.js`

---

## ❓ الأسئلة الشائعة

**كيف أضيف مدير إضافي؟**
من Firebase Console → Authentication → Add user

**كيف أغير رقم واتساب؟**
من لوحة الإدارة → إعدادات الموقع

**هل يمكن إضافة منتجات بدون صور؟**
نعم، لكن يُنصح بإضافة صورة لكل منتج

**أين أجد رابط لوحة الإدارة؟**
`https://your-domain.com/admin/` أو اضغط رمز ⚙ في أسفل الموقع
