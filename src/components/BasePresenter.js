import HandlerRegistration from './HandlerRegistration'

class BasePresenter {
  constructor() { }

  inteructor;
  view;

  commandNames = {};
  eventNames = {};

  commandRegistrations = {};
  eventRegistrations = {};

  registerCommand(commandName, handlerName, inboundTransform, outboundTransform) {
    // check that presenter has commandName
    if (!this.hasCommand(commandName)) {
      console.warn(`Command '${commandName}' is not exists for Presentor '${this.constructor.name}'`)
    } else {
      // check that inteructor has method handlerName
      if (!this.hasInteructorHandler(handlerName)) {
        console.warn(`Handler '${handlerName}' is not exists for Inteructor '${this.inteructor.constructor.name}'`)
      } else {
        this.commandRegistrations[commandName] = new HandlerRegistration(commandName, handlerName, inboundTransform, outboundTransform)
      }
    }
  }

  executeCommand(commandName, args) {
    // check that presenter has commandName
    if (!this.hasCommand(commandName)) {
      let err = `Command '${commandName}' is not exists for Presentor '${this.constructor.name}'`
      console.warn(err)
      return Promise.reject(err)
    } else {
      let registration = this.commandRegistrations[commandName]
      if (registration) {
        let inboundArgs = registration.inboundTransform.call(this, args)
        let handler = this.inteructor[registration.handlerName];
        return handler.call(this.inteructor, inboundArgs).then(result => {
          return registration.outboundTransform.call(this, result)
        })
      } else {
        let err = `Handler for command '${commandName}' is not registred in Presenter '${this.constructor.name}'`
        console.warn(err)
        return Promise.reject(err)
      }
    }
  }

  registerEvent(eventName, handlerName, inboundTransform, outboundTransform) {
    // check that presenter has commandName
    if (!this.hasEvent(eventName)) {
      console.warn(`Event '${eventName}' is not exists for Presentor '${this.constructor.name}'`)
    } else {
      // check that view has method handlerName
      if (!this.hasViewHandler(handlerName)) {
        console.warn(`Handler '${handlerName}' is not exists for View '${this.view.constructor.name}'`)
      } else {
        this.eventRegistrations[eventName] = new HandlerRegistration(eventName, handlerName, inboundTransform, outboundTransform)
      }
    }
  }

  fireEvent(eventName, args) {
    // check that presenter has eventName
    if (!this.hasEvent(eventName)) {
      let err = `Event '${eventName}' is not exists for Presentor '${this.constructor.name}'`
      console.warn(err)
      return Promise.reject(err)
    } else {
      let registration = this.eventRegistrations[eventName]
      if (registration) {
        let inboundArgs = registration.inboundTransform.call(this, args)
        let handler = this.view[registration.handlerName];
        return handler.call(this.view, inboundArgs).then(result => {
          return registration.outboundTransform.call(this, result)
        })
      } else {
        let err = `Handler for event '${eventName}' is not registred in Presenter '${this.constructor.name}'`
        console.warn(err)
        return Promise.reject(err)
      }
    }
  }

  hasCommand(commandName) {
    return this.commandNames.hasOwnProperty(commandName)
  }

  hasEvent(eventName) {
    return this.eventNames.hasOwnProperty(eventName)
  }

  hasInteructorHandler(handlerName) {
    return handlerName in this.inteructor
  }

  hasViewHandler(handlerName) {
    return handlerName in this.view
  }
  
  registerCommandHandlers() { }
  registerEventHandlers() { }

  setInteructor(inteructor) {
    this.inteructor = inteructor
    this.registerCommandHandlers()
  }
  setView(view) {
    this.view = view
    this.registerEventHandlers()
  }
}

export default BasePresenter