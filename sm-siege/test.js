var siege = require('siege')

siege()
    .host('https://fb-tools.myg.vn/fbtool/')
    .on(80)
    .concurrent(1)
    .for(10000).times
    .get('/')
    // .get('/api/eth/0x22738c27Af2cDD113ed57f8BF540A354fC9CB57F')
    .attack()