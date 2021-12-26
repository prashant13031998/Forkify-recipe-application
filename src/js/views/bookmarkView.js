import icons from 'url:../../img/icons.svg';
import View from './view';
import previewView from './previewView';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage =
    'Not able to find bookmark, Please select a nice recipe to bookmark';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join();
  }
}
export default new BookmarkView();
