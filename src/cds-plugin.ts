/**
 * CAP Plugin Entrypoint (TypeScript source)
 *
 * Compiled to dist/cds-plugin.js, which is referenced by the root cds-plugin.js.
 * CAP auto-discovers the plugin via the root cds-plugin.js entrypoint.
 *
 * Run `npm run build` before publishing or testing.
 */

// CDS is loaded as a singleton via require to ensure compatibility with CAP's module system.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cds = require('@sap/cds');
import { applyPlugin } from './index';

const LOG = cds.log('plugin');

// TODO: Customize the lifecycle hook and service filter for your plugin.
//
// Common hooks:
//   cds.on('connect', service => { ... })  — fires when a service connects
//   cds.on('serving', service => { ... })   — fires when an application service is served
//   cds.on('loaded', model => { ... })      — fires when the CDS model is loaded
//   cds.once('served', () => { ... })       — fires once after all services are served
//
// Common service type filters:
//   service instanceof cds.RemoteService      — external/remote services
//   service instanceof cds.ApplicationService — application services
//   service instanceof cds.MessagingService   — messaging services

cds.on('serving', (service: any) => {
  if (service instanceof cds.ApplicationService) {
    LOG.info(`Applying plugin to: ${service.name}`);
    applyPlugin(cds, service);
  }
});
