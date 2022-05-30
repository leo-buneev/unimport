import MagicString from 'magic-string';

declare const builtinPresets: {
    '@vue/composition-api': Preset;
    '@vueuse/core': () => Preset;
    '@vueuse/head': Preset;
    pinia: Preset;
    preact: Preset;
    quasar: Preset;
    react: Preset;
    'react-router': Preset;
    'react-router-dom': Preset;
    svelte: Preset;
    'svelte/animate': Preset;
    'svelte/easing': Preset;
    'svelte/motion': Preset;
    'svelte/store': Preset;
    'svelte/transition': Preset;
    'vee-validate': Preset;
    vitepress: Preset;
    'vue-demi': Preset;
    'vue-i18n': Preset;
    'vue-router': Preset;
    vue: Preset;
    'vue/macros': Preset;
    vuex: Preset;
    vitest: Preset;
    'uni-app': Preset;
    'solid-js': Preset;
    'solid-app-router': Preset;
};
declare type BuiltinPresetName = keyof typeof builtinPresets;

declare type ModuleId = string;
declare type ImportName = string;
interface ImportCommon {
    /** Module specifier to import from */
    from: ModuleId;
    /**
     * Priority of the import, if multiple imports have the same name, the one with the highest priority will be used
     * @default 1
     */
    priority?: number;
    /** If this import is disabled */
    disabled?: boolean;
}
interface Import extends ImportCommon {
    /** Import name to be detected */
    name: ImportName;
    /** Import as this name */
    as?: ImportName;
}
declare type PresetImport = ImportName | [name: ImportName, as?: ImportName, from?: ModuleId] | Exclude<Import, 'from'>;
interface Preset extends ImportCommon {
    imports: (PresetImport | Preset)[];
}
interface UnimportContext {
    readonly imports: Import[];
    staticImports: Import[];
    dynamicImports: Import[];
    map: Map<string, Import>;
    addons: Addon[];
    invalidate(): void;
}
interface AddonsOptions {
    /**
     * Enable auto import inside for Vue's <template>
     *
     * @default false
     */
    vueTemplate?: boolean;
}
interface UnimportOptions {
    imports: Import[];
    presets: (Preset | BuiltinPresetName)[];
    warn: (msg: string) => void;
    addons: AddonsOptions | Addon[];
}
declare type PathFromResolver = (_import: Import) => string | undefined;
interface ScanDirExportsOptions {
    fileFilter?: (file: string) => boolean;
}
interface TypeDeclrationOptions {
    /**
     * Custom resolver for path of the import
     */
    resolvePath?: PathFromResolver;
    /**
     * Append `export {}` to the end of the file
     *
     * @default true
     */
    exportHelper?: boolean;
}
interface InjectImportsOptions {
    /**
     * @default false
     */
    mergeExisting?: boolean;
}
declare type Thenable<T> = Promise<T> | T;
interface Addon {
    transform?: (this: UnimportContext, code: MagicString, id: string | undefined) => Thenable<MagicString>;
    decleration?: (this: UnimportContext, dts: string, options: TypeDeclrationOptions) => string;
    matchImports?: (this: UnimportContext, identifiers: Set<string>, matched: Import[]) => Thenable<Import[] | void>;
}

export { AddonsOptions as A, BuiltinPresetName as B, Import as I, ModuleId as M, Preset as P, ScanDirExportsOptions as S, TypeDeclrationOptions as T, UnimportOptions as U, Thenable as a, InjectImportsOptions as b, builtinPresets as c, ImportName as d, ImportCommon as e, PresetImport as f, UnimportContext as g, PathFromResolver as h, Addon as i };