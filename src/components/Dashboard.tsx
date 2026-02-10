import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Divider,
  Chip,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  FormGroup,
  InputLabel,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  SvpBox,
  SvpSurface,
  SvpTypography,
  SvpColors,
  SvpH1
} from './ui/SvpWrappers';
import {
  FilterList as FilterIcon,
  Search as SearchIcon,
  Science as ScienceIcon,
  Biotech as BiotechIcon,
  Dns as DnsIcon,
  Computer as ComputerIcon,
  LocalFlorist as LocalFloristIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  Public as PublicIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Import des images de la maquette Figma
import imgImage22 from "figma:asset/0cb7103460abf945778a92dcb22acf2e89658bc1.png";
import imgImage29 from "figma:asset/c84271b3b626cfe0134a518765d10c9495166976.png";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Expertise {
  id: string;
  name: string;
  geographicAreas: string[];
  temporalPeriod: string;
  temporalStart?: string;
  temporalEnd?: string;
  expertiseLevel: string;
  availabilities: {
    // Médias & Grand Public
    pressInterviews: boolean;
    radioTv: boolean;
    publicConferences: boolean;
    currentAffairs: boolean;
    // Académique & Professionnel
    academicConferences: boolean;
    businessPartnerships: boolean;
    publicExpertise: boolean;
    // Mentoring & Pédagogie
    schoolInterventions: boolean;
  };
  mediaTraining?: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDarkMode = theme.palette.mode === 'dark'; // Assuming MUI theme is synced or we use local state
  // Check if we already have isDarkMode state in this component or if we need to get it from context/props
  // Looking at Dashboard.tsx it doesn't seem to have isDarkMode in props yet.

  // Actually, I'll use the theme mode if available, but for now I'll check if App.tsx can provide it.
  // For the moment, let's just use the theme value.

  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Gestion des expertises
  const [expertisesList, setExpertisesList] = useState<Expertise[]>([
    {
      id: '1',
      name: 'Intelligence Artificielle',
      geographicAreas: ['Union Européenne', 'États-Unis'],
      temporalPeriod: 'Actuel / Prospectif',
      expertiseLevel: 'Recherche active',
      availabilities: {
        pressInterviews: true,
        radioTv: false,
        publicConferences: true,
        currentAffairs: false,
        academicConferences: true,
        businessPartnerships: true,
        publicExpertise: true,
        schoolInterventions: false,
      },
      mediaTraining: false,
    },
  ]);
  const [openExpertiseDialog, setOpenExpertiseDialog] = useState(false);
  const [currentExpertise, setCurrentExpertise] = useState<Expertise>({
    id: '',
    name: '',
    geographicAreas: [],
    temporalPeriod: '',
    temporalStart: '',
    temporalEnd: '',
    expertiseLevel: '',
    availabilities: {
      pressInterviews: false,
      radioTv: false,
      publicConferences: false,
      currentAffairs: false,
      academicConferences: false,
      businessPartnerships: false,
      publicExpertise: false,
      schoolInterventions: false,
    },
    mediaTraining: false,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Données pour le graphique Publications par année
  const publicationsData = [
    { year: '2022', count: 4 },
    { year: '2023', count: 5 },
    { year: '2024', count: 4 },
    { year: '2025', count: 5 },
  ];

  // Projets en cours
  const ongoingProjects = [
    { name: 'Projet AdolOcean (ANR)', progress: 40, color: '#00C853' },
    { name: 'Étude BioDiVaN (Fondation BNP Paribas)', progress: 40, color: '#00C853' }
  ];

  // Expertises
  const expertises = [
    'Génétique des populations',
    'Biologie cellulaire',
    'Séquençage haut-débit',
    'Bioinformatique',
    'Écologie moléculaire'
  ];

  // Fonction pour obtenir l'icône appropriée pour chaque expertise
  const getExpertiseIcon = (expertise: string) => {
    switch (expertise) {
      case 'Génétique des populations':
        return <DnsIcon sx={{ fontSize: 18 }} />;
      case 'Biologie cellulaire':
        return <BiotechIcon sx={{ fontSize: 18 }} />;
      case 'Séquençage haut-débit':
        return <ScienceIcon sx={{ fontSize: 18 }} />;
      case 'Bioinformatique':
        return <ComputerIcon sx={{ fontSize: 18 }} />;
      case 'Écologie moléculaire':
        return <LocalFloristIcon sx={{ fontSize: 18 }} />;
      default:
        return <ScienceIcon sx={{ fontSize: 18 }} />;
    }
  };

  // Référentiels pour le formulaire d'expertise
  const geographicZones = [
    // Pays
    'France', 'Japon', 'États-Unis', 'Royaume-Uni', 'Allemagne', 'Espagne', 'Italie',
    // Zones géopolitiques
    'Union Européenne', 'OTAN', 'Mercosur', 'Pays du Sud', 'Afrique subsaharienne',
    // Zones physiques
    'Arctique', 'Méditerranée', 'Zone intertropicale', 'Milieu urbain', 'Zones côtières',
  ];

  const temporalPeriods = [
    'Préhistoire',
    'Antiquité',
    'Moyen Âge',
    'Époque moderne',
    'Époque contemporaine',
    'Années 1990',
    'Années 2000',
    'Années 2010',
    'Actuel / Prospectif',
    'Période personnalisée',
  ];

  const expertiseLevels = [
    { value: 'Intérêt secondaire', label: 'Intérêt secondaire / Veille', description: 'Je suis le sujet, je peux en discuter de manière informelle' },
    { value: 'Expertise enseignement', label: 'Expertise d\'enseignement', description: 'Je maîtrise le sujet suffisamment pour l\'enseigner' },
    { value: 'Recherche active', label: 'Expertise de recherche active', description: 'Je publie actuellement sur ce sujet' },
    { value: 'Référence senior', label: 'Expertise de référence (Senior)', description: 'Je suis reconnu comme une référence sur ce sujet' },
  ];

  // Fonctions de gestion des expertises
  const handleOpenExpertiseDialog = () => {
    setCurrentExpertise({
      id: '',
      name: '',
      geographicAreas: [],
      temporalPeriod: '',
      temporalStart: '',
      temporalEnd: '',
      expertiseLevel: '',
      availabilities: {
        pressInterviews: false,
        radioTv: false,
        publicConferences: false,
        currentAffairs: false,
        academicConferences: false,
        businessPartnerships: false,
        publicExpertise: false,
        schoolInterventions: false,
      },
      mediaTraining: false,
    });
    setOpenExpertiseDialog(true);
  };

  const handleCloseExpertiseDialog = () => {
    setOpenExpertiseDialog(false);
  };

  const handleSaveExpertise = () => {
    if (currentExpertise.id) {
      // Modification
      setExpertisesList(expertisesList.map(exp =>
        exp.id === currentExpertise.id ? currentExpertise : exp
      ));
    } else {
      // Ajout
      setExpertisesList([...expertisesList, { ...currentExpertise, id: Date.now().toString() }]);
    }
    handleCloseExpertiseDialog();
  };

  const handleDeleteExpertise = (id: string) => {
    setExpertisesList(expertisesList.filter(exp => exp.id !== id));
  };

  // Taux d'accès ouvert
  const openAccessData = [
    { year: '2018', rate: 25 },
    { year: '2019', rate: 33 },
    { year: '2020', rate: 40 },
    { year: '2021', rate: 58 },
    { year: '2022', rate: 65 },
  ];

  // Principaux co-auteurs
  const topCoAuthors = [
    { name: 'Guillaume Demo', count: 6, color: '#FF6B6B' },
    { name: 'Laboye, Vincent', count: 6, color: '#FF7F50' },
    { name: 'Bert Meussen', count: 3, color: '#FF8C69' },
    { name: 'Frédéric Reynos', count: 3, color: '#FF9B85' },
    { name: 'Dhouo, Bellony', count: 3, color: '#FFA994' },
    { name: 'Morgane Roffe', count: 2, color: '#FFB8A3' },
  ];

  return (
    <Box sx={{ bgcolor: SvpColors.bgPage, minHeight: '100vh', p: isMobile ? 2 : 3, transition: 'background-color 0.3s ease' }}>
      <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
        {/* En-tête */}
        <Box sx={{ mb: 3 }}>
          <SvpH1>
            Tableau de bord
          </SvpH1>
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              bgcolor: 'var(--svp-glass-bg)',
              backdropFilter: 'var(--svp-glass-blur)',
              borderRadius: '8px 8px 0 0',
              borderBottom: `1px solid ${SvpColors.border}`,
              '& .MuiTabs-indicator': {
                backgroundColor: SvpColors.primary,
                height: 3,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: SvpColors.textSecondary,
                '&.Mui-selected': {
                  color: SvpColors.primary,
                },
              },
            }}
          >
            <Tab label="Synthèse" />
            <Tab label="Science ouverte" />
            <Tab label="Expertises" />
            <Tab label="Réseau" />
            <Tab label="Profils similaires" />
          </Tabs>
          <Divider />
        </Box>

        <TabPanel value={activeTab} index={0}>
          {/* Section Profil et Actions */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '350px 1fr',
            gap: 2,
            mb: 2
          }}>
            {/* Carte Profil */}
            <SvpSurface sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    bgcolor: SvpColors.primary,
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: '#fff'
                  }}
                >
                  OD
                </Avatar>
                <SvpTypography variant="h6" sx={{ color: SvpColors.primary, fontWeight: 600, mb: 0.5 }}>
                  Olivia Dupont
                </SvpTypography>
                <SvpTypography variant="body2" sx={{ color: SvpColors.textSecondary, textAlign: 'center', mb: 2 }}>
                  LS2N
                </SvpTypography>
              </Box>
            </SvpSurface>

            {/* Graphique Publications par année */}
            <SvpSurface sx={{ p: 3 }}>
              <SvpTypography variant="h6" sx={{ color: SvpColors.primary, fontWeight: 500, mb: 2 }}>
                Nombre de publications par an
              </SvpTypography>
              <Divider sx={{ mb: 2, borderColor: SvpColors.border }} />
              <Box sx={{ width: '100%', height: 280, minHeight: 280 }}>
                {activeTab === 0 && (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                      data={publicationsData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB'} />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: isDarkMode ? '#A0A0A0' : '#666666', fontSize: 12 }}
                        axisLine={{ stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}
                      />
                      <YAxis
                        tick={{ fill: isDarkMode ? '#A0A0A0' : '#666666', fontSize: 12 }}
                        axisLine={{ stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#1A2322' : 'white',
                          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB'}`,
                          borderRadius: 8,
                          fontSize: 12,
                          color: isDarkMode ? '#E0E0E0' : '#2D3836'
                        }}
                        itemStyle={{ color: isDarkMode ? '#E0E0E0' : '#2D3836' }}
                        cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(139, 92, 246, 0.1)' }}
                      />
                      <Bar
                        dataKey="count"
                        fill="#8B5CF6"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </SvpSurface>
          </Box>

          {/* Section Projets et Expertises */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : '2fr 1fr',
            gap: 2,
            mb: 2
          }}>
            {/* Projets en cours */}
            <SvpSurface sx={{ p: 3 }}>
              <SvpTypography variant="h6" sx={{ color: SvpColors.primary, fontWeight: 500, mb: 2 }}>
                Projets en cours
              </SvpTypography>
              <Divider sx={{ mb: 3, borderColor: SvpColors.border }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 2 }}>
                {ongoingProjects.map((project, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <SvpTypography variant="body2" sx={{ color: SvpColors.textPrimary, fontWeight: 500 }}>
                        {project.name}
                      </SvpTypography>
                      <SvpTypography variant="body2" sx={{ color: SvpColors.textSecondary }}>
                        {project.progress}%
                      </SvpTypography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#E5E7EB',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: project.color,
                          borderRadius: 1,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </SvpSurface>

            {/* Expertises */}
            <SvpSurface sx={{ p: 3 }}>
              <SvpTypography variant="h6" sx={{ color: SvpColors.primary, fontWeight: 500, mb: 2 }}>
                Expertises
              </SvpTypography>
              <Divider sx={{ mb: 3, borderColor: SvpColors.border }} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, py: 1 }}>
                {expertises.map((expertise, index) => (
                  <Chip
                    key={index}
                    icon={getExpertiseIcon(expertise)}
                    label={expertise}
                    sx={{
                      bgcolor: isDarkMode ? 'rgba(0, 135, 123, 0.1)' : '#E8F5F4',
                      color: SvpColors.primary,
                      border: `1px solid ${isDarkMode ? 'rgba(0, 135, 123, 0.2)' : '#BEC9C6'}`,
                      '& .MuiChip-icon': {
                        color: SvpColors.primary,
                      },
                      '&:hover': {
                        bgcolor: isDarkMode ? 'rgba(0, 135, 123, 0.2)' : '#D1ECE9',
                      },
                    }}
                  />
                ))}
              </Box>
            </SvpSurface>
          </Box>

          {/* Section Taux d'accès ouvert et Collaborations */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : '1fr 1fr',
            gap: 2,
            mb: 2
          }}>
            {/* Taux d'accès ouvert */}
            <SvpSurface sx={{ p: 3 }}>
              <SvpTypography variant="h6" sx={{ color: SvpColors.primary, fontWeight: 500, mb: 2 }}>
                Taux d'accès ouvert des publications scientifiques
              </SvpTypography>
              <Divider sx={{ mb: 2, borderColor: SvpColors.border }} />
              <Box sx={{ width: '100%', height: 280, minHeight: 280 }}>
                {activeTab === 0 && (
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                      data={openAccessData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB'} />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: isDarkMode ? '#A0A0A0' : '#666666', fontSize: 12 }}
                        axisLine={{ stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}
                      />
                      <YAxis
                        tick={{ fill: isDarkMode ? '#A0A0A0' : '#666666', fontSize: 12 }}
                        axisLine={{ stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDarkMode ? '#1A2322' : 'white',
                          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : '#E5E7EB'}`,
                          borderRadius: 8,
                          fontSize: 12,
                          color: isDarkMode ? '#E0E0E0' : '#2D3836'
                        }}
                        itemStyle={{ color: isDarkMode ? '#E0E0E0' : '#2D3836' }}
                        cursor={{ fill: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(139, 92, 246, 0.1)' }}
                      />
                      <Bar
                        dataKey="rate"
                        fill="#8B5CF6"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </Box>
            </SvpSurface>

            {/* Collaborations internationales */}
            <SvpSurface sx={{ p: 3 }}>
              <SvpTypography variant="h6" sx={{ color: SvpColors.primary, fontWeight: 500, mb: 2 }}>
                Collaborations internationales
              </SvpTypography>
              <Divider sx={{ mb: 2, borderColor: SvpColors.border }} />

              {/* Filtres */}
              <Box sx={{ display: 'flex', gap: 0, mb: 2 }}>
                <FormControl
                  size="small"
                  sx={{
                    minWidth: 100,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '6px 0 0 6px',
                      fontSize: '0.875rem',
                      color: isDarkMode ? SvpColors.primary : '#6941C6',
                      '& fieldset': {
                        borderColor: isDarkMode ? 'rgba(0, 135, 123, 0.3)' : 'rgba(105, 65, 198, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: SvpColors.primary,
                      },
                    }
                  }}
                >
                  <Select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value as string)}
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterIcon sx={{ fontSize: 16, color: SvpColors.primary }} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="all">Pays</MenuItem>
                    <MenuItem value="france">France</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                    <MenuItem value="uk">UK</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  size="small"
                  placeholder="Rechercher"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ fontSize: 16, color: SvpColors.textSecondary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '0 6px 6px 0',
                      fontSize: '0.875rem',
                    }
                  }}
                />
              </Box>

              {/* Carte */}
              <Box sx={{
                width: '100%',
                height: 200,
                overflow: 'hidden',
                borderRadius: 1
              }}>
                <Box
                  component="img"
                  src={imgImage22}
                  alt="Collaborations internationales"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isDarkMode ? 0.8 : 1
                  }}
                />
              </Box>
            </SvpSurface>
          </Box>

          {/* Section Principaux co-auteurs et Domaines de recherche */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: isTablet ? '1fr' : '1fr 1.4fr',
            gap: 2
          }}>
            {/* Principaux co-auteurs */}
            <SvpSurface sx={{ p: 3 }}>
              <SvpTypography variant="h6" sx={{ color: SvpColors.primary, fontWeight: 500, mb: 2 }}>
                Principaux co-auteurs
              </SvpTypography>
              <Divider sx={{ mb: 3, borderColor: SvpColors.border }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 1 }}>
                {topCoAuthors.map((author, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                      <SvpTypography
                        variant="body2"
                        sx={{
                          color: SvpColors.textPrimary,
                          fontWeight: 500,
                          cursor: 'pointer',
                          '&:hover': { color: SvpColors.primary }
                        }}
                      >
                        {author.name}
                      </SvpTypography>
                      <SvpTypography variant="body2" sx={{ color: SvpColors.textSecondary, fontSize: '0.875rem' }}>
                        {author.count} {author.count === 1 ? 'publication' : 'publications'}
                      </SvpTypography>
                    </Box>
                    <Box sx={{ position: 'relative', height: 24 }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          bgcolor: author.color,
                          borderRadius: 1,
                          width: `${(author.count / 6) * 100}%`,
                          transition: 'width 0.3s ease',
                          opacity: isDarkMode ? 0.7 : 1
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </SvpSurface>

            {/* Domaines de recherche */}
            <SvpSurface sx={{ p: 3 }}>
              <SvpTypography variant="h6" sx={{ color: SvpColors.primary, fontWeight: 500, mb: 2 }}>
                Domaines de recherche
              </SvpTypography>
              <Divider sx={{ mb: 2, borderColor: SvpColors.border }} />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 300
              }}>
                <Box
                  component="img"
                  src={imgImage29}
                  alt="Domaines de recherche"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 480,
                    objectFit: 'contain',
                    opacity: isDarkMode ? 0.8 : 1
                  }}
                />
              </Box>
            </SvpSurface>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <SvpSurface sx={{ p: 4, textAlign: 'center' }}>
            <SvpTypography variant="h6" color="textSecondary">
              Contenu Science ouverte à venir
            </SvpTypography>
          </SvpSurface>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <SvpSurface sx={{ p: 3 }}>
            <SvpBox align="center" justify="space-between" sx={{ mb: 3 }}>
              <SvpH1 sx={{ fontSize: '2rem', m: 0 }}>
                Expertises
              </SvpH1>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenExpertiseDialog}
                sx={{
                  bgcolor: SvpColors.primary,
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 3,
                  py: 1.5,
                  fontSize: '0.9375rem',
                  '&:hover': {
                    bgcolor: SvpColors.primaryHover,
                  },
                }}
              >
                Ajouter une expertise
              </Button>
            </SvpBox>

            <Divider sx={{ mb: 3, borderColor: SvpColors.border }} />

            {/* Liste des expertises */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {expertisesList.map((expertise) => (
                <SvpSurface key={expertise.id} sx={{ p: 3, border: `1px solid ${SvpColors.border}`, boxShadow: 'none' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <SvpTypography variant="h6" sx={{ color: SvpColors.textPrimary, fontWeight: 500, mb: 1 }}>
                        {expertise.name}
                      </SvpTypography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <Chip
                          size="small"
                          label={expertise.expertiseLevel}
                          sx={{
                            bgcolor: isDarkMode ? 'rgba(0, 135, 123, 0.1)' : '#E8F5F4',
                            color: SvpColors.primary,
                            border: `1px solid ${SvpColors.border}`,
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => expertise.id && handleDeleteExpertise(expertise.id)}
                      sx={{
                        color: '#DC2626',
                        '&:hover': {
                          bgcolor: isDarkMode ? 'rgba(220, 38, 38, 0.1)' : '#FEE2E2',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Périmètres */}
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 2 }}>
                    {expertise.geographicAreas.length > 0 && (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                          <PublicIcon sx={{ fontSize: 16, color: SvpColors.textSecondary }} />
                          <SvpTypography variant="body2" sx={{ color: SvpColors.textSecondary, fontWeight: 500 }}>
                            Périmètre géographique
                          </SvpTypography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {expertise.geographicAreas.map((area, idx) => (
                            <Chip
                              key={idx}
                              label={area}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.75rem', borderColor: SvpColors.border, color: SvpColors.textPrimary }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {expertise.temporalPeriod && (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                          <ScheduleIcon sx={{ fontSize: 16, color: SvpColors.textSecondary }} />
                          <SvpTypography variant="body2" sx={{ color: SvpColors.textSecondary, fontWeight: 500 }}>
                            Périmètre temporel
                          </SvpTypography>
                        </Box>
                        <SvpTypography variant="body2" sx={{ color: SvpColors.textPrimary }}>
                          {expertise.temporalPeriod}
                          {expertise.temporalStart && expertise.temporalEnd && (
                            <span> ({expertise.temporalStart} - {expertise.temporalEnd})</span>
                          )}
                        </SvpTypography>
                      </Box>
                    )}
                  </Box>

                  {/* Disponibilités */}
                  <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${SvpColors.border}` }}>
                    <SvpTypography variant="body2" sx={{ color: SvpColors.textSecondary, fontWeight: 500, mb: 1.5 }}>
                      Disponible pour :
                    </SvpTypography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {expertise.availabilities.pressInterviews && (
                        <Chip label="Interviews presse" size="small" sx={{ bgcolor: isDarkMode ? 'rgba(22, 163, 74, 0.1)' : '#F0FDF4', color: '#16A34A', fontSize: '0.75rem' }} />
                      )}
                      {expertise.availabilities.radioTv && (
                        <Chip label="Radio/TV" size="small" sx={{ bgcolor: isDarkMode ? 'rgba(22, 163, 74, 0.1)' : '#F0FDF4', color: '#16A34A', fontSize: '0.75rem' }} />
                      )}
                      {expertise.availabilities.publicConferences && (
                        <Chip label="Conférences grand public" size="small" sx={{ bgcolor: isDarkMode ? 'rgba(22, 163, 74, 0.1)' : '#F0FDF4', color: '#16A34A', fontSize: '0.75rem' }} />
                      )}
                      {expertise.availabilities.currentAffairs && (
                        <Chip label="Sujets d'actualité" size="small" sx={{ bgcolor: isDarkMode ? 'rgba(22, 163, 74, 0.1)' : '#F0FDF4', color: '#16A34A', fontSize: '0.75rem' }} />
                      )}
                      {expertise.availabilities.academicConferences && (
                        <Chip label="Colloques spécialisés" size="small" sx={{ bgcolor: isDarkMode ? 'rgba(37, 99, 235, 0.1)' : '#EFF6FF', color: '#2563EB', fontSize: '0.75rem' }} />
                      )}
                      {expertise.availabilities.businessPartnerships && (
                        <Chip label="Partenariats R&D" size="small" sx={{ bgcolor: isDarkMode ? 'rgba(37, 99, 235, 0.1)' : '#EFF6FF', color: '#2563EB', fontSize: '0.75rem' }} />
                      )}
                      {expertise.availabilities.publicExpertise && (
                        <Chip label="Expertise publique" size="small" sx={{ bgcolor: isDarkMode ? 'rgba(37, 99, 235, 0.1)' : '#EFF6FF', color: '#2563EB', fontSize: '0.75rem' }} />
                      )}
                      {expertise.availabilities.schoolInterventions && (
                        <Chip label="Interventions scolaires" size="small" sx={{ bgcolor: isDarkMode ? 'rgba(217, 119, 6, 0.1)' : '#FEF3C7', color: '#D97706', fontSize: '0.75rem' }} />
                      )}
                    </Box>
                  </Box>
                </SvpSurface>
              ))}

              {expertisesList.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <SvpTypography variant="body1" sx={{ color: SvpColors.textSecondary }}>
                    Aucune expertise ajoutée. Cliquez sur "Ajouter une expertise" pour commencer.
                  </SvpTypography>
                </Box>
              )}
            </Box>
          </SvpSurface>
        </TabPanel>

        {/* Dialog d'ajout/modification d'expertise */}
        <Dialog
          open={openExpertiseDialog}
          onClose={handleCloseExpertiseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: 'var(--svp-surface)',
              backgroundImage: 'none',
              borderRadius: 2
            }
          }}
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: isDarkMode ? 'rgba(0,0,0,0.2)' : '#F5F7F6', color: SvpColors.primary }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {currentExpertise.id ? 'Modifier l\'expertise' : 'Ajouter une expertise'}
            </Typography>
            <IconButton onClick={handleCloseExpertiseDialog} size="small" sx={{ color: SvpColors.textSecondary }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ mt: 2 }}>
            {/* Nom de l'expertise */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Nom de l'expertise"
                value={currentExpertise.name}
                onChange={(e) => setCurrentExpertise({ ...currentExpertise, name: e.target.value })}
                placeholder="ex: Intelligence Artificielle"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: SvpColors.textPrimary,
                    '& fieldset': { borderColor: SvpColors.border },
                    '&.Mui-focused fieldset': { borderColor: SvpColors.primary },
                  },
                  '& .MuiInputLabel-root': { color: SvpColors.textSecondary },
                  '& .MuiInputLabel-root.Mui-focused': { color: SvpColors.primary },
                }}
              />
            </Box>

            {/* Bloc 1: Contexte / Terrain */}
            <Typography variant="subtitle1" sx={{ color: SvpColors.primary, fontWeight: 600, mb: 2 }}>
              1. Contexte
            </Typography>

            {/* Périmètre géographique */}
            <Box sx={{ mb: 3 }}>
              <Autocomplete
                multiple
                options={geographicZones}
                value={currentExpertise.geographicAreas}
                onChange={(_, newValue) => {
                  setCurrentExpertise({ ...currentExpertise, geographicAreas: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Zone géographique"
                    placeholder="Sélectionnez une ou plusieurs zones"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: SvpColors.textPrimary,
                        '& fieldset': { borderColor: SvpColors.border },
                        '&.Mui-focused fieldset': { borderColor: SvpColors.primary },
                      },
                      '& .MuiInputLabel-root': { color: SvpColors.textSecondary },
                      '& .MuiInputLabel-root.Mui-focused': { color: SvpColors.primary },
                    }}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      size="small"
                      sx={{ bgcolor: isDarkMode ? 'rgba(0, 135, 123, 0.1)' : '#E8F5F4', color: SvpColors.primary }}
                    />
                  ))
                }
              />
            </Box>

            {/* Périmètre temporel */}
            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: SvpColors.textSecondary, '&.Mui-focused': { color: SvpColors.primary } }}>Période</InputLabel>
                <Select
                  value={currentExpertise.temporalPeriod}
                  label="Période"
                  onChange={(e) => setCurrentExpertise({ ...currentExpertise, temporalPeriod: e.target.value as string })}
                  sx={{
                    color: SvpColors.textPrimary,
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: SvpColors.border },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: SvpColors.primary },
                  }}
                >
                  {temporalPeriods.map((period) => (
                    <MenuItem key={period} value={period}>
                      {period}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {currentExpertise.temporalPeriod === 'Période personnalisée' && (
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                <TextField
                  label="Date de début"
                  type="number"
                  value={currentExpertise.temporalStart}
                  onChange={(e) => setCurrentExpertise({ ...currentExpertise, temporalStart: e.target.value })}
                  placeholder="ex: 2020"
                  sx={{ '& .MuiOutlinedInput-root': { color: SvpColors.textPrimary } }}
                />
                <TextField
                  label="Date de fin"
                  type="number"
                  value={currentExpertise.temporalEnd}
                  onChange={(e) => setCurrentExpertise({ ...currentExpertise, temporalEnd: e.target.value })}
                  placeholder="ex: 2030"
                  sx={{ '& .MuiOutlinedInput-root': { color: SvpColors.textPrimary } }}
                />
              </Box>
            )}

            <Divider sx={{ my: 3, borderColor: SvpColors.border }} />

            {/* Bloc 2: Niveau d'expertise */}
            <Typography variant="subtitle1" sx={{ color: SvpColors.primary, fontWeight: 600, mb: 2 }}>
              2. Mon niveau sur ce sujet
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <RadioGroup
                value={currentExpertise.expertiseLevel}
                onChange={(e) => setCurrentExpertise({ ...currentExpertise, expertiseLevel: e.target.value })}
              >
                {expertiseLevels.map((level) => (
                  <FormControlLabel
                    key={level.value}
                    value={level.value}
                    control={<Radio sx={{ color: SvpColors.primary, '&.Mui-checked': { color: SvpColors.primary } }} />}
                    label={
                      <Box>
                        <SvpTypography variant="body2" sx={{ fontWeight: 500 }}>
                          {level.label}
                        </SvpTypography>
                        <SvpTypography variant="caption" sx={{ color: SvpColors.textSecondary }}>
                          {level.description}
                        </SvpTypography>
                      </Box>
                    }
                    sx={{ mb: 1, alignItems: 'flex-start' }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 3, borderColor: SvpColors.border }} />

            {/* Bloc 3: Disponibilités */}
            <Typography variant="subtitle1" sx={{ color: SvpColors.primary, fontWeight: 600, mb: 2 }}>
              3. Je suis disponible pour...
            </Typography>

            {/* Catégorie A: Médias & Grand Public */}
            <Box sx={{ mb: 3 }}>
              <SvpTypography variant="body2" sx={{ fontWeight: 600, color: SvpColors.textPrimary, mb: 1.5 }}>
                Médias & Grand Public (Vulgarisation)
              </SvpTypography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentExpertise.availabilities.pressInterviews}
                      onChange={(e) => setCurrentExpertise({
                        ...currentExpertise,
                        availabilities: { ...currentExpertise.availabilities, pressInterviews: e.target.checked }
                      })}
                      sx={{ '&.Mui-checked': { color: SvpColors.primary }, '& .MuiSwitch-track': { bgcolor: SvpColors.primary } }}
                    />
                  }
                  label={<SvpTypography sx={{ fontSize: '0.875rem' }}>Interviews Presse écrite / Web</SvpTypography>}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentExpertise.availabilities.radioTv}
                      onChange={(e) => setCurrentExpertise({
                        ...currentExpertise,
                        availabilities: { ...currentExpertise.availabilities, radioTv: e.target.checked }
                      })}
                      sx={{ '&.Mui-checked': { color: SvpColors.primary }, '& .MuiSwitch-track': { bgcolor: SvpColors.primary } }}
                    />
                  }
                  label={<SvpTypography sx={{ fontSize: '0.875rem' }}>Radio / TV (Direct)</SvpTypography>}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentExpertise.availabilities.publicConferences}
                      onChange={(e) => setCurrentExpertise({
                        ...currentExpertise,
                        availabilities: { ...currentExpertise.availabilities, publicConferences: e.target.checked }
                      })}
                      sx={{ '&.Mui-checked': { color: SvpColors.primary }, '& .MuiSwitch-track': { bgcolor: SvpColors.primary } }}
                    />
                  }
                  label={<SvpTypography sx={{ fontSize: '0.875rem' }}>Conférences Grand Public / Débats citoyens</SvpTypography>}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentExpertise.availabilities.currentAffairs}
                      onChange={(e) => setCurrentExpertise({
                        ...currentExpertise,
                        availabilities: { ...currentExpertise.availabilities, currentAffairs: e.target.checked }
                      })}
                      sx={{ '&.Mui-checked': { color: SvpColors.primary }, '& .MuiSwitch-track': { bgcolor: SvpColors.primary } }}
                    />
                  }
                  label={<SvpTypography sx={{ fontSize: '0.875rem' }}>{'Sujets "Chauds" (Réagir à l\'actualité immédiate)'}</SvpTypography>}
                />
              </FormGroup>
            </Box>

            {/* Catégorie B: Académique & Professionnel */}
            <Box sx={{ mb: 3 }}>
              <SvpTypography variant="body2" sx={{ fontWeight: 600, color: SvpColors.textPrimary, mb: 1.5 }}>
                Sphère Académique & Professionnelle
              </SvpTypography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentExpertise.availabilities.academicConferences}
                      onChange={(e) => setCurrentExpertise({
                        ...currentExpertise,
                        availabilities: { ...currentExpertise.availabilities, academicConferences: e.target.checked }
                      })}
                      sx={{ '&.Mui-checked': { color: SvpColors.primary }, '& .MuiSwitch-track': { bgcolor: SvpColors.primary } }}
                    />
                  }
                  label={<SvpTypography sx={{ fontSize: '0.875rem' }}>Colloques spécialisés / Séminaires</SvpTypography>}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentExpertise.availabilities.businessPartnerships}
                      onChange={(e) => setCurrentExpertise({
                        ...currentExpertise,
                        availabilities: { ...currentExpertise.availabilities, businessPartnerships: e.target.checked }
                      })}
                      sx={{ '&.Mui-checked': { color: SvpColors.primary }, '& .MuiSwitch-track': { bgcolor: SvpColors.primary } }}
                    />
                  }
                  label={<SvpTypography sx={{ fontSize: '0.875rem' }}>Interventions en entreprises / Partenariats R&D</SvpTypography>}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentExpertise.availabilities.publicExpertise}
                      onChange={(e) => setCurrentExpertise({
                        ...currentExpertise,
                        availabilities: { ...currentExpertise.availabilities, publicExpertise: e.target.checked }
                      })}
                      sx={{ '&.Mui-checked': { color: SvpColors.primary }, '& .MuiSwitch-track': { bgcolor: SvpColors.primary } }}
                    />
                  }
                  label={<SvpTypography sx={{ fontSize: '0.875rem' }}>Expertise publique (Auditions parlementaires, Ministères, Think Tanks)</SvpTypography>}
                />
              </FormGroup>
            </Box>

            {/* Catégorie C: Mentoring & Pédagogie */}
            <Box sx={{ mb: 3 }}>
              <SvpTypography variant="body2" sx={{ fontWeight: 600, color: SvpColors.textPrimary, mb: 1.5 }}>
                Mentoring & Pédagogie
              </SvpTypography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentExpertise.availabilities.schoolInterventions}
                      onChange={(e) => setCurrentExpertise({
                        ...currentExpertise,
                        availabilities: { ...currentExpertise.availabilities, schoolInterventions: e.target.checked }
                      })}
                      sx={{ '&.Mui-checked': { color: SvpColors.primary }, '& .MuiSwitch-track': { bgcolor: SvpColors.primary } }}
                    />
                  }
                  label={<SvpTypography sx={{ fontSize: '0.875rem' }}>Intervention en milieu scolaire (Lycées, etc.)</SvpTypography>}
                />
              </FormGroup>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, bgcolor: isDarkMode ? 'rgba(0,0,0,0.2)' : '#F5F7F6' }}>
            <Button onClick={handleCloseExpertiseDialog} sx={{ color: SvpColors.textSecondary, textTransform: 'none' }}>
              Annuler
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveExpertise}
              disabled={!currentExpertise.name || !currentExpertise.expertiseLevel}
              sx={{
                bgcolor: SvpColors.primary,
                textTransform: 'none',
                px: 3,
                '&:hover': {
                  bgcolor: SvpColors.primaryHover,
                },
                '&.Mui-disabled': {
                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#BEC9C6',
                },
              }}
            >
              {currentExpertise.id ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </Dialog>

        <TabPanel value={activeTab} index={3}>
          <SvpSurface sx={{ p: 4, textAlign: 'center' }}>
            <SvpTypography variant="h6" color="textSecondary">
              Contenu Réseau à venir
            </SvpTypography>
          </SvpSurface>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <SvpSurface sx={{ p: 4, textAlign: 'center' }}>
            <SvpTypography variant="h6" color="textSecondary">
              Contenu Profils similaires à venir
            </SvpTypography>
          </SvpSurface>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Dashboard;