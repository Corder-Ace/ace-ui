import Taro from 'React';
import AceWebView from '@/hoc/AceWebView';
import {login} from '@/api'

export default class ChangeName extends Taro.Component<any,any>{
    constructor(props) {
        super(props)
        this.state = {
            login: false
        }
    }
    componentWillMount(){
        // login().then(() => {
        //     this.setState({
        //         login: true
        //     })
        // }).catch(() => {
        //     this.setState({
        //         login: true
        //     })
        // });
    }
  render(){
    return (
      login && (<AceWebView webview='/my/change-name' params={this.$router.params} />)
    )
  }
}
