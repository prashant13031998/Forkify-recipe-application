import icons from 'url:../../img/icons.svg';
import View from './view';
import previewView from './previewView';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage =
    'Not able to find recipe with this keyword, Please try something else!';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(itr => previewView.render(itr, false)).join();
  }
}
export default new ResultsView();
