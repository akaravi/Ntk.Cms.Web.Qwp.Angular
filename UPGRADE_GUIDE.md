# راهنمای عملی ارتقا به Angular 20

## 📋 پیش‌نیازها

قبل از شروع ارتقا، مطمئن شوید:

- [ ] Node.js 20.x یا بالاتر نصب است (`node --version`)
- [ ] از پروژه پشتیبان گرفته‌اید (`git commit` یا `git branch`)
- [ ] تمام تغییرات فعلی commit شده‌اند
- [ ] تست‌ها در حال حاضر pass می‌شوند

## 🚀 شروع ارتقا

### روش 1: استفاده از اسکریپت (توصیه می‌شود)

#### در Windows (PowerShell):
```powershell
.\scripts\upgrade-angular.ps1 -TargetVersion 16
```

#### در Linux/Mac (Bash):
```bash
chmod +x scripts/upgrade-angular.sh
./scripts/upgrade-angular.sh 16
```

### روش 2: دستی

```bash
# مرحله 1: ارتقا به Angular 16
ng update @angular/core@16 @angular/cli@16
ng update @angular/material@16

# نصب dependencies
npm install --legacy-peer-deps

# تست
npm test
npm run build
```

## 📝 مراحل ارتقا (مرحله به مرحله)

### مرحله 1: Angular 15 → Angular 16

```bash
# ارتقا
ng update @angular/core@16 @angular/cli@16
ng update @angular/material@16

# بررسی breaking changes
# - بررسی تغییرات در TypeScript (احتمالاً به 5.x نیاز دارد)
# - بررسی تغییرات در RxJS
# - بررسی تغییرات در Material Design

# تست
npm test
npm run build
```

**تغییرات مهم در Angular 16:**
- بهبود performance
- تغییرات در SSR
- بهبود TypeScript support

### مرحله 2: Angular 16 → Angular 17

```bash
ng update @angular/core@17 @angular/cli@17
ng update @angular/material@17
```

**تغییرات مهم در Angular 17:**
- **Standalone Components** به صورت پیش‌فرض
- بهبود SSR
- تغییرات در routing

**اقدامات لازم:**
- شروع تبدیل Components به Standalone
- بررسی و به‌روزرسانی routing

### مرحله 3: Angular 17 → Angular 18

```bash
ng update @angular/core@18 @angular/cli@18
ng update @angular/material@18
```

**تغییرات مهم در Angular 18:**
- بهبود بیشتر Standalone Components
- تغییرات در Zone.js
- بهبود Material Design

### مرحله 4: Angular 18 → Angular 19

```bash
ng update @angular/core@19 @angular/cli@19
ng update @angular/material@19
```

**تغییرات مهم در Angular 19:**
- تکمیل انتقال به Standalone
- بهبود performance
- تغییرات در Material Design

### مرحله 5: Angular 19 → Angular 20

```bash
ng update @angular/core@20 @angular/cli@20
ng update @angular/material@20
```

**تغییرات مهم در Angular 20:**
- بررسی breaking changes نهایی
- به‌روزرسانی تمام dependencies
- تست کامل

## 🔧 تبدیل به Standalone Components

از Angular 17 به بعد، توصیه می‌شود از Standalone Components استفاده کنید:

### مثال تبدیل Component:

**قبل (با NgModule):**
```typescript
// app.module.ts
@NgModule({
  declarations: [MyComponent],
  imports: [CommonModule, MaterialModule]
})
export class AppModule {}

// my.component.ts
@Component({
  selector: 'app-my',
  templateUrl: './my.component.html'
})
export class MyComponent {}
```

**بعد (Standalone):**
```typescript
// my.component.ts
@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class MyComponent {}
```

### تبدیل AppModule به bootstrapApplication:

**قبل:**
```typescript
// main.ts
platformBrowserDynamic().bootstrapModule(AppModule)
```

**بعد:**
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routing';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // سایر providers
  ]
});
```

## 🐛 حل مشکلات رایج

### مشکل: Dependency conflicts

```bash
# استفاده از --legacy-peer-deps
npm install --legacy-peer-deps
```

### مشکل: TypeScript errors

```bash
# به‌روزرسانی TypeScript
npm install typescript@latest --save-dev
```

### مشکل: Material Design errors

```bash
# بررسی imports
# استفاده از imports مستقیم به جای MaterialModule
import { MatButtonModule } from '@angular/material/button';
```

### مشکل: Build failures

1. پاک کردن cache:
```bash
rm -rf node_modules .angular dist
npm install
```

2. بررسی `angular.json` برای تغییرات

## ✅ چک‌لیست بعد از هر مرحله

- [ ] Build موفق است (`npm run build`)
- [ ] تست‌ها pass می‌شوند (`npm test`)
- [ ] UI درست کار می‌کند
- [ ] تمام قابلیت‌ها تست شده‌اند
- [ ] Console errors بررسی شده‌اند
- [ ] Performance بررسی شده است

## 📊 زمان‌بندی پیشنهادی

- **Angular 15 → 16**: 1-2 روز
- **Angular 16 → 17**: 2-3 روز (با تبدیل به Standalone)
- **Angular 17 → 18**: 1-2 روز
- **Angular 18 → 19**: 1-2 روز
- **Angular 19 → 20**: 1-2 روز

**جمع کل**: حدود 1-2 هفته

## 🔗 منابع مفید

- [Angular Update Guide](https://update.angular.io/)
- [Angular Standalone Components](https://angular.io/guide/standalone-components)
- [Angular Material Changelog](https://github.com/angular/components/blob/main/CHANGELOG.md)

## ⚠️ نکات مهم

1. **هرگز از چندین نسخه اصلی جهش نکنید**
2. **همیشه قبل از ارتقا commit کنید**
3. **در هر مرحله تست کامل انجام دهید**
4. **Breaking changes را به دقت مطالعه کنید**
5. **در صورت مشکل، از backup استفاده کنید**

---

**آماده شروع هستید؟** از مرحله 1 شروع کنید! 🚀
