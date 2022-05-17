import { Redirect, Route, Switch } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import React from 'react';
import RoutingContext from './RoutingContext';
import NotFound from '../../../components/ui/NotFound';

export const computeRoutes = (routes = [], base = '') => {
    let result = [];
    routes.forEach(route => {
        const path = base + route.path;
        result = result.concat(path).concat(computeRoutes(route.routes, path));
    });
    return result;
};

const RoutedApp = ({ routes }) => {
    const renderRoutes = (levelPath, { path, routes = null, isProtected, ...props }) => {
        const Component = isProtected !== undefined ? ProtectedRoute : Route;

        return (
            <Component key={levelPath + path} path={levelPath + path} isProtected={isProtected} {...props}>
                {routes && <Switch>{routes.map(route => renderRoutes(levelPath + path, route))}</Switch>}
            </Component>
        );
    };

    const renderShortener = (levelPath, { path, routes = [], short }) => {
        const redirects = [];
        if (short) {
            redirects.push(<Redirect push to={levelPath + path} from={short} />);
        }
        routes.forEach(route => {
            renderShortener(levelPath + path, route).forEach(subRedirect => redirects.push(subRedirect));
        });
        return redirects;
    };

    const [allRoutes, setAllRoutes] = React.useState([]);

    React.useEffect(() => {
        setAllRoutes(computeRoutes(routes));
    }, [routes]);

    return (
        <RoutingContext.Provider value={allRoutes}>
            <Switch>
                {routes.map(route => renderRoutes('', route))}
                {routes.map(route => renderShortener('', route))}
                <Route component={NotFound} />
            </Switch>
        </RoutingContext.Provider>
    );
};

export default RoutedApp;