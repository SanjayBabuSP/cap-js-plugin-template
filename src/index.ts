import { getConfig } from './config';

/**
 * TODO: Implement your plugin's core logic here.
 *
 * This function is called for each service matched by the plugin entrypoint.
 * Modify it to add custom behavior such as:
 *   - Registering event handlers (before/on/after)
 *   - Wrapping service methods
 *   - Decorating the service instance
 *
 * @param cds - The CDS runtime object
 * @param service - The matched CDS service instance
 */
export function applyPlugin(cds: any, service: any): void {
  const LOG = cds.log('plugin');
  const config = getConfig(cds);

  if (!config.enabled) {
    LOG.info(`Plugin disabled for service: ${service.name}`);
    return;
  }

  LOG.info(`Plugin activated for service: ${service.name}`);

  // --- Example: Register an event handler ---
  // service.before('READ', '*', (req: any) => {
  //   LOG.debug('Intercepted READ request', { target: req.target?.name });
  // });

  // --- Example: Wrap a service method ---
  // const originalSend = service.send.bind(service);
  // service.send = async function customSend(...args: any[]) {
  //   LOG.debug('Before send');
  //   const result = await originalSend(...args);
  //   LOG.debug('After send');
  //   return result;
  // };
}
