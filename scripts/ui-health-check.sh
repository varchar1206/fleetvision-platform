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
echo "[10] ETA Utilities"
test -f src/utils/eta/buildEtaSummary.ts && echo "PASS: ETA summary helper found" || echo "FAIL: ETA summary helper missing"
test -f src/utils/eta/compareEtaToCommitment.ts && echo "PASS: ETA comparison helper found" || echo "FAIL: ETA comparison helper missing"

echo
echo "[11] V2 Pages"
test -f src/pages/v2/V2Home.tsx && echo "PASS: V2 home found" || echo "FAIL: V2 home missing"
test -f src/pages/v2/V2DeveloperPortal.tsx && echo "PASS: V2 developer portal found" || echo "FAIL: V2 developer portal missing"

echo
echo "[12] Mobile Portal"
test -f src/pages/mobile/MobilePortal.tsx && echo "PASS: Mobile portal found" || echo "FAIL: Mobile portal missing"

echo
echo "[13] Navigation Icons"
grep -q "icon:" src/config/navigation.ts && echo "PASS: Navigation icons configured" || echo "FAIL: Navigation icons missing"

echo
echo "[9] Recent Commits"
git log --oneline -5

echo
echo "======================================"
echo " Health Check Complete"
echo "======================================"
