interface InterceptorsManger<T = any> {
  handlers: Array<any>;
  use(onFulfilled?: (value: T) => T | Promise<T>, onRejected?: (error: any) => any): number;
  forEach(fn:any): void
}

class InterceptorsManger {
  constructor(){
    this.handlers = [];
  }

  use(fulfilled, rejected){
    this.handlers.push({fulfilled, rejected});
    return this.handlers.length - 1;
  }

  forEach(fn) {
    this.handlers.forEach(handler => {
      if (handler !== null){
        fn(handler)
      }
    })
  }
}

export default InterceptorsManger


