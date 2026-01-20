# Vazirmatn Font Files

این پوشه حاوی فایل پیکربندی فونت است و فونت از بسته‌ی npm بدون نیاز به CDN بارگذاری می‌شود.

## بارگذاری فعلی (آفلاین):

* `src/assets/fonts/vazirmatn/vazirmatn.css` وزن‌های 300، 400، 500، 600 و 700 را از بسته `@fontsource/vazirmatn` ایمپورت می‌کند. این بسته حین `npm install` دانلود می‌شود و در زمان اجرا نیاز به اینترنت ندارد.

## در صورت نیاز به نسخه آفلاین:

در صورت نیاز به بسته‌بندی فونت‌ها داخل ریپازیتوری (مثلاً برای محیط‌های بدون اینترنت)، فایل‌های زیر را دانلود کرده و در همین پوشه قرار دهید، سپس `vazirmatn.css` را به مسیرهای محلی به‌روزرسانی کنید:

1. Vazirmatn-Light.woff2 / Vazirmatn-Light.woff
2. Vazirmatn-Regular.woff2 / Vazirmatn-Regular.woff
3. Vazirmatn-Medium.woff2 / Vazirmatn-Medium.woff
4. Vazirmatn-SemiBold.woff2 / Vazirmatn-SemiBold.woff
5. Vazirmatn-Bold.woff2 / Vazirmatn-Bold.woff

### نحوه دانلود:

1. آخرین نسخه را از https://github.com/rastikerdar/vazirmatn/releases دانلود کنید
2. یا از https://fonts.google.com/specimen/Vazirmatn استفاده کنید
3. فایل‌های woff2 و woff را از پوشه dist استخراج کنید
4. فایل‌ها را در این پوشه (src/assets/fonts/vazirmatn/) قرار دهید و `vazirmatn.css` را به مسیرهای محلی تنظیم کنید.
