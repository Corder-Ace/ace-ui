import Taro from 'React';
import {View, Text, Image} from "@tarojs/components";
import {normalizeTime} from "@/utils";
import useCountDown from "@/hooks/countDown";
import classNames from 'classnames';
import './index.scss';

type Options = {
  text: any,
  number: any
}
type Configs = {
  deadline: string;
  number_color: string;
  number_size: string;
  text_color: string;
  text_size: string;
}

interface CountDownProps {
  componentStyle: string;
  millisecond?: boolean;
  time?: number;
  format?: string;
  autoStart?: boolean;
  options: Options;
  words: Array<any>;
  time_left?: number;
  margin_top?: string;
  configs?: Configs;
  onReload?: () => void;
}

function CountDown(props: CountDownProps) {
  const {options, words, margin_top, componentStyle, time_left} = props;
  const timeData = useCountDown(time_left, props.onReload).time;
  const textStyle = {color: options.text.color, fontSize: options.text.size};
  const numberStyle: { color: any, fontSize: any, backgroundImage?: any } = {
    color: options.number.color,
    fontSize: options.number.size
  };

  if (options.number.background) {
    numberStyle.backgroundImage = `url(${options.number.background})`;
  }
  let timeText: any = null;

  if (componentStyle === 'countdown') {
    timeText = words.map(item =>
      item === 'H' ? (<View key='H'><Text
        className='page-count-down-number'
        style={{...numberStyle, marginRight: '4px'}}
      >{Math.floor(timeData.hours / 10)}</Text><Text
        className='page-count-down-number'
        style={numberStyle}
      >{timeData.hours % 10}</Text></View>) :
        item === 'M' ? (<View key='M'><Text
          className='page-count-down-number'
          style={{...numberStyle, marginRight: '4px'}}
        >{Math.floor(timeData.minutes / 10)}</Text><Text
          className='page-count-down-number'
          style={numberStyle}
        >{timeData.minutes % 10}</Text></View>) :
          item === 'S' ? (<View key='S'><Text
            className='page-count-down-number'
            style={{...numberStyle, marginRight:'4px', backgroundImage: `url(${options.number.sec_bkg})`}}
          >{Math.floor(timeData.seconds / 10)}</Text><Text
            className='page-count-down-number'
            style={{...numberStyle, backgroundImage: `url(${options.number.sec_bkg})`}}
          >{timeData.seconds % 10}</Text></View>) :
            (<View className='page-count-down-text' style={textStyle} key={item}>{item}</View>)
    )
  } else {
    timeText = words.map((item) =>
      item === 'H' ? (<View className='page-count-down-bg' key='H' style={{
          ...numberStyle,
          color: '#fff',
          height: '44rpx',
          marginLeft: '16rpx',
        }}
      >{normalizeTime(timeData.hours)}</View>) :
        item === 'M' ? (<View className='page-count-down-bg' key='M' style={{
            ...numberStyle,
            color: '#fff',
            height: '44rpx'
          }}
        >{normalizeTime(timeData.minutes)}</View>) :
          item === 'S' ? (<View className='page-count-down-bg' key='S' style={{
              ...numberStyle,
              color: '#fff',
              height: '44rpx',
              backgroundImage: `url(${options.number.sec_bkg})`
            }}
          >{normalizeTime(timeData.seconds)}</View>) :
            item === ':' ? (<View className='page-count-down-dian' style={{...textStyle, fontSize: '28rpx'}}>{item}</View>) :
              <Text style={{...textStyle, fontSize: '24rpx'}} className='page-count-down-word'>{item}</Text>);
  }
  const timeNode = (<View className={classNames('page-count-down-content',{'flex-end': componentStyle === 'countdown2'})} style={textStyle}>{timeText}</View>);
  if (!time_left) return null;
  if (componentStyle === 'countdown') {
    return (
      <View className='page-count-down page-count-down-two' style={{marginTop: margin_top}}>
        <Image className='page-count-down-img' mode='widthFix' src={options.text.background} />
        {timeNode}
      </View>
    )
  }
  return (
    <View className='page-count-down' style={{marginTop: margin_top}}>
      <Image className='page-count-down-img' mode='widthFix' src={options.text.background} />
      {timeNode}
    </View>
  )
}

CountDown.defaultProps = {
  componentStyle: '',
  millisecond: false,
  time: 0,
  format: 'HH:mm:ss',
  autoStart: true,
  options: {text: {color: ''}, number: {color: ''}},
  words: [],
  time_left: 0,
  margin_top: '',
  configs: {
    deadline: '',
    number_color: '',
    number_size: '',
    text_color: '',
    text_size: '',
  },
  onReload: () => {}
};

export default CountDown;
