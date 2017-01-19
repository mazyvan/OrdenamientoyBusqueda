import { OrdenamientoyBusquedaPage } from './app.po';

describe('ordenamientoy-busqueda App', function() {
  let page: OrdenamientoyBusquedaPage;

  beforeEach(() => {
    page = new OrdenamientoyBusquedaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
