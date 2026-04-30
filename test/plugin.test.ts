import { getConfig, DEFAULTS, type PluginConfig } from '../src/config';
import { applyPlugin } from '../src/index';

// ─── Unit Tests: config ──────────────────────────────────────────

describe('getConfig', () => {
  it('returns defaults when no user config is set', () => {
    const mockCds = { env: {} };
    const config = getConfig(mockCds);
    expect(config).toEqual(DEFAULTS);
  });

  it('merges user config with defaults', () => {
    const mockCds = {
      env: { myPlugin: { enabled: false } },
    };
    const config = getConfig(mockCds);
    expect(config.enabled).toBe(false);
  });

  it('uses defaults when cds.env.myPlugin is undefined', () => {
    const mockCds = { env: { myPlugin: undefined } };
    const config = getConfig(mockCds);
    expect(config).toEqual(DEFAULTS);
  });
});

// ─── Unit Tests: applyPlugin ─────────────────────────────────────

describe('applyPlugin', () => {
  const createMockCds = (pluginConfig: Partial<PluginConfig> = {}) => ({
    env: { myPlugin: pluginConfig },
    log: () => ({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    }),
  });

  const createMockService = (name = 'TestService') => ({
    name,
    send: jest.fn().mockResolvedValue({ id: 1 }),
    before: jest.fn(),
    on: jest.fn(),
    after: jest.fn(),
  });

  it('activates plugin when enabled', () => {
    const cds = createMockCds({ enabled: true });
    const service = createMockService();
    // Should not throw
    expect(() => applyPlugin(cds, service)).not.toThrow();
  });

  it('skips plugin when disabled', () => {
    const cds = createMockCds({ enabled: false });
    const service = createMockService();
    // Should not throw, just skip
    expect(() => applyPlugin(cds, service)).not.toThrow();
  });

  it('works with default config (no user overrides)', () => {
    const cds = createMockCds();
    const service = createMockService('MyService');
    expect(() => applyPlugin(cds, service)).not.toThrow();
  });
});
