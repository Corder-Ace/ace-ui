import Taro from 'React';
import {View, Image, Text} from "@tarojs/components";
import classNames from 'classnames';
import './index.scss';

const prefixCls = 'product-card';
interface ProductCardProps {
  img: string;
  brand: string;
  price: string | number;
  through: string | number;
  sale?: string | number;
}
export default function ProductCard(props: ProductCardProps) {
  return (
    <View className={classNames(`${prefixCls}`, `${prefixCls}-column`)}>
      {props.sale !== undefined && <View className={`${prefixCls}-sale-wrap`}>
        {props.sale && <Image className={`${prefixCls}-sale-img`} src='https://imgbsy.aplum.com/o_1e7n9r02jlq01d6r9o2beh1m6so.png' />}
        {props.sale && <Text className={`${prefixCls}-sale-text`}>￥{props.sale}</Text>}
      </View>}
      <Image className={`${prefixCls}-img`} src={props.img} />
      <View className={`${prefixCls}-brand`}>{props.brand}</View>
      <View className={`${prefixCls}-price-wrap`}>
        <Text className={`${prefixCls}-price`}>¥{props.price}</Text>
        <Text className={`${prefixCls}-price-through`}>¥{props.through}</Text>
      </View>
    </View>
  )
}
