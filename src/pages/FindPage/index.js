import React from 'react'
import {get} from '@/utils/ajax'
import style from './style/index.module.less'
import {Carousel} from 'antd-mobile'
import image from './img/1.png'
import {Link,withRouter} from 'react-router-dom'
import Scroll from '@/components/Scroll'
import {formatNumber} from '@/utils/util'

//可以在组件中 通过this.props的方式调用路由中的组件内容，location history等等
@withRouter
class Index extends React.Component{
    state = {
        banners:[{imageUrl:image}], //给一个初始值，避免在数据返回之前为空数组
        hotSingerList:[],  //热门歌手列表
        recommendList:[],  //推荐歌单
        highqualityList:[], //精品歌单
    }
    //生命周期函数 组件挂载完成后 就执行initPage方法初始化页面
    componentDidMount(){
        this.initPage()
    }
    //留给我们自己扩展的 目前什么都没干
    componentWillUnmount(){
        this.setState = ()=>{
            return;
        };
    }
    //初始化函数
    initPage = ()=>{
        //异步处理
        //all方法 用来并行处理异步操作
        Promise.all([
            this.getBanners(),    //获取轮播图
            this.getHotSingers(), //获取热门歌手
            this.getRecommends(), //获取推荐歌单
            this.getHighqualitys() //获取精品歌单
        ])
    }
    //以下方法都是通过 api接口请求的数据
    getBanners = async ()=>{
        //await 等待请求返回将结果 返回给res
        const res = await get('/banner')
        //下面的代码 等待上面代码完成后 才会执行
        this.setState({
            banners:res.banners || [{imageUrl:image}]
        })
    }
    //请求热门歌手，从0开始取8条数据
    getHotSingers = async ()=>{
        const res = await get('/top/artists?offset=0&limit=8')
        //console.log(res);
        this.setState({
            hotSingerList:res.artists || []
        })
    }
    //请求推荐歌单
    getRecommends = async ()=>{
        const res = await get('/personalized')
        //请求到了30条数据
        console.log(res);
        const list = res.result || []
        this.setState({
            //从30条数据中截取了6条 保存在recommendList
            recommendList:list.slice(0,6)
        })
    }
    //请求6条数据
    getHighqualitys = async ()=>{
        const res = await get('/top/playlist/highquality?limit=6')
        //console.log(res);
        this.setState({
            highqualityList:res.playlists || []
        })
    }


    render(){
        const {banners,hotSingerList,recommendList,highqualityList} = this.state

        const menu = [
            {
                title:'热门歌手',
                icon:'icon-remen1',
                url:'/artists',
                color:'#dd4330'
            },
            {
                title:'每日推荐',
                icon:'icon-PCbofangye_paihangbang',
                url:'/playlists',
                color:'orange'
            },
            {
                title:'歌单',
                icon:'icon-liebiao1',
                url:'/playlists',
                color:'#16c2c2',
            },
        ]

        return(
           <div className={style.container}>
               {/*使用scroll组件 来使可以滚动*/}
               <Scroll>
                   <div>
                       {/* 轮播图 */}
                       <div className={style['banners-box']}>
                           {/*使用轮播图组件 */}
                            <Carousel infinite autoplay>
                                {/*遍历轮播图内容 */}
                                { banners && banners.map(item => <img key={item.imageUrl} src={item.imageUrl}/>) }
                            </Carousel>
                       </div>
                        {/* 热门歌手 每日推荐 精品歌单 */}
                        <div className={style.menu}>
                            {menu.map(
                                item => <div key={item.title}>
                                    <Link to={item.url}>
                                        <div className={`iconfont ${style.icon} ${item.icon}`} style={{color:item.color}}></div>
                                        <div>{item.title}</div>
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* 热门歌手 */}
                        <div className={style['hot-singer-box']}>
                            <div className={style['title-box']}>
                                <div>热门歌手</div>
                                <Link to={'./artists'}>查看全部</Link>
                            </div>
                            <ul>
                                {hotSingerList && hotSingerList.map(
                                    singer => <li key={singer.id}>
                                        <Link to={`/singer/${singer.id}`} className={style['singer-box']}>
                                            <img src={singer.img1v1Url} alt=""/>
                                        </Link>
                                    </li> 
                                )}
                            </ul>
                        </div>
                        {/*每日推荐 */}
                        <div className={style['recommend-box']}>
                            <div>
                                每日推荐
                                <span className={'iconfont icon-iconfontjiantou5'}></span>
                            </div>
                            <ul>
                                {highqualityList && highqualityList.map(
                                    sheet => <li key={sheet.id}>
                                        <Link to={`/sheet/${sheet.id}`} className={style['sheet-box']}>
                                            <img src={sheet.coverImgUrl} alt=""/>
                                            <div>{sheet.name}</div>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        {/* 精品歌单 */}
                        <div className={style['recommend-box']}>
                        <div>
                                精品歌单
                                <span className={'iconfont icon-iconfontjiantou5'}></span>
                            </div>
                            <ul>
                                {recommendList && recommendList.map(
                                    sheet => <li key={sheet.id}>
                                        <Link to={`/sheet/${sheet.id}`} className={style['sheet-box']}>
                                            <img src={sheet.picUrl} alt=""/>
                                            <div>{sheet.name}</div>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                   </div>
               </Scroll>
           </div>
        )
    }
}

export default Index