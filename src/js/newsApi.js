import { newCardList } from "./cardList";

class NewsApi {

    constructor(template) {
        this.template = template;
    };

    simpleRequest() {
        return fetch(this.template)
            .then((res) => {
                // console.log(res.ok);
                return res.json() // если всё хорошо, получили ответ
            })
            .then((result) => {
                return result;
            })
            .catch(() => {
                newCardList.removePreloader();
                newCardList.renderNoResult('badRequest');
            });
    };

}

export function newNewsApiRequest(template) {
    return new NewsApi(template);
}

// export class NewsApi {

//     constructor() {
//     };

//     async simpleRequest(template) {

//         let res = await fetch(template)
//             if (res.ok) {
//                 const result = await res.json();
//                 return result;
//             } else {
//             return Promise.reject('Ошибка: ${response.status}')
//             }
//         }
// };