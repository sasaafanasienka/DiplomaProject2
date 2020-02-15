import { gitHubApiAdress } from "./constants";

class GitHubApi {

    async request() {

        const res = await fetch(`${gitHubApiAdress}`)
            if (res.ok) {
                const result = await res.json();
                return result;
            } else {
            return Promise.reject('Ошибка: ${response.status}')
            }
        }
};

export const newGitHubApiRequest = new GitHubApi()