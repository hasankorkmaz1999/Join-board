# Function to check if a command exists
function CommandExists($command) {
    return ($null -ne (Get-Command $command -ErrorAction SilentlyContinue))
}

# Trap for handling Ctrl+C
trap {
    Write-Host "Script execution interrupted." -ForegroundColor Yellow
    exit
}

# Check if Node.js is installed
if (CommandExists "node") {
    $nodeVersion = node -v
    Write-Host "node.js - $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit
}

# Check if npm is installed
if (CommandExists "npm") {
    $npmVersion = npm -v
    Write-Host "npm - $npmVersion" -ForegroundColor Green
} else {
    Write-Host "npm not found. Please install npm from https://nodejs.org/" -ForegroundColor Red
    exit
}

# Check if JSDoc is installed
$jsdocInstalled = npm list -g jsdoc | Select-String 'jsdoc@'
if ($null -ne $jsdocInstalled) {
    Write-Host "JSDoc found" -ForegroundColor Green
} else {
    Write-Host "JSDoc not found" -ForegroundColor Red
    $installJSDoc = Read-Host "Do you want to install JSDoc? (yes/no)"
    if ($installJSDoc -eq "yes") {
        npm install -g jsdoc
        Write-Host "JSDoc has been installed. Please restart the script." -ForegroundColor Green
        exit
    } else {
        Write-Host "JSDoc installation is required to proceed." -ForegroundColor Red
        exit
    }
}

# Prompt for mode selection
$mode = Read-Host "Select mode: Easy (e) or Advanced (a)"

if ($mode -eq "a") {
    # Advanced mode
    $filePath = Read-Host "Enter the complete path to the JavaScript file"
    
    if ($filePath -notlike "*.js") {
        Write-Host "This is not a JS file" -ForegroundColor Red
        exit
    }

    # Check if the file exists
    if (Test-Path -Path $filePath) {
        Write-Host "Generating JSDoc documentation for $filePath" -ForegroundColor Cyan
        # Generate JSDoc documentation
        jsdoc $filePath

        # Check if the documentation was generated successfully
        $outputDirectory = Join-Path -Path (Split-Path -Parent $filePath) -ChildPath "out"
        if (Test-Path -Path $outputDirectory) {
            Write-Host "Documentation generated successfully in the 'out' directory." -ForegroundColor Green
        } else {
            Write-Host "Failed to generate documentation." -ForegroundColor Red
        }
    } else {
        Write-Host "File not found: $filePath" -ForegroundColor Red
    }
} elseif ($mode -eq "e") {
    # Easy mode
    # Prompt for the directory path
    $directoryPath = Read-Host "Enter the directory path"

    # Change to the specified directory
    Set-Location -Path $directoryPath

    # List files in the directory and allow user to select one
    $files = Get-ChildItem -File
    $fileIndex = 0

    function ShowFiles {
        Clear-Host
        Write-Host "Use the arrow keys to navigate and press Enter to select a file." -ForegroundColor Yellow
        Write-Host "Press 'y' to generate documentation for the selected file." -ForegroundColor Yellow
        for ($i = 0; $i -lt $files.Count; $i++) {
            if ($i -eq $fileIndex) {
                Write-Host "=> $($files[$i].Name)" -ForegroundColor Green
            } else {
                Write-Host "   $($files[$i].Name)"
            }
        }
    }

    ShowFiles
    $selectedFile = $null

    while ($true) {
        $key = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        switch ($key.VirtualKeyCode) {
            38 { # Up arrow
                if ($fileIndex -gt 0) {
                    $fileIndex--
                }
                ShowFiles
            }
            40 { # Down arrow
                if ($fileIndex -lt ($files.Count - 1)) {
                    $fileIndex++
                }
                ShowFiles
            }
            13 { # Enter
                $selectedFile = $files[$fileIndex].FullName
                Write-Host "File selected: $selectedFile" -ForegroundColor Cyan
            }
            89 { # 'y' key
                if ($null -ne $selectedFile) {
                    Write-Host "Generating JSDoc documentation for $selectedFile" -ForegroundColor Cyan
                    # Generate JSDoc documentation
                    jsdoc $selectedFile

                    # Check if the documentation was generated successfully
                    $outputDirectory = Join-Path -Path $directoryPath -ChildPath "out"
                    if (Test-Path -Path $outputDirectory) {
                        Write-Host "Documentation generated successfully in the 'out' directory." -ForegroundColor Green
                    } else {
                        Write-Host "Failed to generate documentation." -ForegroundColor Red
                    }
                    break
                } else {
                    Write-Host "No file selected. Please select a file first." -ForegroundColor Red
                }
            }
        }
    }

    Write-Host "Script execution completed." -ForegroundColor Cyan
} else {
    Write-Host "Invalid selection. Please restart the script and choose 'e' for Easy mode or 'a' for Advanced mode." -ForegroundColor Red
}
