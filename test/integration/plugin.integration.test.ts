/**
 * Integration / Dry-Run Tests
 *
 * These tests start a real in-process CAP server against the test application
 * (test/app/) and verify that the plugin behaves correctly end-to-end.
 *
 * Use these to test:
 *   - Plugin lifecycle hooks are invoked at the right time
 *   - Event handlers registered by the plugin fire correctly
 *   - HTTP behavior exposed by the plugin is correct
 *
 * Prerequisites: run `npm run build` before running these tests so the
 * compiled plugin is available in dist/.
 *
 * Run with:
 *   npm run test:integration   — integration tests only
 *   npm run test:dry-run       — alias for the above
 *   npm test                   — all tests (unit + integration)
 */

// @cap-js/cds-test augments the cds object with a `.test()` factory.
// It must be imported before cds to register its extensions.
import '@cap-js/cds-test';
import cds from '@sap/cds';
import path from 'node:path';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const APP_DIR = path.join(__dirname, '../app');

// ─── Integration Tests ───────────────────────────────────────────────────────

describe('Plugin Integration (dry-run)', () => {
  // Launches an in-process CDS test server against the test app.
  // `cds.test()` hooks into Jest lifecycle (beforeAll/afterAll) automatically.
  const { GET } = (cds as any).test(APP_DIR);

  it('GET /odata/v4/test/Items returns 200 with an empty array by default', async () => {
    const res = await GET('/odata/v4/test/Items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data.value)).toBe(true);
  });

  it('plugin does not break standard OData metadata endpoint', async () => {
    const res = await GET('/odata/v4/test/$metadata');
    expect(res.status).toBe(200);
    expect(res.data).toContain('EntityType');
  });

  // TODO: Add assertions specific to your plugin's behavior.
  // Examples:
  //
  // it('plugin adds custom header to responses', async () => {
  //   const res = await GET('/test/Items');
  //   expect(res.headers['x-my-plugin-header']).toBeDefined();
  // });
  //
  // it('plugin fires before-READ handler', async () => {
  //   const spy = jest.spyOn(someModule, 'handler');
  //   await GET('/test/Items');
  //   expect(spy).toHaveBeenCalled();
  // });
});

// ─── Dry-Run: Plugin Lifecycle ────────────────────────────────────────────────
//
// These tests verify the plugin wiring without making HTTP requests.
// They simulate the `cds.on('serving', ...)` lifecycle in isolation.

describe('Plugin lifecycle (dry-run, no HTTP)', () => {
  it('applyPlugin is invoked when serving fires for an ApplicationService', async () => {
    const { applyPlugin } = await import('../../src/index');
    const invoked: string[] = [];

    const mockCds = {
      env: { myPlugin: { enabled: true } },
      log: () => ({
        info: (msg: string) => invoked.push(msg),
        warn: jest.fn(),
        error: jest.fn(),
        debug: jest.fn(),
      }),
    };

    const mockService = { name: 'DryRunService' };

    applyPlugin(mockCds, mockService);

    expect(invoked.some((msg) => msg.includes('DryRunService'))).toBe(true);
  });

  it('applyPlugin is a no-op when plugin is disabled via config', async () => {
    const { applyPlugin } = await import('../../src/index');
    const infoLogs: string[] = [];

    const mockCds = {
      env: { myPlugin: { enabled: false } },
      log: () => ({
        info: (msg: string) => infoLogs.push(msg),
        warn: jest.fn(),
        error: jest.fn(),
        debug: jest.fn(),
      }),
    };

    const mockService = { name: 'DisabledService' };

    applyPlugin(mockCds, mockService);

    // When disabled, the plugin should log a skip message, not an activation message
    expect(infoLogs.some((msg) => msg.toLowerCase().includes('disabled'))).toBe(true);
  });
});
