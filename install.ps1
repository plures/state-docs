# State-Docs Installer Script for Windows
# This script installs state-docs using the best available method

$ErrorActionPreference = "Stop"

# Helper functions
function Write-Info {
    param($Message)
    Write-Host "ℹ " -ForegroundColor Blue -NoNewline
    Write-Host $Message
}

function Write-Success {
    param($Message)
    Write-Host "✓ " -ForegroundColor Green -NoNewline
    Write-Host $Message
}

function Write-Warning {
    param($Message)
    Write-Host "⚠ " -ForegroundColor Yellow -NoNewline
    Write-Host $Message
}

function Write-Error {
    param($Message)
    Write-Host "✗ " -ForegroundColor Red -NoNewline
    Write-Host $Message
}

function Test-Command {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

Write-Info "State-Docs Installer"
Write-Host ""

# Check for Deno
if (Test-Command "deno") {
    $denoVersion = & deno --version 2>&1 | Select-Object -First 1
    Write-Info "Found Deno: $denoVersion"
    Write-Host ""
    Write-Info "Installing state-docs via Deno JSR..."
    
    try {
        & deno install -A -f -n statedoc jsr:@plures/statedoc/cli
        Write-Success "Successfully installed state-docs via Deno!"
        Write-Host ""
        Write-Info "You can now run: statedoc gen --config=.stateDoc.json"
        exit 0
    } catch {
        Write-Warning "Failed to install via Deno JSR, trying alternative methods..."
    }
}

# Check for npm
if (Test-Command "npm") {
    $npmVersion = & npm --version 2>&1
    Write-Info "Found npm: $npmVersion"
    Write-Host ""
    Write-Info "Installing state-docs via npm..."
    
    try {
        & npm install -g statedoc
        Write-Success "Successfully installed state-docs via npm!"
        Write-Host ""
        Write-Info "You can now run: statedoc gen --config=.stateDoc.json"
        exit 0
    } catch {
        Write-Warning "Failed to install via npm globally"
    }
}

# Check for npx
if (Test-Command "npx") {
    Write-Success "Found npx! You can use state-docs without installation:"
    Write-Host ""
    Write-Info "Run: npx statedoc gen --config=.stateDoc.json"
    Write-Host ""
    Write-Warning "Note: This will download and run the latest version each time."
    exit 0
}

# No suitable runtime found
Write-Error "Could not find Deno or Node.js/npm."
Write-Host ""
Write-Host "Please install one of the following:" -ForegroundColor Red
Write-Host ""
Write-Host "  • Deno:    irm https://deno.land/install.ps1 | iex" -ForegroundColor Red
Write-Host "  • Node.js: https://nodejs.org/" -ForegroundColor Red
Write-Host ""
Write-Host "Then run this installer again." -ForegroundColor Red
exit 1
