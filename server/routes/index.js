var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var connection = require('../db/mongoose')
var GoodsList = require('../db/goods/index')
var usersList = require('../db/users/index')
var cartsList = require('../db/carts/index')
var addressesList = require('../db/addresses/index')
var ordersList = require('../db/orders/index')
var QcloudSms = require("qcloudsms_js");
const axios = require('axios')
//引入token包
var jwt = require('jsonwebtoken');
//引入支付宝配置文件
const alipaySdk = require('../db/alipay/index');
const AlipayFormData = require('alipay-sdk/lib/form').default

function getTimeToken(exp) {
  let getTime = parseInt(new Date().getTime() / 1000) //转为秒
  if (getTime - exp > 604800) {
    return true
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//首页数据
router.get('/api/index_list/0/data/1', function (req, res, next) {
  let recommendList = []
  let likeList = []
  GoodsList.find({ class: "推荐" }, function (error, results) {
    recommendList = results
    GoodsList.find({ class: '猜你喜欢' }, function (error, result) {
      likeList = result
      res.send({
        code: 0,
        data: {
          topBar: [
            { id: 0, label: '推荐' },
            { id: 1, label: '女装' },
            { id: 2, label: '男装' },
            { id: 3, label: '百货' },
            { id: 4, label: '食品' },
            { id: 5, label: '电脑' },
            { id: 6, label: '鞋包' },
            { id: 7, label: '运动' },
            { id: 8, label: '手机' },
            { id: 9, label: '电器' },
            { id: 10, label: '车品' },
            { id: 11, label: '饰品' },
            { id: 12, label: '家具' },
            { id: 13, label: '美妆' },
            { id: 14, label: '家纺' },
          ],
          data: [
            //swiperList
            {
              id: 1,
              type: 'swiperList',
              data: [
                {
                  id: 1,
                  imgUrl: './images/swiper1.jpeg'
                },
                {
                  id: 2,
                  imgUrl: './images/swiper2.jpeg'
                },
                {
                  id: 3,
                  imgUrl: './images/swiper3.jpeg'
                }
              ]
            },
            //iconsList
            {
              id: 2,
              type: 'iconsList',
              data: [
                {
                  id: 1,
                  title: '签到',
                  imgUrl: './images/i1.png'
                }, {
                  id: 2,
                  title: '限时秒杀',
                  imgUrl: './images/i2.png'
                }, {
                  id: 3,
                  title: '今日爆款',
                  imgUrl: './images/i3.png'
                }, {
                  id: 4,
                  title: '充值中心',
                  imgUrl: './images/i4.png'
                }, {
                  id: 5,
                  title: '领卷中心',
                  imgUrl: './images/i5.png'
                }
              ]
            },
            //recommendList
            {
              id: 3,
              type: 'recommendList',
              data: recommendList
            },
            //likeList
            {
              id: 4,
              type: 'likeList',
              data: likeList
            }
          ]
        }
      })
    })
  })
})

//首页女装
router.get('/api/index_list/1/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      //womenswearList
      {
        id: 1,
        type: 'womenswearList',
        data: [
          {
            id: 1,
            imgUrl: './images/womenswear1.jpg'
          },
          {
            id: 2,
            imgUrl: './images/womenswear1.jpg'
          }
        ]
      },
      //likeList
      {
        id: 2,
        type: 'likeList',
        data: [
          {
            id: 1,
            name: '建盏套装 红色芝麻毫 12件套',
            imgUrl: './images/like.jpeg',
            price: 299
          }, {
            id: 2,
            name: '建盏套装 红色芝麻毫 12件套',
            imgUrl: './images/like.jpeg',
            price: 299
          }, {
            id: 3,
            name: '建盏套装 红色芝麻毫 12件套',
            imgUrl: './images/like.jpeg',
            price: 299
          }
        ]
      }
    ]
  })
});

