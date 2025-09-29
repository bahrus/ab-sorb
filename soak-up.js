// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP, BAP, PropMap} from './ts-refs/soak-up/types' */;

/**
 * @implements {Actions}
 * 
 */
class SoakUp extends BE {
    /**
     * @type {BEConfig<AP & BEAllProps, Actions & IEnhancement>}
     */
    static config = {
        propInfo: {
            ...propInfo,
            soakUpRules: {},
            fullyParsed: {},
        },
        positractions: [resolved, rejected],
        compacts:{
            when_soakUpRules_changes_call_fullyParse: 0,
        }
    };

    de = de;

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    fullyParse(self){
        const {soakUpRules} = self;
        for(const rule of soakUpRules){
            const {propMap} = rule;
            /** @type {PropMap[]} */
            const parsedPropMap = [];
            const commaSplit = propMap.split(',').map(s => s.trim()).filter(s => s.length > 0);
            for(const part of commaSplit){
                //const match = part.match(/^(?<propMap>.*) as (?<asProp>.*)$/); 
                const [srcProp, destProp] = part.split(' as ').map(s => s.trim());
                parsedPropMap.push({
                    srcProp,
                    destProp
                });
            }
        }
        return /** @type {PAP} */ ({
            fullyParsed: true
        });
    }

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    async hydrate(self){
        const {soakUpRules, enhancedElement} = self;
        // find the web component
        const wc = enhancedElement.slot ? enhancedElement.parentElement : enhancedElement;
        if(wc === null) throw 404;
        const {localName} = wc;
        if(!localName.includes('-')) throw 404;
        await customElements.whenDefined(localName);
        const {find} = await import('trans-render/dss/find.js');
        for(const rule of soakUpRules){
            const {sourceSpecifier} = rule;
            const source = await find(enhancedElement, sourceSpecifier);
            if(!(source instanceof Element)) continue;
            const {parsedPropMap} = rule;
            
            source.remove();
            for(const {srcProp, destProp} of parsedPropMap){
                /** @type {any} */(enhancedElement)[destProp || srcProp] = /** @type {any} */(source)[srcProp];
            }
        }
        return /** @type {PAP} */ ({
            resolved: true
        });
    }
}

await SoakUp.bootUp();
export { SoakUp };