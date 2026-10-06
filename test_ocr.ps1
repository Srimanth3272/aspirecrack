[Windows.System.UserProfile.GlobalizationPreferences, Windows.System.UserProfile, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation.UniversalApiContract, ContentType = WindowsRuntime] | Out-Null

$lang = 'en-US'
$langObj = [Windows.Globalization.Language]::new($lang)

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($langObj)
if ($null -eq $engine) {
    Write-Host "OCR Engine not available for $lang"
    exit
}

$imgPath = "$PWD\WhatsApp Unknown 2026-09-26 at 10.14.19 PM\WhatsApp Image 2026-09-26 at 10.14.08 PM.jpeg"
$asyncOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($imgPath)
$asyncOp.AsTask().Wait()
$file = $asyncOp.AsTask().Result

$streamOp = $file.OpenAsync([Windows.Storage.FileAccessMode]::Read)
$streamOp.AsTask().Wait()
$stream = $streamOp.AsTask().Result

$decoderOp = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
$decoderOp.AsTask().Wait()
$decoder = $decoderOp.AsTask().Result

$softwareBitmapOp = $decoder.GetSoftwareBitmapAsync()
$softwareBitmapOp.AsTask().Wait()
$softwareBitmap = $softwareBitmapOp.AsTask().Result

$ocrResultOp = $engine.RecognizeAsync($softwareBitmap)
$ocrResultOp.AsTask().Wait()
$ocrResult = $ocrResultOp.AsTask().Result

Write-Host $ocrResult.Text
