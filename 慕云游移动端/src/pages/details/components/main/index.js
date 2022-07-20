import './main.css';

import { getData, getDelayedData } from 'api/getData';
import { URL, LAYOUT_ID } from './config';
import render from './main.art'
getData(URL)
    .then(data => {
        data = [data];
        console.log(data);
        document.getElementById(LAYOUT_ID).innerHTML = render({
            contents: data
        }
        )
    })