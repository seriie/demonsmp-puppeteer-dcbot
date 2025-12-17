export async function waitUntilLoggedIn(page, timeout = 15000) {
  try {
    await page.waitForFunction(
      () =>
        location.pathname.startsWith("/servers") &&
        document.querySelector(".server-body[data-id]"),
      { timeout }
    );
    return true;
  } catch {
    return false;
  }
}