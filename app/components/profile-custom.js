import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Swiping from 'ares-webportal/mixins/swiping';

export default Component.extend(Swiping, {
  tagName: '',

  didInsertElement: function() {
    this._super(...arguments);
    if (this.get('dating.dating_alts')) {
      this.updateDater();
    }
  },

  match: computed('dating.match', function() {
    return this.get('dating.match') || 'None';
  }),

  showDatingProfileTab: computed('char.custom.showDatingProfile', function() {
    return this.char.custom.showDatingProfile;
  }),

  showDatingMatchesTab: computed('dating.matches', function() {
    return this.dating.matches && Object.keys(this.dating.matches).length > 0;
  }),

  showDatingUI: computed('canSwipe', 'char.custom.canSwipe', function() {
    return this.get('dating.dating_alts') && this.canSwipe && this.char.custom.canSwipe;
  }),

  swipe: computed('dating.swipe', function() {
    let swipe = this.get('dating.swipe');
    if (!swipe) {
      return 'None';
    } else if (swipe.missed) {
      return swipe.type + ' (Missed Connection)';
    } else {
      return swipe.type;
    }
  }),

  updateDatingInfo: function(dating) {
    this.set('dating.match', dating.match);
    this.set('dating.swipe', dating.swipe);
    if (dating.matches) {
      this.set('dating.matches', dating.matches);
    }
  },

  actions: {
    daterChanged: function(dater) {
      this.set('dating.swiping_with', dater);
      this.setDater(dater);
      this.gameApi.requestOne('matchFor', { id: this.char.id, dater: dater.name })
      .then( (response) => {
        if (response.error) {
          return;
        }
        this.updateDatingInfo(response);
      });
    },
  },
});
