describe('Customer page should has', function () {

  let login_btn = element(by.name('btn_login'));

  beforeEach(function () {
    browser.get('/');

    browser.sleep(1000);

    login_btn.click();
  });

  it('create new two orders', function () {
    const credits = element(by.id('add-credits'));
    const add_btn = element(by.id('add-button'));

    element.all(by.repeater('order in orders')).count().then(function (count) {
      // add credits
      credits.click();

      // make orders
      add_btn.click();
      add_btn.click();

      const newOrders = element.all(by.repeater('order in orders'));

      expect(newOrders.count()).toBe(count + 2);
    });
  });
});