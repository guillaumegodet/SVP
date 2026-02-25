import React from 'react';
import {
    Eye,
    Search,
    X,
    ArrowUp,
    ArrowDown,
    Filter,
    Users,
    Calendar,
    FileText,
    Unlock,
    Clock,
    Star,
    ExternalLink,
    MoreVertical
} from 'lucide-react';
import {
    Chip,
    Tooltip,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    SvpBox,
    SvpTypography,
    SvpSurface,
    SvpButton,
    SvpIconButton,
    SvpColors
} from '../ui/SvpWrappers';
import { Publication, HistoryEvent } from '../../types';
import {
    getDocumentTypeInfo,
    getOpenAccessInfo,
    getHalStatusInfo,
    imgOpenAlex,
    imgHal,
    imgScanR
} from '../../constants';
import { usePublicationRenderers } from './PublicationRenderers';

interface PublicationListProps {
    publications: Publication[];
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    typeFilter: string;
    setTypeFilter: (value: string) => void;
    sortBy: 'date' | 'title' | 'authors';
    setSortBy: (value: 'date' | 'title' | 'authors') => void;
    sortDirection: 'asc' | 'desc';
    toggleSortDirection: () => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;
    highlightedPublications: Set<string>;
    setHighlightedPublications: React.Dispatch<React.SetStateAction<Set<string>>>;
    handleAuthorClick: (authorName: string, event: React.MouseEvent<HTMLElement>) => void;
    handleJournalClick: (journalName: string, event: React.MouseEvent<HTMLElement>) => void;
    handleHalStatusClick: (pub: Publication, event: React.MouseEvent<HTMLElement>) => void;
    handlePublicationClick: (pub: Publication) => void;
    setSelectedPublicationHistory: (history: HistoryEvent[] | null) => void;
    searchType: 'chercheur' | 'laboratoire';
    openActionMenuIndex: number | null;
    setOpenActionMenuIndex: (index: number | null) => void;
}

