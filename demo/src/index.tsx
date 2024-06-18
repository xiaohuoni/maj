import { createRoot } from 'react-dom/client';
import { App } from './App';
import './global';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