//分类的接口
router.get('/api/goods/list', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        //一级
        id: 0,
        name: '推荐',
        data: [
          {
            //二级
            id: 0,
            name: '推荐',
            list: [
              //三级
              {
                id: 0,
                name: '短袖',
                imgUrl: './images/短袖.png'
              }, {
                id: 1,
                name: '电器',
                imgUrl: './images/电器.png'
              }, {
                id: 2,
                name: '百褶短裙',
                imgUrl: './images/百褶短裙.png'
              }, {
                id: 3,
                name: '西服',
                imgUrl: './images/西服.png'
              }, {
                id: 4,
                name: '家具',
                imgUrl: './images/家具.png'
              }, {
                id: 5,
                name: '婴儿车',
                imgUrl: './images/婴儿车.png'
              }, {
                id: 6,
                name: '装饰物',
                imgUrl: './images/装饰物.png'
              }, {
                id: 7,
                name: '书',
                imgUrl: './images/书.png'
              }, {
                id: 8,
                name: '鞋',
                imgUrl: './images/鞋.png'
              }
            ]
          }
        ]
      }, {
        //一级
        id: 1,
        name: '女装',
        data: [
          {
            //二级
            id: 0,
            name: '女装',
            list: [
              //三级
              {
                id: 0,
                name: '马甲',
                imgUrl: './images/马甲.png'
              }, {
                id: 1,
                name: '连衣裙',
                imgUrl: './images/连衣裙.png'
              }, {
                id: 2,
                name: '百褶短裙',
                imgUrl: './images/百褶短裙.png'
              }, {
                id: 3,
                name: '西服',
                imgUrl: './images/西服.png'
              }, {
                id: 4,
                name: '吊带裙',
                imgUrl: './images/吊带裙.png'
              }, {
                id: 5,
                name: '短袖',
                imgUrl: './images/短袖.png'
              }, {
                id: 6,
                name: '外套',
                imgUrl: './images/外套.png'
              }, {
                id: 7,
                name: '羽绒服',
                imgUrl: './images/羽绒服.png'
              }, {
                id: 8,
                name: '裤子',
                imgUrl: './images/裤子.png'
              }
            ]
          }
        ]
      }, {
        //一级
        id: 2,
        name: '男装',
        data: [
          {
            //二级
            id: 0,
            name: '男装',
            list: [
              //三级
              {
                id: 0,
                name: '西服',
                imgUrl: './images/西服.png'
              }, {
                id: 1,
                name: '连衣裙',
                imgUrl: './images/连衣裙.png'
              }, {
                id: 2,
                name: '百褶短裙',
                imgUrl: './images/百褶短裙.png'
              }, {
                id: 3,
                name: '短袖',
                imgUrl: './images/短袖.png'

              }, {
                id: 4,
                name: '吊带裙',
                imgUrl: './images/吊带裙.png'
              }, {
                id: 5,
                name: '马甲',
                imgUrl: './images/马甲.png'
              }, {
                id: 6,
                name: '外套',
                imgUrl: './images/外套.png'
              }, {
                id: 7,
                name: '羽绒服',
                imgUrl: './images/羽绒服.png'
              }, {
                id: 8,
                name: '裤子',
                imgUrl: './images/裤子.png'
              }
            ]
          }
        ]
      }, {
        //一级
        id: 3,
        name: '百货',
        data: [
          {
            //二级
            id: 0,
            name: '百货',
            list: [
              //三级
              {
                id: 0,
                name: '外套',
                imgUrl: './images/外套.png'
              }, {
                id: 1,
                name: '连衣裙',
                imgUrl: './images/连衣裙.png'
              }, {
                id: 2,
                name: '百褶短裙',
                imgUrl: './images/百褶短裙.png'
              }, {
                id: 3,
                name: '西服',
                imgUrl: './images/西服.png'
              }, {
                id: 4,
                name: '吊带裙',
                imgUrl: './images/吊带裙.png'
              }, {
                id: 5,
                name: '马甲',
                imgUrl: './images/马甲.png'
              }, {
                id: 6,
                name: '短袖',
                imgUrl: './images/短袖.png'

              }, {
                id: 7,
                name: '羽绒服',
                imgUrl: './images/羽绒服.png'
              }, {
                id: 8,
                name: '裤子',
                imgUrl: './images/裤子.png'
              }
            ]
          }
        ]
      }, {
        //一级
        id: 4,
        name: '食品',
        data: [
          {
            //二级
            id: 0,
            name: '食品',
            list: [
              //三级
              {
                id: 0,
                name: '短袖',
                imgUrl: './images/短袖.png'
              }, {
                id: 1,
                name: '连衣裙',
                imgUrl: './images/连衣裙.png'
              }, {
                id: 2,
                name: '百褶短裙',
                imgUrl: './images/百褶短裙.png'
              }, {
                id: 3,
                name: '西服',
                imgUrl: './images/西服.png'
              }, {
                id: 4,
                name: '吊带裙',
                imgUrl: './images/吊带裙.png'
              }, {
                id: 5,
                name: '马甲',
                imgUrl: './images/马甲.png'
              }, {
                id: 6,
                name: '外套',
                imgUrl: './images/外套.png'
              }, {
                id: 7,
                name: '羽绒服',
                imgUrl: './images/羽绒服.png'
              }, {
                id: 8,
                name: '裤子',
                imgUrl: './images/裤子.png'
              }
            ]
          }
        ]
      }, {
        //一级
        id: 5,
        name: '电脑',
        data: [
          {
            //二级
            id: 0,
            name: '电脑',
            list: [
              //三级
              {
                id: 0,
                name: '短袖',
                imgUrl: './images/短袖.png'
              }, {
                id: 1,
                name: '连衣裙',
                imgUrl: './images/连衣裙.png'
              }, {
                id: 2,
                name: '百褶短裙',
                imgUrl: './images/百褶短裙.png'
              }, {
                id: 3,
                name: '西服',
                imgUrl: './images/西服.png'
              }, {
                id: 4,
                name: '吊带裙',
                imgUrl: './images/吊带裙.png'
              }, {
                id: 5,
                name: '马甲',
                imgUrl: './images/马甲.png'
              }, {
                id: 6,
                name: '外套',
                imgUrl: './images/外套.png'
              }, {
                id: 7,
                name: '羽绒服',
                imgUrl: './images/羽绒服.png'
              }, {
                id: 8,
                name: '裤子',
                imgUrl: './images/裤子.png'
              }
            ]
          }
        ]
      },
    ]
  })
})
// 查询商品数据 
router.get('/api/goods/shopList', function (req, res, next) {
  //前端搜索框的值给后端
  let [searchName, orderName] = Object.keys(req.query)
  let [name, order] = Object.values(req.query)
  let oj = {};
  oj[orderName] = order;
  GoodsList.find({ name: { $regex: name }, }, null, { sort: oj }, function (err, results) {
    if (err) { return console.log(err); }
    res.send({
      code: 0,
      data: results
    })
  })

})

