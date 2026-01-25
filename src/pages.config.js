import Acessibilidade from './pages/Acessibilidade';
import Auditoria from './pages/Auditoria';
import Backoffice from './pages/Backoffice';
import ConsultarProtocolo from './pages/ConsultarProtocolo';
import Home from './pages/Home';
import NovaManifestacao from './pages/NovaManifestacao';
import Termos from './pages/Termos';
import FAQ from './pages/FAQ';


export const PAGES = {
    "Acessibilidade": Acessibilidade,
    "Auditoria": Auditoria,
    "Backoffice": Backoffice,
    "ConsultarProtocolo": ConsultarProtocolo,
    "Home": Home,
    "NovaManifestacao": NovaManifestacao,
    "Termos": Termos,
    "FAQ": FAQ,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};