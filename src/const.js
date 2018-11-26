

module.exports = {

    SECRET_KEY:process.env.SECRET_KEY || "cAt6O0OA6+NKWHhYWI24yTu/8eE=",
    SECRET_KEY_STRIPE:process.env.SECRET_KEY || "sk_test_3ftJ9khmIXDOZ9Yyivy0fi5W",
    SUBSCRIPTIONS_TYPES:{
        "GOLD":"plan_E1B15S3vHdc58e",
        "PREMIUM":"plan_E1AzXj2DpumvLI"
    },
    MONGO_URI:'mongodb://prueba:prueba123@ds161856.mlab.com:61856/netflix-cul',
    TEST_MONGO_URI:"mongodb://prueba:prueba12@ds161391.mlab.com:61391/netflix-test"


}