//查询商品id的接口
router.get('/api/goods/id', function (req, res, next) {
  let id = req.query.id
  var sid = mongoose.Types.ObjectId(id);
  GoodsList.findOne({ _id: sid }, function (err, results) {
    if (err) throw error
    res.send({
      code: 0,
      data: results
    })
  })
})

//用户登录的接口
router.post('/api/login', function (req, res, next) {
  //后端接收前端传过来的数据
  let params = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd
  }

  //生成token
  let payload = { tel: params.userTel } //用户信息
  let secret = 'liyuaiwu' //口令
  let token = jwt.sign(payload, secret, {
    expiresIn: 604800
  })

  //查询用户手机号是否存在
  usersList.findOne({ tel: params.userTel }, function (err, results) {
    //记录id
    let id = results._id
    let ID = mongoose.Types.ObjectId(id);
    if (!err) {
      if (!results) {
        res.send({
          code: 301,
          data: {
            success: false,
            msg: '手机号不存在'
          }
        })
      } else {
        //判断账号密码
        if (results.pwd === params.userPwd) {
          //手机号跟密码都正确
          usersList.updateOne({ _id: ID }, { $set: { token: token } }, function (e, r) {
            res.send({
              code: 200,
              data: {
                success: true,
                msg: '登录成功',
                data: results
              }
            })
          })

        }
        else {
          //密码不对
          res.send({
            code: 302,
            data: {
              success: false,
              msg: '密码不正确'
            }
          })
        }

      }
    }
  })
})

