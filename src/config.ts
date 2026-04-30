// TODO: Define the configuration interface for your plugin.
// Add properties that users can set via cds.env or .cdsrc.json.
//
// Example usage in package.json or .cdsrc.json:
//   { "cds": { "myPlugin": { "enabled": true } } }

export interface PluginConfig {
  enabled: boolean;
}

export const DEFAULTS: PluginConfig = {
  enabled: true,
};

/**
 * Reads plugin configuration from cds.env and merges with defaults.
 *
 * Users configure the plugin by adding a section to their package.json or .cdsrc.json:
 * ```json
 * { "cds": { "myPlugin": { "enabled": false } } }
 * ```
 *
 * @param cds - The CDS runtime object
 * @returns Merged configuration
 */
export function getConfig(cds: any): PluginConfig {
  // TODO: Replace 'myPlugin' with your plugin's config key.
  const userConfig = cds.env?.myPlugin ?? {};
  return { ...DEFAULTS, ...userConfig };
}
