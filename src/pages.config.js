import Acessibilidade from './pages/Acessibilidade';
import Auditoria from './pages/Auditoria';
import Backoffice from './pages/Backoffice';
import ConsultarProtocolo from './pages/ConsultarProtocolo';
import Home from './pages/Home';
import NovaManifestacao from './pages/NovaManifestacao';
import Termos from './pages/Termos';


export const PAGES = {
    "Acessibilidade": Acessibilidade,
    "Auditoria": Auditoria,
    "Backoffice": Backoffice,
    "ConsultarProtocolo": ConsultarProtocolo,
    "Home": Home,
    "NovaManifestacao": NovaManifestacao,
    "Termos": Termos,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};