import './main.css';
import Tab from '../tab';
import Content from '../content';
import 'components/loading'
import { set, get } from 'utils/sessionStorage';
const tabEl = document.querySelector('.tab')
const tab = new Tab(tabEl);
const content = new Content(document.getElementById('destination-content'));
const itemEls = tabEl.querySelectorAll('.tab-item');

tabEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-item')) {
        const index = e.target.dataset.id - 1;

        const storageName = `destination_content_${index}`;
        const storageContent = get(storageName);

        if (storageContent) {
            tab.setActiveItem(index);

            content.set(storageContent);
        } else {
            const tabPromise = tab.to(index);

            content.setLoading();
            tabPromise
                .then(data => {
                    content.set(data);
                    set(storageName, data);
                });
        };
    }
}, false)

itemEls[0].click(); // 借用click()实现模拟点击
// tab.setActiveItem(1);
// tab.to(1)
//     .then(data => {
//         content.set(data);
//     });
