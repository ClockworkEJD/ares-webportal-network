import Controller from '@ember/controller';
import Swiping from 'ares-webportal/mixins/swiping';

export default Controller.extend(Swiping, {
  reloadChar() {
    this.send('reloadModel');
  },

  actions: {
    altMatches: function(option) {
      this.gameApi.requestOne('altMatches', { option: option }, null)
      .then( (response) => {
        if (response.error) {
          return;
        }
        this.flashMessages.success(response.message);
        this.reloadChar();
      });
    },
  },
});
