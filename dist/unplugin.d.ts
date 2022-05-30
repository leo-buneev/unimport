import * as unplugin from 'unplugin';
import { FilterPattern } from '@rollup/pluginutils';
import { U as UnimportOptions } from './types-40a2cd16.js';
import 'magic-string';

interface UnimportPluginOptions extends UnimportOptions {
    include: FilterPattern;
    exclude: FilterPattern;
    dts: boolean | string;
    dirs: string[];
}
declare const _default: unplugin.UnpluginInstance<Partial<UnimportPluginOptions>>;

export { UnimportPluginOptions, _default as default };
