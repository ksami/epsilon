Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

Router.map(function() {
    this.route('home', {
        path: '/',
    });

    this.route('google');
    this.route('facebook');
});

if (Meteor.isClient) {
    //UserAccounts Routes
    AccountsTemplates.configureRoute('changePwd');
    AccountsTemplates.configureRoute('enrollAccount');
    AccountsTemplates.configureRoute('forgotPwd');
    AccountsTemplates.configureRoute('resetPwd');
    // AccountsTemplates.configureRoute('signIn');
    AccountsTemplates.configureRoute('signUp');
    AccountsTemplates.configureRoute('verifyEmail');
}

