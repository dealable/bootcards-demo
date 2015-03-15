/*****************************************************************************/
/* Client and Server Routes */
/*****************************************************************************/
Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', function () {
  this.redirect('/pcuci');
});

Router.route('/pcuci');
Router.route('/dashboard');
Router.route('/companies');
Router.route('/contacts');
Router.route('/notes');
Router.route('/charts');
Router.route('/settings');
