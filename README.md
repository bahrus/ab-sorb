# soak-up (🧽)

Absorb temporary light children into the upgraded Web Components, for those who insist that web components should be 100% progressive enhancement compatible.

In this example, [*scratch-box*](https://github.com/bahrus/scratch-box) is a fancy looking checkbox-like web component.

```html
<form>
    <fieldset itemscope disabled name=tasks>
        <scratch-box defer-enh-soak-up enh-soak-up="
            name, checked as value
            from #{{createDemo}}
        "
            enh-be-importing=scratch-box/root.mjs>

            <!-- These temporary elements serve as functional stand-in elements 
                 while web component loads -->
            <label data-id="{{| createDemoLabel}}" data-for={{createDemo}}>Create demo</label>
            <input data-id="{{@ createDemo}}" type=checkbox>
            <!-- End of temporary elements -->
                
            <span slot=labelTxt defer-soak-up soak-up="
                textContent, itemprop
                    from #{{createDemoLabel}}.
            "></span>
        </scratch-box>
        <scratch-box defer-enh-soak-up disabled enh-soak-up="
            name, checked as value
            from #{{writeArticle}}
            ">
            <label data-id="{{| writeArticleLabel}}" data-for={{writeArticle}}>Write article</label>
            <input data-id="{{@ writeArticle}}" type=checkbox>
            
            <span slot=labelTxt defer-soak-up soak-up="
            textContent, itemprop 
            from #{{writeArticleLabel}}"></span>
        </scratch-box>
        <scratch-box defer-enh-soak-up enh-soak-up="
            name, checked as value 
            from #{{exercise}}">
            <label data-id="{{| exerciseLabel}}" data-for={{exercise}}>Exercise</label>
            <input data-id="{{@ exercise}}" type=checkbox>
            <span -id slot=labelTxt defer-soak-up soak-up="
                textContent, itemprop from #{{exerciseLabel}}"></span>
        </scratch-box>
    </fieldset>

</form>
```

What this does:

1.  Does nothing until scratch-box is defined as a custom element.
2.  Allows the user to make changes to the value of the built-in input / type=checkbox while waiting for the scratch-box elements to upgrade.
3.  Once the upgrade has happened, absorbs the latest values of *checked* and *name* of the built-in input element into the scratch-box element, and deletes the input element.  Absorbs the textContent and itemprop values of the built-in label element, then deletes the label element.

## Using the emoji name.

This package contains an alternative name you can use for this enhancement (at the risk of conflicting with other libraries).

```html
<form>
    <fieldset itemscope disabled name=tasks>
        <scratch-box defer-enh-🧽 enh-🧽="
            name, checked as value
            from #{{createDemo}}
        "
            enh-be-importing=scratch-box/root.mjs>

            <!-- These temporary elements serve as functional stand-in elements 
                 while web component loads-->
            <label data-id="{{| createDemoLabel}}" data-for={{createDemo}}>Create demo</label>
            <input data-id="{{@ createDemo}}" type=checkbox>
            <!-- End of temporary elements -->
                
            <span slot=labelTxt defer-🧽 🧽="
                textContent, itemprop
                    from #{{createDemoLabel}}.
            "></span>
        </scratch-box>
        <scratch-box defer-enh-🧽 disabled enh-🧽="
            name, checked as value
            from #{{writeArticle}}
            ">
            <label data-id="{{| writeArticleLabel}}" data-for={{writeArticle}}>Write article</label>
            <input data-id="{{@ writeArticle}}" type=checkbox>
            
            <span slot=labelTxt defer-🧽 🧽="
            textContent, itemprop 
            from #{{writeArticleLabel}}"></span>
        </scratch-box>
        <scratch-box defer-enh-🧽 enh-🧽="
            name, checked as value 
            from #{{exercise}}">
            <label data-id="{{| exerciseLabel}}" data-for={{exercise}}>Exercise</label>
            <input data-id="{{@ exercise}}" type=checkbox>
            <span -id slot=labelTxt defer-🧽 🧽="
                textContent, itemprop from #{{exerciseLabel}}"></span>
        </scratch-box>
    </fieldset>

</form>
```

## Viewing Locally

Any web server that serves static files with server-side includes will do but...

1. Install git
2. Fork/clone this repo
3. Install node.js
4. Open command window to folder where you cloned this repo
5. > git submodule add https://github.com/bahrus/types.git types
6. > git submodule update --init --recursive
7. > npm install
8. > npm run serve
9. Open http://localhost:8000/demo/ in a modern browser