//短信验证码
router.post('/api/code', function (req, res, next) {
  let tel = req.body.phone
  // 短信应用 SDK AppID
  var appid = 1400187558;  // SDK AppID 以1400开头
  // 短信应用 SDK AppKey
  var appkey = "dc9dc3391896235ddc2325685047edc7";
  // 需要发送短信的手机号码
  var phoneNumbers = [tel];
  // 短信模板 ID，需要在短信控制台中申请
  var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
  // 签名
  var smsSign = "三人行慕课";  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
  // 实例化 QcloudSms
  var qcloudsms = QcloudSms(appid, appkey);
  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
  function callback(err, ress, resData) {
    if (err) {
      console.log("err: ", err);
    } else {
      res.send({
        code: 200,
        data: {
          success: true,
          data: ress.req.body.params[0]
        }
      })
    }
  }
  //指定id单发短信
  var ssender = qcloudsms.SmsSingleSender();
  //params就是发送的验证码
  var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000];
  ssender.sendWithParam("86", phoneNumbers[0], templateId,
    params, smsSign, "", "", callback);
})

//增加一个用户
router.post('/api/addUser', function (req, res, next) {
  let params = {
    userTel: req.body.phone
  }
  //查询用户是否存在
  usersList.findOne({ tel: params.userTel }, function (error, results) {
    let id = results._id
    let ID = mongoose.Types.ObjectId(id);
    //生成token
    let payload = { tel: params.userTel } //用户信息
    let secret = 'liyuaiwu' //口令
    let token = jwt.sign(payload, secret, {
      expiresIn: 604800
    })
    if (!error) {
      if (!results) {
        // 不存在，新增数据
        usersList.create({ "tel": params.userTel, "pwd": "", "nickName": params.userTel, "imgUrl": "/images/default.jpg", "token": token }, function (err, result) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: result
            }
          })
        })
      } else {
        //用户存在
        usersList.updateOne({ _id: ID }, { $set: { token: token } }, function (e, r) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: results
            }
          })
        })
      }
    }

  })
})

//注册账号
router.post('/api/register', function (req, res, next) {
  let params = {
    userTel: req.body.phone,
    userPwd: req.body.pwd
  }
  //查询用户
  usersList.findOne({ tel: params.userTel }, function (error, results) {
    let id = results._id
    let ID = mongoose.Types.ObjectId(id);
    //生成token
    let payload = { tel: params.userTel } //用户信息
    let secret = 'liyuaiwu' //口令
    let token = jwt.sign(payload, secret, {
      expiresIn: 604800
    })
    if (!error) {
      if (!results) {
        usersList.create({ "tel": params.userTel, "pwd": params.userPwd, "nickName": params.userTel, "imgUrl": "/images/default.jpg", "token": token }, function (err, result) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '注册成功',
              data: result
            }
          })
        })
      } else {
        //用户存在
        usersList.updateOne({ _id: ID }, { $set: { token: token } }, function (e, r) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: '登录成功',
              data: results
            }
          })
        })
      }
    }
  })
})

