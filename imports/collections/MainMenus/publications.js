import {Meteor} from 'meteor/meteor';
import MainMenus from './MainMenus';

Meteor.publish('mainMenus.list', function () {
    return MainMenus.find({});
});

Meteor.publish('mainMenus.detail', (menuId) => {
    return MainMenus.find({_id: menuId});
});
