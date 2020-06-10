const common = {
  account: [],
  service: [],
  banner: [],
};

export const defaultCurrentData = (prevPosition) => ({
  buyer: {
    ...common,
    order: {item: [], extend: {title: prevPosition === 'buy' ? '查看全部订单' : '查看全部商品', url: ''}},
    redcard: {
      content: {text: [], discount: '', value: ''},
      discount: '',
      text: ["专享", "discount", "折 送", "value", "直减券"],
      value: '',
      link: ''
    },
  },
  seller: {
    ...common,
    product: {item: [], extend: {title: prevPosition === 'buy' ? '查看全部订单' : '查看全部商品', url: ''}},
    backCash: {num_1: 0, num_2: 5000, text_1: '再卖', text_2: '', text_3: '可返', text_4: ''},
    tohandle: {extend: {title: '查看待处理商品', url: '', num: 0}, item: undefined},
  }
});
