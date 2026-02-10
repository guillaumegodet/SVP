export type HistoryEvent = {
    id: string;
    user: string;
    userAvatar?: string;
    action: string;
    timestamp: string;
    details?: string;
};

export type Author = {
    name: string;
    firstName: string;
    lastName: string;
    laboratory: string;
    position: string;
    employer: string;
    orcid?: string;
    hal?: string;
    idref?: string;
    avatar?: string;
    isInternal?: boolean;
};

export type Journal = {
    name: string;
    type: string;
    issn: string;
    publisher: string;
    publisherCountry: string;
    accessType: 'gold' | 'diamond' | 'hybrid' | 'bronze' | 'closed';
};

export type Publication = {
    title: string;
    authors: string;
    date: string;
    status: string;
    statusType: 'warning' | 'success';
    source: string;
    journal?: string;
    type: string;
    abstract: string;
    doi?: string;
    hal?: string;
    sudocPpn?: string;
    openAccessStatus: 'green' | 'gold' | 'diamond' | 'hybrid' | 'bronze';
    history: HistoryEvent[];
    halHasFile?: boolean;
    halInLabCollection?: boolean;
    halNeedsUpdate?: boolean;
    dataSources?: string[];
};
