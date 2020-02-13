import { gitHubApiAdress} from "./constants";

export class GitHubApi {

    constructor() {
        this.request();
    };

    async request() {

        let res = await fetch(`${gitHubApiAdress}`)
            if (res.ok) {
                const result = await res.json();
                return result;
            } else {
            return Promise.reject('Ошибка: ${response.status}')
            }
        }
};