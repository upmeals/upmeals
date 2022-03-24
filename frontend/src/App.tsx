import React, { Suspense } from 'react';
import ConfigProvider from './config/ConfigProvider';
import config from './config';
import history from './history';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import RoutedApp from './config/routes/middlewares/RoutedApp';
import { Router } from 'react-router-dom';
import { initApp } from './services/init'
import { ApolloProvider } from '@apollo/client';
import GQLService from './services/gql/GQLService';
import { SnackbarProvider } from 'notistack';
import ModalRouter from './components/ui/ModalRouter';


let client = new GQLService().client


function App() {
	React.useEffect(() => {
		initApp()
	}, [initApp]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<ApolloProvider client={client}>
			<ConfigProvider>
				<MuiThemeProvider theme={config().theme}>
					<SnackbarProvider maxSnack={3}>
						<Router history={history}>
							<Suspense
								fallback={null}
							>
								<>
									<RoutedApp routes={config().routes} />
									<ModalRouter />
								</>
							</Suspense>
						</Router>
					</SnackbarProvider>
				</MuiThemeProvider>
			</ConfigProvider >
		</ApolloProvider>
	)
}


export default App;
