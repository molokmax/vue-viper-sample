class HandlerRegistration {
  constructor(commandName, handlerName, inboundTransform, outboundTransform) {
    this.commandName = commandName;
    this.handlerName = handlerName;
    this.inboundTransform = inboundTransform;
    this.outboundTransform = outboundTransform;
  }

  commandName;
  handlerName;
  inboundTransform;
  outboundTransform;

}

export default HandlerRegistration;
