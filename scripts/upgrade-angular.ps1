# PowerShell script for incremental Angular upgrade
# Usage: .\scripts\upgrade-angular.ps1 -TargetVersion <version>
# Example: .\scripts\upgrade-angular.ps1 -TargetVersion 16

param(
    [Parameter(Mandatory=$true)]
    [int]$TargetVersion
)

Write-Host "🚀 Starting Angular upgrade to version $TargetVersion..." -ForegroundColor Cyan

# Check current Angular version
$packageJson = Get-Content package.json | ConvertFrom-Json
$currentVersion = $packageJson.dependencies.'@angular/core' -replace '[^0-9]', '' | Select-String -Pattern '\d+' | Select-Object -First 1
Write-Host "Current Angular version: $currentVersion" -ForegroundColor Yellow

# Backup package files
Write-Host "📦 Creating backup..." -ForegroundColor Cyan
Copy-Item package.json package.json.backup -Force
if (Test-Path package-lock.json) {
    Copy-Item package-lock.json package-lock.json.backup -Force
}

# Update Angular core and CLI
Write-Host "⬆️  Updating Angular core and CLI to version $TargetVersion..." -ForegroundColor Cyan
npx ng update "@angular/core@$TargetVersion" "@angular/cli@$TargetVersion" --allow-dirty --force

# Update Angular Material
Write-Host "⬆️  Updating Angular Material to version $TargetVersion..." -ForegroundColor Cyan
npx ng update "@angular/material@$TargetVersion" --allow-dirty --force
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Material update skipped (may not be needed)" -ForegroundColor Yellow
}

# Install dependencies
Write-Host "📥 Installing dependencies..." -ForegroundColor Cyan
npm install --legacy-peer-deps

# Run tests
Write-Host "🧪 Running tests..." -ForegroundColor Cyan
npm test -- --watch=false --browsers=ChromeHeadless
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Tests failed - please review" -ForegroundColor Yellow
}

# Build
Write-Host "🔨 Building project..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Build failed - please review" -ForegroundColor Yellow
}

Write-Host "✅ Upgrade to Angular $TargetVersion completed!" -ForegroundColor Green
Write-Host "⚠️  Please review the changes and test thoroughly before committing." -ForegroundColor Yellow
