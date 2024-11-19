import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

const mixpanelToken = import.meta.env.VITE_MiXPANEL_TOKEN;
import mixpanel from 'mixpanel-browser';

mixpanel.init(mixpanelToken, {
  api_host: "https://wk-mixpanel-proxy.kellerti.workers.dev",
});

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
)
