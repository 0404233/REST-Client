import { describe, it, expect, vi, afterEach } from 'vitest';

const mockCredentialCert = vi.fn();
const mockInitializeApp = vi.fn();
const mockFirestore = vi.fn(() => 'firestoreInstance');
const mockAuth = vi.fn(() => 'authInstance');

vi.mock('firebase-admin', () => {
  const admin = {
    apps: [] as any[],
    initializeApp: mockInitializeApp,
    credential: { cert: mockCredentialCert },
    firestore: mockFirestore,
    auth: mockAuth,
  };
  return {
    __esModule: true,
    default: admin,
  };
});

describe('firebaseAdmin module', () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('does NOT re-initialize when apps array is non-empty', async () => {
    const { default: admin } = await import('firebase-admin');
    (admin.apps as any).push({} as any);

    const { firestore, adminAuth } = await import('./firebaseAdmin');

    expect(mockInitializeApp).not.toHaveBeenCalled();
    expect(mockCredentialCert).not.toHaveBeenCalled();
    expect(mockFirestore).toHaveBeenCalled();
    expect(adminAuth).toBe('authInstance');
  });
});
