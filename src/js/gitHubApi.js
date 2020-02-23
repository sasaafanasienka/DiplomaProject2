import { gitHubApiAdress } from "./constants";

export class GitHubApi {

    request() {
        // console.log('making githubapi request')
        return fetch(`${gitHubApiAdress}`)
        .then((res) => {
            return res.json() // если всё хорошо, получили ответ
        })
        .then((result) => {
            // console.log(result)
            return result.slice(0, 20);
        })
    }
};