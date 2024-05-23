const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const {
  bithumbService
} = require("../services");
const httpStatus = require("http-status");
const bithumbApiServer = require("../services/bithumb.service");
const { bithumbApiKey, bithumbSecretKey } = require("../config/config");

const buyCoin = catchAsync(async (req, res) => {
    const data = { ...req.query, ...req.params, ...req.body };

    try {
      // exchage 확인
      if (data.exchange === 'bithumb') {
        // 주문 api 호출 
        // apiKey, apiSecretKey 조회
        // body data 생성
        const bodyObj = {
          order_currency: data.coinName,
          payment_currency: 'KRW',
          units: 5.01,
          price: data.paymentAmount,
          type: 'bid'
        }

        const result = await bithumbApiServer.post('/trade/place', bodyObj, '', bithumbApiKey, bithumbSecretKey)
        // console.log(result)
        return res.send(result);
      } else {
        throw new ApiError(httpStatus.NOT_FOUND, "Exchange not found")
      }
    } catch (e) {
      console.log(e)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR")
    }
  });


module.exports = {
  buyCoin
}