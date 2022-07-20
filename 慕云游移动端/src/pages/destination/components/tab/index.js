import './tab.css';
import { URL, TAB_ITEM_CLASS, TAB_ITEM_CLASS_NAME } from './config';
import { getData, getDelayedData } from 'api/getData';

// https://www.imooc.com/api/mall-wepApp/destination/content/1


class Tab {
    constructor(el) {
        this.itemEls = el.querySelectorAll(TAB_ITEM_CLASS);
    }
    setActiveItem(index) {
        for (const itemEl of this.itemEls) {
            itemEl.classList.remove(TAB_ITEM_CLASS_NAME);
        }

        this.itemEls[index].classList.add(TAB_ITEM_CLASS_NAME);
    }
    to(index) {
        // 取消上一次请求
        if (this.dataPromise && this.dataPromise.xhr) {
            this.dataPromise.xhr.abort();
        }


        this.setActiveItem(index);

        this.dataPromise = getDelayedData(`${URL}/${this.itemEls[index].dataset.id}`);
        // xhr.abort()

        return this.dataPromise;
    }
}
export default Tab;