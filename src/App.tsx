import { useState, useEffect } from 'react';
import { HashRouter, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import svgPaths from "./imports/svg-vt1w2gqizi";


import Dashboard from './components/Dashboard';
import Expertises from './components/Expertises';
import Activities from './components/Activities';
import Sidebar from './components/Sidebar';
import PublicationDetail from './components/PublicationDetail';
import PersonnelRecherche from './components/PersonnelRecherche';
import PersonnelDetail from './components/PersonnelDetail';
import PublicationTable from './components/publications/PublicationTable';
import PublicationList from './components/publications/PublicationList';
import {
  SvpIconButton,
  SvpColors,
  SvpH1,
  SvpH2,
  SvpBox,
  SvpSurface,
  SvpContainer,
  SvpButton,
  SvpTypography
} from './components/ui/SvpWrappers';

import {
  User, X, Check, AlertCircle, Star, Clock, List, Grid3X3, RefreshCw, ExternalLink, Upload
} from 'lucide-react';

import {
  Button, Chip, Badge, Box, Typography, Tooltip,
  IconButton, Divider, Paper, Popper, Fade, ClickAwayListener, Link as MuiLink, CardContent,
  Alert, AlertTitle, Dialog, DialogTitle, DialogContent
} from '@mui/material';

import {
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';

import {
  Publication,
  Author,
  Journal,
  HistoryEvent
} from './types';

import {
  publications,
  authorsDatabase,
  journalsDatabase,
  getOpenAccessInfo,
  getHalStatusInfo,
  formatRelativeTime,
  // imgAvatar,
  imgOrcid,
  imgHalProfile,
  imgIdref
} from './constants';


function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current page from URL
  const getCurrentPage = (): 'dashboard' | 'publications' | 'activities' | 'expertises' | 'publication-detail' | 'personnel' | 'personnel-detail' => {
    if (location.pathname === '/dashboard') return 'dashboard';
    if (location.pathname === '/expertises') return 'expertises';
    if (location.pathname === '/activities') return 'activities';
    if (location.pathname === '/personnel') return 'personnel';
    if (location.pathname.startsWith('/personnel/')) return 'personnel-detail';
    if (location.pathname.startsWith('/publication/')) return 'publication-detail';
    return 'publications';
  };

  const [currentPage, setCurrentPage] = useState<'dashboard' | 'publications' | 'activities' | 'expertises' | 'publication-detail' | 'personnel' | 'personnel-detail'>(getCurrentPage());
  const [searchType, setSearchType] = useState<'chercheur' | 'laboratoire'>('chercheur');
  // const [selectedEntity, setSelectedEntity] = useState('Pierre Janin');
  const [viewMode, setViewMode] = useState<'table' | 'list'>('list');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'incomplete' | 'highlighted'>('all');
  const [selectedPublicationHistory, setSelectedPublicationHistory] = useState<HistoryEvent[] | null>(null);
  const [highlightedPublications, setHighlightedPublications] = useState<Set<string>>(new Set(['Is Resilience a Consensual Concept? A Quantitative Assessment of Food Security Projects in Burkina Faso', 'Assessing the sustainability of food systems in sub- and Mediterranean & middle east_none_contributors']));

  // List view filters and sort
  const [listSearchTerm, setListSearchTerm] = useState('');
  const [listStatusFilter, setListStatusFilter] = useState('all');
  const [listTypeFilter, setListTypeFilter] = useState('all');
  const [listSortBy, setListSortBy] = useState<'date' | 'title' | 'authors'>('date');
  const [listSortDirection, setListSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Table view filters and sort
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [tableStatusFilter, setTableStatusFilter] = useState('all');
  const [tableTypeFilter, setTableTypeFilter] = useState('all');
  const [tableSortBy, setTableSortBy] = useState<'date' | 'title' | 'authors' | 'status' | 'type' | 'source'>('date');
  const [tableSortDirection, setTableSortDirection] = useState<'asc' | 'desc'>('desc');
  const [openActionMenuIndex, setOpenActionMenuIndex] = useState<number | null>(null);

  // HAL Deposit modal states


  // Author profile modal states
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [authorAnchorEl, setAuthorAnchorEl] = useState<HTMLElement | null>(null);

  // Journal profile modal states
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [journalAnchorEl, setJournalAnchorEl] = useState<HTMLElement | null>(null);

  // HAL status popper states
  const [selectedHalPublication, setSelectedHalPublication] = useState<Publication | null>(null);
  const [halAnchorEl, setHalAnchorEl] = useState<HTMLElement | null>(null);

  // Mock user IdHAL - in real app, this would come from user profile/context
  // SCENARIO A (IdHAL manquant): userIdHal = ''
  // SCENARIO B (IdHAL présent): userIdHal = 'pierre-janin' (or any non-empty string)
  const [userIdHal, setUserIdHal] = useState('pierre-janin'); // Toggle via UI button to test both scenarios
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Sync theme with document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Sync currentPage with URL changes
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/publications', { replace: true });
    } else {
      setCurrentPage(getCurrentPage());
    }
  }, [location.pathname, navigate]);



  // Function to handle author click
  const handleAuthorClick = (authorName: string, event: React.MouseEvent<HTMLElement>) => {
    const author = authorsDatabase[authorName];
    if (author) {
      setSelectedAuthor(author);
      setAuthorAnchorEl(event.currentTarget);
    }
  };

  // Function to handle journal click
  const handleJournalClick = (journalName: string, event: React.MouseEvent<HTMLElement>) => {
    const journal = journalsDatabase[journalName];
    if (journal) {
      setSelectedJournal(journal);
      setJournalAnchorEl(event.currentTarget);
    }
  };

  // Function to handle HAL status click
  const handleHalStatusClick = (publication: Publication, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setSelectedHalPublication(publication);
    setHalAnchorEl(event.currentTarget);
  };

  // Function to handle publication click
  const handlePublicationClick = (publication: Publication) => {
    const pubId = encodeURIComponent(publication.title.substring(0, 50).replace(/\s+/g, '-').toLowerCase());
    navigate(`/publication/${pubId}`, { state: { publication } });
  };

  const handleTableSort = (column: any) => {
    if (tableSortBy === column) {
      setTableSortDirection(tableSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setTableSortBy(column);
      setTableSortDirection('asc');
    }
  };

  const toggleListSortDirection = () => {
    setListSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };



  return (
    <SvpBox sx={{ height: '100vh', bgcolor: SvpColors.bgPage, flexDirection: isMobile ? 'column' : 'row' }}>
      <Toaster position="top-right" richColors />

      {/* Sidebar for Desktop */}
      {!isMobile && (
        <Box sx={{ width: '280px', height: '100vh', flexShrink: 0 }}>
          <Sidebar
            searchType={searchType}
            setSearchType={setSearchType}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </Box>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <SvpBox
          align="center"
          justify="space-between"
          sx={{
            p: 2,
            bgcolor: SvpColors.primary,
            color: 'white',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <SvpBox align="center" sx={{ height: 30 }}>
            <svg fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 168 39" style={{ height: '100%' }}>
              <g>
                <path d={svgPaths.p76fae00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p1582ed00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p3e05cef0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p1d8ccd00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p1e7489b0} fill="white" />
                <path d={svgPaths.p279ee8c0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </SvpBox>
          <IconButton onClick={() => setIsMobileMenuOpen(true)} sx={{ color: 'white' }}>
            <MenuIcon />
          </IconButton>
        </SvpBox>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: { width: '280px', p: 0, border: 'none' }
        }}
      >
        <Sidebar
          searchType={searchType}
          setSearchType={setSearchType}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </Drawer>

      {/* Main content */}
      <SvpBox flexDir="column" sx={{ flex: 1, overflowY: 'auto' }}>
        {currentPage === 'dashboard' ? (
          <Dashboard />
        ) : currentPage === 'expertises' ? (
          <Expertises />
        ) : currentPage === 'activities' ? (
          <Activities />
        ) : currentPage === 'publication-detail' ? (
          <PublicationDetail publications={publications} />
        ) : currentPage === 'personnel' ? (
          <PersonnelRecherche />
        ) : currentPage === 'personnel-detail' ? (
          <PersonnelDetail />
        ) : (
          <SvpBox
            flexDir="column"
            sx={{
              minHeight: isMobile ? 'auto' : '100vh',
              bgcolor: SvpColors.bgPage,
              width: '100%'
            }}
          >
            <SvpContainer>
              {/* Header */}
              <SvpBox
                align={isMobile ? "flex-start" : "center"}
                justify="space-between"
                sx={{ mb: 3, flexDirection: isMobile ? "column" : "row", gap: 2 }}
              >
                <SvpBox align="center" sx={{ gap: 2 }}>
                  <SvpH1 sx={{ fontSize: isMobile ? "1.5rem" : "2rem" }}>
                    Publications
                  </SvpH1>
                  <Tooltip
                    title={userIdHal ? "IdHAL: pierre-janin (Scénario B - Cliquez pour tester le Scénario A)" : "IdHAL manquant (Scénario A - Cliquez pour tester le Scénario B)"}
                    arrow
                  >
                    <button
                      onClick={() => setUserIdHal(userIdHal ? '' : 'pierre-janin')}
                      className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-colors ${isDarkMode
                        ? 'border-gray-600 hover:bg-[#2a2a2a]'
                        : 'border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {userIdHal ? (
                        <>
                          <Check className="size-4" style={{ color: '#006A61' }} />
                          <span className={isDarkMode ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>IdHAL: OK</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="size-4" style={{ color: '#ED6C02' }} />
                          <span className={isDarkMode ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>IdHAL manquant</span>
                        </>
                      )}
                    </button>
                  </Tooltip>
                </SvpBox>
                <SvpBox align="center" sx={{ gap: 1.5, width: isMobile ? '100%' : 'auto', flexWrap: 'wrap' }}>
                  <SvpButton
                    variant="outlined"
                    startIcon={<svg style={{ width: 20, height: 20 }} fill="none" viewBox="0 0 20 20">
                      <path d={svgPaths.p18c04600} fill={isDarkMode ? '#9ef2e6' : '#006A61'} />
                    </svg>}
                    sx={{
                      borderColor: isDarkMode ? '#6f7977' : '#6f7977',
                      color: isDarkMode ? '#9ef2e6' : '#006a61',
                      borderRadius: '20px',
                      textTransform: 'none',
                      flex: isMobile ? 1 : 'none',
                      '&:hover': {
                        bgcolor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                        borderColor: isDarkMode ? '#9ef2e6' : '#006a61',
                      }
                    }}
                  >
                    Mettre à jour
                  </SvpButton>
                </SvpBox>
              </SvpBox>

              {/* Filtres rapides au lieu d'onglets */}
              <SvpSurface sx={{ mb: 3 }}>
                <SvpBox align="center" justify="space-between" sx={{ p: 2 }}>
                  {/* Filtres rapides */}
                  <SvpBox align="center" sx={{ gap: 1.5, flexWrap: 'wrap' }}>
                    <SvpTypography sx={{ fontSize: '0.875rem', color: isDarkMode ? 'rgba(255,255,255,0.6)' : SvpColors.textSecondary }}>
                      Filtres rapides :
                    </SvpTypography>
                    <Badge
                      badgeContent={125}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: activeTab === 'all' ? '#fff' : SvpColors.primary,
                          color: activeTab === 'all' ? SvpColors.primary : '#fff',
                          fontWeight: activeTab === 'all' ? 600 : 400,
                        }
                      }}
                    >
                      <SvpButton
                        variant={activeTab === 'all' ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab('all')}
                        sx={{
                          backgroundColor: activeTab === 'all' ? SvpColors.primary : (isDarkMode ? '#3a3a3a' : '#f3f4f6'),
                          color: activeTab === 'all' ? '#fff' : (isDarkMode ? '#d1d5db' : '#374151'),
                          border: activeTab === 'all' ? 'none' : (isDarkMode ? '1px solid #4a4a4a' : '1px solid #e5e7eb'),
                        }}
                      >
                        Tous les documents
                      </SvpButton>
                    </Badge>
                    <Badge
                      badgeContent={104}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: activeTab === 'incomplete' ? '#fff' : SvpColors.error,
                          color: activeTab === 'incomplete' ? SvpColors.error : '#fff',
                          fontWeight: activeTab === 'incomplete' ? 600 : 400,
                        }
                      }}
                    >
                      <SvpButton
                        variant={activeTab === 'incomplete' ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab('incomplete')}
                        startIcon={<AlertCircle size={16} />}
                        sx={{
                          backgroundColor: activeTab === 'incomplete' ? SvpColors.error : (isDarkMode ? 'rgba(127, 29, 29, 0.2)' : SvpColors.errorLight),
                          color: activeTab === 'incomplete' ? '#fff' : SvpColors.error,
                          border: activeTab === 'incomplete' ? 'none' : `1px solid ${SvpColors.errorLight}`,
                          '&:hover': {
                            backgroundColor: activeTab === 'incomplete' ? '#c62828' : (isDarkMode ? 'rgba(127, 29, 29, 0.3)' : '#FFEBEE'),
                          }
                        }}
                      >
                        À compléter sur HAL
                      </SvpButton>
                    </Badge>
                    <Badge
                      badgeContent={highlightedPublications.size}
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: activeTab === 'highlighted' ? '#fff' : SvpColors.warning,
                          color: activeTab === 'highlighted' ? SvpColors.warning : '#fff',
                          fontWeight: activeTab === 'highlighted' ? 600 : 400,
                        }
                      }}
                    >
                      <SvpButton
                        variant={activeTab === 'highlighted' ? 'contained' : 'outlined'}
                        onClick={() => setActiveTab('highlighted')}
                        startIcon={<Star size={16} />}
                        sx={{
                          backgroundColor: activeTab === 'highlighted' ? SvpColors.warning : (isDarkMode ? 'rgba(120, 53, 15, 0.2)' : SvpColors.warningLight),
                          color: activeTab === 'highlighted' ? '#fff' : SvpColors.warning,
                          border: activeTab === 'highlighted' ? 'none' : `1px solid ${SvpColors.warningLight}`,
                          '&:hover': {
                            backgroundColor: activeTab === 'highlighted' ? '#d97706' : (isDarkMode ? 'rgba(120, 53, 15, 0.3)' : '#FFF4E5'),
                          }
                        }}
                      >
                        Travaux mis en avant
                      </SvpButton>
                    </Badge>
                  </SvpBox>

                  {/* View mode buttons */}
                  <SvpBox align="center" sx={{ gap: 1 }}>
                    <SvpIconButton
                      onClick={() => setViewMode('table')}
                      sx={{
                        bgcolor: viewMode === 'table' ? SvpColors.primary : 'transparent',
                        color: viewMode === 'table' ? '#fff' : SvpColors.textSecondary,
                        '&:hover': {
                          bgcolor: viewMode === 'table' ? SvpColors.primaryHover : 'rgba(0, 106, 97, 0.04)',
                          color: viewMode === 'table' ? '#fff' : SvpColors.primary
                        }
                      }}
                    >
                      <Grid3X3 size={20} />
                    </SvpIconButton>
                    <SvpIconButton
                      onClick={() => setViewMode('list')}
                      sx={{
                        bgcolor: viewMode === 'list' ? SvpColors.primary : 'transparent',
                        color: viewMode === 'list' ? '#fff' : SvpColors.textSecondary,
                        '&:hover': {
                          bgcolor: viewMode === 'list' ? SvpColors.primaryHover : 'rgba(0, 106, 97, 0.04)',
                          color: viewMode === 'list' ? '#fff' : SvpColors.primary
                        }
                      }}
                    >
                      <List size={20} />
                    </SvpIconButton>
                  </SvpBox>
                </SvpBox>
              </SvpSurface>

              {/* Publications - Table View */}
              {viewMode === 'table' && (
                <PublicationTable
                  publications={publications}
                  searchTerm={tableSearchTerm}
                  setSearchTerm={setTableSearchTerm}
                  statusFilter={tableStatusFilter}
                  setStatusFilter={setTableStatusFilter}
                  typeFilter={tableTypeFilter}
                  setTypeFilter={setTableTypeFilter}
                  sortBy={tableSortBy}
                  sortDirection={tableSortDirection}
                  handleSort={handleTableSort}
                  handleHalStatusClick={handleHalStatusClick}
                  handlePublicationClick={handlePublicationClick}
                  openActionMenuIndex={openActionMenuIndex}
                  setOpenActionMenuIndex={setOpenActionMenuIndex}
                  setSelectedPublicationHistory={setSelectedPublicationHistory}
                  highlightedPublications={highlightedPublications}
                  setHighlightedPublications={setHighlightedPublications}
                  handleAuthorClick={handleAuthorClick}
                  handleJournalClick={handleJournalClick}
                  searchType={searchType}
                />
              )}

              {/* Publications - List View */}
              {viewMode === 'list' && (
                <PublicationList
                  publications={publications}
                  searchTerm={listSearchTerm}
                  setSearchTerm={setListSearchTerm}
                  statusFilter={listStatusFilter}
                  setStatusFilter={setListStatusFilter}
                  typeFilter={listTypeFilter}
                  setTypeFilter={setListTypeFilter}
                  sortBy={listSortBy}
                  setSortBy={setListSortBy}
                  sortDirection={listSortDirection}
                  toggleSortDirection={toggleListSortDirection}
                  handleHalStatusClick={handleHalStatusClick}
                  handlePublicationClick={handlePublicationClick}
                  openActionMenuIndex={openActionMenuIndex}
                  setOpenActionMenuIndex={setOpenActionMenuIndex}
                  setSelectedPublicationHistory={setSelectedPublicationHistory}
                  highlightedPublications={highlightedPublications}
                  setHighlightedPublications={setHighlightedPublications}
                  handleAuthorClick={handleAuthorClick}
                  handleJournalClick={handleJournalClick}
                  showFilters={showFilters}
                  setShowFilters={setShowFilters}
                  searchType={searchType}
                />
              )}
            </SvpContainer>
          </SvpBox>
        )}
      </SvpBox>



      {/* History Modal */}
      <Dialog
        open={Boolean(selectedPublicationHistory)}
        onClose={() => setSelectedPublicationHistory(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3, borderBottom: '1px solid #eee' }}>
          <SvpBox align="center" sx={{ gap: 1 }}>
            <Clock size={20} color={SvpColors.textSecondary} />
            <SvpH2 sx={{ m: 0 }}>Historique des modifications</SvpH2>
          </SvpBox>
          <SvpIconButton onClick={() => setSelectedPublicationHistory(null)}>
            <X size={20} />
          </SvpIconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          {selectedPublicationHistory && (
            <SvpBox flexDir="column" sx={{ gap: 4 }}>
              {selectedPublicationHistory.map((event, idx) => (
                <SvpBox key={event.id} sx={{ gap: 2 }}>
                  {/* Avatar & Timeline line */}
                  <SvpBox flexDir="column" align="center" sx={{ flexShrink: 0 }}>
                    {event.userAvatar ? (
                      <Box
                        component="img"
                        src={event.userAvatar}
                        alt={event.user}
                        sx={{ width: 40, height: 40, borderRadius: '50%' }}
                      />
                    ) : (
                      <SvpBox
                        align="center"
                        justify="center"
                        sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#eee' }}
                      >
                        <User size={20} color="#666" />
                      </SvpBox>
                    )}
                    {idx < selectedPublicationHistory.length - 1 && (
                      <Box sx={{ width: 2, flex: 1, bgcolor: '#eee', my: 1 }} />
                    )}
                  </SvpBox>

                  {/* Event content */}
                  <SvpBox flexDir="column" sx={{ flex: 1 }}>
                    <SvpBox align="center" justify="space-between" sx={{ mb: 0.5 }}>
                      <SvpBox align="center">
                        <SvpTypography sx={{ fontWeight: 600 }}>{event.user}</SvpTypography>
                        <SvpTypography sx={{ color: SvpColors.textSecondary, mx: 1 }}>{event.action}</SvpTypography>
                      </SvpBox>
                      <SvpTypography sx={{ fontSize: '0.875rem', color: SvpColors.textSecondary }}>
                        {formatRelativeTime(event.timestamp)}
                      </SvpTypography>
                    </SvpBox>
                    {event.details && (
                      <SvpBox sx={{ mt: 1, p: 2, borderRadius: 2, bgcolor: '#f9f9f9', border: '1px solid #eee' }}>
                        <SvpTypography sx={{ fontSize: '0.875rem' }}>{event.details}</SvpTypography>
                      </SvpBox>
                    )}
                  </SvpBox>
                </SvpBox>
              ))}
            </SvpBox>
          )}
        </DialogContent>
      </Dialog>

      {/* Author Profile Popper */}
      <Popper
        open={Boolean(authorAnchorEl)}
        anchorEl={authorAnchorEl}
        placement="bottom-start"
        transition
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={8}
              sx={{
                mt: 1,
                width: '360px',
                borderRadius: '12px',
                overflow: 'hidden',
                bgcolor: selectedAuthor?.isInternal ? '#E8F5F3' : 'white'
              }}
            >
              <ClickAwayListener onClickAway={() => setAuthorAnchorEl(null)}>
                <Box>
                  {selectedAuthor && (
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
                        <IconButton
                          onClick={() => setAuthorAnchorEl(null)}
                          size="small"
                          sx={{ color: '#6F7977' }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                        {selectedAuthor.avatar ? (
                          <Box
                            component="img"
                            src={selectedAuthor.avatar}
                            alt={selectedAuthor.name}
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              mb: 2,
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 80,
                              height: 80,
                              borderRadius: '50%',
                              bgcolor: '#006A61',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 2
                            }}
                          >
                            <Typography sx={{ color: 'white', fontSize: '2rem', fontWeight: 600 }}>
                              {selectedAuthor.firstName.charAt(0)}{selectedAuthor.lastName.charAt(0)}
                            </Typography>
                          </Box>
                        )}

                        <Typography variant="h6" sx={{ color: '#006A61', fontWeight: 600, mb: 0.5, fontSize: '1.125rem' }}>
                          {selectedAuthor.firstName} {selectedAuthor.lastName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6F7977', textAlign: 'center', mb: 1 }}>
                          {selectedAuthor.affiliation || selectedAuthor.laboratory}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: selectedAuthor.isInternal ? 2 : 0 }}>
                        {selectedAuthor.orcid && (
                          <Tooltip title="ORCID" arrow>
                            <a href={selectedAuthor.orcid} target="_blank" rel="noopener noreferrer">
                              <img src={imgOrcid} alt="ORCID" style={{ width: 24, height: 24, cursor: 'pointer' }} />
                            </a>
                          </Tooltip>
                        )}
                        {selectedAuthor.hal && (
                          <Tooltip title="HAL" arrow>
                            <a href={selectedAuthor.hal} target="_blank" rel="noopener noreferrer">
                              <img src={imgHalProfile} alt="HAL" style={{ width: 24, height: 24, cursor: 'pointer' }} />
                            </a>
                          </Tooltip>
                        )}
                        {selectedAuthor.idref && (
                          <Tooltip title="IdRef" arrow>
                            <a href={selectedAuthor.idref} target="_blank" rel="noopener noreferrer">
                              <img src={imgIdref} alt="IdRef" style={{ width: 24, height: 24, cursor: 'pointer' }} />
                            </a>
                          </Tooltip>
                        )}
                      </Box>

                      {selectedAuthor.isInternal && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              bgcolor: '#006A61',
                              color: 'white',
                              textTransform: 'none',
                              borderRadius: '8px',
                              px: 3,
                              py: 1,
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              '&:hover': {
                                bgcolor: '#005550'
                              }
                            }}
                            onClick={() => {
                              setAuthorAnchorEl(null);
                              // Navigation vers le profil de l'auteur
                            }}
                          >
                            Voir le profil
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  )}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>

      {/* Journal Profile Popper */}
      <Popper
        open={Boolean(journalAnchorEl)}
        anchorEl={journalAnchorEl}
        placement="bottom-start"
        transition
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={8}
              sx={{
                mt: 1,
                width: '400px',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <ClickAwayListener onClickAway={() => setJournalAnchorEl(null)}>
                <Box>
                  {selectedJournal && (
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
                        <IconButton
                          onClick={() => setJournalAnchorEl(null)}
                          size="small"
                          sx={{ color: '#6F7977' }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ color: '#006A61', fontWeight: 600, mb: 2, fontSize: '1.125rem' }}>
                          {selectedJournal.name}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          <Box>
                            <Typography variant="body2" sx={{ color: '#6F7977', fontSize: '0.7rem', mb: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
                              Type de source
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#2D3836', fontSize: '0.875rem' }}>
                              {selectedJournal.type}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography variant="body2" sx={{ color: '#6F7977', fontSize: '0.7rem', mb: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
                              ISSN
                            </Typography>
                            <MuiLink
                              href={`https://portal.issn.org/resource/ISSN/${selectedJournal.issn}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: '#006A61',
                                fontSize: '0.875rem',
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                  textDecoration: 'underline'
                                }
                              }}
                            >
                              {selectedJournal.issn}
                            </MuiLink>
                          </Box>

                          <Box>
                            <Typography variant="body2" sx={{ color: '#6F7977', fontSize: '0.7rem', mb: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
                              Éditeur
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#2D3836', fontSize: '0.875rem' }}>
                              {selectedJournal.publisher} ({selectedJournal.publisherCountry})
                            </Typography>
                          </Box>

                          <Box>
                            <Typography variant="body2" sx={{ color: '#6F7977', fontSize: '0.7rem', mb: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
                              Type d'accès
                            </Typography>
                            <Chip
                              label={selectedJournal.accessType.toUpperCase()}
                              size="small"
                              sx={{
                                backgroundColor: getOpenAccessInfo(selectedJournal.accessType).color,
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                height: '22px'
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  )}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>

      {/* HAL Status Popper */}
      <Popper
        open={Boolean(halAnchorEl)}
        anchorEl={halAnchorEl}
        placement="bottom-start"
        transition
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={8}
              sx={{
                mt: 1,
                width: '420px',
                borderRadius: '12px',
                overflow: 'hidden',
                bgcolor: 'white'
              }}
            >
              <ClickAwayListener onClickAway={() => setHalAnchorEl(null)}>
                <Box>
                  {selectedHalPublication && (() => {
                    const halInfo = getHalStatusInfo(selectedHalPublication);
                    const HalIcon = halInfo.icon;
                    const notInCollection = !selectedHalPublication.halInLabCollection;
                    const needsUpdate = selectedHalPublication.halNeedsUpdate;
                    const isOutsideHal = selectedHalPublication.status === 'Hors HAL';

                    return (
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {HalIcon && <HalIcon className="size-5" color={halInfo.color} />}
                            <Typography variant="h6" sx={{ color: halInfo.color, fontWeight: 600, fontSize: '1rem' }}>
                              {selectedHalPublication.status}
                            </Typography>
                          </Box>
                          <IconButton
                            onClick={() => setHalAnchorEl(null)}
                            size="small"
                            sx={{ color: '#6F7977' }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* Content based on status */}
                        {isOutsideHal ? (
                          <Box>
                            {/* SCÉNARIO A: IdHAL manquant */}
                            {!userIdHal ? (
                              <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                  <WarningIcon sx={{ color: '#ED6C02', fontSize: '1.25rem' }} />
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      color: '#2D3836',
                                      fontSize: '0.875rem',
                                      fontWeight: 600
                                    }}
                                  >
                                    Identifiant IdHAL manquant
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#2D3836', mb: 2.5, fontSize: '0.875rem', lineHeight: 1.6 }}>
                                  Votre IdHAL n'est pas renseigné dans votre profil SoVisu+. Sans lui, nous ne pouvons pas synchroniser vos publications.
                                </Typography>
                                <Button
                                  variant="contained"
                                  fullWidth
                                  onClick={() => {
                                    setHalAnchorEl(null);
                                    // In real app: navigate to user profile page
                                    window.open('#/mon-compte', '_blank');
                                  }}
                                  sx={{
                                    bgcolor: '#006A61',
                                    color: 'white',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    py: 1.5,
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    mb: 1.5,
                                    '&:hover': {
                                      bgcolor: '#005550'
                                    }
                                  }}
                                >
                                  Saisir mon IdHAL dans Mon Compte
                                </Button>
                                <Typography variant="body2" sx={{ color: '#2D3836', fontSize: '0.875rem', textAlign: 'center' }}>
                                  Pas encore d'IdHAL ?{' '}
                                  <MuiLink
                                    href="https://doc.hal.science/identifiant-auteur-idhal-cv/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: '#006A61', fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                  >
                                    Créer un IdHAL
                                  </MuiLink>
                                </Typography>
                              </>
                            ) : (
                              /* SCÉNARIO B: IdHAL présent */
                              <>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                  <InfoIcon sx={{ color: '#3B82F6', fontSize: '1.25rem' }} />
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      color: '#2D3836',
                                      fontSize: '0.875rem',
                                      fontWeight: 600
                                    }}
                                  >
                                    Publication absente de votre HAL
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#2D3836', mb: 2.5, fontSize: '0.875rem', lineHeight: 1.6 }}>
                                  Votre IdHAL est bien configuré, mais cette publication n'a pas été détectée sur votre profil HAL.
                                </Typography>
                                <Button
                                  variant="contained"
                                  fullWidth
                                  startIcon={<Upload size={16} />}
                                  onClick={() => {
                                    setHalAnchorEl(null);
                                    // Navigate to publication detail with HAL deposit tab
                                    const pubId = encodeURIComponent(selectedHalPublication.title.substring(0, 50).replace(/\s+/g, '-').toLowerCase());
                                    navigate(`/publication/${pubId}`, {
                                      state: {
                                        publication: selectedHalPublication,
                                        activeTab: 5 // Index of "Déposer dans HAL" tab
                                      }
                                    });
                                  }}
                                  sx={{
                                    bgcolor: '#006A61',
                                    color: 'white',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    py: 1.5,
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    mb: 1.5,
                                    '&:hover': {
                                      bgcolor: '#005550'
                                    }
                                  }}
                                >
                                  Déposer la publication dans HAL
                                </Button>
                                <Typography variant="body2" sx={{ color: '#2D3836', fontSize: '0.875rem', textAlign: 'center' }}>
                                  Un doute ? Vérifiez votre{' '}
                                  <MuiLink
                                    href="#/mon-compte"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setHalAnchorEl(null);
                                      window.open('#/mon-compte', '_blank');
                                    }}
                                    sx={{ color: '#006A61', fontWeight: 500, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                                  >
                                    IdHAL dans Mon Compte
                                  </MuiLink>.
                                </Typography>
                              </>
                            )}
                          </Box>
                        ) : (
                          <Box>
                            <Typography variant="body2" sx={{ color: '#2D3836', mb: 2, fontSize: '0.875rem', lineHeight: 1.6 }}>
                              {selectedHalPublication.halHasFile ? 'Fichier' : 'Notice'} {notInCollection || needsUpdate ? '' : 'déposé(e) dans la collection HAL du LPED'}
                            </Typography>

                            {/* Alerts for issues */}
                            {notInCollection && (
                              <Alert
                                severity="warning"
                                sx={{
                                  mb: 2,
                                  fontSize: '0.8125rem',
                                  '& .MuiAlert-icon': { fontSize: '1.25rem' }
                                }}
                              >
                                <AlertTitle sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                  Absent de la collection
                                </AlertTitle>
                                {selectedHalPublication.halHasFile ? 'Fichier' : 'Notice'} absent(e) de la collection HAL du LPED. Si vous étiez déjà au LPED au moment de la publication de ce document, vérifiez l'<MuiLink href="#" sx={{ color: '#006A61', fontWeight: 500 }}>affiliation</MuiLink>.
                              </Alert>
                            )}

                            {needsUpdate && (
                              <Alert
                                severity="info"
                                sx={{
                                  mb: 2,
                                  fontSize: '0.8125rem',
                                  '& .MuiAlert-icon': { fontSize: '1.25rem' }
                                }}
                              >
                                <AlertTitle sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                  Mise à jour disponible
                                </AlertTitle>
                                Des différences ont été détectées entre SoVisu+ et HAL.
                              </Alert>
                            )}

                            {/* Action buttons */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                              {needsUpdate && (
                                <Button
                                  variant="contained"
                                  fullWidth
                                  startIcon={<RefreshCw size={16} />}
                                  onClick={() => {
                                    setHalAnchorEl(null);
                                    // Navigate to publication detail page with the update tab
                                    navigate(`/publication/${encodeURIComponent(selectedHalPublication.title)}`, {
                                      state: { publication: selectedHalPublication, activeTab: 5 }
                                    });
                                  }}
                                  sx={{
                                    bgcolor: '#006A61',
                                    color: 'white',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    py: 1.5,
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    '&:hover': {
                                      bgcolor: '#005550'
                                    }
                                  }}
                                >
                                  Mettre à jour sur HAL
                                </Button>
                              )}

                              {selectedHalPublication.hal && (
                                <Button
                                  variant="outlined"
                                  fullWidth
                                  startIcon={<ExternalLink size={16} />}
                                  component="a"
                                  href={`https://hal.science/${selectedHalPublication.hal}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setHalAnchorEl(null)}
                                  sx={{
                                    borderColor: '#006A61',
                                    color: '#006A61',
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    py: 1.5,
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    '&:hover': {
                                      borderColor: '#005550',
                                      bgcolor: 'rgba(0, 106, 97, 0.04)'
                                    }
                                  }}
                                >
                                  Voir le document sur HAL
                                </Button>
                              )}
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    );
                  })()}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </SvpBox>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}