import Taro, {useState, useEffect} from 'React';
import classNames from 'classnames';
import {Text, View} from "@tarojs/components";
import {CSSProperties} from "react";
import './index.scss';

interface ProgressProps {
  outerStyle?: CSSProperties;
  innerStyle?: CSSProperties;
  currentValue: number;
  totalValue: number;
}
const prefixCls = 'plum-progress';

function AceProgress({outerStyle, innerStyle, currentValue, totalValue}: ProgressProps) {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent((currentValue / totalValue) * 100)
  }, [currentValue, totalValue]);
  const _innerStyle = innerStyle ? innerStyle : {};
  _innerStyle.width = `${percent}%`;
  return (
    <View className={`${prefixCls}-container`}>
      <View className={classNames(`${prefixCls}`)}>
        <View className={`${prefixCls}-outer`} style={outerStyle}>
          <View className={`${prefixCls}-inner`} style={_innerStyle} />
        </View>
      </View>
      <View className={`${prefixCls}-score`}>
        <Text>{currentValue}</Text>
        <Text className={`${prefixCls}-score-total`}>/{totalValue}</Text>
      </View>
    </View>
  )
}

AceProgress.defaultProps = {
  outerStyle: {},
  innerStyle: {},
  currentValue: 0,
  totalValue: 0,
};
export default Taro.memo(AceProgress);
