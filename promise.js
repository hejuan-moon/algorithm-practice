

(function () {
    function Promise(excutor) {
        const that = this;

        that.status = 'peding';
        that.data = '';
        that.callBack = []
        function resolve(value) {
            that.status = 'resolve';
            that.data = value;
        };
        function reject(reason) {
            that.status = 'reject';
            that.data = reason
        }
        try {
            excutor(resolve, reject)
        } catch (err) {
            console.log(err)
        }
    }
    // 1.then方法是返回一个新的promise,promise的状态是由回调函数执行结果决定

    // 1.回调函数不是promise，结果为成功
    // 2.回调函数抛出异常，结果为失败
    // 3.回调函数是promise，根据promise的执行结果决定


    Promise.prototype.then = function (onResolve, onReject) {
        const self = this;
        return new Promise((resolve, reject) => {
            function handle(callback) {
                try {
                    const result = callback(self.data)
                    if (result instanceof Promise) {
                        // result.then(value=>{
                        //     resolve(value)
                        // },reasom=>{
                        //     reject(reject)
                        // })
                        result.then(resolve, reject)
                    }
                } catch {
                    reject(result)
                }
            }
            if (self.status == 'resolve') {
                // 异步执行成功的回调
                setTimeout(() => {
                    handle(onResolve)
                })

            } else if (self.status == 'reject') {
                setTimeout(() => {
                    handle(onReject)
                })
            } else {
                self.callBack.push({
                    onResolve(){
                        handle(onResolve)
                    },
                    onReject(){
                        handle(onReject)
                    }
                })

            }
        })
    }
    window.Promise = Promise

})()


