import { RevPage } from './app.po';

describe('rev App', function() {
  let page: RevPage;

  beforeEach(() => {
    page = new RevPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
