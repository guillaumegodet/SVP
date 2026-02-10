import {
    BookOpen,
    MessageSquare,
    GraduationCap,
    FileText
} from 'lucide-react';
import { PaperclipIcon, NoAttachIcon } from '../components/HalIcons';
import { Publication, Author, Journal } from '../types';

// Asset imports
import imgAvatar from "figma:asset/a7e73c4853a51cc1d7738b57bc8f5fb907ed70e6.png";
import imgOpenAlex from "figma:asset/c3e845dcd7fbf8e813f65222ea98666fe44e1814.png";
import imgHal from "figma:asset/d9ef9050c44ba1f1beafb7d579804fea2662df0e.png";
import imgScanR from "figma:asset/9435993bce15f5ee72b0f7570df0382bb3b4c8c8.png";
import imgOrcid from "figma:asset/6e3dbbc34225b24e434ec4a2f2b823e2d5f2a95c.png";
import imgHalProfile from "figma:asset/da60111133ce4fee28bc0ac92f48f081549aa44e.png";
import imgIdref from "figma:asset/834dc63c7f6fca9ae8d639d93da14de67568ef11.png";

export { imgAvatar, imgOpenAlex, imgHal, imgScanR, imgOrcid, imgHalProfile, imgIdref };

// Helper function to get document type info
export const getDocumentTypeInfo = (type: string) => {
    switch (type) {
        case 'ART':
            return { icon: BookOpen, label: 'Article', color: 'text-blue-600', muiColor: '#2563eb' };
        case 'COMM':
            return { icon: MessageSquare, label: 'Communication', color: 'text-purple-600', muiColor: '#9333ea' };
        case 'THESE':
            return { icon: GraduationCap, label: 'Thèse', color: 'text-green-600', muiColor: '#16a34a' };
        default:
            return { icon: FileText, label: 'Document', color: 'text-gray-600', muiColor: '#4b5563' };
    }
};

// Helper function to get open access status info
export const getOpenAccessInfo = (status: 'green' | 'gold' | 'diamond' | 'hybrid' | 'bronze' | 'closed') => {
    switch (status) {
        case 'green':
            return { color: '#006A61', label: 'Green Open Access' };
        case 'gold':
            return { color: '#eab308', label: 'Gold Open Access' };
        case 'diamond':
            return { color: '#06b6d4', label: 'Diamond Open Access' };
        case 'hybrid':
            return { color: '#f97316', label: 'Hybrid Open Access' };
        case 'bronze':
            return { color: '#b45309', label: 'Bronze Open Access' };
        case 'closed':
            return { color: '#6b7280', label: 'Closed Access' };
    }
};

// Helper function to format relative time
export const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return 'à l\'instant';
    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    }
    if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        if (days === 1) return 'hier';
        return `il y a ${days} jours`;
    }
    if (diffInSeconds < 2592000) {
        const weeks = Math.floor(diffInSeconds / 604800);
        return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
    }
    const months = Math.floor(diffInSeconds / 2592000);
    return `il y a ${months} mois`;
};

// Helper function to get HAL status info
export const getHalStatusInfo = (pub: Publication, labName: string = 'LPED') => {
    if (pub.status === 'Hors HAL') {
        return {
            color: '#DE3730',
            bgColor: '#FFEBEE',
            icon: null,
            tooltip: `Ce document n'a pas été trouvé sur HAL`
        };
    }

    const notInCollection = !pub.halInLabCollection;
    const needsUpdate = pub.halNeedsUpdate;

    if (notInCollection || needsUpdate) {
        let tooltipText = '';

        if (notInCollection && needsUpdate) {
            tooltipText = `Plusieurs actions requises : ${pub.halHasFile ? 'Fichier' : 'Notice'} absent(e) de la collection HAL du ${labName} et mise à jour nécessaire`;
        } else if (notInCollection) {
            tooltipText = `${pub.halHasFile ? 'Fichier' : 'Notice'} absent(e) de la collection HAL du ${labName}`;
        } else {
            tooltipText = `Des différences ont été détectées entre SoVisu+ et HAL`;
        }

        return {
            color: '#ED6C02',
            bgColor: '#FFF4E5',
            icon: pub.halHasFile ? PaperclipIcon : NoAttachIcon,
            tooltip: tooltipText
        };
    }

    return {
        color: '#006A61',
        bgColor: '#E0F2F1',
        icon: pub.halHasFile ? PaperclipIcon : NoAttachIcon,
        tooltip: `${pub.halHasFile ? 'Fichier' : 'Notice'} déposé(e) dans la collection HAL du ${labName}`
    };
};

