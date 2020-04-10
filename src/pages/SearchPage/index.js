import React from 'react'
import { get } from '@/utils/ajax'
import { SearchBar } from 'antd-mobile'
import style from './style/index.module.less'
import ResultTabs from './ResultTabs'
import Loading from '../../components/Loading/index'

class SearchPage extends React.Component {
    state = {
        isFocus: false,  //是否获取焦点
        hotlist: [],   //保存热门搜索
        keywords : '',  //搜索关键词
        isSearch: false,  //是否搜索
        suggestList :[],     //搜索建议
        searchHistory : JSON.parse(localStorage.getItem('searchHistory')) || []  //搜索历史
    }
    componentDidMount () {
        this.getHotList()
    }
    //获取热门搜索
    getHotList = async () => {
        const res = await get('/search/hot')
        //console.log(res.result.hots);
        this.setState({
            hotlist : res.result ? res.result.hots : []
        })
    }
    //获取搜索建议，包含歌手 歌曲 mv  专辑
    getSuggestList = async (keywords) => {
        if (!keywords) {
            this.setState({
                suggestList : []
            })
            return 
        }
        const res = await get('/search/suggest', {
            keywords: keywords,
            type:'mobile'
        })
       
        this.setState({
            suggestList : res.result ? res.result.allMatch : []
        })
        
    }
    //输入框值改变时 触发这个方法 获取搜索建议
    handleChange = async (keywords) => {
        
       this.getSuggestList(keywords)
       this.setState({
           keywords,
           isSearch:false
       })
    }
    //点击具体的项目 搜索项 跳转到
    search = async (keywords) => {
        //console.log(100000)
        this.setState({
            keywords,
            isSearch : true
        })
        //确定搜索之后  添加搜索历史
        this.addHistory(keywords)
    }
    //添加搜搜历史
    addHistory = (keywords) => {
        console.log(localStorage)
        //将原来的历史记录拿出来 放在数组中，然后加入新历史记录 
        var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
        //判断当前搜索记录是不是已经存在了，如果存在就将之前的删除，将本次的加入
        const index = searchHistory.findIndex(item => item === keywords)
        if (index !== -1) {
            searchHistory.splice(index, 1)
        }
        //将搜索记录添加在数组开头
        searchHistory.unshift(keywords)
        
        //再存储到localStorage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        //更新状态
        this.setState({
            searchHistory
        })
    }
    //删除搜索历史
    removeHistory = (index) => {
        //从存储中拿出历史记录，保存在数组中，根据index删除数组中的数据 再存储回去
        var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
        searchHistory.splice(index, 1)  //数组中就移除了 当前index下标的数据
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        //更新状态
        this.setState({
            searchHistory
        })
    }
    render () {
        
        const {isFocus, hotlist, suggestList, isSearch, keywords, searchHistory} = this.state
        
        const FocusBox = () => <div>
        
            {isSearch ? <div>
                <ResultTabs keywords={keywords}/>
            </div> :
            <div>
                <ul className={style['suggest-box']}>
                    {suggestList && suggestList.map(
                        item=> <li key={item.keyword} onClick={()=> this.search(item.keyword)}>
                            <div className={'iconfont icon-sousuo1'}></div>
                            <div>{item.keyword}</div>
                        </li>
                    )}
                </ul>
            </div>
            }
        </div>
         const BlurBox = () => <div>
         <div className={style['hot-list-box']}>
                <div style={{display:hotlist.length?'':'none'}}>热门搜索</div>
                <ul>
                    {hotlist && hotlist.map(hot => <li key={hot.first} onClick={()=>this.search(hot.first)}>{hot.first}</li>)}
                </ul>
                {/* 遍历搜索历史 */}
                <ol>
                    {searchHistory && searchHistory.map(
                        (item, index) => <li key={item}>
                            <div className={'iconfont icon-lishibisai'}></div>
                            <div>{item}</div>
                            <div className={'iconfont icon-lvzhou_shanchu_lajitong'} onClick={()=>this.removeHistory(index)}></div>
                        </li>
                    )}
                </ol>
                
                {/*在数据请求回来之前 显示加载中的样式 */}
                <Loading loading={!hotlist.length}/>
            </div>
        </div>
        return (
            <div className={style.container}>
                <div>
                    <SearchBar
                    placeholder='搜索歌手、歌曲、专辑'
                    onBlur={() => this.setState({isFocus:false})}
                    onFocus={() => this.setState({isFocus:true})}
                    onChange={this.handleChange}
                    onSubmit={this.search}
                    />
                </div>
                <div>
                    {(keywords || isFocus) ? <FocusBox /> : <BlurBox />}
                </div>
            </div>
        )
    }
}

export default SearchPage