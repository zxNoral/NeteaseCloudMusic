import React, {Component} from 'react'
import './App.css'
import SiderMenu from './home/SiderMenu'
import Main from './home/Main'
//导入icon字体图标样式
import './assets/iconfont/style.css'

//定义核心的组件
class App extends Component {
    render () {
        return (
            <div style={styles.container}>
                {/*调用侧边栏和主体部分组件 */}
                <SiderMenu />
                <Main />
            </div>
        )
    }
}

const styles = {
    container: {
        width:'100vw',
        height:'100vh',
        overflow:'hidden'
    }
}

export default App