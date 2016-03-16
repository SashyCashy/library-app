import Ember from 'ember';

export default Ember.Controller.extend({
  emailAddress: '',
  isValid: Ember.computed.match('emailAddress',/^.+@.+\..+$/),
  isDisabled: Ember.computed.not('isValid'),
  actualEmailAddress: Ember.computed('emailAddress',function () {
    console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
  }),
  actions: {
    saveInvitation () {
      let email = this.get('emailAddress');
      let _that = this;
      let newInvitation =  this.store.createRecord('invitation',{ email:email });
      newInvitation.save().then((response) => {
         this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
         this.set('emailAddress', '');
         console.log(response.get('email'));
         console.log(response.get('id'));
      });
    }
  }
});
