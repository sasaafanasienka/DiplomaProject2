export class NewsApi {

    constructor(template) {
        this.template = template;
    };

    request() {
        return fetch(this.template)
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                return result;
            })
            // .catch(() => {
            //     newCardList.removePreloader();
            //     newCardList.renderNoResult('badRequest');
            // });
    };

}