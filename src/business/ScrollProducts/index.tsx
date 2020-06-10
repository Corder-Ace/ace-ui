import Taro, {useState, useEffect} from 'React';
import {View,ScrollView,Image,Text} from '@tarojs/components';
import {get} from '@/api';
import {go2Url} from "@/utils";
import classNames from 'classnames';
import './index.scss';

const prefixCls = 'scroll-product';
function ScrollProducts(props: any) {
  const [products, setProducts]:[any[], any] = useState([]);
  useEffect(() => {
    function getProducts() {
      get<any>(props.url)
        .then(res => {
          setProducts(res.data.models || []);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getProducts();
  }, []);

  return (
    <ScrollView
      scrollX
      style={{width: '100%'}}
      className={`${prefixCls}-wrap`}
    >
      {products.map(item => (
        <View className={`${prefixCls}-item`} key={item.id} onClick={() => go2Url(item.target_url)}>
          <Image src={item.photo_url} className={`${prefixCls}-item-img`} />
          <View className={`${prefixCls}-item-brand`}>{item.brand_name}</View>
          <View className={`${prefixCls}-item-price`}>¥{item.discount_price}<Text className={`${prefixCls}-item-sale`}>¥{item.sale_price}</Text></View>
        </View>
      ))}
      <View className={classNames(`${prefixCls}-item`, `${prefixCls}-more`)} onClick={() => go2Url(props.target)}>
        <Image className={`${prefixCls}-item-more`} src='https://imgbsy.aplum.com/o_1d5bfkkctc2215qp13hbc81iidj.png' />
      </View>
    </ScrollView>
  )
}

ScrollProducts.defaultProps = {
  url: '',
  target: ''
};

export default ScrollProducts;
