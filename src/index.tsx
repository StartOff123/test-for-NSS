import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@redux/store';

import App from './App';
import './styles/index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<ReduxProvider store={store}>
		<App />
	</ReduxProvider>
);
