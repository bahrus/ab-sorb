# soak-up (🧽) [TODO]


Absorb temporary light children into the upgraded schema

```html
<form>
    <fieldset itemscope disabled name=tasks>
        <scratch-box enh-soak-up="
            name, checked as value
               from #{{createDemo}}.
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
            #{{writeArticle}}?.name.
            #{{writeArticle}}?.checked to ?.value.
            ">
            <label>
                <input data-id="{{@ writeArticle}}" type=checkbox>
                Write article
            </label>
            <span slot=labelTxt soak-up="textContent from #{{writeArticle}}?.nextElement"></span>
        </scratch-box>
        <scratch-box enh-soak-up="name and value from #{{exercise}}">
            <label>
                <input data-id="{{@ exercise}}" type=checkbox>
                Exercise
            </label>
            <span -id slot=labelTxt soak-up="textContent from #{{exercise}}?.nextElement"></span>
        </scratch-box>
    </fieldset>

</form>
```
