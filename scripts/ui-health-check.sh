#!/bin/bash

echo
echo "======================================"
echo " FleetVision UI Health Check"
echo "======================================"

echo
echo "[1] TypeScript Validation"
npx tsc --noEmit

echo
echo "[2] Production Build"
npm run build > /dev/null

if [ $? -eq 0 ]; then
  echo "PASS: Build completed"
else
  echo "FAIL: Build failed"
fi

echo
echo "[3] V2 Routes"
grep -n "path=\"/v2" src/App.tsx

echo
echo "[4] Navigation Configuration"
test -f src/config/navigation.ts \
  && echo "PASS: navigation.ts found" \
  || echo "FAIL: navigation.ts missing"

echo
echo "[5] Design Tokens"
test -f src/styles/tokens.css \
  && echo "PASS: tokens.css found" \
  || echo "FAIL: tokens.css missing"

echo
echo "[6] Button Styles"
test -f src/styles/buttons.css \
  && echo "PASS: buttons.css found" \
  || echo "FAIL: buttons.css missing"

echo
echo "[7] Layout Styles"
test -f src/styles/layout-v2.css \
  && echo "PASS: layout-v2.css found" \
  || echo "FAIL: layout-v2.css missing"

echo
echo "[8] Navigation Components"
ls src/components/navigation

echo
echo "[9] Recent Commits"
git log --oneline -5

echo
echo "======================================"
echo " Health Check Complete"
echo "======================================"
