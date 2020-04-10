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
        suggestList :[]     //搜索建议
    }
    componentDidMount () {
        this.getHostList()
        this.search()
    }
    //获取热门搜索
    getHostList = async () => {
        const res = await get('/search/hot')
        console.log(res.result.hots);
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
        console.log(100000)
        this.setState({
            keywords,
            isSearch : true
        })
    }
    render () {
        
        const {isFocus, hotlist, suggestList, isSearch, keywords} = this.state
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
                    {isFocus ? <FocusBox /> : <BlurBox />}
                </div>
            </div>
        )
    }
}

export default SearchPage