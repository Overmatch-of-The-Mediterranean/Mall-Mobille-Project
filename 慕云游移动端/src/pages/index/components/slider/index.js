import 'swiper/swiper-bundle.min.css';
import './slider.css';

import Swiper from 'swiper/swiper-bundle.min';
import config, { SWIPER_CONTAINER_CLASS } from './config'

import render from './slider.art';
import { getData, getDelayedData } from 'api/getData';

getData('https://www.imooc.com/api/mall-wepApp/index/slider')
    .then(data => {
        document.getElementById('index-slider').innerHTML = render({
            ...config, ...{
                imgs: data
            }
        });
    });

new Swiper(SWIPER_CONTAINER_CLASS, config)

// https://www.imooc.com/api/mall-wepApp/index/slider

