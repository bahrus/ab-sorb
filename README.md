# soak-up (🧽) [TODO]


Absorb temporary light children into the upgraded Web Components, for those who insist that web components should be 100% progressive enhancement compatible.

```html
<form>
    <fieldset itemscope disabled name=tasks>
        <scratch-box enh-soak-up="
            name, checked as value
               from #{{createDemo}}
        "
            enh-be-importing=scratch-box/root.mjs>
            <label data-id="{{| createDemoLabel}}">Create demo<label>
            <input data-id="{{@ createDemo}}" type=checkbox>
                
            <span slot=labelTxt soak-up="
                textContent, itemprop
                    from #{{createDemoLabel}}.
            "></span>
        </scratch-box>
        <scratch-box disabled enh-soak-up="
            name, checked as value
               from #{{writeArticle}}
            ">
            <label data-id="{{| writeArticleLabel}}">Write article</label>
            <input data-id="{{@ writeArticle}}" type=checkbox>
            
            <span slot=labelTxt soak-up="
               textContent, itemprop 
               from #{{writeArticleLabel}}"></span>
        </scratch-box>
        <scratch-box enh-soak-up="
            name, checked as value 
               from #{{exercise}}">
            <label data-for={{exercise}}>Exercise</label>
            <input data-id="{{@ exercise}}" type=checkbox>
            <span -id slot=labelTxt soak-up="
                textContent, itemprop from #{{exercise}}"></span>
        </scratch-box>
    </fieldset>

</form>
```

What this does:

1.  Does nothing until scratch-box is defined as a custom element.
2.  Allows the user to make changes to the value of the build-in input / type=checkbox while waiting for the scratch-box elements to upgrade.
3.  Once the upgrade has happened, absorbs the values of checked and name into the scratch-box element, and deletes the input element.  Absorbs the textContent and itemprop values of the label element, then deletes the label element.
