describe('Kitchen page should', function () {

  beforeEach(function () {
    browser.get('/#/kitchen');
  });

  it('has two new orders in ordered list', function () {
    const list = element.all(by.repeater('order in orderedDishes'));
    expect(list.count()).toBe(2);
  });

  it('change status ordered to cooking', function () {
    const start = element(by.className('start'));

    element.all(by.repeater('order in orderedDishes')).count().then(function (count) {

      start.click();
      start.click();

      const ordered = element.all(by.repeater('order in orderedDishes'));

      expect(ordered.count()).toBe(count - 2);
    });
  });

  it('change status cooking to delivered', function () {
    const finish = element(by.className('finish'));

    element.all(by.repeater('order in cookingDishes')).count().then(function (count) {

      finish.click();
      finish.click();

      const cooking = element.all(by.repeater('order in cookingDishes'));

      expect(cooking.count()).toBe(count - 2);
    });
  });
});