import * as https from 'https';
import {IncomingMessage} from 'http'
import {App} from './interface'

const getThree_url = (word: string)=>{
    return encodeURI(`https://zonghe.m.so.com/api/search/app?q=${word}&inp=${word}&src=ms_zhushou&prepage=searchindex&curpage=shbtinput_app&page=1`);
}

export const search = async(req: IncomingMessage) => {
    const {keyword} = req['data'];
    const app = await getApp(keyword);
    return app
}

export const getApp = (keyword: string) => new Promise<any[]>((resolve, reject) => {
    https.get(getThree_url(keyword), (req) => {
        let arr = [];
        req.on('data', data => arr.push(data)).on('end',() => {
            const result = JSON.parse(Buffer.concat(arr).toString());
            try {
                if(('errno' in result) &&result['errno']=='0') {
                    const app = parseResult(result['data']);
                    resolve(app);
                }
            }catch(err) {
                reject({error: `搜索出错`});
            }
        })
    })
})

const parseResult = (apps: any) => {
    let _apps = [];
    for(let item of apps) {
        _apps.push({
            appName: item['name'],
            // appNameMeta: string,
            pkgName: item['apkid'],
            versionName: item['version_name'],
            versionCode: item['version_code']+'',
            appSize: item['size'],
            apkUrl: item['down_url'],
            iconUrl: item['logo_url'],
            appDownCount: item['download_times'],
            categoryName: item['category'],
            apkPublishTime: item['apkPublishTime'] || '',
            source: item['360']
        })
    }
    return _apps;
}