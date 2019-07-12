import * as https from 'https';
import {IncomingMessage} from 'http'
import {App} from './interface'

const getYyb_url = (word: string)=>{
    return encodeURI(`https://sj.qq.com/myapp/searchAjax.htm?kw=${word}&pns=&sid=`);
}

export const search = async(req: IncomingMessage) => {
    const {keyword} = req['data'];
    const app = await getApp(keyword);
    return app
}

export const getApp = (keyword: string) => new Promise<any[]>((resolve, reject) => {
    https.get(getYyb_url(keyword), (req) => {
        let arr = [];
        req.on('data', data => arr.push(data)).on('end',() => {
            const result = JSON.parse(Buffer.concat(arr).toString());
            try {
                if(result['success']) {
                    const app = parseResult(result['obj']['appDetails']);
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
            appName: item['appName'],
            // appNameMeta: string,
            pkgName: item['pkgName'],
            versionName: item['versionName'],
            versionCode: item['versionCode']+'',
            appSize: item['fileSize'],
            apkUrl: item['apkUrl'],
            iconUrl: item['iconUrl'],
            appDownCount: item['appDownCount'],
            categoryName: item['categoryName'],
            apkPublishTime: item['apkPublishTime'],
            source: item['yingyongbao']
        })
    }
    return _apps;
}