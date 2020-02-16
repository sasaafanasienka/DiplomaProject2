import { gitHubApiAdress } from "./constants";
import { newRenderCommitCards } from "./renderCommitCards";

class GitHubApi {

    request() {
        return fetch(`${gitHubApiAdress}`)
        .then((res) => {
            return res.json() // если всё хорошо, получили ответ
        })
        .then((result) => {
            return result;
        })
        .catch(() => {
            newRenderCommitCards.renderError(); 
        });
    }
};

export const newGitHubApiRequest = new GitHubApi()