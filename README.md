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