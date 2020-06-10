import React from 'React';
import { View, Image } from '@tarojs/components';
import {go2Url} from "@/utils";
import './index.scss';

type Configs = {
  links?: Array<any>
}

interface BannerProps {
  componentId?: number;
  img_url: string;
  target_url?: string;
  data_url?: string;
  links: string[];
  margin_top?: string;
  isLive?: boolean;
  text?: string;
  hrefs: Array<any>;
  configs?: Configs;
  prefixCls?: string;
  onShowNewDraw?: () => void;
}

function Banner(props: BannerProps) {
  const { margin_top, img_url, links, hrefs, prefixCls } = props;
  return(
    <View className={`${prefixCls} ${prefixCls}-horizontal`} style={{marginTop: margin_top}}>
      {img_url && <Image className={`${prefixCls}-img`} mode='widthFix' lazy-load src={img_url}  />}
      {links && links.length && (<View className='links-wrap'>
        {hrefs && hrefs.length && hrefs.map((link) => (
          <View key={link.href} style={{width: link.width}} className='grid' onClick={() => go2Url(link.href)} />
        ))}
        {links && links.length && hrefs && !hrefs.length && links.map((link) => (
          <View key={link} style={{width: `${(1 / links.length) * 100}%`}} className='grid' onClick={() => go2Url(link)} />
        ))}
      </View>)}
    </View>
  )
}

Banner.defaultProps = {
  img_url: '',
  links: [],
  hrefs: [],
  prefixCls: 'page-banner',
  isLive: false,
  onShowNewDraw: () => {},
};

export default Banner;
