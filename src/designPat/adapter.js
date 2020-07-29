// 适配器 
// 适配器模式通过**把一个类的接口变换成客户端所期待的另一种接口**，可以帮我们解决**不兼容**的问题。
// 重构老代码的时候 技术迁移的时候
// 特点：抹平差异

// 1.封装一套fetch的请求吧


export default class HttpUtils {

    static get(url) {
        return new Promise((resolve, rejecet) => {
            fetch(url).then(response => response.json())
                .then(result => {
                    resolve(result)
                }).catch(error) {
                    reject(error)
                }
        })
    }

    static post(url, data) {
        return new Promise((resolve, rejecet) => {
            fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    // 将object类型的数据格式化为合法的body参数
                    body: this.changeData(data)
                }).then(response => response.json())
                .then(result => {
                    resolve(result)
                }).catch(error) {
                    reject(error)
                }
        })
    }

    static changeData(obj) {
        var prop,
            str = ''
        var i = 0
        for (prop in obj) {
            if (!prop) {
                return
            }
            if (i == 0) {
                str += prop + '=' + obj[prop]
            } else {
                str += '&' + prop + '=' + obj[prop]
            }
            i++
        }
        return str
    }
}

// 2. axios
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
    .then(function(response) {
        // handle success
        console.log(response);
    })
    .catch(function(error) {
        // handle error
        console.log(error);
    })
    .then(function() {
        // always executed
    })

axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
})

// axios 其实就是一个适配器
// axios 强大的地方还在于，它不仅仅是一个局限于浏览器端的库。在Node环境下，我们尝试调用上面的 api，
// 会发现它照样好使 —— axios 完美地**抹平了两种环境下api的调用差异**，靠的正是对适配器模式的灵活运用。
