import { isDatabaseConnected } from '@/lib/db'

/**
 * Creates a concurrency-safe, idempotent hydration guard for a CMS service.
 * Returns `false` safely when the database is offline so callers can abort cleanly.
 */
export function createSeedGuard(seedIfEmpty: () => Promise<void>): () => Promise<boolean> {
  let inflight: Promise<boolean> | null = null

  return async () => {
    if (inflight) return inflight

    inflight = (async () => {
      const connected = await isDatabaseConnected()
      if (!connected) return false
      await seedIfEmpty()
      return true
    })()

    try {
      return await inflight
    } finally {
      inflight = null
    }
  }
}

/**
 * Strips Prisma-managed identifier and timestamp fields from data payloads before create/update.
 */
export function stripManagedFields<T extends object>(
  data: T
): Omit<T, 'id' | 'createdAt' | 'updatedAt'> {
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = data as T & {
    id?: unknown
    createdAt?: unknown
    updatedAt?: unknown
  }
  return rest
}
