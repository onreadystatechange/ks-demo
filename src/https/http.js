/**
 * Created by yjy on 2017/3/7.
 */
const http = {
    adress:'http://101.201.77.170:8090/exam-domain/',
    post:function(url,data,fn){
        $.ajax({
            type: 'post',
            url: this.adress+url,
            data: JSON.stringify(data),
            contentType: "application/json;charset=UTF-8",
            async:false,
            success: fn
        })
    },
    get:function(url,data,fn){
        $.ajax({
            type: 'get',
            url: this.adress+url,
            data: JSON.stringify(data),
            async:false,
            contentType: "application/json;charset=UTF-8",
            success: fn
        })
    }

};
export default http;