//找回密码
router.post('/api/recovery', function (req, res, next) {
  let params = {
    userTel: req.body.phone,
    userPwd: req.body.pwd
  }
  usersList.findOne({ tel: params.userTel }, function (error, results) {
    let id = results.id
    let sid = mongoose.Types.ObjectId(id)
    console.log(sid);
    console.log(id);
    let pwd = params.userPwd
    console.log(pwd);
    //用户存在
    usersList.updateOne({ _id: sid }, { $set: { pwd: pwd } }, function (err, result) {
      res.send({
        code: 200,
        data: {
          success: true,
          msg: '修改成功'
        }
      })
    })
  })
})
//先查询用户是否存在
router.post('/api/selectUser', function (req, res, next) {
  let params = {
    userTel: req.body.phone,
    userPwd: req.body.pwd
  }

  usersList.findOne({ tel: params.userTel }, function (error, results) {
    if (!error) {
      if (!results) {
        //用户不存在
        res.send({
          code: 301,
          data: {
            success: false,
            msg: '用户不存在'
          }
        })
      } else {
        //用户存在
        res.send({
          code: 200,
          data: {
            success: true
          }
        })
      }
    }
  })
})

//加入购物车
router.post('/api/addCart', function (req, res, next) {
  let goodsId = req.body.goodsId
  var gid = mongoose.Types.ObjectId(goodsId);
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  //如果执行，就证明token过期
  if (getTimeToken(tokenObj.exp)) {
    res.send({
      data: {
        code: 1000
      }
    })
  } else {
    if (tokenObj) {
      usersList.findOne({ tel: tokenObj.tel || '' }, function (error, results) {
        //用户id
        let uId = results.id
        //查询商品
        GoodsList.findOne({ _id: gid }, function (error, result) {
          let goods_id = result.id
          let goods_name = result.name
          let goods_price = result.price
          let goods_imgUrl = result.imgUrl
          //查询当前用户是否添加过着这个商品
          cartsList.findOne({ uId: uId, goods_id: goods_id }, function (e, r) {
            if (r) {
              let num = r.goods_num
              let id = r.id
              let gid = mongoose.Types.ObjectId(id)
              let n = parseInt(num) + 1
              cartsList.updateOne({ _id: gid }, { $set: { goods_num: n } }, function (er, re) {
                res.send({
                  data: {
                    code: 200,
                    success: true,
                    msg: '添加购物车成功'
                  }
                })
              })
            } else {
              cartsList.create({ "uId": uId, "goods_id": goods_id, "goods_name": goods_name, "goods_price": goods_price, "goods_num": 1, "goods_imgUrl": goods_imgUrl }, function (err, result) {
                res.send({
                  data: {
                    code: 200,
                    success: true,
                    msg: '添加购物车成功'
                  }
                })
              })
            }
          })
        })
      })
    } else {
      res.send({
        data: {
          code: 301,
          success: false,
          msg: '请登录'
        }
      })
    }
  }
})
//查询购物车数据
router.post('/api/selectCart', function (req, res, next) {
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  if (tokenObj) {
    usersList.findOne({ tel: tokenObj.tel }, function (error, results) {
      //用户id
      let uId = results.id
      var uid = mongoose.Types.ObjectId(uId);
      //查询购物车
      cartsList.find({ uId: uid }, function (err, result) {
        res.send({
          data: {
            code: 200,
            success: true,
            data: result
          }
        })
      })
    })
  } else {
    res.send({
      data: {
        code: 301,
        success: false,
        msg: '请登录'
      }
    })
  }
})

//删除一个购物车数据
router.post('/api/deleteCart/one', function (req, res, next) {
  let cartsGoodsId = req.body.cartsGoodsId
  let cgid = mongoose.Types.ObjectId(cartsGoodsId)
  cartsList.remove({ _id: cgid }, { justOne: 1 }, function (error, results) {
    res.send({
      data: {
        code: 200,
        msg: '删除成功',
        success: true
      }
    })
  })
})

//删除多个购物车数据
router.post('/api/deleteCart/many', function (req, res, next) {
  let cartsGoodsId = req.body.cartsGoodsId
  let cgid = []
  for (let j = 0; j < cartsGoodsId.length; j++) {
    cgid.push(mongoose.Types.ObjectId(cartsGoodsId[j]))
  }
  for (let i = 0; i < cgid.length; i++) {
    cartsList.remove({ _id: cgid[i] }, { justOne: 1 }, function (error, results) {
      if (i == cgid.length - 1) {
        res.send({
          data: {
            code: 200,
            msg: '删除成功',
            success: true
          }
        })
      }
    })
  }
})