export const publications: Publication[] = [
    {
        title: "Is Resilience a Consensual Concept? A Quantitative Assessment of Food Security Projects in Burkina Faso",
        authors: "Pierre Janin, Quentin Boudot",
        date: "2024-09-08",
        status: "Dans HAL",
        statusType: "warning",
        source: "Food ethics",
        journal: "Food Policy",
        type: "ART",
        abstract: "This article examines the concept of resilience in food security projects through a quantitative assessment of various initiatives in Burkina Faso.",
        doi: "10.1007/s41055-024-00123-4",
        hal: "hal-05357889",
        sudocPpn: "193726130",
        openAccessStatus: 'green',
        halHasFile: true,
        halInLabCollection: true,
        halNeedsUpdate: true,
        dataSources: ['HAL', 'OpenAlex', 'Scopus'],
        history: [
            {
                id: '1',
                user: 'SVP Harvester',
                action: 'created this item',
                timestamp: '2024-05-15T10:00:00Z'
            },
            {
                id: '2',
                user: 'guillaumegodet',
                userAvatar: imgAvatar,
                action: 'added one domain',
                timestamp: '2024-11-12T14:30:00Z'
            },
            {
                id: '3',
                user: 'jdornbusch',
                userAvatar: imgAvatar,
                action: 'changed the title',
                timestamp: '2024-11-13T09:15:00Z'
            },
            {
                id: '4',
                user: 'Pierre Janin',
                userAvatar: imgAvatar,
                action: 'updated the abstract',
                timestamp: '2024-11-13T16:45:00Z',
                details: 'Modified abstract to include quantitative assessment details'
            }
        ]
    },
    {
        title: "Assessing the sustainability of food systems in sub- and Mediterranean & middle east_none_contributors",
        authors: "Estella Fourat, Éric Blanchart, Miriam Carù",
        date: "2024-01-01",
        status: "Dans HAL",
        statusType: "success",
        source: "PLOS sustainability and transformation",
        journal: "Global Food Security",
        type: "ART",
        abstract: "A comprehensive study on the sustainability of food systems across Mediterranean and Middle Eastern regions.",
        doi: "10.1371/journal.pstr.0000123",
        hal: "hal-04892345",
        sudocPpn: "194523456",
        openAccessStatus: 'gold',
        halHasFile: true,
        halInLabCollection: true,
        halNeedsUpdate: false,
        dataSources: ['HAL', 'OpenAlex'],
        history: [
            {
                id: '5',
                user: 'SVP Harvester',
                action: 'created this item',
                timestamp: '2023-12-20T10:00:00Z'
            },
            {
                id: '6',
                user: 'Estella Fourat',
                userAvatar: imgAvatar,
                action: 'added co-authors',
                timestamp: '2024-01-02T11:20:00Z'
            },
            {
                id: '7',
                user: 'admin_hal',
                action: 'moved to collection',
                timestamp: '2024-01-05T15:00:00Z'
            }
        ]
    },
    {
        title: "Défis de la gouvernance et pratiques de régulation alimentaires durables : Le retour du politique et du...",
        authors: "Pierre Janin, Eric Judt Koffi Nanzou, Sylvain...",
        date: "2023-12-01",
        status: "Dans HAL",
        statusType: "warning",
        source: "Current opinion in environmental sustainability",
        journal: "Sustainability",
        type: "ART",
        abstract: "Cette recherche explore les défis de gouvernance dans les pratiques de régulation alimentaires durables et le rôle du politique.",
        hal: "hal-04756789",
        openAccessStatus: 'diamond',
        halHasFile: false,
        halInLabCollection: false,
        halNeedsUpdate: false,
        dataSources: ['HAL', 'ScanR'],
        history: [
            {
                id: '8',
                user: 'SVP Harvester',
                action: 'created this item',
                timestamp: '2023-11-28T10:00:00Z'
            },
            {
                id: '9',
                user: 'Pierre Janin',
                userAvatar: imgAvatar,
                action: 'updated metadata',
                timestamp: '2023-12-01T14:30:00Z'
            },
            {
                id: '10',
                user: 'Eric Judt Koffi Nanzou',
                userAvatar: imgAvatar,
                action: 'added keywords',
                timestamp: '2023-12-03T10:15:00Z',
                details: 'Added: gouvernance, alimentation durable, politique'
            }
        ]
    },
    {
        title: "Innovations technologiques et transition agroécologique en Afrique subsaharienne",
        authors: "Quentin Boudot, Pierre Janin",
        date: "2024-03-15",
        status: "Hors HAL",
        statusType: "warning",
        source: "OpenAlex",
        journal: "Food Policy",
        type: "ART",
        abstract: "Cette étude explore l'impact des innovations technologiques sur la transition agroécologique dans les pays d'Afrique subsaharienne, en analysant les facteurs de réussite et les obstacles rencontrés.",
        doi: "10.1016/j.foodpol.2024.102567",
        openAccessStatus: 'green',
        dataSources: ['OpenAlex', 'Scopus'],
        history: [
            {
                id: '11',
                user: 'SVP Harvester',
                action: 'created this item',
                timestamp: '2024-03-16T10:00:00Z'
            },
            {
                id: '12',
                user: 'Quentin Boudot',
                userAvatar: imgAvatar,
                action: 'updated abstract',
                timestamp: '2024-03-18T14:30:00Z'
            }
        ]
    },
    {
        title: "Urban Agriculture and Food Security in West African Cities: A Comparative Analysis",
        authors: "Estella Fourat, Pierre Janin",
        date: "2023-09-20",
        status: "Dans HAL",
        statusType: "warning",
        source: "Scopus",
        journal: "Urban Studies",
        type: "ART",
        abstract: "This comparative study examines urban agriculture practices and their impact on food security across major cities in West Africa, highlighting both opportunities and challenges.",
        doi: "10.1177/00420980231234567",
        hal: "hal-04123456",
        openAccessStatus: 'hybrid',
        halHasFile: true,
        halInLabCollection: false,
        halNeedsUpdate: true,
        dataSources: ['HAL', 'OpenAlex', 'Scopus'],
        history: [
            {
                id: '13',
                user: 'SVP Harvester',
                action: 'created this item',
                timestamp: '2023-09-21T10:00:00Z'
            },
            {
                id: '14',
                user: 'Estella Fourat',
                userAvatar: imgAvatar,
                action: 'added affiliations',
                timestamp: '2023-09-25T14:20:00Z'
            }
        ]
    }
];

