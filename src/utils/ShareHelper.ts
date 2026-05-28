// src/utils/ShareHelper.ts

/**
 * Shares text/URL using native Web Share API on mobile, or copies to clipboard as fallback.
 * @returns Promise<boolean> true if shared natively, false if copied to clipboard.
 */
export async function shareContent(title: string, text: string, url: string): Promise<boolean> {
  const shareData = {
    title: title,
    text: text,
    url: url || window.location.origin
  }

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData)
      return true
    } catch (e) {
      // User cancelled or share failed, fallback to clipboard
      console.warn('Native share cancelled or failed, falling back to clipboard copy', e)
    }
  }

  // Fallback: Copy to clipboard
  const fullText = `${title}\n\n${text}\n\n출처: ${shareData.url}`
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullText)
      return false
    }
  } catch (e) {
    console.error('Clipboard copy failed', e)
  }

  // Last resort fallback using deprecated execCommand
  try {
    const textArea = document.createElement('textarea')
    textArea.value = fullText
    textArea.style.position = 'fixed' // Avoid scrolling to bottom
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return false
  } catch (e) {
    console.error('ExecCommand copy failed', e)
  }

  return false
}
