// @ts-check
/** @import {Actions, PAP, AllProps, AP, SoakUpRule, PropMap} from './types/soak-up/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway, SpawnContext} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;

/**
 * @implements {Actions}
 */
class SoakUp {

    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, ctx, initVals);
    }

    /**
     * @param {AllProps} self 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, ctx, initVals){
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>} */ (ctx.emc);
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...customData?.defaultPropVals,
                ...initVals
            }
        };
        (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /**
     * @param {AP} self 
     * @returns {PAP}
     */
    fullyParse(self){
        const {soakUpRules} = self;
        const {statements} = soakUpRules;
        /** @type {SoakUpRule[]} */
        const parsedRules = [];
        for(const statement of statements){
            const {value} = statement;
            if(!value) continue;
            const {propMap, sourceSpecifierString} = value;
            /** @type {PropMap[]} */
            const parsedPropMap = [];
            const commaSplit = propMap.split(',').map(s => s.trim()).filter(s => s.length > 0);
            for(const part of commaSplit){
                const [srcProp, destProp] = part.split(' as ').map(s => s.trim());
                parsedPropMap.push({
                    srcProp,
                    destProp
                });
            }
            parsedRules.push({
                propMap,
                sourceSpecifierString: sourceSpecifierString.trim(),
                parsedPropMap
            });
        }
        return /** @type {PAP} */ ({
            parsedRules
        });
    }

    /**
     * @param {AP} self 
     * @returns {Promise<PAP>}
     */
    async hydrate(self){
        const {parsedRules, enhancedElement} = self;
        // find the web component host - walk up until we find a custom element
        let wc = enhancedElement.parentElement;
        while(wc && !wc.localName.includes('-')){
            wc = wc.parentElement;
        }
        if(wc === null) throw 404;
        await customElements.whenDefined(wc.localName);
        for(const rule of parsedRules){
            const {sourceSpecifierString, parsedPropMap} = rule;
            const source = findSource(enhancedElement, sourceSpecifierString);
            if(!(source instanceof Element)) continue;
            if(!parsedPropMap) continue;
            for(const {srcProp, destProp} of parsedPropMap){
                /** @type {any} */(enhancedElement)[destProp || srcProp] = /** @type {any} */(source)[srcProp];
            }
            source.remove();
        }
        return /** @type {PAP} */ ({
            resolved: true
        });
    }
}

/**
 * Finds a source element based on DSS specifier string.
 * Handles patterns like #{{elementName}} which resolve to elements
 * with data-id attributes containing the name within the closest itemscope.
 * @param {Element} context 
 * @param {string} specifier 
 * @returns {Element | null}
 */
function findSource(context, specifier){
    // Handle #{{name}} pattern - find by data-id within scope
    const match = specifier.match(/^#\{\{([^}]+)\}\}$/);
    if(match){
        const name = match[1];
        // Search within the closest itemscope or root
        const scope = context.closest('[itemscope]') || context.getRootNode();
        if(scope instanceof Element){
            return scope.querySelector(`[data-id*="${name}"]`);
        }
        if(scope instanceof Document || scope instanceof DocumentFragment){
            return scope.querySelector(`[data-id*="${name}"]`);
        }
    }
    // Handle simple #id pattern
    if(specifier.startsWith('#')){
        const id = specifier.slice(1);
        const root = context.getRootNode();
        if(root instanceof Document || root instanceof DocumentFragment){
            return root.querySelector(`#${id}`);
        }
    }
    // Fallback: try as CSS selector
    const root = context.getRootNode();
    if(root instanceof Document || root instanceof DocumentFragment){
        return root.querySelector(specifier);
    }
    return null;
}

export { SoakUp }