export const authorsDatabase: { [key: string]: Author } = {
    'Pierre Janin': {
        name: 'Pierre Janin',
        firstName: 'Pierre',
        lastName: 'Janin',
        laboratory: 'UMR Prodig',
        position: 'Directeur de recherche',
        employer: 'IRD',
        orcid: 'https://orcid.org/0000-0002-1234-5678',
        hal: 'https://hal.science/search/index/?q=pierre-janin',
        idref: 'https://www.idref.fr/027253139',
        isInternal: true
    },
    'Quentin Boudot': {
        name: 'Quentin Boudot',
        firstName: 'Quentin',
        lastName: 'Boudot',
        laboratory: 'UMR Prodig',
        position: 'Doctorant',
        employer: 'Université Paris 1',
        orcid: 'https://orcid.org/0000-0003-9876-5432',
        hal: 'https://hal.science/search/index/?q=quentin-boudot',
        isInternal: true
    },
    'Estella Fourat': {
        name: 'Estella Fourat',
        firstName: 'Estella',
        lastName: 'Fourat',
        laboratory: 'LISIS',
        position: 'Maître de conférence',
        employer: 'Université Paris-Est',
        orcid: 'https://orcid.org/0000-0001-2345-6789',
        hal: 'https://hal.science/search/index/?q=estella-fourat',
        idref: 'https://www.idref.fr/123456789'
    },
    'Éric Blanchart': {
        name: 'Éric Blanchart',
        firstName: 'Éric',
        lastName: 'Blanchart',
        laboratory: 'UMR Eco&Sols',
        position: 'Directeur de recherche',
        employer: 'IRD',
        orcid: 'https://orcid.org/0000-0002-5555-4444',
        hal: 'https://hal.science/search/index/?q=eric-blanchart'
    },
    'Miriam Carù': {
        name: 'Miriam Carù',
        firstName: 'Miriam',
        lastName: 'Carù',
        laboratory: 'CESAER',
        position: 'Professeur',
        employer: 'AgroSup Dijon',
        orcid: 'https://orcid.org/0000-0003-7777-8888',
        hal: 'https://hal.science/search/index/?q=miriam-caru',
        idref: 'https://www.idref.fr/987654321'
    },
    'Eric Judt Koffi Nanzou': {
        name: 'Eric Judt Koffi Nanzou',
        firstName: 'Eric Judt Koffi',
        lastName: 'Nanzou',
        laboratory: 'UMR Prodig',
        position: 'Chercheur',
        employer: 'CNRS',
        hal: 'https://hal.science/search/index/?q=eric-nanzou',
        isInternal: true
    }
};

export const journalsDatabase: { [key: string]: Journal } = {
    'Food Policy': {
        name: 'Food Policy',
        type: 'Revue',
        issn: '0306-9192',
        publisher: 'Elsevier',
        publisherCountry: 'Pays-Bas',
        accessType: 'hybrid'
    },
    'Global Food Security': {
        name: 'Global Food Security',
        type: 'Revue',
        issn: '2211-9124',
        publisher: 'Elsevier',
        publisherCountry: 'Pays-Bas',
        accessType: 'gold'
    },
    'Sustainability': {
        name: 'Sustainability',
        type: 'Revue',
        issn: '2071-1050',
        publisher: 'MDPI',
        publisherCountry: 'Suisse',
        accessType: 'diamond'
    },
    'Journal of Development Studies': {
        name: 'Journal of Development Studies',
        type: 'Revue',
        issn: '0022-0388',
        publisher: 'Taylor & Francis',
        publisherCountry: 'Royaume-Uni',
        accessType: 'hybrid'
    }
};
