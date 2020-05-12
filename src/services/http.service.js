import axios from 'axios';
import Cookies from 'js-cookie';
import { jnDialog } from '@jobbnorge/jn-components/src/ui_components/jn-dialog/jn-dialog';
import Config from 'Config';

class HttpService {

    constructor() {
        this.axios = axios.create({
            headers: { 'Authorization': `Bearer ${Cookies.get('.auth.token.2')}` },
            baseURL: Config.urls.apiBase
        });
        this.axios.interceptors.response.use(this.successInterceptor, this.errorInterceptor);
        setInterval(() => this.renewAuthToken(), 1000 * 60 * 5);
    }

    successInterceptor(response) {
        return response;
    }

    errorInterceptor({ response: errResponse }) {
        if (errResponse.status === 401) {
            return new Promise(() => {
                jnDialog.info({
                    modalTitle: "Session har gått ut",
                    modalBody: "Din session har gått ut, du må logge deg inn på nytt for å kunne fortsette.",
                    resolveButton: {
                        visible: true,
                        text: "Til login"
                    }
                }).then(() => window.location.href = `${Config.urls.jobbadminBase}login.aspx?returnurl=/apps/jobbadmin/MyAdministration.aspx?pageid=360`);
            });
        } else {
            return errResponse;
        }
    }

    renewAuthToken() {
        this.axios.get('token/renew', {
            baseURL: Config.urls.apiBase,
            params: {
                client_id: "jobbnorge.jobbadmin"
            }
        })
            .then(({ data: { token, tokenExpires } }) => {
                this.axios.defaults.headers.Authorization = `Bearer ${token}`;
                Cookies.set('.auth.token.2', token, { expires: new Date(tokenExpires), path: '/', domain: Config.authCookie.domain });
            })
            .catch((err) => console.error(err));
    }
}    

export const httpService = new HttpService();