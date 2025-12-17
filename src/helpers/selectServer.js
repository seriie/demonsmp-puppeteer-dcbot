export async function selectServer(page) {
  await page.waitForSelector(".server-body[data-id]", {
    visible: true,
    timeout: 0,
  });

  const serverId = await page.$eval(
    ".server-body[data-id]",
    (el) => el.dataset.id
  );

  console.log("🎮 Server ID:", serverId);

  const serverEl = await page.$(`.server-body[data-id="${serverId}"]`);
  await serverEl.click();

  console.log(`🖱️ Server with id: ${serverId} clicked`);
}
