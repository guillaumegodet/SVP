import { useState } from 'react';
import { toast } from 'sonner';
import {
  Edit,
  Trash2,
  BookOpen,
  GraduationCap,
  Brain,
  MapPin,
  Calendar,
  Award,
} from 'lucide-react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  InputAdornment,
} from '@mui/material';
import {
  SvpH1
} from './ui/SvpWrappers';
import {
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Expertise, ExpertiseFormData, ExpertiseLevel } from '../types/expertise';
import { categories, temporalPeriods } from './expertises/expertiseConstants';
import { GeneralInfoStep, ContextStep, LevelStep, AvailabilityStep } from './expertises/ExpertiseFormSteps';
import ExpertiseStats from './expertises/ExpertiseStats';
import ExpertiseCard from './expertises/ExpertiseCard';

const getLevelInfo = (level: ExpertiseLevel) => {
  switch (level) {
    case 'veille':
      return {
        label: 'Intérêt secondaire / Veille',
        color: '#94a3b8',
        description: 'Je suis le sujet, je peux en discuter de manière informelle'
      };
    case 'enseignement':
      return {
        label: 'Expertise d\'enseignement',
        color: '#3b82f6',
        description: 'Je maîtrise le sujet suffisamment pour l\'enseigner'
      };
    case 'recherche':
      return {
        label: 'Expertise de recherche active',
        color: '#f59e0b',
        description: 'Je publie actuellement sur ce sujet'
      };
    case 'reference':
      return {
        label: 'Expertise de référence (Senior)',
        color: '#10b981',
        description: 'Je suis reconnu par mes pairs comme une référence'
      };
  }
};

