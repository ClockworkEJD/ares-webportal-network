import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import DefaultRoute from 'ares-webportal/mixins/default-route';

export default Route.extend(DefaultRoute, {
    gameApi: service(),
    
    model: function(params) {
        let api = this.get('gameApi');
        return api.requestOne('forumCategory', {category_id: params['category_id']});
    },
    
    titleToken: function(model) {
        return model.name;
    }
    
});