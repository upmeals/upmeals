import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen(() => {
    // Segment Page Call
});

export default history;