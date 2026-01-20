# برنامه دقیق انتقال به Angular 20 و حذف وابستگی به CDN

## وضعیت فعلی پروژه
- **Angular Version:** 15.1.0
- **TypeScript:** 4.9.4
- **Node.js:** نیاز به بررسی نسخه LTS مناسب برای Angular 20

## بخش اول: برنامه ارتقا به Angular 20

### مرحله 1: آماده‌سازی محیط (Pre-Migration)
1. **بررسی و به‌روزرسانی Node.js**
   - Angular 20 احتمالاً به Node.js 20.x یا بالاتر نیاز دارد
   - نصب Node.js LTS مناسب

2. **پشتیبان‌گیری از پروژه**
   - ایجاد branch جدید: `git checkout -b migration/angular-20`
   - Commit تمام تغییرات فعلی

3. **بررسی وابستگی‌ها**
   - بررسی compatibility تمام پکیج‌های third-party با Angular 20
   - لیست پکیج‌ها:
     - `ntk-cms-api`: ^1.2.212
     - `ngx-toastr`: ^16.1.1
     - `@flowjs/ngx-flow`: ^0.6.0
     - `@flowjs/flow.js`: ^2.14.1

### مرحله 2: ارتقای مرحله‌به‌مرحله (Incremental Upgrade)

**⚠️ مهم: هرگز از Angular 15 مستقیماً به Angular 20 نپرید!**

#### مرحله 2.1: Angular 15 → Angular 16
```bash
ng update @angular/core@16 @angular/cli@16
ng update @angular/material@16
```
- بررسی breaking changes در Angular 16
- به‌روزرسانی TypeScript به نسخه 5.x
- حذف `zone.js` polyfill (در صورت امکان)

#### مرحله 2.2: Angular 16 → Angular 17
```bash
ng update @angular/core@17 @angular/cli@17
ng update @angular/material@17
```
- **تغییر مهم:** شروع انتقال به Standalone Components
- حذف NgModules در صورت امکان
- به‌روزرسانی routing به standalone

#### مرحله 2.3: Angular 17 → Angular 18
```bash
ng update @angular/core@18 @angular/cli@18
ng update @angular/material@18
```
- ادامه انتقال به Standalone
- بررسی تغییرات در SSR (در صورت استفاده)
- به‌روزرسانی Zone.js

#### مرحله 2.4: Angular 18 → Angular 19
```bash
ng update @angular/core@19 @angular/cli@19
ng update @angular/material@19
```
- تکمیل انتقال به Standalone
- بررسی تغییرات در Material Design
- به‌روزرسانی RxJS (در صورت نیاز)

#### مرحله 2.5: Angular 19 → Angular 20
```bash
ng update @angular/core@20 @angular/cli@20
ng update @angular/material@20
```
- بررسی breaking changes نهایی
- تست کامل تمام قابلیت‌ها
- به‌روزرسانی تمام dependencies

### مرحله 3: تغییرات کد (Code Changes)

#### 3.1: تبدیل به Standalone Components
- تبدیل تمام Components به Standalone
- حذف `app.module.ts` و استفاده از `bootstrapApplication`
- به‌روزرسانی routing به standalone

#### 3.2: به‌روزرسانی TypeScript
- به‌روزرسانی به TypeScript 5.7+ (برای Angular 20)
- فعال‌سازی strict mode (در صورت امکان)
- رفع تمام type errors

#### 3.3: به‌روزرسانی RxJS
- بررسی و به‌روزرسانی operators
- استفاده از جدیدترین patterns

#### 3.4: به‌روزرسانی Material Design
- بررسی تغییرات API
- به‌روزرسانی imports
- تست تمام کامپوننت‌های Material

### مرحله 4: تست و اعتبارسنجی
1. **Unit Tests**
   ```bash
   ng test
   ```

2. **E2E Tests**
   ```bash
   ng e2e
   ```

3. **Build Tests**
   ```bash
   ng build --configuration production
   ```

4. **Manual Testing**
   - تست تمام صفحات
   - تست تمام قابلیت‌ها
   - تست در مرورگرهای مختلف

---

## بخش دوم: حذف وابستگی به CDN و محلی‌سازی منابع

### منابع CDN فعلی که باید حذف شوند:
1. ✅ Google Fonts (Roboto) - خط 12 در `index.html`
2. ✅ Material Icons - خط 13 در `index.html`
3. ✅ Bootstrap CSS - خط 14 در `index.html`
4. ✅ External Script (ads) - خط 21 در `index.html`

