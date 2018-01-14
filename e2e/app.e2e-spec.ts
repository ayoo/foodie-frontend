import { FoodiePage } from './app.po';

describe('foodie App', () => {
  let page: FoodiePage;

  beforeEach(() => {
    page = new FoodiePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
