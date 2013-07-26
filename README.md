angular-spin
============

Tiny spin.js wrapping directive for angular.

Usage:

```html
<div ng-init="config={lines:12}">
    <div spin="config"></div>
</div>
```

or

```html
<div ng-init="config={lines:12}; spinif=true">
    <div spin="config" spin-if="spinif"></div>
</div>
```

Enhancements in 0.1.2
---------------------

Is now a UMD module for AMD or browser globals. Spin.js is so it is easier to use this with AMD now.

Will take the foreground color of the host element if none is specified in the config, like the jQuery plugin version.

You can specify `hideElement: true` in the config and it will cause the host element to hide when the spinner stops (via `spin-if`).