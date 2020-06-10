import Taro from 'React';
import {View, Image} from '@tarojs/components';
import classNames from 'classnames';
import './index.scss';

const prefixCls = 'plum-my-header';

interface UserHeaderProps {
  userInfo: {
    name: string;
    head: string;
    help_link: string;
    link: string;
  },
  vip?: boolean;
  position: string;
  onTogglePosition: () => void;
}

function UserHeader(props: UserHeaderProps) {
  const {position, userInfo, onTogglePosition} = props;
  const avatarUrl = userInfo && userInfo.head || 'https://imgbsy.aplum.com/o_1duhgf4hu10js1hgn1l081709377o.png';

  function goToUrl(url) {
    Taro.navigateTo({url});
  }
  return (
    <View
      onClick={() => goToUrl(userInfo.link)}
      className={classNames(`${prefixCls}`, `${prefixCls}-wrapper`, {
        [`${prefixCls}-seller-bg`]: position === 'seller',
        [`${prefixCls}-seller-vip`]: position === 'seller' && props.vip,
        [`${prefixCls}-buy-bg`]: position === 'buy',
        [`${prefixCls}-buy-vip`]: position === 'buy' && props.vip
      })}
    >
      <View className={`${prefixCls}-main`}>
        <View className={`${prefixCls}-info`}>
          <View className={`${prefixCls}-avatar`} style={{backgroundImage: `url(${avatarUrl})`}}>
            {props.vip && <Image className={`${prefixCls}-avatar-vip`} src='https://imgbsy.aplum.com/o_1dumuplgq1vu131710us1uco156ho.png' />}
          </View>
          <View className={`${prefixCls}-info-detail`}>
            <View className={`${prefixCls}-info-name`}>{userInfo.name || '点击登录'}</View>
            <View className={classNames(`${prefixCls}-info-position`, {
              [`${prefixCls}-info-buyer`]: position === 'buy',
              [`${prefixCls}-info-seller`]: position === 'seller'
            })}
            />
          </View>
        </View>
        <View>
          <View className={`${prefixCls}-icons`}>
            <View onClick={(e) => {e.stopPropagation();goToUrl('../my/edit')}}><AtIcon className={`${prefixCls}-icon`} prefixClass='icon' value='wode-shezhi' size={24} color='#fff' customStyle={{marginRight: '42rpx'}} /></View>
            <View onClick={(e) => {e.stopPropagation();goToUrl(userInfo.help_link)}}><AtIcon className={`${prefixCls}-icon`} prefixClass='icon' value='kefu' size={22} color='#fff' /></View>
          </View>
          <View className={`${prefixCls}-switch`} onClick={(e) => {e.stopPropagation();onTogglePosition();}}>{position === 'buy' ? '切换成卖家' : '切换成买家'}</View>
        </View>
      </View>
    </View>
  )
}

UserHeader.defaultProps = {
  userInfo: {
    name: '',
    head: '',
    help_link: '/help/index',
    link: '/my/edit',
  },
  vip: false,
  position: 'buy',
  onTogglePosition: () => {
  }
};
export default Taro.memo(UserHeader)
