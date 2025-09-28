# soak-up (🧽) [TODO]


Absorb temporary light children into the upgraded schema

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
