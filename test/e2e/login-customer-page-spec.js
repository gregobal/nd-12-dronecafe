const request = require("request");

describe('Customer page should has', function () {

  let name = element(by.model('customer.name'));
  let email = element(by.model('customer.email'));
  let login_btn = element(by.name('btn_login'));

  beforeEach(function () {

    // delete all orders before test
    request.delete('http://localhost:3000/orders');

    browser.get('/');

    name.sendKeys("Test");
    email.sendKeys("test@test.ru");

    browser.sleep(1000);

    login_btn.click();
  });

  it('50 elements in dish menu list', function () {
    const list = element.all(by.repeater('dish in dishes'));
    expect(list.count()).toBe(50);
  });

});