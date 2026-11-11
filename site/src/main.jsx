import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Theme} from '@astryxdesign/core/theme';
import {butterTheme} from '@astryxdesign/theme-butter/built';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import '@astryxdesign/theme-butter/theme.css';
import '@astryxdesign/theme-butter/fonts.css';
import './app.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme theme={butterTheme}>
      <App />
    </Theme>
  </StrictMode>,
);
