# NTK CMS Web QWP Angular

<div dir="rtl">

# NTK CMS Web QWP Angular

یک پروژه وب اپلیکیشن مدیریت محتوا (CMS) مبتنی بر Angular که برای مدیریت لینک‌های کوتاه، محتوای خبری، و فایل‌ها طراحی شده است.

</div>

A Content Management System (CMS) web application built with Angular, designed for managing short links, news content, and file uploads.

---

## 📋 Table of Contents / فهرست مطالب

- [Features / ویژگی‌ها](#features--ویژگیها)
- [Architecture / معماری](#architecture--معماری)
- [Tech Stack / فناوری‌های استفاده شده](#tech-stack--فناوریهای-استفاده-شده)
- [Prerequisites / پیش‌نیازها](#prerequisites--پیشنیازها)
- [Installation / نصب](#installation--نصب)
- [Configuration / پیکربندی](#configuration--پیکربندی)
- [Development / توسعه](#development--توسعه)
- [Build / ساخت](#build--ساخت)
- [Testing / تست](#testing--تست)
- [Project Structure / ساختار پروژه](#project-structure--ساختار-پروژه)
- [API Integration / یکپارچه‌سازی API](#api-integration--یکپارچگی-api)
- [Contributing / مشارکت](#contributing--مشارکت)
- [License / مجوز](#license--مجوز)

---

## ✨ Features / ویژگی‌ها

<div dir="rtl">

### ویژگی‌های اصلی:

- **مدیریت لینک کوتاه**: ایجاد و مدیریت لینک‌های کوتاه با قابلیت ردیابی
- **مدیریت محتوای خبری**: نمایش و مدیریت اخبار و محتوا
- **آپلود فایل**: سیستم آپلود فایل با استفاده از Flow.js
- **صفحات استاتیک**: صفحات درباره ما و تماس با ما
- **احراز هویت**: سیستم احراز هویت با استفاده از NTK CMS API
- **PWA Support**: پشتیبانی از Progressive Web App با Service Worker
- **Responsive Design**: طراحی واکنش‌گرا با استفاده از Angular Material و Bootstrap
- **Toast Notifications**: سیستم اطلاع‌رسانی با ngx-toastr
- **RTL Support**: پشتیبانی از زبان فارسی و راست به چپ

</div>

### Main Features:

- **Short Link Management**: Create and manage short links with tracking capabilities
- **News Content Management**: Display and manage news and content
- **File Upload**: File upload system using Flow.js
- **Static Pages**: About Us and Contact Us pages
- **Authentication**: Authentication system using NTK CMS API
- **PWA Support**: Progressive Web App support with Service Worker
- **Responsive Design**: Responsive design using Angular Material and Bootstrap
- **Toast Notifications**: Notification system with ngx-toastr
- **RTL Support**: Persian language and right-to-left support

---

## 🏗️ Architecture / معماری

<div dir="rtl">

### معماری پروژه:

این پروژه از معماری ماژولار Angular استفاده می‌کند و به صورت زیر سازماندهی شده است:

```
src/
├── app/
│   ├── core/                    # سرویس‌ها و اینترسپتورهای اصلی
│   │   ├── base/               # سرویس‌های پایه
│   │   ├── cmsModels/          # مدل‌های CMS
│   │   └── interceptor/        # اینترسپتورهای HTTP
│   ├── pages/                   # کامپوننت‌های صفحه
│   │   ├── core/               # صفحات اصلی (درباره ما، تماس با ما)
│   │   ├── fileManager/        # مدیریت فایل
│   │   ├── linkManagement/     # مدیریت لینک کوتاه
│   │   └── news/               # مدیریت اخبار
│   ├── shared/                  # ماژول‌ها و کامپوننت‌های مشترک
│   │   └── material/           # ماژول Angular Material
│   ├── app.component.*          # کامپوننت اصلی
│   ├── app.module.ts            # ماژول اصلی
│   └── app.routing.ts           # مسیریابی
├── assets/                      # فایل‌های استاتیک
├── environments/                # تنظیمات محیط
└── main.ts                      # نقطه ورود
```

### الگوهای معماری:

1. **Modular Architecture**: استفاده از ماژول‌های Angular برای سازماندهی کد
2. **Service-Oriented**: استفاده از سرویس‌ها برای منطق کسب و کار
3. **Component-Based**: ساختار مبتنی بر کامپوننت
4. **Lazy Loading**: امکان بارگذاری تنبل برای ماژول‌ها
5. **Interceptor Pattern**: استفاده از HTTP Interceptor برای مدیریت درخواست‌ها
6. **Shared Module**: ماژول مشترک برای کامپوننت‌ها و سرویس‌های قابل استفاده مجدد

</div>

### Project Architecture:

This project uses Angular's modular architecture and is organized as follows:

```
src/
├── app/
│   ├── core/                    # Core services and interceptors
│   │   ├── base/               # Base services
│   │   ├── cmsModels/          # CMS models
│   │   └── interceptor/        # HTTP interceptors
│   ├── pages/                   # Page components
│   │   ├── core/               # Core pages (About Us, Contact Us)
│   │   ├── fileManager/        # File management
│   │   ├── linkManagement/     # Short link management
│   │   └── news/               # News management
│   ├── shared/                  # Shared modules and components
│   │   └── material/           # Angular Material module
│   ├── app.component.*          # Main component
│   ├── app.module.ts            # Main module
│   └── app.routing.ts           # Routing
├── assets/                      # Static files
├── environments/                # Environment configurations
└── main.ts                      # Entry point
```

### Architectural Patterns:

1. **Modular Architecture**: Using Angular modules for code organization
2. **Service-Oriented**: Using services for business logic
3. **Component-Based**: Component-based structure
4. **Lazy Loading**: Lazy loading capability for modules
5. **Interceptor Pattern**: Using HTTP Interceptor for request management
6. **Shared Module**: Shared module for reusable components and services

---

## 🛠️ Tech Stack / فناوری‌های استفاده شده

<div dir="rtl">

### فناوری‌های اصلی:

- **Angular**: ^20.3.16 - فریمورک اصلی
- **Angular Material**: ^20.2.14 - کامپوننت‌های UI
- **Angular CDK**: ^20.2.14 - ابزارهای توسعه
- **Bootstrap**: ^3.3.7 - فریمورک CSS
- **RxJS**: ~7.8.0 - برنامه‌نویسی واکنش‌گرا
- **TypeScript**: ~5.8.3 - زبان برنامه‌نویسی
- **NTK CMS API**: ^1.2.262 - کتابخانه API مدیریت محتوا
- **Flow.js**: ^2.14.1 - آپلود فایل
- **ngx-toastr**: ^16.1.1 - اطلاع‌رسانی
- **Angular Service Worker**: ^20.3.16 - پشتیبانی PWA

### ابزارهای توسعه:

- **Angular CLI**: ~20.3.14
- **Karma**: ^6.4.2 - تست رانر
- **Jasmine**: ~4.5.0 - فریمورک تست
- **Protractor**: ^7.0.0 - تست E2E
- **TSLint**: - لینتر کد

</div>

### Core Technologies:

- **Angular**: ^20.3.16 - Main framework
- **Angular Material**: ^20.2.14 - UI components
- **Angular CDK**: ^20.2.14 - Development tools
- **Bootstrap**: ^3.3.7 - CSS framework
- **RxJS**: ~7.8.0 - Reactive programming
- **TypeScript**: ~5.8.3 - Programming language
- **NTK CMS API**: ^1.2.262 - Content management API library
- **Flow.js**: ^2.14.1 - File upload
- **ngx-toastr**: ^16.1.1 - Notifications
- **Angular Service Worker**: ^20.3.16 - PWA support

### Development Tools:

- **Angular CLI**: ~20.3.14
- **Karma**: ^6.4.2 - Test runner
- **Jasmine**: ~4.5.0 - Testing framework
- **Protractor**: ^7.0.0 - E2E testing
- **TSLint**: - Code linter

---

## 📦 Prerequisites / پیش‌نیازها

<div dir="rtl">

قبل از شروع، مطمئن شوید که موارد زیر را نصب کرده‌اید:

- **Node.js**: نسخه 18.x یا بالاتر
- **npm**: نسخه 9.x یا بالاتر (یا yarn)
- **Angular CLI**: نسخه 20.x یا بالاتر

</div>

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (or yarn)
- **Angular CLI**: Version 20.x or higher

---

## 🚀 Installation / نصب

<div dir="rtl">

### نصب وابستگی‌ها:

```bash
# کلون کردن مخزن
git clone https://github.com/your-org/Ntk.Cms.Web.Qwp.Angular.git

# رفتن به دایرکتوری پروژه
cd Ntk.Cms.Web.Qwp.Angular

# نصب وابستگی‌ها
npm install
```

</div>

### Installing Dependencies:

```bash
# Clone the repository
git clone https://github.com/your-org/Ntk.Cms.Web.Qwp.Angular.git

# Navigate to project directory
cd Ntk.Cms.Web.Qwp.Angular

# Install dependencies
npm install
```

---

## ⚙️ Configuration / پیکربندی

<div dir="rtl">

### تنظیمات محیط:

فایل‌های محیط در `src/environments/` قرار دارند:

- `environment.ts`: تنظیمات محیط توسعه
- `environment.prod.ts`: تنظیمات محیط تولید

### تنظیمات API:

در فایل `environment.ts` می‌توانید تنظیمات زیر را تغییر دهید:

```typescript
cmsServerConfig: {
  configApiServerPath: 'https://apicms.ir/api/v2/',
  configRouteUploadFileContent: 'https://apifile.ir/api/v2/upload/',
},
cmsTokenConfig: {
  SecurityKey: 'your-security-key',
}
```

</div>

### Environment Configuration:

Environment files are located in `src/environments/`:

- `environment.ts`: Development environment settings
- `environment.prod.ts`: Production environment settings

### API Configuration:

In the `environment.ts` file, you can modify the following settings:

```typescript
cmsServerConfig: {
  configApiServerPath: 'https://apicms.ir/api/v2/',
  configRouteUploadFileContent: 'https://apifile.ir/api/v2/upload/',
},
cmsTokenConfig: {
  SecurityKey: 'your-security-key',
}
```

---

## 💻 Development / توسعه

<div dir="rtl">

### اجرای سرور توسعه:

```bash
# اجرای سرور توسعه
npm start
# یا
ng serve

# اجرا با پورت خاص
ng serve --port 4200

# اجرا با میزبان خاص
ng serve --host 0.0.0.0
```

پس از اجرا، برنامه در `http://localhost:4200/` در دسترس خواهد بود.

### ساخت کامپوننت جدید:

```bash
# ساخت کامپوننت
ng generate component component-name

# ساخت سرویس
ng generate service service-name

# ساخت ماژول
ng generate module module-name

# ساخت گارد
ng generate guard guard-name
```

</div>

### Running Development Server:

```bash
# Run development server
npm start
# or
ng serve

# Run on specific port
ng serve --port 4200

# Run on specific host
ng serve --host 0.0.0.0
```

After running, the application will be available at `http://localhost:4200/`.

### Generating New Components:

```bash
# Generate component
ng generate component component-name

# Generate service
ng generate service service-name

# Generate module
ng generate module module-name

# Generate guard
ng generate guard guard-name
```

---

## 🏭 Build / ساخت

<div dir="rtl">

### ساخت برای تولید:

```bash
# ساخت برای تولید
npm run build
# یا
ng build --configuration production

# ساخت برای توسعه
ng build
```

فایل‌های ساخته شده در پوشه `dist/ntk-cms-web-qwp` قرار می‌گیرند.

### بهینه‌سازی:

- **AOT Compilation**: کامپایل پیش از زمان برای بهبود عملکرد
- **Tree Shaking**: حذف کدهای استفاده نشده
- **Minification**: کوچک‌سازی کدها
- **Bundle Optimization**: بهینه‌سازی بسته‌ها

</div>

### Building for Production:

```bash
# Build for production
npm run build
# or
ng build --configuration production

# Build for development
ng build
```

Built files will be placed in the `dist/ntk-cms-web-qwp` folder.

### Optimizations:

- **AOT Compilation**: Ahead-of-time compilation for better performance
- **Tree Shaking**: Removing unused code
- **Minification**: Code minification
- **Bundle Optimization**: Bundle optimization

---

## 🧪 Testing / تست

<div dir="rtl">

### اجرای تست‌های واحد:

```bash
# اجرای تست‌ها
npm test
# یا
ng test

# اجرای تست‌ها با پوشش کد
ng test --code-coverage
```

### اجرای تست‌های E2E:

```bash
# اجرای تست‌های E2E
npm run e2e
# یا
ng e2e
```

### لینت کردن کد:

```bash
# بررسی کد با TSLint
npm run lint
# یا
ng lint
```

</div>

### Running Unit Tests:

```bash
# Run tests
npm test
# or
ng test

# Run tests with code coverage
ng test --code-coverage
```

### Running E2E Tests:

```bash
# Run E2E tests
npm run e2e
# or
ng e2e
```

### Linting Code:

```bash
# Lint code with TSLint
npm run lint
# or
ng lint
```

---

## 📁 Project Structure / ساختار پروژه

<div dir="rtl">

```
Ntk.Cms.Web.Qwp.Angular/
├── src/
│   ├── app/
│   │   ├── core/                          # سرویس‌ها و اینترسپتورهای اصلی
│   │   │   ├── base/
│   │   │   │   └── cmsToastr.service.ts   # سرویس اطلاع‌رسانی
│   │   │   ├── cmsModels/
│   │   │   │   └── componentOptionModel.ts
│   │   │   └── interceptor/
│   │   │       └── auth-interceptor.service.ts  # اینترسپتور احراز هویت
│   │   ├── pages/                         # کامپوننت‌های صفحه
│   │   │   ├── core/
│   │   │   │   ├── core-about-us/         # صفحه درباره ما
│   │   │   │   └── core-contact-us/       # صفحه تماس با ما
│   │   │   ├── fileManager/
│   │   │   │   └── file-upload/           # کامپوننت آپلود فایل
│   │   │   ├── linkManagement/
│   │   │   │   └── link-management-short-link/  # مدیریت لینک کوتاه
│   │   │   └── news/
│   │   │       └── news-content-list/     # لیست محتوای خبری
│   │   ├── shared/                        # ماژول‌های مشترک
│   │   │   ├── material/
│   │   │   │   └── material.module.ts     # ماژول Angular Material
│   │   │   └── shared.module.ts           # ماژول مشترک
│   │   ├── app.component.*                # کامپوننت اصلی
│   │   ├── app.module.ts                  # ماژول اصلی
│   │   └── app.routing.ts                 # مسیریابی
│   ├── assets/                            # فایل‌های استاتیک
│   │   ├── fonts/                         # فونت‌ها
│   │   ├── icons/                         # آیکون‌های PWA
│   │   └── images/                        # تصاویر
│   ├── environments/                      # تنظیمات محیط
│   │   ├── environment.ts                 # محیط توسعه
│   │   └── environment.prod.ts            # محیط تولید
│   ├── index.html                         # فایل HTML اصلی
│   ├── main.ts                            # نقطه ورود
│   ├── polyfills.ts                       # Polyfill‌ها
│   ├── styles.css                         # استایل‌های全局
│   └── manifest.webmanifest               # مانیفست PWA
├── angular.json                            # پیکربندی Angular CLI
├── package.json                           # وابستگی‌های پروژه
├── tsconfig.json                          # پیکربندی TypeScript
├── tslint.json                            # پیکربندی TSLint
└── README.md                              # این فایل
```

</div>

```
Ntk.Cms.Web.Qwp.Angular/
├── src/
│   ├── app/
│   │   ├── core/                          # Core services and interceptors
│   │   │   ├── base/
│   │   │   │   └── cmsToastr.service.ts   # Toast notification service
│   │   │   ├── cmsModels/
│   │   │   │   └── componentOptionModel.ts
│   │   │   └── interceptor/
│   │   │       └── auth-interceptor.service.ts  # Authentication interceptor
│   │   ├── pages/                         # Page components
│   │   │   ├── core/
│   │   │   │   ├── core-about-us/         # About Us page
│   │   │   │   └── core-contact-us/       # Contact Us page
│   │   │   ├── fileManager/
│   │   │   │   └── file-upload/           # File upload component
│   │   │   ├── linkManagement/
│   │   │   │   └── link-management-short-link/  # Short link management
│   │   │   └── news/
│   │   │       └── news-content-list/     # News content list
│   │   ├── shared/                        # Shared modules
│   │   │   ├── material/
│   │   │   │   └── material.module.ts     # Angular Material module
│   │   │   └── shared.module.ts           # Shared module
│   │   ├── app.component.*                # Main component
│   │   ├── app.module.ts                  # Main module
│   │   └── app.routing.ts                 # Routing
│   ├── assets/                            # Static files
│   │   ├── fonts/                         # Fonts
│   │   ├── icons/                         # PWA icons
│   │   └── images/                        # Images
│   ├── environments/                      # Environment configurations
│   │   ├── environment.ts                 # Development environment
│   │   └── environment.prod.ts            # Production environment
│   ├── index.html                         # Main HTML file
│   ├── main.ts                            # Entry point
│   ├── polyfills.ts                       # Polyfills
│   ├── styles.css                         # Global styles
│   └── manifest.webmanifest               # PWA manifest
├── angular.json                            # Angular CLI configuration
├── package.json                           # Project dependencies
├── tsconfig.json                          # TypeScript configuration
├── tslint.json                            # TSLint configuration
└── README.md                              # This file
```

---

## 🔌 API Integration / یکپارچه‌سازی API

<div dir="rtl">

### سرویس‌های استفاده شده:

این پروژه از کتابخانه `ntk-cms-api` برای ارتباط با API استفاده می‌کند:

- **CoreAuthService**: مدیریت احراز هویت و توکن دستگاه
- **LinkManagementTargetService**: مدیریت لینک‌های کوتاه
- **NewsContentService**: مدیریت محتوای خبری
- **TicketingTaskService**: مدیریت تیکت‌ها
- **TicketingDepartemenService**: مدیریت دپارتمان‌های تیکت

### اینترسپتور احراز هویت:

اینترسپتور `AuthInterceptor` به صورت خودکار توکن احراز هویت را به تمام درخواست‌های HTTP اضافه می‌کند.

</div>

### Services Used:

This project uses the `ntk-cms-api` library for API communication:

- **CoreAuthService**: Authentication and device token management
- **LinkManagementTargetService**: Short link management
- **NewsContentService**: News content management
- **TicketingTaskService**: Ticket management
- **TicketingDepartemenService**: Ticket department management

### Authentication Interceptor:

The `AuthInterceptor` automatically adds authentication tokens to all HTTP requests.

---

## 🛣️ Routes / مسیرها

<div dir="rtl">

### مسیرهای موجود:

- `/` - صفحه اصلی (مدیریت لینک کوتاه)
- `/aboutus` - صفحه درباره ما
- `/contactus` - صفحه تماس با ما
- `/news` - لیست اخبار

</div>

### Available Routes:

- `/` - Home page (Short link management)
- `/aboutus` - About Us page
- `/contactus` - Contact Us page
- `/news` - News list

---

## 📱 Progressive Web App (PWA) / اپلیکیشن وب پیشرونده

<div dir="rtl">

این پروژه از قابلیت‌های PWA پشتیبانی می‌کند:

- **Service Worker**: برای کش کردن و عملکرد آفلاین
- **Web Manifest**: برای نصب به عنوان اپلیکیشن
- **Responsive Design**: طراحی واکنش‌گرا برای دستگاه‌های مختلف

</div>

This project supports PWA features:

- **Service Worker**: For caching and offline functionality
- **Web Manifest**: For installation as an app
- **Responsive Design**: Responsive design for various devices

---

## 🤝 Contributing / مشارکت

<div dir="rtl">

برای مشارکت در این پروژه:

1. این مخزن را Fork کنید
2. یک شاخه جدید ایجاد کنید (`git checkout -b feature/AmazingFeature`)
3. تغییرات خود را Commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. به شاخه خود Push کنید (`git push origin feature/AmazingFeature`)
5. یک Pull Request باز کنید

### استانداردهای کدنویسی:

- از TSLint برای بررسی کد استفاده کنید
- تست‌های واحد برای کدهای جدید بنویسید
- مستندات را به‌روز نگه دارید
- از نام‌گذاری معنادار استفاده کنید

</div>

To contribute to this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards:

- Use TSLint for code checking
- Write unit tests for new code
- Keep documentation up to date
- Use meaningful naming conventions

---

## 📄 License / مجوز

<div dir="rtl">

این پروژه تحت مجوز [MIT License](LICENSE) منتشر شده است.

</div>

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Support / پشتیبانی

<div dir="rtl">

برای پشتیبانی و سوالات:

- **Issues**: [GitHub Issues](https://github.com/your-org/Ntk.Cms.Web.Qwp.Angular/issues)
- **Email**: support@example.com

</div>

For support and questions:

- **Issues**: [GitHub Issues](https://github.com/your-org/Ntk.Cms.Web.Qwp.Angular/issues)
- **Email**: support@example.com

---

## 📚 Additional Resources / منابع اضافی

<div dir="rtl">

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Documentation](https://material.angular.io/)
- [NTK CMS API Documentation](https://github.com/your-org/ntk-cms-api)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

</div>

- [Angular Documentation](https://angular.io/docs)
- [Angular Material Documentation](https://material.angular.io/)
- [NTK CMS API Documentation](https://github.com/your-org/ntk-cms-api)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## 🔄 Version History / تاریخچه نسخه

<div dir="rtl">

### نسخه 20.0.0

- به‌روزرسانی به Angular 20
- بهبود عملکرد و بهینه‌سازی
- اضافه شدن پشتیبانی PWA
- بهبود UI/UX

</div>

### Version 20.0.0

- Updated to Angular 20
- Performance improvements and optimizations
- Added PWA support
- UI/UX improvements

---

<div dir="rtl">

**نوشته شده با ❤️ توسط تیم توسعه NTK CMS**

</div>

**Made with ❤️ by the NTK CMS Development Team**
