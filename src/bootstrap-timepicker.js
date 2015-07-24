angular.module('schemaForm-timepicker', ['schemaForm', 'pickadate']).config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var timepicker = function(name, schema, options) {
      if (schema.type === 'string' && schema.format === 'time') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'timepicker';
        f.pickerOption = f.pickerOption || {};
        if (f.onChange) {
          f.pickerOption.onSet = f.onChange;
        }
        if ('minTime' in f) {
          f.pickerOption.min = f.minTime;
        }

        if ('maxTime' in f) {
          f.pickerOption.max = f.maxTime;
        }

        f.pickerOption.format = f.pickerOption.format || 'HH:i';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(timepicker);

    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping(
      'bootstrapDecorator',
      'timepicker',
      'directives/decorators/bootstrap/datepicker/timepicker.html'
    );
    schemaFormDecoratorsProvider.createDirective(
      'timepicker',
      'directives/decorators/bootstrap/datepicker/timepicker.html'
    );
  }
]);
