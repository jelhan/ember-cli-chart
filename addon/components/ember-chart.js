/* global Chart */
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  attributeBindings: ['width', 'height'],

  didInsertElement: function(){
    var context = this.get('element');
    var data    = this.get('data');
    var type    = this.get('type');
    var options = this.get('options');

    var chart = new Chart(context, {
      type: type,
      data: data,
      options: options
    });
    this.set('chart', chart);
    this.addObserver('data', this, this.updateChart);
    this.addObserver('data.[]', this, this.updateChart);
    this.addObserver('options', this, this.updateChart);
  },

  willDestroyElement: function(){
    this.get('chart').destroy();
    this.removeObserver('data', this, this.updateChart);
    this.removeObserver('data.[]', this, this.updateChart);
    this.removeObserver('options', this, this.updateChart);
  },

  updateChart: function(){
    var chart   = this.get('chart');
    var data    = this.get('data');
    var options = this.get('options');
    chart.config.data = data;
    chart.config.options = options;
    chart.update();
  }
});
