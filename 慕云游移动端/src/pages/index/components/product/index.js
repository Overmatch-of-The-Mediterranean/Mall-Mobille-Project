import './product.css';
import { getData, getDelayedData } from 'api/getData';
import { URL, LAYOUT_ID } from './config';
import render from './items.art'
// https://www.imooc.com/api/mall-wepApp/index/product?icode=J6DDC8E3E7A8BF54C
getData(URL)
    .then(data => {
        document.getElementById(LAYOUT_ID).innerHTML = render({
            items: data
        })
    })

