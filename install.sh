#!/bin/sh
# State-Docs Installer Script
# This script installs state-docs using the best available method

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
info() {
    printf "${BLUE}ℹ${NC} %s\n" "$1"
}

success() {
    printf "${GREEN}✓${NC} %s\n" "$1"
}

warning() {
    printf "${YELLOW}⚠${NC} %s\n" "$1"
}

error() {
    printf "${RED}✗${NC} %s\n" "$1"
    exit 1
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Detect operating system
detect_os() {
    case "$(uname -s)" in
        Linux*)     echo "linux";;
        Darwin*)    echo "macos";;
        MINGW*|MSYS*|CYGWIN*)    echo "windows";;
        *)          echo "unknown";;
    esac
}

info "State-Docs Installer"
echo ""

OS=$(detect_os)
info "Detected OS: $OS"

# Check for Deno
if command_exists deno; then
    info "Found Deno: $(deno --version | head -n1)"
    echo ""
    info "Installing state-docs via Deno JSR..."
    
    # Install from JSR
    if deno install -A -f -n statedoc jsr:@plures/statedoc/cli; then
        success "Successfully installed state-docs via Deno!"
        echo ""
        info "You can now run: statedoc gen --config=.stateDoc.json"
        exit 0
    else
        warning "Failed to install via Deno JSR, trying alternative methods..."
    fi
fi

# Check for npm/npx
if command_exists npm; then
    info "Found npm: $(npm --version)"
    echo ""
    info "Installing state-docs via npm..."
    
    if npm install -g statedoc; then
        success "Successfully installed state-docs via npm!"
        echo ""
        info "You can now run: statedoc gen --config=.stateDoc.json"
        exit 0
    else
        warning "Failed to install via npm globally"
    fi
fi

# Check for npx (can be used without global install)
if command_exists npx; then
    success "Found npx! You can use state-docs without installation:"
    echo ""
    info "Run: npx statedoc gen --config=.stateDoc.json"
    echo ""
    warning "Note: This will download and run the latest version each time."
    exit 0
fi

# No suitable runtime found
error "Could not find Deno or Node.js/npm."
echo ""
echo "Please install one of the following:"
echo ""
echo "  • Deno:    curl -fsSL https://deno.land/install.sh | sh"
echo "  • Node.js: https://nodejs.org/"
echo ""
echo "Then run this installer again."
