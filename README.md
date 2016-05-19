# jquery-mhints
JQuery plugin that creates hints

##Message
Message is taken from:
- options - field message
- html data attribute - data-hint-message

##Options
- onmouse_display - display hint when mouse enters the element (default: true)
- message - message to be displayed in hint
- position - position of hint (available values: 'top', 'bottom')
- offset - hint offset, offset settings are separated by ;, every setting consist of 2 elements: axis (x or y) and offset (e.g. x:+10;y:-10)
- width - hint width
- close_time - time after which hint will be closed [ms], if set to 0 hint will not disappear

##Events
- show_hint - displays hint
