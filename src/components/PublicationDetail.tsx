import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Box,
  Typography,
  // Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Chip,
  Button,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  // Card,
  CardContent,
  IconButton,
  Tooltip,
  Link as MuiLink,
  Popper,
  Fade,
  ClickAwayListener,

  // TextField,
  // MenuItem,
  // Select,
  // FormControl,
  // InputLabel,
  // FormHelperText,
  // LinearProgress,
  // Divider,
  // Alert,
  // Autocomplete
} from '@mui/material';
import {
  ChevronLeft,
  Edit,
  Copy,
  X as CloseIcon,
} from 'lucide-react';
import {
  SvpH1,
  SvpH2
} from './ui/SvpWrappers';
import imgHal from "figma:asset/d9ef9050c44ba1f1beafb7d579804fea2662df0e.png";
import imgOrcid from "figma:asset/6e3dbbc34225b24e434ec4a2f2b823e2d5f2a95c.png";
import imgHalProfile from "figma:asset/da60111133ce4fee28bc0ac92f48f081549aa44e.png";
import imgIdref from "figma:asset/834dc63c7f6fca9ae8d639d93da14de67568ef11.png";
import imgAvatar from "figma:asset/a7e73c4853a51cc1d7738b57bc8f5fb907ed70e6.png";
import imgOpenAlex from "figma:asset/c3e845dcd7fbf8e813f65222ea98666fe44e1814.png";
import imgScanR from "figma:asset/9435993bce15f5ee72b0f7570df0382bb3b4c8c8.png";
import { HalDepositForm } from './HalDepositForm';
import { HalUpdateForm } from './HalUpdateForm';

type Publication = {
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
  halHasFile?: boolean;
  halInLabCollection?: boolean;
  halNeedsUpdate?: boolean;
  dataSources?: string[];
};

