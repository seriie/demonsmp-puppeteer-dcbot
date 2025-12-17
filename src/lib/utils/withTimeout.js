export function withTimeout(promise, ms, label = "Timeout") {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(label)), ms)
    )
  ])
}