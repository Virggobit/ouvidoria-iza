import Home from './pages/Home';
import NovaManifestacao from './pages/NovaManifestacao';
import ConsultarProtocolo from './pages/ConsultarProtocolo';
import Backoffice from './pages/Backoffice';
import Acessibilidade from './pages/Acessibilidade';
import Termos from './pages/Termos';
import Auditoria from './pages/Auditoria';


export const PAGES = {
    "Home": Home,
    "NovaManifestacao": NovaManifestacao,
    "ConsultarProtocolo": ConsultarProtocolo,
    "Backoffice": Backoffice,
    "Acessibilidade": Acessibilidade,
    "Termos": Termos,
    "Auditoria": Auditoria,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};