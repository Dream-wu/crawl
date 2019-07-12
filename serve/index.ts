import { MiddlewareCreater } from 'f2e-server'
import { out, Route } from 'f2e-serve'
import * as Yyb from './search_yyb'
import * as search_360 from './search_360'


const creater: MiddlewareCreater = (conf) => {
    const route = new Route()

    route.on('yyb/search', out.JsonOut(Yyb.search))
    route.on('360/search', out.JsonOut(search_360.search))
    route.on(/(^|\/)\w*$/, () => 'index.html')

    return {
        onRoute: route.execute
    }
}

export default creater