/*
 * @Author: zj 
 * @Date: 2019-08-20 20:20:11 
 * @Last Modified by: zj
 * @Last Modified time: 2019-12-25 09:35:36
 */

import pinyin from './pinyin_dict_notone';

//去除字符串非汉字部分
String.prototype.GetCN = function() { 
    var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g; 
    return this.replace(regEx, ''); 
}; 

//常规查询索引
function routine(data,key){

    let base = '';

    for(let i in data){
        for(let j in key){
            if(i == key[j]){

                if(data[i]==null){
                    data[i]='';
                }

                base = base+data[i]

            }
        }
    }

    return base;
}

//首字母查询索引
function acronym(data,key){

    let base = '';

    for(let i in data){
        for(let j in key){
            if(i == key[j]){

                if(data[i]==null){
                    data[i]='';
                }

                //生成索引
                base = base+function(){

                    //初始化返回数据
                    let rdata = '';

                    //调用拼音插件获取汉字首字母
                    rdata =  pinyin.get_first(data[i], {
                        retain: false
                    });

                    // //只有一个数据集直接返回
                    // if(index.length==1){
                    //     rdata = index[0];
                    // }else{
                    //     //把数据集拼接成字符串
                    //     for(let i in index){
                    //         rdata = rdata+index[i][0]
                    //     }
                    // }

                    //返回拼接的数据
                    return rdata;
                   
                }()
            }
        }
    }

    return base;
}

//建立不区分大小写的查询索引
function nodistinguish(data,key){

    let base = '';

    for(let i in data){
        for(let j in key){
            if(i == key[j]){

                if(data[i]==null){
                    data[i]='';
                }

                let tmp = data[i];

                base = base+tmp.toLocaleLowerCase()

            }
        }
    }

    return base;
}

//完整拼音查询索引
function completepinyin(data,key){

    let base = '';

    for(let i in data){
        for(let j in key){
            if(i == key[j]){

                if(data[i]==null){
                    data[i]='';
                }

                //生成索引
                base = base+function(){

                    //初始化返回数据
                    let rdata = '';

                    //调用拼音插件获取汉字全拼
                    rdata =  pinyin.get_acronym(data[i].GetCN(), {
                        retain: true
                    });

                    // //只有一个数据集直接返回
                    // if(index.length==1){
                    //     rdata = '';
                    // }else{
                    //     //把数据集拼接成字符串
                    //     for(let i in index){
                    //         rdata = rdata+index[i][0]
                    //     }
                    // }

                    //返回拼接的数据
                    return rdata;
                   
                }()

            }
        }
    }

    return base;
}

//声母查询索引
function consonant(data,key){

    let base = '';

    for(let i in data){
        for(let j in key){
            if(i == key[j]){

                if(data[i]==null){
                    data[i]='';
                }

                //生成索引
                base = base+function(){

                    //初始化返回数据
                    let rdata = '';

                    //调用拼音插件获取汉字首字母
                    let index =  pinyin(data[i], {
                        style: pinyin.STYLE_INITIALS, 
                        heteronym: true
                    });
                    
                    //只有一个数据集直接返回
                    if(index.length==1){
                        rdata = index[0];
                    }else{
                        //把数据集拼接成字符串
                        for(let i in index){
                            rdata = rdata+index[i][0]
                        }
                    }

                    //返回拼接的数据
                    return rdata;
                   
                }()

            }
        }
    }

    return base;
}


// 创建索引事件
function createIndex(data,key){

    let list = []

    //提取关键检索信息
    for(var i in data){
        list[i] = [
            //首字母查询索引
            acronym(data[i],key),
            //常规查询索引
            routine(data[i],key),
            //建立不区分大小写的查询索引
            nodistinguish(data[i],key),
            //完整拼音查询索引
            completepinyin(data[i],key),
            //声母查询索引
            // consonant(data[i],key)
        ]
    }

    return list;
}


// 主体
function py(data,key) {

    //储存当前索引
    this.indexesList = '';

    //储存原数据
    this.baseData = '';

    //建立索引
    this.initIndexes = (data,key) => {

        //储存原数据
        this.baseData = data;

        //调用创建索引事件
        // console.time('索引建立')
        this.indexesList = createIndex(data,key);
        // console.timeEnd('索引建立')

        return this.query;
        
    };

    //检索事件
    this.query = (value) =>{

        let list = this.indexesList;

        //用户输入中的大写转小写
        value = value.toLocaleLowerCase()

        // console.log(list);

        //初始化返回数据
        let retdata = [];

        // console.time('查询耗时')
        
        //遍历搜索索引
        for(let i in list){

            //当前索引集
            let datalist  = list[i];

            //遍历当前索引集
            for(let j in datalist){
                
                if(datalist[j].indexOf(value)!=-1){

                    //全拼索引
                    if(j==3){
                        if(datalist[j].indexOf(value)==0){
                            retdata.push(this.baseData[i]);
                        }
                    //其他索引
                    }else{
                        retdata.push(this.baseData[i]);
                    }
                    
                    //有找到匹配数据跳出当前循环
                    break;
                    
                }

            }

        }
        
        // console.timeEnd('查询耗时')

        return retdata;

    }


    this.initIndexes(data,key);

}


export default py;