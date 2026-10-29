$secretValue = Read-Host 'New Gemini API key (hidden input)' -AsSecureString
$plainValue = [System.Net.NetworkCredential]::new('', $secretValue).Password
if ($plainValue -match '[\r\n]' -or [string]::IsNullOrWhiteSpace($plainValue)) { throw 'Invalid key' }
$envPath = Join-Path $PSScriptRoot '../.env.local'
[System.IO.File]::WriteAllText($envPath, "GEMINI_API_KEY=$plainValue`nGEMINI_MODEL=gemini-3.1-flash-lite`n")
$plainValue = $null
Write-Host 'Saved locally to ignored .env.local. Hosted deployment still requires server secret configuration.'
