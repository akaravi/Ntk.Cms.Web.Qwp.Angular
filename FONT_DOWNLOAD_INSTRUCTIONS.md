# دستورالعمل دانلود فونت‌ها

## فونت Roboto

برای دانلود فونت Roboto:

1. مراجعه به: https://fonts.google.com/specimen/Roboto
2. کلیک روی "Download family"
3. استخراج فایل ZIP
4. کپی فایل‌های زیر به `src/assets/fonts/roboto/`:
   - `Roboto-Light.ttf` → `Roboto-Light.woff2` و `Roboto-Light.woff` (تبدیل با ابزار آنلاین)
   - `Roboto-Regular.ttf` → `Roboto-Regular.woff2` و `Roboto-Regular.woff`
   - `Roboto-Medium.ttf` → `Roboto-Medium.woff2` و `Roboto-Medium.woff`

**یا استفاده از Google Fonts Helper:**
- مراجعه به: https://gwfh.mranftl.com/fonts/roboto
- انتخاب وزن‌های: 300, 400, 500
- دانلود و استخراج به `src/assets/fonts/roboto/`

## Material Icons

برای دانلود Material Icons:

1. مراجعه به: https://fonts.google.com/icons
2. کلیک روی "Download" در بالای صفحه
3. دانلود فایل ZIP
4. استخراج فایل‌های زیر به `src/assets/fonts/material-icons/`:
   - `MaterialIcons-Regular.ttf`
   - تبدیل به `MaterialIcons-Regular.woff2` و `MaterialIcons-Regular.woff` (با ابزار آنلاین)

**یا استفاده از npm:**
```bash
npm install material-icons --save
```
سپس کپی فایل‌های فونت از `node_modules/material-icons/font/` به `src/assets/fonts/material-icons/`

## ابزارهای تبدیل فونت

برای تبدیل TTF به WOFF2 و WOFF:
- https://cloudconvert.com/ttf-to-woff2
- https://convertio.co/ttf-woff2/
- یا استفاده از `woff2` CLI tool

## جایگزین سریع (استفاده از npm)

اگر می‌خواهید فونت‌ها را از npm بگیرید:

```bash
# برای Roboto
npm install typeface-roboto --save

# برای Material Icons
npm install material-icons --save
```

سپس در `angular.json` مسیرهای زیر را اضافه کنید:
- `node_modules/typeface-roboto/index.css`
- `node_modules/material-icons/iconfont/material-icons.css`
