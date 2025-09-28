// @ts-check
import { BeHive, MountObserver, seed } from 'be-hive/be-hive.js';
/** @import {AP} from './ts-refs/soak-up/types'; */
/** @import {EMC} from './ts-refs/trans-render/be/types' */

const targetPropsFromSourceSpecifier = String.raw `^(?<targetProps>.*) from (?<sourceSpecifier>.*)`;

/**
 * @type {EMC<any, AP>}
 */
export const emc = {
    base: 'soak-up',
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
            regExpExts: {
                soakUpRules: [
                    {
                        regExp: targetPropsFromSourceSpecifier,
                        defaultVals: {},
                        dssKeys: [['sourceSpecifierString', 'sourceSpecifier']],
                    }
                ]
            }
        }
    },
    enhPropKey: 'soakUpRules',
    importEnh: async () => {
        const { SoakUp } = await import('./soak-up.js');
        return SoakUp;
    }
}
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);