//修改购物车数量
router.post('/api/updateNum', function (req, res, next) {
  let id = req.body.id
  let cid = mongoose.Types.ObjectId(id)
  let num = req.body.num
  cartsList.updateOne({ _id: cid }, { $set: { goods_num: num } }, function (error, results) {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: '修改成功'
      }
    })
  })
})

//新增地址
router.post('/api/addAddress', function (req, res, next) {
  let body = req.body
  let [name, tel, province, city, county, addressDetail, isDefault, areaCode] =
    [
      body.name,
      body.tel,
      body.province,
      body.city,
      body.county,
      body.addressDetail,
      body.isDefault,
      body.areaCode
    ]

  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  if (tokenObj) {
    usersList.findOne({ tel: tokenObj.tel }, function (error, results) {
      //用户id
      let uId = results.id
      let uid = mongoose.Types.ObjectId(uId)
      if (isDefault != 1) {
        addressesList.create({ "uId": uId, "name": name, "tel": tel, "province": province, "city": city, "county": county, "addressDetail": addressDetail, "isDefault": isDefault, "areaCode": areaCode }, function (err, result) {
          res.send({
            data: {
              code: 200,
              success: true,
              msg: '收货地址添加成功'
            }
          })
        })
      } else {
        addressesList.find({ uId: uid, isDefault: 1 }, function (e, r) {
          if (r) {
            let aid = []
            for (let j = 0; j < r.length; j++) {
              aid.push(mongoose.Types.ObjectId(r[j]))
            }
            addressesList.updateMany({ _id: aid }, { $set: { isDefault: 0 } }, function () {
              addressesList.create({ "uId": uId, "name": name, "tel": tel, "province": province, "city": city, "county": county, "addressDetail": addressDetail, "isDefault": isDefault, "areaCode": areaCode }, function (err, result) {
                res.send({
                  data: {
                    code: 200,
                    success: true,
                    msg: '收货地址添加成功'
                  }
                })
              })
            })
          } else {
            addressesList.create({ "uId": uId, "name": name, "tel": tel, "province": province, "city": city, "county": county, "addressDetail": addressDetail, "isDefault": isDefault, "areaCode": areaCode }, function (err, result) {
              res.send({
                data: {
                  code: 200,
                  success: true,
                  msg: '收货地址添加成功'
                }
              })
            })
          }
        })

      }
    })
  }
})

//查询收货地址
router.post('/api/selectAddress', function (req, res, next) {
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  usersList.findOne({ tel: tokenObj.tel }, function (error, results) {
    //用户id
    let uId = results.id
    let uid = mongoose.Types.ObjectId(uId)
    addressesList.find({ uId: uid }, function (err, result) {
      res.send({
        data: {
          code: 200,
          success: true,
          meg: '查询成功',
          data: result
        }
      })
    })
  })
})

//修改地址
router.post('/api/updateAddress', function (req, res, next) {
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  let body = req.body
  let [_id, name, tel, province, city, county, addressDetail, isDefault, areaCode] =
    [
      body._id,
      body.name,
      body.tel,
      body.province,
      body.city,
      body.county,
      body.addressDetail,
      body.isDefault,
      body.areaCode
    ]
  console.log(_id, name, tel, province, city, county, addressDetail, isDefault, areaCode);
  let id = mongoose.Types.ObjectId(_id)
  usersList.findOne({ tel: tokenObj.tel }, function (error, results) {
    //用户id
    let uId = results.id
    let uid = mongoose.Types.ObjectId(uId)
    addressesList.find({ uId: uid, isDefault: 1 }, function (e, r) {
      let aid = []
      for (let j = 0; j < r.length; j++) {
        aid.push(mongoose.Types.ObjectId(r[j]))
      }
      if (isDefault == 1) {
        addressesList.updateMany({ _id: aid }, { $set: { isDefault: 0 } }, function () {
          addressesList.updateOne({ _id: id, uId: uid }, { $set: { name: name, tel: tel, province: province, city: city, county: county, addressDetail: addressDetail, isDefault: isDefault, areaCode: areaCode } }, function (err, result) {
            res.send({
              code: 200,
              success: true,
              meg: '修改成功',
              data: result
            })
          })
        })
      } else {
        addressesList.updateOne({ _id: id, uId: uid }, { $set: { name: name, tel: tel, province: province, city: city, county: county, addressDetail: addressDetail, isDefault: isDefault, areaCode: areaCode } }, function (err, result) {
          res.send({
            code: 200,
            success: true,
            meg: '修改成功',
            data: result
          })
        })
      }

    })
  })

})

