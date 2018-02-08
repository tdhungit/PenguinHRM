import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';

Meteor.methods({
    'users.insert': function usersInsert(user) {
        check(user, Object);
        //return Users.insert(user);
        return Accounts.createUser({
            username: user.username,
            email: user.email,
            password: user.password,
            profile: {
                first_name: user.first_name,
                last_name: user.last_name
            }
        });
    }
});