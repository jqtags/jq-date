Sample Code: 
```html
<jq-date id="sampledate">
</jq-date>
```
Using jQuery you can get/set value

```javascript
$("#sampledate").val("12 may 2012");

var x = $("#sampledate").val();

$("#sampledate").on("change",function(e){
    console.log("callback : date has changed")
})


```