export default function PublicationList({
    publications,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    sortDirection,
    toggleSortDirection,
    showFilters,
    setShowFilters,
    highlightedPublications,
    setHighlightedPublications,
    handleAuthorClick,
    handleJournalClick,
    handleHalStatusClick,
    handlePublicationClick,
    setSelectedPublicationHistory,
    searchType,
    openActionMenuIndex,
    setOpenActionMenuIndex
}: PublicationListProps) {
    const { renderAuthors, renderJournal } = usePublicationRenderers({ handleAuthorClick, handleJournalClick });
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const activeFiltersCount = (statusFilter !== 'all' ? 1 : 0) + (typeFilter !== 'all' ? 1 : 0) + (searchTerm ? 1 : 0);

    return (
        <SvpBox flexDir="column" sx={{ gap: 2 }}>
            {/* List view filters and sorting */}
            <SvpSurface sx={{ p: 2 }}>
                <SvpBox align="center" sx={{ gap: 2, flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
                    {/* Search */}
                    <SvpBox sx={{ flex: 1, width: '100%', minWidth: isMobile ? '0' : '300px' }}>
                        <SvpBox sx={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: SvpColors.textSecondary }} />
                            <input
                                type="text"
                                placeholder={searchType === 'chercheur' ? 'Rechercher un chercheur' : 'Rechercher une structure de recherche'}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px 8px 40px',
                                    border: `1px solid ${SvpColors.border}`,
                                    borderRadius: '8px',
                                    outline: 'none',
                                    fontSize: '0.875rem'
                                }}
                            />
                            {searchTerm && (
                                <SvpIconButton
                                    onClick={() => setSearchTerm('')}
                                    sx={{
                                        position: 'absolute',
                                        right: '8px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        padding: '4px'
                                    }}
                                >
                                    <X size={16} />
                                </SvpIconButton>
                            )}
                        </SvpBox>
                    </SvpBox>

                    {/* Sort by */}
                    <SvpBox align="center" sx={{ gap: 1 }}>
                        <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary }}>Trier par:</SvpTypography>
                        <select
                            value={sortBy}
                            style={{
                                padding: '8px 12px',
                                border: `1px solid ${SvpColors.border}`,
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                fontSize: '0.875rem',
                                outline: 'none'
                            }}
                            onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'authors')}
                        >
                            <option value="date">Date</option>
                            <option value="title">Titre</option>
                            <option value="authors">Auteurs</option>
                        </select>
                        <SvpIconButton
                            onClick={toggleSortDirection}
                            sx={{ border: `1px solid ${SvpColors.border}`, borderRadius: '8px' }}
                            title={sortDirection === 'asc' ? 'Tri croissant' : 'Tri décroissant'}
                        >
                            {sortDirection === 'asc' ? (
                                <ArrowUp size={16} color={SvpColors.textSecondary} />
                            ) : (
                                <ArrowDown size={16} color={SvpColors.textSecondary} />
                            )}
                        </SvpIconButton>
                    </SvpBox>

                    {/* Filters toggle */}
                    <SvpButton
                        variant={showFilters || activeFiltersCount > 0 ? "contained" : "outlined"}
                        onClick={() => setShowFilters(!showFilters)}
                        startIcon={<Filter size={16} />}
                        sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 500,
                            ...(showFilters || activeFiltersCount > 0 ? {
                                bgcolor: SvpColors.primary,
                                '&:hover': { bgcolor: SvpColors.primaryHover }
                            } : {
                                borderColor: SvpColors.border,
                                color: SvpColors.textSecondary
                            })
                        }}
                    >
                        Filtres
                        {activeFiltersCount > 0 && (
                            <span style={{
                                marginLeft: '8px',
                                padding: '2px 8px',
                                backgroundColor: '#fff',
                                color: SvpColors.primary,
                                borderRadius: '999px',
                                fontSize: '0.75rem'
                            }}>
                                {activeFiltersCount}
                            </span>
                        )}
                    </SvpButton>
                </SvpBox>

                {/* Expanded filters */}
                {showFilters && (
                    <SvpBox sx={{ mt: 2, pt: 2, borderTop: `1px solid ${SvpColors.border}` }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', width: '100%' }}>
                            <div>
                                <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textPrimary, mb: 1 }}>Statut HAL</SvpTypography>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: `1px solid ${SvpColors.border}`,
                                        borderRadius: '8px',
                                        backgroundColor: '#fff',
                                        fontSize: '0.875rem',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="all">Tous les statuts</option>
                                    <option value="Dans HAL">Dans HAL</option>
                                    <option value="Dans la collection">Dans la collection</option>
                                </select>
                            </div>

                            <div>
                                <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textPrimary, mb: 1 }}>Type</SvpTypography>
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: `1px solid ${SvpColors.border}`,
                                        borderRadius: '8px',
                                        backgroundColor: '#fff',
                                        fontSize: '0.875rem',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="all">Tous les types</option>
                                    <option value="ART">Article (ART)</option>
                                    <option value="COMM">Communication (COMM)</option>
                                    <option value="THESE">Thèse (THESE)</option>
                                </select>
                            </div>

                            <SvpBox align="flex-end">
                                <SvpButton
                                    variant="outlined"
                                    onClick={() => {
                                        setStatusFilter('all');
                                        setTypeFilter('all');
                                        setSearchTerm('');
                                    }}
                                    fullWidth
                                    sx={{ borderRadius: '8px', borderColor: SvpColors.border, color: SvpColors.textSecondary, textTransform: 'none' }}
                                >
                                    Réinitialiser les filtres
                                </SvpButton>
                            </SvpBox>
                        </div>
                    </SvpBox>
                )}

                <SvpBox sx={{ mt: 2, pt: 2, borderTop: `1px solid ${SvpColors.border}` }}>
                    <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary }}>
                        <span style={{ fontWeight: 600, color: SvpColors.textPrimary }}>{publications.length}</span> publication{publications.length > 1 ? 's' : ''} trouvée{publications.length > 1 ? 's' : ''}
                        {activeFiltersCount > 0 && ' (filtrées)'}
                    </SvpTypography>
                </SvpBox>
            </SvpSurface>

            {/* Publications list */}
            {publications.length > 0 ? (
                <SvpBox flexDir="column" sx={{ gap: 2 }}>
                    {publications.map((pub, idx) => {
                        const docTypeInfo = getDocumentTypeInfo(pub.type);
                        const DocIcon = docTypeInfo.icon;
                        const openAccessInfo = getOpenAccessInfo(pub.openAccessStatus);

                        return (
                            <SvpSurface key={idx} sx={{ p: isMobile ? 2 : 3, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 } }}>
                                <SvpBox sx={{ gap: isMobile ? 1.5 : 2, flexDirection: isMobile ? 'column' : 'row' }}>
                                    <SvpBox sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <SvpBox align="flex-start" sx={{ pt: 0.5 }}>
                                            <input type="checkbox" style={{ cursor: 'pointer' }} />
                                        </SvpBox>

                                        <SvpBox sx={{ flexShrink: 0, position: 'relative' }}>
                                            <SvpBox align="center" justify="center" sx={{ width: 44, height: 44, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
                                                <DocIcon size={20} color={docTypeInfo.muiColor} />
                                            </SvpBox>
                                        </SvpBox>
                                    </SvpBox>

                                    <SvpBox flexDir="column" sx={{ flex: 1, minWidth: 0 }}>
                                        <SvpBox align="flex-start" sx={{ gap: 2, mb: 1.5 }}>
                                            <SvpTypography
                                                onClick={() => handlePublicationClick(pub)}
                                                sx={{
                                                    color: SvpColors.primary,
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                    flex: 1,
                                                    '&:hover': { textDecoration: 'underline' }
                                                }}
                                            >
                                                {pub.title}
                                            </SvpTypography>
                                            <SvpBox sx={{ flexShrink: 0 }}>
                                                {(() => {
                                                    const halInfo = getHalStatusInfo(pub);
                                                    const HalIcon = halInfo.icon;
                                                    return (
                                                        <Chip
                                                            {...(HalIcon && { icon: <HalIcon size={14} color="white" /> as any })}
                                                            label={pub.status}
                                                            size="small"
                                                            onClick={(e) => handleHalStatusClick(pub, e)}
                                                            sx={{
                                                                backgroundColor: halInfo.color,
                                                                color: 'white',
                                                                fontWeight: 600,
                                                                fontSize: '0.75rem',
                                                                height: '24px',
                                                                cursor: 'pointer',
                                                                '&:hover': { opacity: 0.8 },
                                                                '& .MuiChip-icon': { color: 'white', marginLeft: '1' }
                                                            }}
                                                        />
                                                    );
                                                })()}
                                            </SvpBox>
                                        </SvpBox>

                                        <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary, mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {pub.abstract}
                                        </SvpTypography>

                                        <SvpBox align="center" sx={{ gap: 3, mb: 1.5, flexWrap: 'wrap' }}>
                                            <SvpBox align="center" sx={{ gap: 1 }}>
                                                <Users size={16} color={SvpColors.textSecondary} />
                                                <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textPrimary }}>{renderAuthors(pub.authors)}</SvpTypography>
                                            </SvpBox>
                                            <SvpBox align="center" sx={{ gap: 1 }}>
                                                <Calendar size={16} color={SvpColors.textSecondary} />
                                                <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textPrimary }}>{pub.date}</SvpTypography>
                                            </SvpBox>
                                            {pub.journal && (
                                                <SvpBox align="center" sx={{ gap: 1 }}>
                                                    <FileText size={16} color={SvpColors.textSecondary} />
                                                    <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textPrimary }}>{renderJournal(pub.journal)}</SvpTypography>
                                                </SvpBox>
                                            )}
                                        </SvpBox>

                                        <SvpBox align="center" justify="space-between">
                                            <SvpBox align="center" sx={{ gap: 2, flexWrap: 'wrap' }}>
                                                <Tooltip title={openAccessInfo.label} arrow placement="top">
                                                    <Chip
                                                        icon={<Unlock size={12} color="white" />}
                                                        label={pub.openAccessStatus.toUpperCase()}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: openAccessInfo.color,
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem',
                                                            height: '24px',
                                                            cursor: 'help',
                                                            '& .MuiChip-icon': { color: 'white', marginLeft: '1' },
                                                            '&:hover': { opacity: 0.9 }
                                                        }}
                                                    />
                                                </Tooltip>
                                                <SvpBox align="center" sx={{ gap: 1 }}>
                                                    <SvpTypography sx={{ fontSize: '0.75rem', color: SvpColors.textSecondary }}>Sources:</SvpTypography>
                                                    {pub.dataSources?.map((source, sIdx) => {
                                                        const img = source === 'OpenAlex' ? imgOpenAlex : source === 'HAL' ? imgHal : source === 'ScanR' ? imgScanR : null;
                                                        if (img) return (
                                                            <Tooltip key={sIdx} title={source} arrow placement="top">
                                                                <img src={img} alt={source} style={{ width: 20, height: 20, borderRadius: 4 }} />
                                                            </Tooltip>
                                                        );
                                                        if (source === 'Scopus') return (
                                                            <Tooltip key={sIdx} title="Scopus" arrow placement="top">
                                                                <SvpBox align="center" justify="center" sx={{ width: 20, height: 20, borderRadius: 1, bgcolor: '#FF6C00', color: 'white', fontSize: '0.625rem', fontWeight: 'bold' }}>S</SvpBox>
                                                            </Tooltip>
                                                        );
                                                        return null;
                                                    })}
                                                </SvpBox>
                                                <SvpButton
                                                    size="small"
                                                    onClick={() => setSelectedPublicationHistory(pub.history)}
                                                    startIcon={<Clock size={12} />}
                                                    sx={{ textTransform: 'none', color: SvpColors.primary, fontSize: '0.75rem', p: 0, minWidth: 'auto', '&:hover': { background: 'none', textDecoration: 'underline' } }}
                                                >
                                                    Historique
                                                </SvpButton>
                                                {highlightedPublications.has(pub.title) && (
                                                    <Star size={16} fill={SvpColors.warning} color={SvpColors.warning} />
                                                )}
                                            </SvpBox>

                                            <SvpBox align="center" sx={{ gap: 1 }}>
                                                <SvpIconButton size="small">
                                                    <ExternalLink size={16} />
                                                </SvpIconButton>
                                                <SvpBox sx={{ position: 'relative' }}>
                                                    <SvpIconButton
                                                        onClick={() => setOpenActionMenuIndex(openActionMenuIndex === idx ? null : idx)}
                                                        size="small"
                                                    >
                                                        <MoreVertical size={16} />
                                                    </SvpIconButton>

                                                    {openActionMenuIndex === idx && (
                                                        <>
                                                            <div
                                                                style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                                                                onClick={() => setOpenActionMenuIndex(null)}
                                                            />
                                                            <SvpSurface
                                                                elevation={4}
                                                                sx={{
                                                                    position: 'absolute',
                                                                    right: 0,
                                                                    bottom: '100%',
                                                                    mb: 1,
                                                                    width: '220px',
                                                                    zIndex: 20,
                                                                    py: 1,
                                                                    border: `1px solid ${SvpColors.border}`
                                                                }}
                                                            >
                                                                <button
                                                                    onClick={() => { setOpenActionMenuIndex(null); handlePublicationClick(pub); }}
                                                                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', textAlign: 'left', color: SvpColors.textPrimary }}
                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                                >
                                                                    <Eye size={16} color={SvpColors.textSecondary} />
                                                                    <span>Voir la publication</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => { setOpenActionMenuIndex(null); setSelectedPublicationHistory(pub.history); }}
                                                                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', textAlign: 'left', color: SvpColors.textPrimary }}
                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                                >
                                                                    <Clock size={16} color={SvpColors.textSecondary} />
                                                                    <span>Historique</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setOpenActionMenuIndex(null);
                                                                        setHighlightedPublications(prev => {
                                                                            const newSet = new Set(prev);
                                                                            if (newSet.has(pub.title)) newSet.delete(pub.title);
                                                                            else newSet.add(pub.title);
                                                                            return newSet;
                                                                        });
                                                                    }}
                                                                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', textAlign: 'left', color: SvpColors.textPrimary }}
                                                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                                                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                                >
                                                                    {highlightedPublications.has(pub.title) ? (
                                                                        <>
                                                                            <Star size={16} fill={SvpColors.warning} color={SvpColors.warning} />
                                                                            <span>Retirer des favoris</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Star size={16} color={SvpColors.textSecondary} />
                                                                            <span>Mettre en avant</span>
                                                                        </>
                                                                    )}
                                                                </button>

                                                            </SvpSurface>
                                                        </>
                                                    )}
                                                </SvpBox>
                                            </SvpBox>
                                        </SvpBox>
                                    </SvpBox>
                                </SvpBox>
                            </SvpSurface>
                        );
                    })}
                </SvpBox>
            ) : (
                <SvpSurface sx={{ p: 6, textAlign: 'center' }}>
                    <SvpTypography sx={{ color: SvpColors.textSecondary }}>
                        Aucune publication ne correspond à vos critères
                    </SvpTypography>
                </SvpSurface>
            )}
        </SvpBox>
    );
}