type Author = {
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

type Journal = {
  name: string;
  type: string;
  issn: string;
  publisher: string;
  publisherCountry: string;
  accessType: 'gold' | 'diamond' | 'hybrid' | 'bronze' | 'closed';
};



const getDocumentTypeLabel = (type: string) => {
  switch (type) {
    case 'ART':
      return 'Livre';
    case 'COMM':
      return 'Communication';
    case 'THESE':
      return 'Thèse';
    default:
      return 'Document';
  }
};

// Authors database
const authorsDatabase: { [key: string]: Author } = {
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
    employer: 'IRD',
    avatar: imgAvatar,
    hal: 'https://hal.science/search/index/?q=quentin-boudot',
    isInternal: true
  },
  'Estella Fourat': {
    name: 'Estella Fourat',
    firstName: 'Estella',
    lastName: 'Fourat',
    laboratory: 'UMR Innovation',
    position: 'Chargée de recherche',
    employer: 'INRAE',
    orcid: 'https://orcid.org/0000-0003-9876-5432',
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
    hal: 'https://hal.science/search/index/?q=eric-blanchart'
  },
  'Miriam Carù': {
    name: 'Miriam Carù',
    firstName: 'Miriam',
    lastName: 'Carù',
    laboratory: 'UMR Innovation',
    position: 'Post-doctorante',
    employer: 'INRAE',
    orcid: 'https://orcid.org/0000-0001-5555-6666',
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

// Journals database
const journalsDatabase: { [key: string]: Journal } = {
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
  }
};

// Get open access info
const getOpenAccessInfo = (status: string) => {
  switch (status) {
    case 'gold':
      return { color: '#FFB020', label: 'GOLD' };
    case 'green':
      return { color: '#34A853', label: 'GREEN' };
    case 'diamond':
      return { color: '#B39DDB', label: 'DIAMOND' };
    case 'hybrid':
      return { color: '#FF6F00', label: 'HYBRID' };
    case 'bronze':
      return { color: '#CD7F32', label: 'BRONZE' };
    case 'closed':
      return { color: '#757575', label: 'CLOSED' };
    default:
      return { color: '#757575', label: 'UNKNOWN' };
  }
};

function PublicationDetail({ publications }: { publications: Publication[] }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 0);

  // Author and Journal popper states
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [authorAnchorEl, setAuthorAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);
  const [journalAnchorEl, setJournalAnchorEl] = useState<HTMLElement | null>(null);

  // Get publication from location state or find it from publications array using the id
  let publication: Publication | undefined = location.state?.publication;

  // If publication is not in location state, try to find it by id
  if (!publication && id && publications && publications.length > 0) {
    // Decode the id and try to match with publication title
    const decodedId = decodeURIComponent(id);

    publication = publications.find(pub => {
      const pubId = pub.title.substring(0, 50).replace(/\s+/g, '-').toLowerCase();
      return pubId === decodedId;
    });
  }

  // Function to copy text to clipboard
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copié dans le presse-papiers`);
    } catch (err) {
      toast.error('Impossible de copier dans le presse-papiers');
    }
  };

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

  if (!publication) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Publication non trouvée</Typography>
        <Button onClick={() => navigate('/publications')}>Retour aux publications</Button>
      </Box>
    );
  }


  const authorsList = publication.authors.split(', ');
  const wordCount = publication.abstract.split(' ').length;

  return (
    <Box sx={{
      bgcolor: '#F5F7F6',
      minHeight: '100vh',
      pb: 4
    }}>
      <Box sx={{
        maxWidth: '1600px',
        margin: '0 auto',
        px: 3,
        pt: 3
      }}>
        {/* Breadcrumb */}
        <Box sx={{ mb: 3 }}>
          <Link
            component="button"
            onClick={() => navigate('/publications')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: '#006A61',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <ChevronLeft size={16} />
            Retour aux publications - {publication.authors.split(', ')[0]}
          </Link>
        </Box>

        {/* Title */}
        <SvpH1 sx={{ mb: 3 }}>
          {publication.title}
        </SvpH1>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            mb: 3,
            borderBottom: '1px solid #E5E7E6',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: '#6F7977',
              minHeight: '48px',
              '&.Mui-selected': {
                color: '#006A61'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#006A61',
              height: '3px'
            }
          }}
        >
          <Tab label="Informations bibliographiques" />
          <Tab label="Métadonnées" />
          <Tab label="Domaines" />
          <Tab label="Sources" />
          <Tab label="Auteurs" />
          {publication.status === 'Hors HAL' && <Tab label="Déposer dans HAL" />}
          {publication.status === 'Dans HAL' && publication.halNeedsUpdate && <Tab label="Mettre à jour sur HAL" />}
        </Tabs>

        {/* Content */}
        {activeTab === 0 && (
          <Paper sx={{ p: 3, bgcolor: 'white' }}>
            <SvpH2 sx={{ mb: 3, fontSize: '1.25rem' }}>
              Informations bibliographiques
            </SvpH2>

            <Table sx={{ '& .MuiTableCell-root': { border: 'none' } }}>
              <TableBody>
                {/* Titre */}
                <TableRow>
                  <TableCell
                    sx={{
                      color: '#6F7977',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      width: '200px',
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0
                    }}
                  >
                    Titre
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#2D3836',
                      fontSize: '0.9375rem',
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0,
                      pl: 3
                    }}
                  >
                    {publication.title}
                  </TableCell>
                </TableRow>

                {/* Type de document */}
                <TableRow>
                  <TableCell
                    sx={{
                      color: '#6F7977',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0
                    }}
                  >
                    Type de document
                  </TableCell>
                  <TableCell
                    sx={{
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0,
                      pl: 3
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        label={getDocumentTypeLabel(publication.type)}
                        sx={{
                          bgcolor: '#E8F5F4',
                          color: '#006A61',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          height: '28px'
                        }}
                      />
                      <Chip
                        label="Modifié"
                        sx={{
                          bgcolor: '#F5F5F5',
                          color: '#6F7977',
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          height: '28px'
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>

                {/* Date de publication */}
                <TableRow>
                  <TableCell
                    sx={{
                      color: '#6F7977',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0
                    }}
                  >
                    Date de publication
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#2D3836',
                      fontSize: '0.9375rem',
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0,
                      pl: 3
                    }}
                  >
                    {new Date(publication.date).getFullYear()}
                  </TableCell>
                </TableRow>

                {/* Paru dans */}
                {publication.journal && (
                  <TableRow>
                    <TableCell
                      sx={{
                        color: '#6F7977',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        verticalAlign: 'top',
                        pt: 2,
                        pb: 2,
                        px: 0
                      }}
                    >
                      Paru dans
                    </TableCell>
                    <TableCell
                      sx={{
                        color: '#2D3836',
                        fontSize: '0.9375rem',
                        verticalAlign: 'top',
                        pt: 2,
                        pb: 2,
                        px: 0,
                        pl: 3
                      }}
                    >
                      <MuiLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleJournalClick(publication.journal!, e);
                        }}
                        sx={{
                          color: '#006A61',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        {publication.journal}
                      </MuiLink>
                    </TableCell>
                  </TableRow>
                )}

                {/* Identifiants */}
                {(publication.doi || publication.hal || publication.sudocPpn) && (
                  <TableRow>
                    <TableCell
                      sx={{
                        color: '#6F7977',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        verticalAlign: 'top',
                        pt: 2,
                        pb: 2,
                        px: 0
                      }}
                    >
                      Identifiants
                    </TableCell>
                    <TableCell
                      sx={{
                        verticalAlign: 'top',
                        pt: 2,
                        pb: 2,
                        px: 0,
                        pl: 3
                      }}
                    >
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {publication.doi && (
                          <Chip
                            label={`DOI : ${publication.doi}`}
                            onClick={() => copyToClipboard(publication.doi!, 'DOI')}
                            icon={<Copy size={14} />}
                            sx={{
                              backgroundColor: '#E8F5F4',
                              color: '#006A61',
                              fontSize: '0.8125rem',
                              height: '28px',
                              cursor: 'pointer',
                              '& .MuiChip-icon': {
                                color: '#006A61',
                                marginLeft: '8px'
                              },
                              '&:hover': {
                                backgroundColor: '#D1EBE9'
                              }
                            }}
                          />
                        )}
                        {publication.hal && (
                          <Chip
                            label={`HAL : ${publication.hal}`}
                            onClick={() => copyToClipboard(publication.hal!, 'HAL')}
                            icon={<Copy size={14} />}
                            sx={{
                              backgroundColor: '#E8F5F4',
                              color: '#006A61',
                              fontSize: '0.8125rem',
                              height: '28px',
                              cursor: 'pointer',
                              '& .MuiChip-icon': {
                                color: '#006A61',
                                marginLeft: '8px'
                              },
                              '&:hover': {
                                backgroundColor: '#D1EBE9'
                              }
                            }}
                          />
                        )}
                        {publication.sudocPpn && (
                          <Chip
                            label={`sudoc-ppn : ${publication.sudocPpn}`}
                            onClick={() => copyToClipboard(publication.sudocPpn!, 'sudoc-ppn')}
                            icon={<Copy size={14} />}
                            sx={{
                              backgroundColor: '#E8F5F4',
                              color: '#006A61',
                              fontSize: '0.8125rem',
                              height: '28px',
                              cursor: 'pointer',
                              '& .MuiChip-icon': {
                                color: '#006A61',
                                marginLeft: '8px'
                              },
                              '&:hover': {
                                backgroundColor: '#D1EBE9'
                              }
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}

                {/* Auteurs */}
                <TableRow>
                  <TableCell
                    sx={{
                      color: '#6F7977',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0
                    }}
                  >
                    Auteurs
                  </TableCell>
                  <TableCell
                    sx={{
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0,
                      pl: 3
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                      {authorsList.map((author, index) => {
                        const authorData = authorsDatabase[author];
                        const isInternal = authorData?.isInternal;
                        return (
                          <Chip
                            key={index}
                            label={author}
                            onClick={(e) => handleAuthorClick(author, e)}
                            sx={{
                              bgcolor: isInternal ? '#D4E9E7' : '#F3F4F6',
                              color: isInternal ? '#006A61' : '#6F7977',
                              fontWeight: isInternal ? 600 : 500,
                              fontSize: '0.875rem',
                              height: '28px',
                              cursor: 'pointer',
                              border: isInternal ? '1px solid #006A61' : 'none'
                            }}
                          />
                        );
                      })}
                      <Button
                        startIcon={<Edit size={16} />}
                        sx={{
                          color: '#006A61',
                          textTransform: 'none',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          minHeight: '28px',
                          '&:hover': {
                            bgcolor: '#E8F5F4'
                          }
                        }}
                      >
                        Modifier les auteurs
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>

                {/* Résumé */}
                <TableRow>
                  <TableCell
                    sx={{
                      color: '#6F7977',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Résumé
                      <Box
                        sx={{
                          bgcolor: '#006A61',
                          color: 'white',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {wordCount}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#2D3836',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0,
                      pl: 3
                    }}
                  >
                    {publication.abstract}
                  </TableCell>
                </TableRow>

                {/* Sources */}
                <TableRow>
                  <TableCell
                    sx={{
                      color: '#6F7977',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0
                    }}
                  >
                    Sources
                  </TableCell>
                  <TableCell
                    sx={{
                      verticalAlign: 'top',
                      pt: 2,
                      pb: 2,
                      px: 0,
                      pl: 3
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                      {publication.dataSources?.includes('HAL') && (
                        <Chip
                          icon={
                            <Box
                              component="img"
                              src={imgHal}
                              alt="HAL"
                              sx={{ width: 16, height: 16 }}
                            />
                          }
                          label="HAL"
                          sx={{
                            bgcolor: '#E8F5F4',
                            color: '#006A61',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            height: '28px',
                            '& .MuiChip-icon': {
                              marginLeft: '8px'
                            }
                          }}
                        />
                      )}
                      {publication.dataSources?.includes('OpenAlex') && (
                        <Chip
                          icon={
                            <Box
                              component="img"
                              src={imgOpenAlex}
                              alt="OpenAlex"
                              sx={{ width: 16, height: 16 }}
                            />
                          }
                          label="OpenAlex"
                          sx={{
                            bgcolor: '#FFF4E5',
                            color: '#F57C00',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            height: '28px',
                            '& .MuiChip-icon': {
                              marginLeft: '8px'
                            }
                          }}
                        />
                      )}
                      {publication.dataSources?.includes('Scopus') && (
                        <Chip
                          label="Scopus"
                          sx={{
                            bgcolor: '#FFF4E5',
                            color: '#FF6C00',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            height: '28px'
                          }}
                        />
                      )}
                      {publication.dataSources?.includes('ScanR') && (
                        <Chip
                          icon={
                            <Box
                              component="img"
                              src={imgScanR}
                              alt="ScanR"
                              sx={{ width: 16, height: 16 }}
                            />
                          }
                          label="ScanR"
                          sx={{
                            bgcolor: '#F0F4FF',
                            color: '#2196F3',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            height: '28px',
                            '& .MuiChip-icon': {
                              marginLeft: '8px'
                            }
                          }}
                        />
                      )}
                      <Button
                        sx={{
                          color: '#006A61',
                          textTransform: 'none',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          minHeight: '28px',
                          '&:hover': {
                            bgcolor: '#E8F5F4'
                          }
                        }}
                      >
                        Comparer les sources
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        )}

        {activeTab === 1 && (
          <Paper sx={{ p: 3, bgcolor: 'white' }}>
            <Typography sx={{ color: '#6F7977' }}>
              Contenu des métadonnées à venir...
            </Typography>
          </Paper>
        )}

        {activeTab === 2 && (
          <Paper sx={{ p: 3, bgcolor: 'white' }}>
            <Typography sx={{ color: '#6F7977' }}>
              Contenu des domaines à venir...
            </Typography>
          </Paper>
        )}

        {activeTab === 3 && (
          <Paper sx={{ p: 3, bgcolor: 'white' }}>
            <Typography sx={{ color: '#6F7977' }}>
              Contenu des sources à venir...
            </Typography>
          </Paper>
        )}

        {activeTab === 4 && (
          <Paper sx={{ p: 3, bgcolor: 'white' }}>
            <Typography sx={{ color: '#6F7977' }}>
              Contenu des auteurs à venir...
            </Typography>
          </Paper>
        )}

        {/* Onglet "Déposer dans HAL" - uniquement pour les publications hors HAL */}
        {publication.status === 'Hors HAL' && activeTab === 5 && (
          <Paper sx={{ bgcolor: 'white' }}>
            <HalDepositForm
              initialTitle={publication.title}
              initialAbstract={publication.abstract}
              initialAuthors={publication.authors}
              initialDocType={publication.type}
              initialDate={publication.date}
            />
          </Paper>
        )}

        {/* Onglet "Mettre à jour sur HAL" - uniquement pour les publications dans HAL qui nécessitent une mise à jour */}
        {publication.status === 'Dans HAL' && publication.halNeedsUpdate && (
          activeTab === 5 && (
            <Paper sx={{ bgcolor: 'white' }}>
              <HalUpdateForm
                halId={publication.hal}
              />
            </Paper>
          )
        )}
      </Box>

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
                          {selectedAuthor.laboratory}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6F7977', textAlign: 'center', fontSize: '0.75rem' }}>
                          {selectedAuthor.position}, {selectedAuthor.employer}
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
    </Box>
  );
}

export default PublicationDetail;