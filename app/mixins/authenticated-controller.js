import Mixin from '@ember/object/mixin';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Mixin.create({
  session: service(),

  isAuthenticated: reads('session.isAuthenticated'),

  isApproved: reads('session.data.authenticated.is_approved'),

  isAdmin: reads('session.data.authenticated.is_admin'),

  isCoder: reads('session.data.authenticated.is_coder'),

  isWikiMgr: reads('session.data.authenticated.is_wiki_mgr'),

  canSwipe: computed.reads('session.data.authenticated.can_swipe'),

  currentUser: computed.reads('session.data.authenticated'),
});
