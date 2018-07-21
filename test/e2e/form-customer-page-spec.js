describe('Customer page should has', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('form', function () {
    expect(element(by.name('customerForm')).isPresent()).toBe(true);
  });


  let name = element(by.model('customer.name'));
  let email = element(by.model('customer.email'));

  it('name input with requared attribute', function () {
    expect(name.getAttribute('required')).toEqual('true');
  });


  it('email input with requared attribute', function () {
    expect(email.getAttribute('required')).toEqual('true');
  });

});