
class BaseInretuctor {

  constructor() { }
  
  presenter;
  parentInteructor = null;

  setPresenter(presenter) {
    this.presenter = presenter
  }
  setParentInteructor(inteructor) {
    this.parentInteructor = inteructor
  }
}

export default BaseInretuctor