import Taro from 'React';
import { login } from "@/api/index";

function loginDecorate(){
  return function WrappedComponent(Component){
    class WithLogin extends Component {
      componentDidMount(){
        login()
          .then(() => {
            super.componentDidMount && super.componentDidMount();
        })
          .catch(() => Taro.navigateTo({url:'/pages/user/authorize'}))
      }
      componentDidShow(){
        super.componentDidShow && super.componentDidShow();
      }
      componentDidHide(){
        super.componentDidHide && super.componentDidHide();
      }
      componentWillUnmount(){
        super.componentWillUnmount && super.componentWillUnmount();
      }
      render(){
        return super.render()
      }
    }
    return WithLogin;
  }
}

export default loginDecorate;
