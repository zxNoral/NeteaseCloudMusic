import React from 'react'
import style from './style/index.module.less'
import {inject, observer} from 'mobx-react'
import {Switch} from 'antd-mobile'

//使用@inject向组件中注入状态
//使用@observer 让组件响应状态
@inject('appStore') @observer
//侧边栏组件

class Sider extends React.Component {
    state = {
        checked : false
    }
    render () {
        const {isExpandSider} = this.props.appStore
        return (
            <div className={style.container}>
                <div className={style.header}>
                    <div>
                        <img src={require('./img/01.jpg')} alt="头像"/>
                        我是游客
                    </div>
                </div>
                <div className={style.contenr}>
                    <div className={style.section}>
                        <div className={`
                            ${style.title} 
                            ${style['fade-init']}
                            ${isExpandSider ? style['fade'] : ''}
                        `}>功能</div>
                        <ul className={`
                            ${isExpandSider ? style['side-up'] : ''}
                        `}>
                            <li>
                                <div className={'iconfont icon-ziyuanldpi'} 
                                    style={{fontsize:16}}
                                ></div>
                                <div>均衡器</div>
                            </li>
                            <li>
                                <div className={'iconfont icon-pifu'} 
                                ></div>
                                <div>个性装扮</div>
                            </li>
                            <li>
                                <div className={'iconfont icon-saoyisao'} 
                                ></div>
                                <div>扫一扫</div>
                            </li>
                            <li>
                                <div className={'iconfont icon-naozhong2'} 
                                ></div>
                                <div>音乐闹钟</div>
                            </li>
                            <li>
                                <div className={'iconfont icon-94'} 
                                ></div>
                                <div>游戏推荐</div>
                            </li>
                            <li>
                                <div className={'iconfont icon-lishibisai'} 
                                ></div>
                                <div>定时关闭播放</div>
                                <div>
                                    <Switch  checked={this.state.checked}
                                        onChange={()=>{this.setState({checked:!this.state.checked})}}
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={style.section}>
                    <div className={`
                            ${style.title} 
                            ${style['fade-init']}
                            ${isExpandSider ? style['fade'] : ''}
                        `}>通用</div>
                    <ul className={`
                        ${isExpandSider ? style['side-up'] : ''}
                    `}>
                        <li>
                            <div className={'iconfont icon-guanyuwomen1'}></div>
                            <div>关于</div>
                        </li>
                        <li>
                            <div className={'iconfont icon-fankui'}></div>
                            <div>帮助与反馈</div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        )
    }
    
}

//导出组件
export default Sider