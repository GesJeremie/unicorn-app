
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('should-show-unicorn-name', 'helper:should-show-unicorn-name', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{should-show-unicorn-name inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

