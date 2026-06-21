//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions} from './types/soak-up/types' */
/** @import {RAConfig} from './types/roundabout/types' */
/** @import {PatternConfig} from './types/nested-regex-groups/types' */

/** @type {PatternConfig[]} */
const parsePatterns = [
    {
        name: 'propMapFromSource',
        pattern: String.raw `^(?<propMap>.*) from (?<sourceSpecifierString>.*)`,
        description: 'Property mappings from a source element specifier'
    }
];

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions> >}
 */
export const emc = {
    enhConfig: {
        enhKey: 'SoakUp',
        spawn: 'soak-up/soak-up.js',
        withAttrs: {
            base: 'soak-up',
            _base: {
                mapsTo: 'soakUpRules',
                parser: 'parse-pattern-statements',
                instanceOf: 'Array',
                parserConfig: parsePatterns
            }
        }
    },
    customData: {
        weakRef: {
            properties: ['enhancedElement']
        },
        compacts: {
            when_soakUpRules_changes_call_fullyParse: 0,
        },
        actions: {
            hydrate: {
                ifAllOf: ['parsedRules', 'enhancedElement']
            }
        }
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());
