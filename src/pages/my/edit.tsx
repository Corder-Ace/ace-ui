import Taro from 'React';
import AceWebView from '@/hoc/AceWebView';

export default class Edit extends Taro.Component<any,any>{
  render(){
    return (
      <AceWebView webview='/my/edit' params={this.$router.params} />
    )
  }
}