export default function Expertises() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [expertiseToDelete, setExpertiseToDelete] = useState<Expertise | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingExpertiseId, setEditingExpertiseId] = useState<string | null>(null);

  // Form states
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<ExpertiseFormData>({
    name: '',
    category: '',
    description: '',
    keywords: '',
    geographicZones: [],
    temporalPeriodType: 'standard',
    temporalPeriodStandard: '',
    temporalStartYear: '',
    temporalEndYear: '',
    level: 'veille',
    availability: {
      pressWritten: false,
      pressTvRadio: false,
      publicConferences: false,
      hotTopics: false,
      academicConferences: false,
      businessPartnerships: false,
      publicExpertise: false,
      schoolInterventions: false,
      mediaTraining: false,
    }
  });

  const [expertises, setExpertises] = useState<Expertise[]>([
    {
      id: '1',
      name: 'Sécurité Alimentaire',
      category: 'Développement Durable',
      level: 'reference',
      description: 'Expertise approfondie en sécurité alimentaire, politiques agricoles durables et résilience des systèmes alimentaires en Afrique subsaharienne.',
      geographicZones: [
        { type: 'geopolitical', name: 'Afrique Subsaharienne' },
        { type: 'country', name: 'Burkina Faso', code: 'BF' },
      ],
      temporalPeriod: {
        type: 'custom',
        startYear: 2015,
        endYear: 2030,
      },
      availability: {
        pressWritten: true,
        pressTvRadio: false,
        publicConferences: true,
        hotTopics: true,
        academicConferences: true,
        businessPartnerships: false,
        publicExpertise: true,
        schoolInterventions: true,
        mediaTraining: true,
      },
      publications: 18,
      thesesSoutenues: 1,
      thesesEncadrees: 5,
      brevets: 0,
      interventionsPubliques: 18,
      projects: 8,
      lastUpdate: '2024-11-15',
      keywords: ['Sécurité alimentaire', 'Agriculture durable', 'Afrique', 'Résilience', 'Politiques publiques']
    },
    {
      id: '2',
      name: 'Géographie Rurale',
      category: 'Sciences Sociales',
      level: 'recherche',
      description: 'Analyse spatiale des dynamiques rurales, transformation des territoires agricoles et développement rural en France et en Europe.',
      geographicZones: [
        { type: 'country', name: 'France', code: 'FR' },
        { type: 'geopolitical', name: 'Union Européenne' },
        { type: 'physical', name: 'Région Bretagne' },
      ],
      temporalPeriod: {
        type: 'custom',
        startYear: 2000,
        endYear: 2025,
      },
      availability: {
        pressWritten: true,
        pressTvRadio: true,
        publicConferences: true,
        hotTopics: true,
        academicConferences: true,
        businessPartnerships: true,
        publicExpertise: true,
        schoolInterventions: true,
        mediaTraining: true,
      },
      publications: 12,
      thesesSoutenues: 0,
      thesesEncadrees: 3,
      brevets: 0,
      interventionsPubliques: 12,
      projects: 5,
      lastUpdate: '2024-10-28',
      keywords: ['Géographie', 'Rural', 'Territoires', 'Développement', 'Espaces agricoles']
    },
    {
      id: '3',
      name: 'Énergies Marines Renouvelables',
      category: 'Sciences et Technologies',
      level: 'recherche',
      description: 'Recherche et développement sur les technologies d\'exploitation des énergies marines (éolien offshore, hydrolien, houlomoteur), leur intégration aux réseaux électriques et leur impact environnemental.',
      geographicZones: [
        { type: 'country', name: 'France', code: 'FR' },
        { type: 'physical', name: 'Atlantique Nord-Est' },
        { type: 'physical', name: 'Manche' },
      ],
      temporalPeriod: {
        type: 'custom',
        startYear: 2010,
        endYear: 2030,
      },
      availability: {
        pressWritten: true,
        pressTvRadio: true,
        publicConferences: true,
        hotTopics: true,
        academicConferences: true,
        businessPartnerships: true,
        publicExpertise: true,
        schoolInterventions: true,
        mediaTraining: true,
      },
      publications: 22,
      thesesSoutenues: 0,
      thesesEncadrees: 4,
      brevets: 5,
      interventionsPubliques: 22,
      projects: 12,
      lastUpdate: '2024-11-20',
      keywords: ['Énergies marines', 'Éolien offshore', 'Hydrolien', 'Transition énergétique', 'Océanographie appliquée']
    },
    {
      id: '4',
      name: 'Hydrodynamique',
      category: 'Sciences et Technologies',
      level: 'reference',
      description: 'Expertise de référence en mécanique des fluides appliquée aux milieux marins et côtiers : dynamique des vagues, courants, modélisation numérique des écoulements et interactions houle-structures.',
      geographicZones: [
        { type: 'country', name: 'France', code: 'FR' },
        { type: 'physical', name: 'Océan Atlantique' },
      ],
      temporalPeriod: {
        type: 'standard',
        label: 'Époque contemporaine',
      },
      availability: {
        pressWritten: true,
        pressTvRadio: false,
        publicConferences: true,
        hotTopics: true,
        academicConferences: true,
        businessPartnerships: true,
        publicExpertise: true,
        schoolInterventions: true,
        mediaTraining: false,
      },
      publications: 25,
      thesesSoutenues: 0,
      thesesEncadrees: 7,
      brevets: 3,
      interventionsPubliques: 15,
      projects: 10,
      lastUpdate: '2024-11-25',
      keywords: ['Hydrodynamique', 'Mécanique des fluides', 'Dynamique côtière', 'Modélisation numérique', 'Interactions houle-structures']
    },
  ]);

  const filteredExpertises = expertises.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || exp.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    if (!category) return Brain;
    return category.icon;
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || '#6b7280';
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, expertise: Expertise) => {
    setAnchorEl(event.currentTarget);
    setSelectedExpertise(expertise);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedExpertise(null);
  };

  const handleDeleteClick = (expertise: Expertise) => {
    setExpertiseToDelete(expertise);
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (expertiseToDelete) {
      setExpertises(expertises.filter(exp => exp.id !== expertiseToDelete.id));
      toast.success(`Expertise "${expertiseToDelete.name}" supprimée avec succès`);
      setOpenDeleteDialog(false);
      setExpertiseToDelete(null);
    }
  };

  const handleEditClick = (expertise: Expertise) => {
    setIsEditMode(true);
    setEditingExpertiseId(expertise.id);

    // Pré-remplir le formulaire avec les données de l'expertise
    setFormData({
      name: expertise.name,
      category: expertise.category,
      description: expertise.description,
      keywords: expertise.keywords.join(', '),
      geographicZones: expertise.geographicZones,
      temporalPeriodType: expertise.temporalPeriod.type,
      temporalPeriodStandard: expertise.temporalPeriod.type === 'standard'
        ? temporalPeriods.find(p => p.label === expertise.temporalPeriod.label)?.value || ''
        : '',
      temporalStartYear: expertise.temporalPeriod.type === 'custom'
        ? expertise.temporalPeriod.startYear?.toString() || ''
        : '',
      temporalEndYear: expertise.temporalPeriod.type === 'custom'
        ? expertise.temporalPeriod.endYear?.toString() || ''
        : '',
      level: expertise.level,
      availability: expertise.availability,
    });

    setOpenAddDialog(true);
    handleMenuClose();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddExpertise = () => {
    const newExpertise: Expertise = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      level: formData.level,
      description: formData.description,
      geographicZones: formData.geographicZones,
      temporalPeriod: formData.temporalPeriodType === 'custom'
        ? {
          type: 'custom',
          startYear: parseInt(formData.temporalStartYear),
          endYear: parseInt(formData.temporalEndYear),
        }
        : {
          type: 'standard',
          label: temporalPeriods.find(p => p.value === formData.temporalPeriodStandard)?.label,
        },
      availability: formData.availability,
      publications: 0,
      thesesSoutenues: 0,
      thesesEncadrees: 0,
      brevets: 0,
      interventionsPubliques: 0,
      projects: 0,
      lastUpdate: new Date().toISOString().split('T')[0],
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
    };

    if (isEditMode && editingExpertiseId) {
      const updatedExpertises = expertises.map(exp =>
        exp.id === editingExpertiseId ? { ...newExpertise, id: editingExpertiseId, publications: exp.publications, thesesSoutenues: exp.thesesSoutenues, thesesEncadrees: exp.thesesEncadrees, brevets: exp.brevets, interventionsPubliques: exp.interventionsPubliques, projects: exp.projects } : exp
      );
      setExpertises(updatedExpertises);
      toast.success(`Expertise "${formData.name}" modifiée avec succès !`);
    } else {
      setExpertises([...expertises, newExpertise]);
      toast.success(`Expertise "${formData.name}" ajoutée avec succès !`, {
        description: `Niveau: ${getLevelInfo(formData.level).label}`,
      });
    }
    setOpenAddDialog(false);
    setActiveStep(0);
    setIsEditMode(false);
    setEditingExpertiseId(null);
    setFormData({
      name: '',
      category: '',
      description: '',
      keywords: '',
      geographicZones: [],
      temporalPeriodType: 'standard',
      temporalPeriodStandard: '',
      temporalStartYear: '',
      temporalEndYear: '',
      level: 'veille',
      availability: {
        pressWritten: false,
        pressTvRadio: false,
        publicConferences: false,
        hotTopics: false,
        academicConferences: false,
        businessPartnerships: false,
        publicExpertise: false,
        schoolInterventions: false,
        mediaTraining: false,
      }
    });
  };

  const steps = [
    { label: 'Informations générales', icon: Brain },
    { label: 'Contexte / Terrain', icon: MapPin },
    { label: 'Niveau d\'expertise', icon: Award },
    { label: 'Disponibilités', icon: Calendar }
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <GeneralInfoStep formData={formData} setFormData={setFormData} />;
      case 1:
        return <ContextStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <LevelStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <AvailabilityStep formData={formData} setFormData={setFormData} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ bgcolor: '#F5F7F6', minHeight: '100vh', p: 3 }}>
      <Box sx={{ maxWidth: 1600, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <SvpH1 sx={{ mb: 0.5 }}>
                Expertises
              </SvpH1>
              <Typography variant="body2" sx={{ color: '#6a7282', fontSize: '0.875rem' }}>
                Gérez et valorisez vos domaines d'expertise avec terrain de recherche et disponibilités
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
              sx={{
                backgroundColor: '#006a61',
                color: '#fff',
                textTransform: 'none',
                borderRadius: '8px',
                px: 3,
                py: 1.5,
                fontSize: '0.9375rem',
                '&:hover': {
                  backgroundColor: '#005550',
                },
              }}
            >
              Ajouter une expertise
            </Button>
          </Box>

          {/* Statistics */}
          <ExpertiseStats expertises={expertises} />
        </Box>

        {/* Filters */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Rechercher une expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'rgba(0,0,0,0.54)' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Catégorie"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    sx={{ borderRadius: '8px' }}
                  >
                    <MuiMenuItem value="all">Toutes les catégories</MuiMenuItem>
                    {categories.map(cat => (
                      <MuiMenuItem key={cat.name} value={cat.name}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <cat.icon size={18} style={{ color: cat.color }} />
                          {cat.name}
                        </Box>
                      </MuiMenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Niveau</InputLabel>
                  <Select
                    value={selectedLevel}
                    label="Niveau"
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    sx={{ borderRadius: '8px' }}
                  >
                    <MuiMenuItem value="all">Tous les niveaux</MuiMenuItem>
                    <MuiMenuItem value="veille">Intérêt secondaire / Veille</MuiMenuItem>
                    <MuiMenuItem value="enseignement">Expertise d'enseignement</MuiMenuItem>
                    <MuiMenuItem value="recherche">Expertise de recherche active</MuiMenuItem>
                    <MuiMenuItem value="reference">Expertise de référence</MuiMenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Expertises Grid */}
        <Grid container spacing={3}>
          {filteredExpertises.map((expertise) => (
            <ExpertiseCard
              key={expertise.id}
              expertise={expertise}
              categoryIcon={getCategoryIcon(expertise.category)}
              categoryColor={getCategoryColor(expertise.category)}
              onMenuClick={handleMenuClick}
            />
          ))}
        </Grid>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => selectedExpertise && handleEditClick(selectedExpertise)}>
            <Edit size={18} style={{ marginRight: 8 }} />
            Modifier
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <BookOpen size={18} style={{ marginRight: 8 }} />
            Voir les publications
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <GraduationCap size={18} style={{ marginRight: 8 }} />
            Voir les thèses
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => selectedExpertise && handleDeleteClick(selectedExpertise)}
            sx={{ color: '#dc2626' }}
          >
            <Trash2 size={18} style={{ marginRight: 8 }} />
            Supprimer
          </MenuItem>
        </Menu>

        {/* Add Expertise Dialog */}
        <Dialog
          open={openAddDialog}
          onClose={() => {
            setOpenAddDialog(false);
            setActiveStep(0);
            setIsEditMode(false);
            setEditingExpertiseId(null);
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{
            backgroundColor: '#f8fafa',
            borderBottom: '1px solid #e5e7eb',
            pb: 3
          }}>
            <Box sx={{ fontWeight: 600, color: '#006a61', mb: 3, fontSize: '1.5rem' }}>
              {isEditMode ? 'Modifier l\'expertise' : 'Ajouter une nouvelle expertise'}
            </Box>

            {/* Custom Stepper */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              {steps.map((step, index) => {
                const StepIconComponent = step.icon;
                const isActive = activeStep === index;
                const isCompleted = activeStep > index;

                return (
                  <Box
                    key={step.label}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                      position: 'relative'
                    }}
                  >
                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '20px',
                          left: 'calc(50% + 20px)',
                          right: 'calc(-50% + 20px)',
                          height: '2px',
                          backgroundColor: isCompleted ? '#006a61' : '#e5e7eb',
                          zIndex: 0
                        }}
                      />
                    )}

                    {/* Step circle */}
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isActive ? '#006a61' : isCompleted ? '#006a61' : '#f3f4f6',
                        color: isActive || isCompleted ? '#fff' : '#9ca3af',
                        border: isActive ? '3px solid #99f6e4' : 'none',
                        transition: 'all 0.3s ease',
                        zIndex: 1,
                        position: 'relative'
                      }}
                    >
                      <StepIconComponent size={20} />
                    </Box>

                    {/* Step label */}
                    <Typography
                      variant="caption"
                      sx={{
                        textAlign: 'center',
                        fontSize: '0.75rem',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#006a61' : isCompleted ? '#374151' : '#9ca3af',
                        maxWidth: '100px'
                      }}
                    >
                      {step.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </DialogTitle>
          <DialogContent>
            {getStepContent(activeStep)}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={() => {
                setOpenAddDialog(false);
                setActiveStep(0);
                setIsEditMode(false);
                setEditingExpertiseId(null);
              }}
              sx={{ textTransform: 'none' }}
            >
              Annuler
            </Button>
            <Box sx={{ flex: 1 }} />
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ textTransform: 'none' }}
            >
              Précédent
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  backgroundColor: '#006a61',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#005550',
                  },
                }}
              >
                Suivant
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleAddExpertise}
                disabled={!formData.name || !formData.category || formData.geographicZones.length === 0}
                sx={{
                  backgroundColor: '#006a61',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#005550',
                  },
                }}
              >
                {isEditMode ? 'Modifier' : 'Ajouter'}
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <Typography>
              Êtes-vous sûr de vouloir supprimer l'expertise "{expertiseToDelete?.name}" ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)} sx={{ textTransform: 'none' }}>
              Annuler
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}


