#!/usr/bin/env bash

echo "=============================="
echo "FleetVision Route/Shell Audit"
echo "=============================="
echo ""

echo "V2 workspace routes:"
grep -n 'WorkspaceShellV2' src/App.tsx || true

echo ""
echo "Legacy layout routes:"
grep -n 'ShipperLayout\|BrokerLayout' src/App.tsx || true

echo ""
echo "All routes:"
grep -n '<Route path=' src/App.tsx || true

echo ""
echo "Navigation links:"
grep -n 'label:.*path:' src/config/navigation.ts || true

echo ""
echo "Legacy path references:"
grep -R 'path: "/[^v]' -n src/config/navigation.ts src/pages src/components 2>/dev/null || true
