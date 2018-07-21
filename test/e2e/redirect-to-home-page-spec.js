describe('Redicrect to home page', function () {

  beforeEach(function () {
    browser.get('index.html');
  });

  it('Should automatically redirect to / when location hash/fragment is empty', function () {
    expect(browser.getCurrentUrl()).toMatch("/");
  });
});