### مرحله 1: انتقال فونت Roboto

#### 1.1: دانلود فونت Roboto
- دانلود فونت از Google Fonts
- فرمت‌های مورد نیاز: woff2, woff, ttf
- ذخیره در `src/assets/fonts/roboto/`

#### 1.2: تعریف @font-face در CSS
- ایجاد فایل `src/assets/fonts/roboto.css`
- تعریف تمام وزن‌های فونت (300, 400, 500)
- اضافه کردن به `angular.json` در بخش styles

#### 1.3: حذف لینک CDN از `index.html`

### مرحله 2: انتقال Material Icons

#### 2.1: نصب Material Icons به صورت محلی
- استفاده از `@angular/material` که شامل آیکون‌هاست
- یا دانلود فونت Material Icons
- ذخیره در `src/assets/fonts/material-icons/`

#### 2.2: تعریف @font-face برای Material Icons
- ایجاد فایل CSS برای Material Icons
- اضافه کردن به `angular.json`

#### 2.3: حذف لینک CDN از `index.html`

### مرحله 3: نصب Bootstrap به صورت محلی

#### 3.1: نصب Bootstrap از npm
```bash
npm install bootstrap@3.3.7 --save
```

#### 3.2: اضافه کردن به angular.json
- اضافه کردن مسیر CSS به بخش `styles`
- اضافه کردن مسیر JS به بخش `scripts` (در صورت نیاز)

#### 3.3: حذف لینک CDN از `index.html`

### مرحله 4: حذف اسکریپت‌های خارجی

#### 4.1: بررسی اسکریپت ads
- حذف یا جایگزینی با نسخه محلی
- در صورت نیاز، دانلود و ذخیره در `src/assets/js/`

#### 4.2: حذف از `index.html`

### مرحله 5: بررسی سایر منابع خارجی

#### 5.1: جستجوی تمام URLهای خارجی
- جستجو در تمام فایل‌های TypeScript, HTML, CSS
- بررسی فایل‌های environment

#### 5.2: محلی‌سازی یا حذف
- در صورت امکان، محلی‌سازی
- در غیر این صورت، حذف یا غیرفعال‌سازی

### مرحله 6: تست آفلاین

#### 6.1: Build پروژه
```bash
ng build --configuration production
```

#### 6.2: تست آفلاین
- قطع اتصال اینترنت
- اجرای پروژه از `dist/`
- بررسی Network Tab در DevTools
- اطمینان از عدم وجود failed requests

#### 6.3: بررسی Console
- عدم وجود خطاهای مربوط به منابع خارجی
- عدم وجود CORS errors

---

## چک‌لیست نهایی

### ارتقا به Angular 20:
- [ ] به‌روزرسانی Node.js
- [ ] پشتیبان‌گیری از پروژه
- [ ] ارتقا از 15 → 16
- [ ] ارتقا از 16 → 17
- [ ] ارتقا از 17 → 18
- [ ] ارتقا از 18 → 19
- [ ] ارتقا از 19 → 20
- [ ] تبدیل به Standalone Components
- [ ] به‌روزرسانی TypeScript
- [ ] به‌روزرسانی تمام dependencies
- [ ] تست کامل

### حذف CDN:
- [ ] انتقال فونت Roboto
- [ ] انتقال Material Icons
- [ ] نصب Bootstrap محلی
- [ ] حذف اسکریپت‌های خارجی
- [ ] بررسی تمام URLهای خارجی
- [ ] تست آفلاین موفق
- [ ] عدم وجود failed requests در Network Tab

---

## نکات مهم

1. **زمان‌بندی:** ارتقا به Angular 20 ممکن است چند هفته زمان ببرد
2. **تست:** در هر مرحله باید تست کامل انجام شود
3. **پشتیبان‌گیری:** همیشه قبل از تغییرات بزرگ، commit کنید
4. **مستندات:** تغییرات را مستند کنید
5. **تیم:** در صورت کار تیمی، هماهنگی با اعضای تیم ضروری است

---

## منابع مفید

- [Angular Update Guide](https://update.angular.io/)
- [Angular Standalone Components](https://angular.io/guide/standalone-components)
- [Material Design Icons](https://fonts.google.com/icons)
- [Bootstrap Documentation](https://getbootstrap.com/docs/3.3/)