//删除地址
router.post('/api/deleteAddress', function (req, res, next) {
  let id = req.body.id
  let aid = mongoose.Types.ObjectId(id)
  addressesList.remove({ _id: aid }, { justOne: 1 }, function (error, results) {
    res.send({
      data: {
        code: 200,
        msg: '删除成功',
        success: true
      }
    })
  })
})

//生成订单
router.post('/api/addOrder', function (req, res, next) {
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  let goodsArr = req.body.arr
  //生成订单号 规则：时间戳+6位随机数
  function setTimeDateFmt(s) {
    return s < 10 ? '0' + s : s
  }
  function randomNumber() {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()

    month = setTimeDateFmt(month)
    day = setTimeDateFmt(day)
    hour = setTimeDateFmt(hour)
    minutes = setTimeDateFmt(minutes)
    seconds = setTimeDateFmt(seconds)
    let orderCode = now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString()
    return orderCode
  }
  /*
  未支付：1
  待支付：2
  支付成功：3
  支付失败：4|0
  */
  //商品列表
  let goodsName = []
  //订单总金额
  let goodsPrice = 0
  //订单商品总数量
  let goodsNum = 0

  goodsArr.forEach(v => {
    goodsName.push(v.goods_name)
    goodsPrice += v.goods_price * v.goods_num
    goodsNum += parseInt(v.goods_num)
  });
  //查询当前用户
  usersList.findOne({ tel: tokenObj.tel }, function (error, results) {
    //用户id
    let uId = results.id
    let uid = mongoose.Types.ObjectId(uId)
    let oid = randomNumber()
    ordersList.create({ "uId": uId, "order_id": oid, "goods_name": goodsName, "goods_price": goodsPrice, "goods_num": goodsNum, "order_status": 1 }, function (err, result) {
      ordersList.findOne({ uId: uid, order_id: oid }, function (e, r) {
        res.send({
          data: {
            code: 200,
            success: true,
            //返回订单号
            data: r
          }
        })
      })
    })
  })
})

//查询订单
router.post('/api/selectOrder', function (req, res, next) {
  let order_id = req.body.order_id
  ordersList.findOne({ order_id: order_id }, function (err, result) {
    res.send({
      data: {
        code: 200,
        success: true,
        //返回订单号
        data: result
      }
    })
  })
})

//修改订单状态  
router.post('/api/submitOrder', function (req, res, next) {
  let order_id = req.body.order_id
  let shopArr = req.body.shopArr
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //查询当前用户
  usersList.findOne({ tel: tokenObj.tel }, function (error, results) {
    //用户id
    let uId = results.id
    let uid = mongoose.Types.ObjectId(uId)
    ordersList.findOne({ order_id: order_id, uId: uid }, function (err, result) {
      //订单id
      let id = result._id
      let oid = mongoose.Types.ObjectId(id)
      //修改订单状态
      ordersList.updateOne({ _id: oid }, { $set: { order_status: 2 } }, function (e, r) {
        //删除购物车数据
        shopArr.forEach(v => {
          let vid = mongoose.Types.ObjectId(v)
          cartsList.remove({ _id: vid }, { justOne: 1 }, function (error, results) {

          })
        })
        res.send({
          data: {
            code: 200,
            success: true
          }
        })
      })
    })
  })
})

