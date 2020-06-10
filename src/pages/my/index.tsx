import React, {useState, useCallback, useEffect, useTabItemTap} from 'React';
import Taro, {useDidShow, useDidHide} from '@tarojs/taro'
import {login, get} from "@/api";
import {ProductList, ScrollTop, Curtain, Modal} from '@/components';
import {View, ScrollView, Text, Image, Swiper, SwiperItem} from "@tarojs/components";
import {debounce, go2Url, isArray, isObject} from '@/utils'
import {track} from "@/utils/sensors";
import {defaultCurrentData} from "./data";
import {Panel, AceProgress, UserHeader, Item} from './components';
import classNames from 'classnames';
import useCountDown from '@/hooks/countDown';
import './index.scss';

const prefixCls = 'plum-my';
const prevPosition = Taro.getStorageSync('@position');

function NewMy() {
  const [userInfo, setUserInfo]: [any, any] = useState({has_blackcard: 0});
  const [guessData, setGuess]: [any, any] = useState({models: [], vfm: '', sid: ''});
  const [currentData, setCurrentData]: [any, any] = useState(defaultCurrentData(prevPosition));
  const [scroll, setScroll]: [any, any] = useState({listTop: 0, currentScrollTop: 0});
  const [scrollTop, setScrollTop] = useState(0);
  const [position, setPosition]: ['seller' | 'buy', any] = useState(prevPosition || 'buy');
  const [newUserData, setNewUserData]: [any, any] = useState({}); //返现悬浮
  const [modalConfig, setConfig]: [any, any] = useState({});
  const onScroll = debounce(onScrollHandler);
  const togglePosition = useCallback(() => {
    const nextPosition = position === 'buy' ? 'seller' : 'buy';
    setPosition(nextPosition);
  }, [position]);

  useEffect(() => {
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: position === 'buy' ? '#FF694E' : '#FF8C3C'
    });

    Taro.setStorageSync('@position', position);
  }, [position]);

  useDidShow(() => {
    // login().then(() => {
    //   getMyPageData(true);
    //   setNewUserReturn();
    //   getModalConfig();
    // }).catch(() => {
    //   getModalConfig();
    //   getMyPageData(true);
    // });
  });

  useDidHide(() => {
    if (newUserData.count_down) {
      setNewUserData({
        count_down: 0
      })
    }
  });

  useTabItemTap(() => {
    track('IndexBottomTabClick', {track_id: 'tab5'});
  });

  function getModalConfig(): void {
    get<any>('/my/tip')
      .then(res => {
        if (!res.data){
          res.data = {visible: false};
        } else {
          res.data.visible = true;
        }

        setConfig(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function toggleModalVisible(visible: boolean): void {
    setConfig(prevState => {
      prevState.visible = visible;
      return {...prevState};
    })
  }

  function modalBtnHandler(action: any) {
    if (action.action === 'goto'){
      go2Url(action.url);
    } else {
      toggleModalVisible(false);
    }
  }

  function getMyPageData(isShow?: boolean) {
    get<any>('/my/page-infos-v3', {client: 'miniapp'})
      .then(res => {
        const {user, buyer, seller} = res.data;
        seller.tohandle.item = seller.tohandle.item.pop();
        if (seller.tohandle.item && isArray(seller.tohandle.item.buttons)){
          seller.tohandle.item.buttons.reverse()
        }
        if (isArray(seller.banner) && seller.banner.length && seller.banner[0].type !== 'pic'){
          seller.backCash = seller.banner.pop();
        }
        setUserInfo(user || {});
        setCurrentData({
          buyer,
          seller,
        });
        if (isShow) {
          getGuessData(user.guess_you_like);
        }
      })
  }

  function getGuessData(url) {
    get<any>(url)
      .then(res => {
        setGuess({
          models: res.data.models,
          vfm: res.data.vfm,
          sid: res.data.sid
        })
      })
  }

  function setNewUserReturn(): void {
    const myDate = new Date();
    const nowDate = myDate.getMonth() + '-' + myDate.getDate();
    if ( Taro.getStorageSync('newUserReturn_my') !== nowDate ) {
      Taro.setStorageSync('newUserReturn_my', nowDate);
      getNewUserData();
    }
  }

  function getNewUserData(): void {
    get<any>('/util/new-user-return'
    ).then(res => {
      if (res.ret_code === '200') {
        setNewUserData({
          received: res.data.received,
          count_down: res.data.count_down,
          target_url: res.data.target_url
        })
      }
    });
  }

  function onScrollHandler(e): void {
    const query = Taro.createSelectorQuery();
    query.select(`#page-my-list`).boundingClientRect();
    query.exec((res) => {
      let listTop = 0;
      let listData = res[0];

      if (isObject(listData) && listData.top) {
        listTop = listData.top;
      }

      setScroll({
        currentScrollTop: e.detail.scrollTop,
        listTop
      });
    });
  }

  function goScrollTop(): void {
    setScrollTop(prevScroll => prevScroll === 0 ? -1 : 0)
  }

  function goToUrl(url): void {
    Taro.navigateTo({url});
  }

  const timeData = useCountDown(newUserData.count_down).time;
  const data = position === 'buy' ? currentData.buyer : currentData.seller;
  const redCardText = (<View className={`${prefixCls}-red-card-desc`}>
    {data.redcard.content.text.map(item => data.redcard.content[item] ? (
      <Text key={item} className={`${prefixCls}-dinot`}>{data.redcard.content[item]}</Text>) : item)}
  </View>);

  return (
    <ScrollView
      scrollY
      scrollTop={scrollTop}
      style={{height: '100vh', backgroundColor: '#F7F7F7'}}
      onScroll={onScroll}
    >
      <View className={classNames(`${prefixCls}`, `${prefixCls}-wrapper`)}>
        <UserHeader userInfo={userInfo} position={position} onTogglePosition={togglePosition} vip={userInfo.has_blackcard} />
        <View className={`${prefixCls}-main`}>
          {position === 'buy' && <View className={classNames(`${prefixCls}-user-detail`)}>
            {data.account.map(item => (
              <View key={item.name} className={`${prefixCls}-user-detail-item`} onClick={() => goToUrl(item.link)}>
                <View className={`${prefixCls}-user-detail-item-num`}>
                  <View>{item.num}</View>{item.to_get_msg && <View className={`${prefixCls}-user-detail-item-text`}>
                  {item.to_get_msg}</View>}{item.icon_show && <View className={classNames(`${prefixCls}-user-detail-item-dot`, {[`${prefixCls}-user-detail-item-voucher`]: item.to_get_msg})} />}
                  {item.icon_img && <View className={classNames(`${prefixCls}-user-detail-item-dot`)} style={{backgroundImage:`url(${item.icon_img})`}} />}
                </View>
                <Text className={`${prefixCls}-user-detail-item-name`}>{item.name}</Text>
              </View>))}
          </View>}
          {position === 'seller' && <View className={classNames(`${prefixCls}-user-detail`)}>
            {data.account.map(item => (
              <View key={item.name} className={`${prefixCls}-user-detail-item`} onClick={() => goToUrl(item.link)}>
                <View className={`${prefixCls}-user-detail-item-num`}>
                  <View>{item.num}</View>
                  {item.to_get_msg && <View className={`${prefixCls}-user-detail-item-text`}>{item.to_get_msg}</View>}
                  {item.icon_img && <View className={classNames(`${prefixCls}-user-detail-item-dot`)} style={{backgroundImage:`url(${item.icon_img})`}} />}
                </View>
                <Text className={`${prefixCls}-user-detail-item-name`}>{item.name}</Text>
              </View>))}
          </View>}
          {position === 'seller' && <View className={`${prefixCls}-seller-line`} />}
          {position === 'buy' && <View className={`${prefixCls}-red-card`} onClick={() => goToUrl(data.redcard.link)}>
            <View className={`${prefixCls}-red-card-bg`}>
              {redCardText}
              {(data.redcard.renew_blackcard || !userInfo.has_blackcard) && <View
                className={`${prefixCls}-red-card-btn`}
              >{data.redcard.renew_blackcard ? '立即续费' : userInfo.has_blackcard ? '' : '立即开通'}</View>}
            </View>
          </View>}
          {position === 'buy' && <Panel
            title='我的订单'
            subtitle={data.order.extend.title}
            onSubTitleClick={() => goToUrl(data.order.extend.link)}
            customStyle={{marginBottom: '48rpx'}}
          >
            <View className={`${prefixCls}-seller-products`}>
              {data.order.item.map(item => <View key={item.name} className={`${prefixCls}-item-auto`}><Item
                name={item.name} img={item.img} num={item.num} link={item.link} icon={item.icon_img}
              /></View>)}
            </View>
          </Panel>}
          {position === 'seller' && <Panel
            title='我的商品'
            subtitle={data.product.extend.title}
            onSubTitleClick={() => goToUrl(data.product.extend.link)}
            customStyle={{marginBottom: '48rpx'}}
          >
            <View className={`${prefixCls}-seller-products`}>
              {data.product.item.map(item => <View key={item.name} className={`${prefixCls}-item-auto`}><Item
                name={item.name} img={item.img} num={item.num} link={item.link} icon={item.icon_img}
              /></View>)}
            </View>
          </Panel>}
          {position === 'seller' && data.backCash &&
          <View className={`${prefixCls}-back-cash-wrap`} onClick={() => goToUrl(data.backCash.target_link)}>
            <View className={`${prefixCls}-back-cash`}>
              <View className={`${prefixCls}-back-cash-content`}>
                <View className={`${prefixCls}-back-cash-info`}>{data.backCash.text_1}<Text
                  className={classNames(`${prefixCls}-back-cash-num`, `${prefixCls}-dinot`)}
                >{data.backCash.text_2}</Text>{data.backCash.text_3}<Text
                  className={classNames(`${prefixCls}-back-cash-num`, `${prefixCls}-dinot`)}
                >{data.backCash.text_4}</Text></View>
                <View className={`${prefixCls}-back-cash-detail`}>
                  <AceProgress currentValue={data.backCash.num_1} totalValue={data.backCash.num_2} />
                </View>
              </View>
              <View className={`${prefixCls}-back-cash-btn`}>立即查看</View>
            </View>
          </View>}
          {position === 'seller' && data.banner.length && (<Swiper className={`${prefixCls}-banner`} autoplay>
            {data.banner.map(item => (
              <SwiperItem key={item.img}>
                <View className={`${prefixCls}-banner-item`} style={{backgroundImage: `url(${item.img})`}} onClick={() => goToUrl(item.link)} />
              </SwiperItem>
            ))}
          </Swiper>)}
          {position === 'seller' && data.tohandle.item &&
          <Panel
            title={`待处理商品(${data.tohandle.extend.num})`}
            subtitle='查看待处理商品'
            onSubTitleClick={() => goToUrl(data.tohandle.extend.link)}
            customStyle={{marginBottom: '44rpx'}}
          >
            <View className={`${prefixCls}-seller-product-wrap`}>
              <View className={`${prefixCls}-seller-product`}
                onClick={() => goToUrl(data.tohandle.item.product_link)}
              >
                <View className={`${prefixCls}-seller-product-header`}>
                  <Text className={`${prefixCls}-seller-product-tips`}>{data.tohandle.item.status_desc}</Text>
                  <Text className={`${prefixCls}-seller-product-title`}>{data.tohandle.item.status_cn}</Text>
                </View>
                <View className={`${prefixCls}-seller-product-content`}>
                  <View className={`${prefixCls}-seller-product-img`}
                    style={{backgroundImage: `url(${data.tohandle.item.photo_url})`}}
                  />
                  <View className={`${prefixCls}-seller-product-info`}>
                    <Text className={`${prefixCls}-seller-product-brand`}>{data.tohandle.item.name}</Text>
                    {(data.tohandle.item.view_count || data.tohandle.item.onsale_days || data.tohandle.item.cooperate_type_text) && <View className={`${prefixCls}-seller-product-browse`}>
                      {data.tohandle.item.view_count && <Text className={`${prefixCls}-seller-product-browse-text`}>浏览 <Text className={`${prefixCls}-seller-product-bold`}>{data.tohandle.item.view_count}</Text>次</Text>}
                      {data.tohandle.item.onsale_days && <Text className={`${prefixCls}-seller-product-browse-text`}>上架 <Text className={`${prefixCls}-seller-product-bold`}>{data.tohandle.item.onsale_days}</Text>天</Text>}
                      {data.tohandle.item.cooperate_type_text && <Text>{data.tohandle.item.cooperate_type_text}</Text>}
                    </View>}
                  </View>
                </View>
                {data.tohandle.item.pop_txt && <View className={`${prefixCls}-seller-product-bubble`}>{data.tohandle.item.pop_txt}</View>}
                {data.tohandle.item.tip_txt && <View className={`${prefixCls}-seller-product-interval`}>{data.tohandle.item.tip_txt}<Text className={`${prefixCls}-seller-product-bold`}>{data.tohandle.item.price_txt}</Text></View>}
                {position === 'seller' && data.tohandle.item && isArray(data.tohandle.item.buttons) && data.tohandle.item.buttons.length && (
                  <View className={`${prefixCls}-seller-product-btns`}>
                    {data.tohandle.item.buttons.map(btn => (
                      <View className={`${prefixCls}-seller-product-btn`} key={btn.button_name} onClick={(e) => {e.stopPropagation();goToUrl(btn.button_link)}}>{btn.button_name}</View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </Panel>}
          {position === 'buy' && data.banner.length && (<Swiper className={`${prefixCls}-banner`} autoplay>
            {data.banner.map(item => (
              <SwiperItem key={item.img}>
                <View className={`${prefixCls}-banner-item`} style={{backgroundImage: `url(${item.img})`}}
                  onClick={() => goToUrl(item.link)}
                />
              </SwiperItem>
            ))}
          </Swiper>)}
          <Panel title='工具与服务'>
            <View className={`${prefixCls}-service-wrap`}>
              {data.service.map(item => <View key={item.name} className={`${prefixCls}-item-service`}><Item
                name={item.name} img={item.img} num={item.num} icon={item.icon_img} link={item.link}
              /></View>)}
            </View>
          </Panel>
        </View>
      </View>
      {position === 'buy' && <View id='page-my-list'>
        <Image className={`${prefixCls}-guess-like`} src='https://imgbsy.aplum.com/o_1duhridll12p1o3f4jh12vi1tjjo.png'
          mode='widthFix'
        />
        <ProductList models={guessData.models} vfm={guessData.vfm} sid={guessData.sid} tips='没有更多商品了' />
      </View>}
      {newUserData.count_down && <View className='popup-count-down' onClick={() => Taro.navigateTo({url: newUserData.target_url})}>
        <View className='count-down'>
          {`${timeData.hours < 10 ? `0${timeData.hours}` : timeData.hours}:${timeData.minutes < 10 ? `0${timeData.minutes}` : timeData.minutes}:${timeData.seconds < 10 ? `0${timeData.seconds}` : timeData.seconds}`}
        </View>
        <Image src='https://imgbsy.aplum.com/o_1e1r3ho0m1ra7142ruluq0d16m0o.gif' />
      </View>}
      <ScrollTop goScrollTop={goScrollTop} listTop={scroll.listTop} currentScrollTop={scroll.currentScrollTop} />
      {modalConfig.pop_type === '1' && <Curtain
        isOpened={modalConfig.visible}
        closeBtnPosition='top-right'
        onClose={() => toggleModalVisible(false)}
        maskable
      >
        <Image
          mode='widthFix'
          onClick={() => go2Url(modalConfig.url)}
          className='seller-curtain-bg'
          src={modalConfig.img}
        />
      </Curtain>}
      {modalConfig.pop_type === '2' && <Modal
        visible={modalConfig.visible}
        title={modalConfig.title}
        desc={modalConfig.contents}
        btnLeft={modalConfig.buttons.length === 2}
        btnRight={modalConfig.buttons.length >= 1}
        leftText={modalConfig.buttons.length && modalConfig.buttons[0].txt}
        rightText={modalConfig.buttons.length && (modalConfig.buttons.length === 1 ? modalConfig.buttons[0].txt : modalConfig.buttons[1].txt)}
        onBtnLeft={() => modalBtnHandler(modalConfig.buttons[0])}
        onBtnRight={() => modalBtnHandler(modalConfig.buttons.length === 1 ? modalConfig.buttons[0] : modalConfig.buttons[1])}
      />}
    </ScrollView>
  )
}

NewMy.config = {
  navigationBarTitleText: '我的',
  navigationBarBackgroundColor: '#FF694E',
  navigationBarTextStyle: 'white',
  backgroundColorTop: "#FF694E",
  backgroundColor: "#FF694E",
  backgroundColorBottom: "#F7F7F7",
};

export default NewMy
