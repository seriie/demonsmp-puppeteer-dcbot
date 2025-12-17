export async function waitPageReady(page) {
  await page.waitForFunction(
    () => document.readyState === "complete",
    { timeout: 15000 }
  )
}