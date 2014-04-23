!AntiShout.js
============

This jQuery plugin disallow users to send form with to much uppercased letters
and when the caps lock is on.

[View demo](http://npsr.github.io/antishout.js/)

Usage
====
**Include jQuery eg.:**
```
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'></script>
```

**Include AntiShout eg.:**
```
<script src="path_to_file/antishout.js"></script>
```
**Fire it up:**

```
$(function()
{
    $('form_selector').antishout();
})
```

**Try it with options:**

```
var options = {
    // Messages    
    toMuchUpperCased    : 'Too much uppercased letters!',
    
    // How much percent of uppercase can be in the string
    upperCaseRatio      : 30,
    
    // Form elements listen
    listen              : {
                            textInput   : true,
                            textarea    : true
                          },
                          
    // Set minimum characters
    minChars            : {
                            textInput   : 6,
                            textarea    : 100
                          }
}

$(function()
{
    $('form_selector').antishout(options);
})
```
