// import { Buffer } from "buffer";
import express from "express";
import { json } from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(json());
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// 使用body-parser中间件来解析JSON请求体
app.use(bodyParser.json());

// 获取首页商品
app.get('/productList',(req, res) => {
    fs.readFile('./products/productList.json',(err, data) => {
        if(err) {
            const msg = `数据获取失败: ${ err }`;
            res.send(msg);
        }else {
            const dataStr = data.toString('utf-8');
            res.setHeader('Content-Type', 'application/json;charset=UTF-8')
            res.send(dataStr);
        }
    })
});

// 获取商品详情
app.get('/comdetail', (req,res) => {
    fs.readFile('./products/productDetail.json',(err, data) => {
        if(err) {
            const msg = `数据获取失败: ${ err }`;
            res.send(msg);
        }else {
            const id = req.query.id;
            const BufToSting = data.toString('utf-8')
            const json = JSON.parse(BufToSting)
            const response = json.filter((item) => {
                return item.id === +id
            })
            res.send(response);
        }

    })
})

// 获取用户信息
app.get('/userInfo',(req, res) => {
    fs.readFile('./user/userInfo.json',(err, data) => {
        if(err) {
            const msg = `数据获取失败: ${ err }`;
            res.send(msg);
        }else {
            const dataStr = data.toString('utf-8');
            res.send(dataStr);
        }
    })
});


// 获取分类信息
app.get('/categorys',(req, res) => {
    fs.readFile('./categorys/categorys.json',(err, data) => {
        if(err) {
            const msg = `数据获取失败: ${ err }`;
            res.send(msg);
        }else {
            const dataStr = data.toString('utf-8');
            res.setHeader('Content-Type', 'application/json;charset=UTF-8')
            res.send(dataStr);
        }
    })
});

// 添加到购物车
app.post('/addCart',(req, res) => {
    const { id, count } = req.body
    try {
        // 处理数据
        fs.readFile('./products/productDetail.json', (err, data) => {
            if (err) {
                res.status(500).send({
                    code: 500,
                    message: '添加失败',
                    error: err
                });
            } else {
                // 将二进制数据转换为json字符串
                const BufToSting = data.toString('utf-8')
                // 转换为json对象 获取商品数组
                const products = JSON.parse(BufToSting)
                // 筛选出添加的商品 并返回
                const target = products.filter(item => {
                    return item.id === id
                })
                // 增加的数量
                target[0].count = count
                // 减少商品库存
                for (let item of products) {
                    if(item.id === target[0].id) {
                        item.nums -= count
                    }
                }
                const newGoodsInfo = JSON.stringify(products, null, 2)
                // 将数据变更写入文件 (更该数据库数据)
                fs.writeFile('./products/productDetail.json', newGoodsInfo, 'utf8', (err) => {
                    if(err) {
                       console.log("更改失败")
                    }
                })
                res.status(200).send({
                    code: 200,
                    message: '添加成功',
                    data: target[0]
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            code: 500,
            message: '服务器错误',
            error: error
        });
    }
})

// 登录接口
app.post('/login', (req, res) => {
    // 获取提交字段信息
    const { name, password } = req.body
    fs.readFile('./user/userinfo.json', (err, data) => {
        if(err) {
            res.status(500).send({
                code: 500,
                message: "cuochule"
            })
        }
        try {
            // 将二进制数据转换为json字符串
            const BufToSting = data.toString('utf-8')
            const user = JSON.parse(BufToSting)
            const current = user.userList.filter(item => item.name === name)
            // 过滤敏感信息
            const excludeFields = (obj, targetKey) => {
                return Object.fromEntries(
                    // 通过解构 [key]过滤掉[ 'password', '123456' ]中不必要的数据
                    Object.entries(obj).filter(([key]) => !targetKey.includes(key))
                    // Object.entries(obj).filter(key => {
                    //     return key[0] !== targetKey
                    // })
                )
            }
            if(current) {
                if(current[0].password === password) {
                    res.status(200).send({
                        code: 200,
                        info: excludeFields(current[0], ['password']),
                        message: '登录成功'
                    })
                }else {
                    res.status(200).send({
                        code: 200,
                        message: '密码错误'
                    })
                }
            }else {
                res.status(200).send({
                    code: 200,
                    message: '用户名错误或不存在'
                })
            }
        }catch(err) {
            res.status(500).send({
                code: 500,
                message: err
            })
        }
    })
})

// 搜索接口 先搜索分类 搜索不到 再进行具体商品搜索
app.post('/search', (req, res) => {
    const query = req.body.word
    let result = []
    //  封装一个字符串匹配方法
    const similarity = (str1, str2) => {
        // 匹配str1中所有字符
        const regex = new RegExp(`[${str1}]`, 'g');
        const matchs = str2.match(regex);
        if (!matchs) return 0
        // 计算匹配率
        return (matchs.length / Math.max(str1.length, str2.length)) * 100; 
    }
    fs.readFile('./categorys/categorys.json', (err, data) => {
      if (err) {
        res.status(500).send({
            code: 500,
            message: err
        })
      }
      const BufToSting = data.toString('utf-8')
      const goods = JSON.parse(BufToSting)
      
      const target = goods.categorys.filter(({name}) => similarity(name, query) > 50)
      const products = (target[0] || []).products || []
      result.push(...products)
    //   商品详情搜索
      if (result.length === 0) {
        fs.readFile('./products/productDetail.json', (err, data) => {
            if (err) {
                res.status(500).send({
                    code: 500,
                    message: err
                })
            }
            const BufToSting = data.toString('utf-8')
            const goods = JSON.parse(BufToSting)
            const products = goods.filter(({title}) => similarity(title, query) > 18)
            result.push(...products)
            res.status(200).send({
                code: 200,
                products: result
            })
        })
      } else {
        res.status(200).send({
            code: 200,
            products: result
        })
      }
    })
})

// 创建服务
const server = app.listen(8081, () => {
  const port = server.address().port;
  console.log(`接口创建成功，访问地址为http://localhost:${port}`);
});


