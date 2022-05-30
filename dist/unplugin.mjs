import { promises } from 'fs';
import { createUnplugin } from 'unplugin';
import { createFilter } from '@rollup/pluginutils';
import MagicString from 'magic-string';
import { e as createUnimport, s as scanDirExports } from './chunks/context.mjs';
import 'fast-glob';
import 'pathe';
import 'mlly';
import 'scule';
import './chunks/vue-template.mjs';
import 'local-pkg';

const unplugin = createUnplugin((options = {}) => {
  const ctx = createUnimport(options);
  const filter = createFilter(options.include || [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/], options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/]);
  const dts = options.dts === true ? "unimport.d.ts" : options.dts;
  return {
    name: "unimport",
    enforce: "post",
    transformInclude(id) {
      return filter(id);
    },
    async transform(code, id) {
      const s = new MagicString(code);
      await ctx.injectImports(s, id);
      if (!s.hasChanged()) {
        return;
      }
      return {
        code: s.toString(),
        map: s.generateMap()
      };
    },
    async buildStart() {
      if (options.dirs?.length) {
        await ctx.modifyDynamicImports(async (imports) => {
          imports.push(...await scanDirExports(options.dirs));
        });
      }
      if (dts) {
        return promises.writeFile(dts, ctx.generateTypeDecarations(), "utf-8");
      }
    }
  };
});

export { unplugin as default };