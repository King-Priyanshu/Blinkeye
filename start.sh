#!/bin/bash
#
# Blink Eye - Single Command Startup Script
# Integrates Hospital Frontend (React) + Blink Eye Backend (Laravel)
#
# Usage:
#   ./start.sh              # Start server (build frontend if needed)
#   ./start.sh --build      # Force rebuild frontend and start server
#   ./start.sh --dev        # Start with Vite dev server for hot reload
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BLINK_DIR="$SCRIPT_DIR/Blink_eye"
FRONTEND_DIR="$SCRIPT_DIR/hospital-frontend"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║    Blink Eye Hospital Platform           ║${NC}"
echo -e "${BLUE}║    Integrated Frontend + Backend         ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

DEV_MODE=false
BUILD_MODE=false

for arg in "$@"; do
    case $arg in
        --dev)   DEV_MODE=true ;;
        --build) BUILD_MODE=true ;;
    esac
done

# ─── Step 0: Kill any existing Laravel servers ──────────────────────────
pkill -f "php artisan serve" 2>/dev/null || true
sleep 1

# ─── Step 1: Build React Frontend ──────────────────────────────────────
if [ ! -d "$BLINK_DIR/public/hospital-app/assets" ] || [ "$BUILD_MODE" = true ]; then
    echo -e "${YELLOW}[1/3]${NC} Building React frontend..."
    cd "$FRONTEND_DIR"
    npm run build 2>&1
    echo -e "${GREEN}      Frontend built successfully.${NC}"
else
    echo -e "${GREEN}[1/3]${NC} Frontend already built. Use --build to rebuild."
fi
echo ""

# ─── Step 2: Configure Laravel for local development ────────────────────
echo -e "${YELLOW}[2/3]${NC} Configuring Laravel for local development..."
cd "$BLINK_DIR"

# Backup original .env
cp .env .env.backup 2>/dev/null || true

# Apply local settings
sed -i 's/^APP_ENV=.*/APP_ENV=local/' .env
sed -i 's/^APP_DEBUG=.*/APP_DEBUG=true/' .env
sed -i 's|^APP_URL=.*|APP_URL=http://localhost:8000|' .env
sed -i 's|^APP_DOMAIN=.*|APP_DOMAIN=localhost|' .env
sed -i 's|^SESSION_DOMAIN=.*|SESSION_DOMAIN=localhost|' .env
sed -i 's|^SANCTUM_STATEFUL_DOMAINS=.*|SANCTUM_STATEFUL_DOMAINS="localhost,127.0.0.1"|' .env
sed -i 's|^CORS_ALLOWED_ORIGINS=.*|CORS_ALLOWED_ORIGINS="http://localhost:8000,http://127.0.0.1:8000,http://localhost:5174,http://127.0.0.1:5174"|' .env

# Ensure storage symlink exists
php artisan storage:link 2>/dev/null || true

# Clear Laravel caches
php artisan config:clear 2>/dev/null || true
php artisan cache:clear 2>/dev/null || true

echo -e "${GREEN}      Laravel configured for local development.${NC}"
echo ""

# ─── Step 3: Start servers ─────────────────────────────────────────────
echo -e "${YELLOW}[3/3]${NC} Starting server(s)..."
echo ""

# Print access information
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           Server is running!             ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "  ${CYAN}Laravel API:${NC}     http://localhost:8000"
echo -e "  ${CYAN}Admin Panel:${NC}     http://localhost:8000/admin"
echo -e "  ${CYAN}API Test:${NC}        http://localhost:8000/api/web-engine/test"
echo ""

# List hospitals
echo -e "  ${CYAN}Hospitals:${NC}"
php artisan tinker --execute="
use App\Models\Hospital;
\$hospitals = Hospital::where('is_active', true)->get(['name', 'slug']);
foreach (\$hospitals as \$h) {
    echo '    - ' . \$h->name . PHP_EOL . '      http://localhost:8000/' . \$h->slug . PHP_EOL;
}
" 2>/dev/null || echo -e "    ${YELLOW}Visit http://localhost:8000/api/web-engine/hospitals to see all hospitals${NC}"

echo ""

if [ "$DEV_MODE" = true ]; then
    echo -e "  ${CYAN}Vite Dev Server:${NC}  http://localhost:5174 (hot reload enabled)"
    echo ""
    echo -e "  ${YELLOW}Press Ctrl+C to stop all servers${NC}"
    echo ""

    # Trap to restore .env and kill background processes
    cleanup() {
        echo ""
        echo -e "${YELLOW}Shutting down...${NC}"
        kill $LARAVEL_PID 2>/dev/null || true
        kill $VITE_PID 2>/dev/null || true
        if [ -f "$BLINK_DIR/.env.backup" ]; then
            cp "$BLINK_DIR/.env.backup" "$BLINK_DIR/.env"
            rm "$BLINK_DIR/.env.backup"
        fi
        echo -e "${GREEN}Servers stopped.${NC}"
    }
    trap cleanup EXIT INT TERM

    # Start Laravel in background
    cd "$BLINK_DIR"
    php artisan serve --host=0.0.0.0 --port=8000 &
    LARAVEL_PID=$!

    # Start Vite dev server in background
    cd "$FRONTEND_DIR"
    npm run dev &
    VITE_PID=$!

    # Wait for both
    wait
else
    echo -e "  ${YELLOW}Press Ctrl+C to stop the server${NC}"
    echo ""

    # Trap to restore .env
    cleanup() {
        echo ""
        echo -e "${YELLOW}Shutting down...${NC}"
        if [ -f "$BLINK_DIR/.env.backup" ]; then
            cp "$BLINK_DIR/.env.backup" "$BLINK_DIR/.env"
            rm "$BLINK_DIR/.env.backup"
        fi
        echo -e "${GREEN}Server stopped.${NC}"
    }
    trap cleanup EXIT INT TERM

    cd "$BLINK_DIR"
    php artisan serve --host=0.0.0.0 --port=8000
fi
