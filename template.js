module.exports = '<div>\n  <div class=\'block\'></div>\n\n  <div ng-repeat=\'item in array\'>\n\n    <div class=\'droparea\'>\n\n    </div>\n\n    <div draggable=\'true\' class=\'row\'>\n      {{item}}\n      <button ng-click=\'remove(item)\'>trash</button>\n    </div>\n\n  </div>\n\n  <div class=\'droparea\'>\n\n  </div>\n\n</div>\n';