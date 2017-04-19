import { TvAppPage } from './app.po';

describe('tv-app App', () => {
  let page: TvAppPage;

  beforeEach(() => {
    page = new TvAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
