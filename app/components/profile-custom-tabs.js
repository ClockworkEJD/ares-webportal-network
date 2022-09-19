import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  showDatingProfileTab: computed('char.custom.showDatingProfile', function() {
    return this.char.custom.showDatingProfile;
  }),

  showDatingMatchesTab: computed('dating.matches', function() {
    return this.dating.matches && Object.keys(this.dating.matches).length > 0;
  }),
});
