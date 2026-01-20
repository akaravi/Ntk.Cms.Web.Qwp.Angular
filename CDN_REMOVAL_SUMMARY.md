# خلاصه حذف وابستگی به CDN

## تغییرات انجام شده

### ✅ 1. حذف Google Fonts (Roboto) از CDN
- **قبل:** لینک CDN در `index.html`
- **بعد:** نصب `typeface-roboto` از npm
- **فایل:** اضافه شده به `angular.json` در بخش `styles`

### ✅ 2. حذف Material Icons از CDN
- **قبل:** لینک CDN در `index.html`
- **بعد:** نصب `material-icons` از npm
- **فایل:** اضافه شده به `angular.json` در بخش `styles`

### ✅ 3. حذف Bootstrap از CDN
- **قبل:** لینک CDN از unpkg در `index.html`
- **بعد:** نصب `bootstrap@3.3.7` از npm
- **فایل:** اضافه شده به `angular.json` در بخش `styles`

### ✅ 4. حذف اسکریپت خارجی
- **قبل:** `<script async src="//ads.ntk.ir/www/delivery/asyncjs.php"></script>`
- **بعد:** حذف شده (در صورت نیاز می‌توانید فایل را دانلود و در `src/assets/js/` قرار دهید)

## فایل‌های تغییر یافته

1. **`src/index.html`**
   - حذف تمام لینک‌های CDN
   - حذف اسکریپت خارجی
   - اضافه شدن کامنت‌های توضیحی

2. **`angular.json`**
   - اضافه شدن Bootstrap CSS به `styles`
   - اضافه شدن Roboto font به `styles`
   - اضافه شدن Material Icons به `styles`
   - به‌روزرسانی بخش `test` نیز

3. **`package.json`**
   - اضافه شدن `bootstrap@3.3.7`
   - اضافه شدن `typeface-roboto`
   - اضافه شدن `material-icons`

## پکیج‌های نصب شده

```json
{
  "dependencies": {
    "bootstrap": "^3.3.7",
    "typeface-roboto": "^0.0.75",
    "material-icons": "^1.13.11"
  }
}
```

## منابع باقی‌مانده (نیازی به تغییر نیست)

### API Endpoints در environment files
این‌ها آدرس‌های backend API هستند و باید باقی بمانند:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

### لینک‌های خارجی در HTML
لینک‌های معمولی به وب‌سایت‌های دیگر (نه CDN):
- `src/app/app.component.html` - لینک‌های `http://ntk.ir` و `https://karavi.ca`

## تست آفلاین

برای تست اینکه پروژه بدون اینترنت کار می‌کند:

1. **Build پروژه:**
   ```bash
   ng build --configuration production
   ```

2. **قطع اتصال اینترنت**

3. **اجرای پروژه:**
   ```bash
   npx http-server dist/ntk-cms-web-qwp -p 4200
   ```

4. **بررسی در مرورگر:**
   - باز کردن `http://localhost:4200`
   - باز کردن DevTools (F12)
   - بررسی تب Network
   - اطمینان از عدم وجود failed requests
   - اطمینان از عدم وجود خطاهای CORS

## نکات مهم

1. ✅ تمام فونت‌ها و CSS از npm نصب شده‌اند و در bundle نهایی قرار می‌گیرند
2. ✅ هیچ درخواست خارجی برای منابع استاتیک وجود ندارد
3. ⚠️ API endpoints هنوز به اینترنت نیاز دارند (این طبیعی است)
4. ⚠️ اگر اسکریپت ads نیاز است، باید به صورت محلی دانلود و اضافه شود

## مراحل بعدی

1. تست کامل پروژه
2. بررسی عملکرد در محیط آفلاین
3. در صورت نیاز، دانلود و اضافه کردن اسکریپت ads به صورت محلی
