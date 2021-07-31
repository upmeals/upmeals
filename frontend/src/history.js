import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen(() => {
    // Segment Page Call
    if (window.location.pathname.indexOf('/backoffice') === -1) {
        window.analytics && window.analytics.page();
    }
});

export default history;