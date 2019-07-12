export const Fetch = (url: string, options: { method: 'GET', body?: undefined }): Promise<any> => new Promise((resolve, reject) => {
    fetch(url, {
        method: options.method,
        headers: {
            'Content-Type': "application/json"
        },
        credentials: 'include',
        body: options.body ? JSON.stringify(options.body) : options.body
    }).then(res => {
        return res.json();
    }).then(data => {
        resolve(data);
    }).catch(err => reject(err || '请求异常~'));
})