async function safeEval(page, selector, fn) {
  const el = await page.$(selector)
  if (!el) return null
  return page.evaluate(fn, el)
}