import { h, Component, render } from 'preact'
import {Fetch} from './api'

interface State {
    keyword: string
    list: any[]
}
class App extends Component<{}, State>{
    state: State = {
        keyword: '',
        list: []
    }
    
    render () {
        const {keyword, list} = this.state;
        return <div style={{padding: '2rem'}}>
            <div>
                <input class="input" type="text" placeholder="请输入应用名" 
                style={{width: '250px', marginRight: '1rem'}}
                value={keyword}
                onChange={this.handleChange}
                />
                <button class="button is-primary" onClick={this.handleSearchYyb}
                style={{marginRight: '0.5rem'}}>应用宝中搜索</button>
                <button class="button is-primary" onClick={this.handleSearch360}>360市场中搜索</button>
            </div>
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <td>图标</td>
                        <td>应用</td>
                        <td>版本</td>
                        <td>分类</td>
                    </tr>
                </thead>
                <tbody>
                    {list.length> 0 ?list.map(item => {
                        return <tr>
                        <td><img src={item.iconUrl}/></td>
                        <td>{item.appName}</td>
                        <td>{item.versionName}</td>
                        <td>{item.categoryName}</td>
                        </tr>
                    }) : <tr><td class="has-text-warning has-text-centered" colSpan={4}>暂无数据~</td></tr>}
                </tbody>
            </table>
        </div>
    }

    handleChange = (e: Event) => {
        this.setState({keyword: e.target['value'].trim()})
    }

    handleSearchYyb = () => {
        const {keyword} = this.state;
        Fetch(`yyb/search?keyword=${keyword}`, {method: 'GET'}).then(data => {
            if(!data['error']) {
                this.setState({list: data})
            }else {
                alert(data['error'])
            }
        })
    }

    handleSearch360 = () => {
        const {keyword} = this.state;
        Fetch(`360/search?keyword=${keyword}`, {method: 'GET'}).then(data => {
            if(!data['error']) {
                this.setState({list: data})
            }else {
                alert(data['error'])
            }
        })
    }
}

render(<App />, document.getElementById('app'))