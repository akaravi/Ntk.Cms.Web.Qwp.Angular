#!/bin/bash
# Script for incremental Angular upgrade
# Usage: ./scripts/upgrade-angular.sh <target-version>
# Example: ./scripts/upgrade-angular.sh 16

set -e

TARGET_VERSION=$1

if [ -z "$TARGET_VERSION" ]; then
    echo "Usage: ./scripts/upgrade-angular.sh <target-version>"
    echo "Example: ./scripts/upgrade-angular.sh 16"
    exit 1
fi

echo "🚀 Starting Angular upgrade to version $TARGET_VERSION..."

# Check current Angular version
CURRENT_VERSION=$(node -p "require('./package.json').dependencies['@angular/core']" | grep -oE '[0-9]+' | head -1)
echo "Current Angular version: $CURRENT_VERSION"

# Backup package files
echo "📦 Creating backup..."
cp package.json package.json.backup
cp package-lock.json package-lock.json.backup 2>/dev/null || true

# Update Angular core and CLI
echo "⬆️  Updating Angular core and CLI to version $TARGET_VERSION..."
npx ng update @angular/core@$TARGET_VERSION @angular/cli@$TARGET_VERSION --allow-dirty --force

# Update Angular Material
echo "⬆️  Updating Angular Material to version $TARGET_VERSION..."
npx ng update @angular/material@$TARGET_VERSION --allow-dirty --force || echo "⚠️  Material update skipped (may not be needed)"

# Install dependencies
echo "📥 Installing dependencies..."
npm install --legacy-peer-deps

# Run tests
echo "🧪 Running tests..."
npm test -- --watch=false --browsers=ChromeHeadless || echo "⚠️  Tests failed - please review"

# Build
echo "🔨 Building project..."
npm run build || echo "⚠️  Build failed - please review"

echo "✅ Upgrade to Angular $TARGET_VERSION completed!"
echo "⚠️  Please review the changes and test thoroughly before committing."
