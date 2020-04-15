class BasePresenter {
  constructor() { }

  inteructor;
  view;

  setInteructor(inteructor) {
    this.inteructor = inteructor
  }
  setView(view) {
    this.view = view
  }
}

export default BasePresenter