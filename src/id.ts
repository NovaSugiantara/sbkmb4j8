let fallbackCounter = 0;

export function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // ponytail: non-secure-context fallback only; counter+random+time makes collisions negligible
  fallbackCounter++;
  return Date.now().toString(36) + Math.random().toString(36).slice(2) + fallbackCounter.toString(36);
}