//发起支付
router.post('/api/payment', function (req, res, next) {
  //订单号
  let orderId = req.body.order_id;
  //商品总价
  let price = req.body.price;
  //购买商品的名称
  let name = req.body.name;
  //开始对接支付宝API
  const formData = new AlipayFormData()
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get');
  // 支付时信息
  formData.addField('bizContent', {
    outTradeNo: orderId,//订单号
    productCode: 'FAST_INSTANT_TRADE_PAY',//写死的
    totalAmount: price,//价格
    subject: name,//商品名称
  });
  //支付成功或者失败跳转的链接
  formData.addField('returnUrl', 'http://localhost:8080/payment');
  //返回promise
  const result = alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData: formData },
  );
  //对接支付宝成功，支付宝方返回的数据
  result.then(resp => {
    res.send({
      data: {
        code: 200,
        success: true,
        msg: '支付中',
        paymentUrl: resp
      }
    })
  })
})


//支付状态
router.post('/api/successPayment', function (req, res, next) {
  let token = req.headers.token
  let tokenObj = jwt.decode(token)
  //前端传过来的数据
  //订单号
  let out_trade_no = req.body.out_trade_no
  let trade_no = req.body.trade_no
  //支付宝配置
  const formData = new AlipayFormData()
  formData.setMethod('get');
  formData.addField('bizContent', {
    out_trade_no,
    trade_no
  });
  //返回promise
  const result = alipaySdk.exec(
    'alipay.trade.query',
    {},
    { formData: formData },
  );
  //后端请求支付宝
  result.then(resData => {
    axios({
      method: 'GET',
      url: resData
    }).then(data => {
      let responseCode = data.data.alipay_trade_query_response
      if (responseCode.code == '10000') {
        switch (responseCode.trade_status) {
          case 'WAIT_BUYER_PAY':
            res.send({
              data: {
                code: 0,
                data: {
                  msg: '支付宝有交易记录，没付款'
                }
              }
            })
            break;

          case 'TRADE_CLOSED':
            res.send({
              data: {
                code: 1,
                data: {
                  msg: '交易关闭'
                }
              }
            })
            break;

          case 'TRADE_FINISHED':
            //查询当前用户
            usersList.findOne({ tel: tokenObj.tel }, function (error, results) {
              //用户id
              let uId = results.id
              let uid = mongoose.Types.ObjectId(uId)
              ordersList.findOne({ uId: uid, order_id: out_trade_no }, function (err, result) {
                let id = result._id
                let oid = mongoose.Types.ObjectId(id)
                ordersList.updateOne({ _id: oid }, { $set: { order_status: 3 } }, function (e, r) {
                  res.send({
                    data: {
                      code: 2,
                      data: {
                        msg: '交易完成,不可退款'
                      }
                    }
                  })
                })

              })
            })
            break;

          case 'TRADE_SUCCESS':
            //查询当前用户
            usersList.findOne({ tel: tokenObj.tel }, function (error, results) {
              //用户id
              let uId = results.id
              let uid = mongoose.Types.ObjectId(uId)
              ordersList.findOne({ uId: uid, order_id: out_trade_no }, function (err, result) {
                let id = result._id
                let oid = mongoose.Types.ObjectId(id)
                ordersList.updateOne({ _id: oid }, { $set: { order_status: 3 } }, function (e, r) {
                  res.send({
                    data: {
                      code: 2,
                      data: {
                        msg: '交易完成'
                      }
                    }
                  })
                })

              })
            })
            break;
        }
      } else if (responseCode.code == '40004') {
        res.send({
          data: {
            code: 4,
            msg: '交易不存在'
          }
        })
      }
    }).catch(err => {
      res.send({
        data: {
          code: 500,
          msg: '交易失败',
          err
        }
      })
    })
  })
})


module.exports = router;
