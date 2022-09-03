export default class UrlHelper {

    static createUrl(params: Array<any>): string {
        return params.join('/');
    }
}
