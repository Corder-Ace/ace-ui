type Choices = {
  data: Array<{bid: string, name: string, show: boolean}>;
  head: string;
}
type OtherChoices = {
  title: string,
  choices: Array<any>
}
export type Filters = {
  style?: string;
  title?: string;
  stype?: string;
  choices?: Array<Choices | OtherChoices>;
}
export const defaultQuery = {
  f_cids: [],
  f_condition_levels: []
};
export const tabListDefault = [
    { title: '推荐', tab: 'tab1' },
    { title: '包袋', tab: 'tab2' },
    { title: '配饰', tab: 'tab3' },
    { title: '女装', tab: 'tab4' },
    { title: '女鞋', tab: 'tab5' },
    { title: '男士', tab: 'tab6' }
  ];


export const filtersDefault = {
  brand: [{name: '', children:[]}],
  category: [{name: '', children:[]}],
  condition: [{name: '', children:[]}],
  discount: [{name: '', children:[]}],
  price_range: {available: true},
  size: [{name: '', children:[]}]
};

export const productListDefault = {
  'tab1':{models: [], filters: filtersDefault, bannerList:[], currentScrollTop: 0, page: 1},
  'tab2':{models: [], filters: filtersDefault, bannerList: [], currentScrollTop: 0, page: 1},
  'tab3':{models: [], filters: filtersDefault, bannerList: [], currentScrollTop: 0, page: 1},
  'tab4':{models: [], filters: filtersDefault, bannerList: [], currentScrollTop: 0, page: 1},
  'tab5':{models: [], filters: filtersDefault, bannerList: [], currentScrollTop: 0, page: 1},
  'tab6':{models: [], filters: filtersDefault, bannerList: [], currentScrollTop: 0, page: 1}};

