import React from 'react'
import style from './style/index.module.less'
//导入路由相关的内容
import {NavLink, withRouter, Route, Switch, Redirect} from 'react-router-dom'
//mobx
import {inject, observer} from 'mobx-react'
//导入异步加载组件方法
import asyncComponent from '@/utils/AsyncComponent'
//导入播放器
import Player from '../Player'
import PlayList from '../Player/PlayList'


//异步加载组件, 提高组件的运行效率
const MyPage = asyncComponent(()=> import('../../pages/MyPage/index'))   //我的页面
const FindPage = asyncComponent(() => import('../../pages/FindPage/index'))          //发现页面
const TopListPage = asyncComponent(() => import('../../pages/ToplistPage/index'))     //排行榜列表页面
const SheetPage = asyncComponent(() => import('../../pages/SheetPage/index'))             //歌单详情页面
const SearchPage = asyncComponent(() => import('../../pages/SearchPage/index'))             //搜索页面
const SingerPage = asyncComponent(() => import('../../pages/SingerPage/index'))             //歌手详情页面
const AlbumPage = asyncComponent(() => import('../../pages/AlbumPage/index'))             //专辑页面
const PlayListsPage = asyncComponent(() => import('../../pages/PlayListsPage/index'))             //歌单页面
const ArtistsPage = asyncComponent(() => import('../../pages/ArtistsPage/index'))             //歌手列表页面
const MVPage = asyncComponent(() => import('../../pages/MVPage/index'))             //MV页面
const HistoryPage = asyncComponent(() => import('../../pages/HistoryPage/index'))             //播放历史和喜欢歌曲页面

//注入路由和state
@inject('appStore') @observer @withRouter

//核心框架组件 包含了整个项目的页面调用
class Main extends React.Component {
    //切换侧边栏是否展开  一会再说
  
    render () {
        const {isExpandSider} = this.props.appStore
        return (
            <div className={style.container} style={{transform:`translateX(${isExpandSider ? '80%' : 0})`}}>
                <div className={style.header}>
                    <span className={'icon-weibiaoti12 iconfont'} ></span>
                </div>
                <ul className={style['navigation-menu']}>
                    <li><NavLink to={'/my'} activeClassName={style.active}>我的</NavLink></li>
                    <li><NavLink to={'/find'} activeClassName={style.active}>发现</NavLink></li>
                    <li><NavLink to={'/toplist'} activeClassName={style.active}>排行榜</NavLink></li>
                    <li><NavLink to={'/search'} activeClassName={style.active}>搜索</NavLink></li>
                </ul>
                {/* 定义一些路由 让上面的连接生效 */}
                <div className={style.content}>
                <Switch>
                        <Route path={'/my'} component={MyPage} />
                        <Route path={'/find'} component={FindPage} />
                        <Route path={'/toplist'} component={TopListPage} />
                        <Route path={`/sheet/:id`} component={SheetPage} />
                        <Route path={`/search`} component={SearchPage} />
                        <Route path={`/singer/:id`} component={SingerPage} />
                        <Route path={`/album/:id`} component={AlbumPage} />
                        <Route path={`/playlists`} component={PlayListsPage} />
                        <Route path={`/artists`} component={ArtistsPage} />
                        <Route path={`/mv/:id`} component={MVPage} />
                        <Route path={`/history`} component={HistoryPage} />
                        <Redirect exact from={'/'} to={'/find'} />
                    </Switch>
                </div>
            </div>
        )
    }
}
export default Main