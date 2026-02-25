import React from 'react';
import {
    Search,
    X,
    ArrowUp,
    ArrowDown,
    MoreVertical,
    Eye,
    Clock,
    Star,
    Trash2,
    Unlock,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight
} from 'lucide-react';
import {
    Chip,
    Tooltip,
    IconButton,
    Divider,
    useTheme
} from '@mui/material';
import {
    SvpBox,
    SvpTypography,
    SvpSurface,
    SvpIconButton,
    SvpColors
} from '../ui/SvpWrappers';
import { Publication, HistoryEvent } from '../../types';
import { getOpenAccessInfo, getHalStatusInfo, imgOpenAlex, imgHal, imgScanR } from '../../constants';
import { usePublicationRenderers } from './PublicationRenderers';

interface PublicationTableProps {
    publications: Publication[];
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    typeFilter: string;
    setTypeFilter: (value: string) => void;
    sortBy: string;
    sortDirection: 'asc' | 'desc';
    handleSort: (column: any) => void;
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

export default function PublicationTable({
    publications,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    sortBy,
    sortDirection,
    handleSort,
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
}: PublicationTableProps) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const { renderAuthors, renderJournal } = usePublicationRenderers({ handleAuthorClick, handleJournalClick });

    return (
        <SvpSurface>
            {/* Table filters and search */}
            <SvpBox flexDir="column" sx={{ p: 2, borderBottom: `1px solid ${SvpColors.border}` }}>
                <SvpBox align="center" sx={{ gap: 2, flexWrap: 'wrap', mb: 2 }}>
                    <SvpBox sx={{ flex: 1, minWidth: '300px' }}>
                        <SvpBox sx={{ position: 'relative' }}>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: SvpColors.textSecondary }} />
                            <input
                                type="text"
                                placeholder={searchType === 'chercheur' ? 'Rechercher un chercheur' : 'Rechercher une structure de recherche'}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 12px 10px 40px',
                                    border: `1px solid ${SvpColors.border}`,
                                    borderRadius: '8px',
                                    outline: 'none',
                                    fontSize: '0.875rem',
                                    backgroundColor: 'var(--svp-surface)',
                                    color: SvpColors.textPrimary
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

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            border: `1px solid ${SvpColors.border}`,
                            borderRadius: '8px',
                            backgroundColor: 'var(--svp-surface)',
                            color: SvpColors.textPrimary,
                            fontSize: '0.875rem',
                            outline: 'none'
                        }}
                    >
                        <option value="all">Tous les statuts</option>
                        <option value="Dans HAL">Dans HAL</option>
                        <option value="Dans la collection">Dans la collection</option>
                    </select>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            border: `1px solid ${SvpColors.border}`,
                            borderRadius: '8px',
                            backgroundColor: 'var(--svp-surface)',
                            color: SvpColors.textPrimary,
                            fontSize: '0.875rem',
                            outline: 'none'
                        }}
                    >
                        <option value="all">Tous les types</option>
                        <option value="ART">Article (ART)</option>
                        <option value="COMM">Communication (COMM)</option>
                        <option value="THESE">Thèse (THESE)</option>
                    </select>
                </SvpBox>
                <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary }}>
                    <span style={{ fontWeight: 600, color: SvpColors.textPrimary }}>{publications.length}</span> publication{publications.length > 1 ? 's' : ''} trouvée{publications.length > 1 ? 's' : ''}
                </SvpTypography>
            </SvpBox>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : '#F8FAFA' }}>
                        <tr style={{ borderBottom: `1px solid ${SvpColors.border}` }}>
                            <th style={{ width: '48px', padding: '16px' }}>
                                <input type="checkbox" style={{ borderRadius: '4px' }} />
                            </th>
                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                <button
                                    onClick={() => handleSort('type')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: sortBy === 'type' ? SvpColors.primary : SvpColors.textSecondary
                                    }}
                                >
                                    Type
                                    {sortBy === 'type' && (
                                        sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                    )}
                                </button>
                            </th>
                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                <button
                                    onClick={() => handleSort('title')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: sortBy === 'title' ? SvpColors.primary : SvpColors.textSecondary
                                    }}
                                >
                                    Titre
                                    {sortBy === 'title' && (
                                        sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                    )}
                                </button>
                            </th>
                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                <button
                                    onClick={() => handleSort('authors')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: sortBy === 'authors' ? SvpColors.primary : SvpColors.textSecondary
                                    }}
                                >
                                    Auteurs
                                    {sortBy === 'authors' && (
                                        sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                    )}
                                </button>
                            </th>
                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                <button
                                    onClick={() => handleSort('date')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: sortBy === 'date' ? SvpColors.primary : SvpColors.textSecondary
                                    }}
                                >
                                    Date
                                    {sortBy === 'date' && (
                                        sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                    )}
                                </button>
                            </th>
                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                <button
                                    onClick={() => handleSort('source')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: sortBy === 'source' ? SvpColors.primary : SvpColors.textSecondary
                                    }}
                                >
                                    Paru dans
                                    {sortBy === 'source' && (
                                        sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                    )}
                                </button>
                            </th>
                            <th style={{ padding: '16px', textAlign: 'left' }}>
                                <button
                                    onClick={() => handleSort('status')}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: sortBy === 'status' ? SvpColors.primary : SvpColors.textSecondary
                                    }}
                                >
                                    Statut HAL
                                    {sortBy === 'status' && (
                                        sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                    )}
                                </button>
                            </th>
                            <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: SvpColors.textSecondary }}>Statut OA</th>
                            <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: SvpColors.textSecondary }}>Sources</th>
                            <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600, color: SvpColors.textSecondary }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publications.length > 0 ? (
                            publications.map((pub, idx) => {
                                const openAccessInfo = getOpenAccessInfo(pub.openAccessStatus);

                                return (
                                    <tr
                                        key={idx}
                                        style={{
                                            borderBottom: `1px solid ${SvpColors.border}`,
                                            transition: 'background-color 0.2s',
                                            backgroundColor: 'transparent'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : '#F8FAFA'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <td style={{ padding: '12px 16px' }}>
                                            <input type="checkbox" style={{ borderRadius: '4px' }} />
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{
                                                padding: '2px 8px',
                                                backgroundColor: SvpColors.primary,
                                                color: '#fff',
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}>
                                                {pub.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', maxWidth: '400px' }}>
                                            <SvpBox align="center" sx={{ gap: 1 }}>
                                                <SvpTypography
                                                    onClick={() => handlePublicationClick(pub)}
                                                    sx={{
                                                        color: SvpColors.primary,
                                                        cursor: 'pointer',
                                                        fontSize: '0.875rem',
                                                        fontWeight: 500,
                                                        flex: 1,
                                                        '&:hover': {
                                                            textDecoration: 'underline'
                                                        }
                                                    }}
                                                >
                                                    {pub.title}
                                                </SvpTypography>
                                                {highlightedPublications.has(pub.title) && (
                                                    <Star size={16} fill={SvpColors.warning} color={SvpColors.warning} style={{ flexShrink: 0 }} />
                                                )}
                                            </SvpBox>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary }}>
                                                {renderAuthors(pub.authors)}
                                            </SvpTypography>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary }}>
                                                {pub.date}
                                            </SvpTypography>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary }}>
                                                {renderJournal(pub.journal)}
                                            </SvpTypography>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            {(() => {
                                                const halInfo = getHalStatusInfo(pub);
                                                const HalIcon = halInfo.icon;
                                                return (
                                                    <Chip
                                                        {...(HalIcon && { icon: <HalIcon size={14} color="white" /> as unknown as React.ReactElement })}
                                                        label={pub.status}
                                                        size="small"
                                                        onClick={(e) => handleHalStatusClick(pub, e)}
                                                        sx={{
                                                            backgroundColor: halInfo.color,
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.7rem',
                                                            cursor: 'pointer',
                                                            height: '24px',
                                                            '&:hover': {
                                                                opacity: 0.8,
                                                            },
                                                            '& .MuiChip-icon': {
                                                                color: 'white',
                                                                marginLeft: '4px',
                                                            }
                                                        }}
                                                    />
                                                );
                                            })()}
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <Tooltip title={openAccessInfo.label} arrow placement="top">
                                                <Chip
                                                    icon={<Unlock size={12} />}
                                                    label={pub.openAccessStatus.toUpperCase()}
                                                    size="small"
                                                    sx={{
                                                        backgroundColor: openAccessInfo.color,
                                                        color: 'white',
                                                        fontWeight: 600,
                                                        fontSize: '0.7rem',
                                                        height: '24px',
                                                        cursor: 'help',
                                                        '& .MuiChip-icon': {
                                                            color: 'white',
                                                            marginLeft: '4px',
                                                        }
                                                    }}
                                                />
                                            </Tooltip>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <SvpBox sx={{ gap: 0.5 }}>
                                                {pub.dataSources?.includes('OpenAlex') && (
                                                    <Tooltip title="OpenAlex" arrow placement="top">
                                                        <img src={imgOpenAlex} alt="OpenAlex" style={{ width: 24, height: 24, borderRadius: '4px' }} />
                                                    </Tooltip>
                                                )}
                                                {pub.dataSources?.includes('HAL') && (
                                                    <Tooltip title="HAL" arrow placement="top">
                                                        <img src={imgHal} alt="HAL" style={{ width: 24, height: 24, borderRadius: '4px' }} />
                                                    </Tooltip>
                                                )}
                                                {pub.dataSources?.includes('Scopus') && (
                                                    <Tooltip title="Scopus" arrow placement="top">
                                                        <div style={{ width: 24, height: 24, borderRadius: '4px', backgroundColor: '#FF6C00', color: 'white', display: 'flex', alignItems: 'center', justifyItems: 'center', fontSize: '10px', fontWeight: 'bold', justifyContent: 'center' }}>
                                                            S
                                                        </div>
                                                    </Tooltip>
                                                )}
                                                {pub.dataSources?.includes('ScanR') && (
                                                    <Tooltip title="ScanR" arrow placement="top">
                                                        <img src={imgScanR} alt="ScanR" style={{ width: 24, height: 24, borderRadius: '4px' }} />
                                                    </Tooltip>
                                                )}
                                            </SvpBox>
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                                <IconButton
                                                    onClick={() => setOpenActionMenuIndex(openActionMenuIndex === idx ? null : idx)}
                                                    size="small"
                                                >
                                                    <MoreVertical size={18} />
                                                </IconButton>

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
                                                                top: '100%',
                                                                mt: 0.5,
                                                                width: '240px',
                                                                zIndex: 20,
                                                                py: 1,
                                                                border: `1px solid ${SvpColors.border}`
                                                            }}
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    setOpenActionMenuIndex(null);
                                                                    handlePublicationClick(pub);
                                                                }}
                                                                style={{
                                                                    width: '100%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '12px',
                                                                    padding: '8px 16px',
                                                                    border: 'none',
                                                                    background: 'none',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.875rem',
                                                                    textAlign: 'left',
                                                                    color: SvpColors.textPrimary
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : '#f5f5f5'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                            >
                                                                <Eye size={16} color={SvpColors.textSecondary} />
                                                                <span>Voir la publication</span>
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    setOpenActionMenuIndex(null);
                                                                    setSelectedPublicationHistory(pub.history);
                                                                }}
                                                                style={{
                                                                    width: '100%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '12px',
                                                                    padding: '8px 16px',
                                                                    border: 'none',
                                                                    background: 'none',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.875rem',
                                                                    textAlign: 'left',
                                                                    color: SvpColors.textPrimary
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : '#f5f5f5'}
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
                                                                        if (newSet.has(pub.title)) {
                                                                            newSet.delete(pub.title);
                                                                        } else {
                                                                            newSet.add(pub.title);
                                                                        }
                                                                        return newSet;
                                                                    });
                                                                }}
                                                                style={{
                                                                    width: '100%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '12px',
                                                                    padding: '8px 16px',
                                                                    border: 'none',
                                                                    background: 'none',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.875rem',
                                                                    textAlign: 'left',
                                                                    color: SvpColors.textPrimary
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(255,255,255,0.05)' : '#f5f5f5'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                            >
                                                                {highlightedPublications.has(pub.title) ? (
                                                                    <>
                                                                        <Star size={16} fill={SvpColors.warning} color={SvpColors.warning} />
                                                                        <span>Retirer des travaux mis en avant</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Star size={16} color={SvpColors.textSecondary} />
                                                                        <span>Mettre en avant</span>
                                                                    </>
                                                                )}
                                                            </button>



                                                            <Divider sx={{ my: 1 }} />

                                                            <button
                                                                onClick={() => {
                                                                    setOpenActionMenuIndex(null);
                                                                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
                                                                        // Delete logic
                                                                    }
                                                                }}
                                                                style={{
                                                                    width: '100%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '12px',
                                                                    padding: '8px 16px',
                                                                    border: 'none',
                                                                    background: 'none',
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.875rem',
                                                                    textAlign: 'left',
                                                                    color: SvpColors.error
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(222, 55, 48, 0.1)' : '#fff5f5'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                            >
                                                                <Trash2 size={16} />
                                                                <span>Supprimer</span>
                                                            </button>
                                                        </SvpSurface>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td colSpan={10} style={{ padding: '32px', textAlign: 'center' }}>
                                    <SvpTypography sx={{ color: SvpColors.textSecondary }}>
                                        Aucune publication trouvée
                                    </SvpTypography>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <SvpBox align="center" justify="space-between" sx={{ p: 2, borderTop: `1px solid ${SvpColors.border}` }}>
                <SvpBox align="center" sx={{ gap: 1 }}>
                    <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary }}>
                        Lignes par page:
                    </SvpTypography>
                    <select
                        style={{
                            padding: '4px 8px',
                            border: `1px solid ${SvpColors.border}`,
                            borderRadius: '4px',
                            backgroundColor: 'var(--svp-surface)',
                            color: SvpColors.textPrimary,
                            fontSize: '0.875rem',
                            outline: 'none'
                        }}
                    >
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                </SvpBox>
                <SvpBox align="center" sx={{ gap: 2 }}>
                    <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary }}>
                        <span>1-{publications.length} sur {publications.length}</span>
                    </SvpTypography>
                    <SvpBox sx={{ gap: 0.5 }}>
                        <SvpIconButton size="small" disabled sx={{ color: SvpColors.textSecondary }}><ChevronsLeft size={18} /></SvpIconButton>
                        <SvpIconButton size="small" disabled sx={{ color: SvpColors.textSecondary }}><ChevronLeft size={18} /></SvpIconButton>
                        <SvpIconButton size="small" sx={{ color: SvpColors.textPrimary }}><ChevronRight size={18} /></SvpIconButton>
                        <SvpIconButton size="small" sx={{ color: SvpColors.textPrimary }}><ChevronsRight size={18} /></SvpIconButton>
                    </SvpBox>
                </SvpBox>
            </SvpBox>
        </SvpSurface>
    );
}
