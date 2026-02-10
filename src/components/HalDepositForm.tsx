import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Divider,
  Alert,
  LinearProgress,
  Autocomplete,
  IconButton
} from '@mui/material';
import {
  Upload,
  Plus,
  CheckCircle,
  X as CloseIcon,
  Mail
} from 'lucide-react';
import { PaperclipIcon } from './HalIcons';
import { AuthorAffiliationManager } from './AuthorAffiliationManager';
import { toast } from 'sonner';

// Domaines HAL
const halDomains = [
  { value: 'cs.AI', label: 'Intelligence Artificielle' },
  { value: 'cs.SE', label: 'Génie logiciel' },
  { value: 'math.PR', label: 'Probabilités' },
  { value: 'math.ST', label: 'Statistiques' },
  { value: 'shs.eco', label: 'Économie' },
  { value: 'shs.socio', label: 'Sociologie' },
  { value: 'shs.geo', label: 'Géographie' },
  { value: 'sde.es', label: 'Environnement' },
  { value: 'sdv.ee', label: 'Écologie' }
];

// Types de documents HAL
const halDocumentTypes = [
  { value: 'ART', label: 'Article' },
  { value: 'COMM', label: 'Communication' },
  { value: 'THESE', label: 'Thèse' },
  { value: 'HDR', label: 'Habilitation à diriger des recherches' },
  { value: 'OUV', label: 'Ouvrage' },
  { value: 'COUV', label: 'Chapitre d\'ouvrage' },
  { value: 'REPORT', label: 'Rapport' },
  { value: 'POSTER', label: 'Poster' },
  { value: 'PRESCONF', label: 'Présentation de conférence' }
];

// Licences Creative Commons
const licenses = [
  { value: 'cc-by', label: 'CC BY - Attribution' },
  { value: 'cc-by-sa', label: 'CC BY-SA - Attribution - Partage dans les mêmes conditions' },
  { value: 'cc-by-nd', label: 'CC BY-ND - Attribution - Pas de modification' },
  { value: 'cc-by-nc', label: 'CC BY-NC - Attribution - Pas d\'utilisation commerciale' },
  { value: 'cc-by-nc-sa', label: 'CC BY-NC-SA - Attribution - Pas d\'utilisation commerciale - Partage dans les mêmes conditions' },
  { value: 'cc-by-nc-nd', label: 'CC BY-NC-ND - Attribution - Pas d\'utilisation commerciale - Pas de modification' },
  { value: 'cc0', label: 'CC0 - Domaine public' }
];

// Langues
const languages = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'Anglais' },
  { value: 'es', label: 'Espagnol' },
  { value: 'de', label: 'Allemand' },
  { value: 'it', label: 'Italien' },
  { value: 'pt', label: 'Portugais' }
];







type Affiliation = {
  halStructureId: string;
  halStructureName: string;
  shortName?: string;
  foundViaRor?: boolean;
  ror?: string;
};

type Author = {
  name: string;
  function: string;
  idhal?: string;
  docid?: string;
  orcid?: string;
  email?: string;
  domain?: string;
  affiliations: Affiliation[];
  isCorresponding?: boolean;
  idFoundViaOrcid?: boolean;
};

type AttachedFile = {
  name: string;
  size: number;
  type: string;
  file: File;
};

interface HalDepositFormProps {
  initialTitle?: string;
  initialAbstract?: string;
  initialAuthors?: string;
  initialDocType?: string;
  initialDate?: string;
}

export function HalDepositForm({
  initialTitle = '',
  initialAbstract = '',
  initialAuthors = '',
  initialDocType = '',
  initialDate = ''
}: HalDepositFormProps) {
  const [step, setStep] = useState<'form' | 'review' | 'uploading' | 'success' | 'error'>('form');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form fields
  const [title, setTitle] = useState(initialTitle);
  const [abstract, setAbstract] = useState(initialAbstract);
  const [documentType, setDocumentType] = useState(initialDocType);
  const [domains, setDomains] = useState<string[]>([]);
  const [language, setLanguage] = useState('fr');
  const [productionDate, setProductionDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
  const [license, setLicense] = useState('cc-by');

  // Authors management - simuler des données calculées via AureHAL
  const [authors, setAuthors] = useState<Author[]>(
    initialAuthors ? initialAuthors.split(', ').map((name, idx) => ({
      name,
      function: idx === 0 ? 'auteur_correspondant' : 'auteur',
      idhal: idx === 0 ? 'jean-dupont' : undefined,
      docid: idx !== 0 ? `auteur${idx + 1}` : undefined,
      orcid: idx === 0 ? '0000-0001-2345-6789' : undefined,
      email: idx === 0 ? '@example.com' : undefined,
      domain: idx === 0 ? 'jean-dupont' : undefined,
      affiliations: [{
        halStructureId: '102312',
        halStructureName: 'UMR LPED - Laboratoire Population Environnement Développement',
        shortName: 'UMR LPED',
        foundViaRor: true,
        ror: '05q3vnk25'
      }]
    })) : []
  );

  // Files management
  const [mainFile, setMainFile] = useState<AttachedFile | null>(null);
  const [annexFiles, setAnnexFiles] = useState<AttachedFile[]>([]);





  const handleMainFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Le fichier principal doit être un PDF');
        return;
      }
      setMainFile({
        name: file.name,
        size: file.size,
        type: file.type,
        file
      });
      toast.success('Fichier principal ajouté');
    }
  };

  const handleAnnexFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAnnexFiles([...annexFiles, {
        name: file.name,
        size: file.size,
        type: file.type,
        file
      }]);
      toast.success('Fichier complémentaire ajouté');
    }
  };

  const handleRemoveAnnexFile = (index: number) => {
    setAnnexFiles(annexFiles.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const validateForm = () => {
    if (!title.trim()) {
      toast.error('Le titre est obligatoire');
      return false;
    }
    if (!abstract.trim()) {
      toast.error('Le résumé est obligatoire');
      return false;
    }
    if (authors.length === 0) {
      toast.error('Au moins un auteur est requis');
      return false;
    }
    if (!documentType) {
      toast.error('Le type de document est obligatoire');
      return false;
    }
    if (domains.length === 0) {
      toast.error('Au moins un domaine HAL est requis');
      return false;
    }
    if (!mainFile) {
      toast.error('Le fichier PDF principal est obligatoire');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setStep('review');
    }
  };

  const handleConfirmDeposit = async () => {
    setStep('uploading');
    setUploadProgress(0);

    // Simulation de l'upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep('success');
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  if (step === 'success') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CheckCircle size={64} color="#34A853" style={{ marginBottom: 16 }} />
        <Typography variant="h6" sx={{ color: '#006A61', fontWeight: 600, mb: 2 }}>
          Dépôt réussi !
        </Typography>
        <Typography sx={{ color: '#6F7977', mb: 3 }}>
          Votre publication a été déposée avec succès sur HAL.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#006A61',
            '&:hover': { bgcolor: '#005550' }
          }}
          onClick={() => setStep('form')}
        >
          Faire un nouveau dépôt
        </Button>
      </Box>
    );
  }

  if (step === 'uploading') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: '#006A61', fontWeight: 600, mb: 3 }}>
          Dépôt en cours...
        </Typography>
        <LinearProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: '#E8F5F4',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#006A61'
            }
          }}
        />
        <Typography sx={{ color: '#6F7977', mt: 2, textAlign: 'center' }}>
          {uploadProgress}% - Envoi en cours...
        </Typography>
      </Box>
    );
  }

  if (step === 'review') {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: '#006A61', fontWeight: 600, mb: 3 }}>
          Récapitulatif du dépôt
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          Vérifiez attentivement les informations avant de confirmer le dépôt sur HAL
        </Alert>

        <Paper elevation={0} sx={{ bgcolor: '#F5F7F6', p: 3, mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: '#6F7977', mb: 1, fontSize: '0.75rem', textTransform: 'uppercase' }}>
            Titre
          </Typography>
          <Typography sx={{ color: '#2D3836', mb: 2 }}>{title}</Typography>

          <Typography variant="subtitle2" sx={{ color: '#6F7977', mb: 1, fontSize: '0.75rem', textTransform: 'uppercase' }}>
            Type de document
          </Typography>
          <Typography sx={{ color: '#2D3836', mb: 2 }}>
            {halDocumentTypes.find(t => t.value === documentType)?.label}
          </Typography>

          <Typography variant="subtitle2" sx={{ color: '#6F7977', mb: 1, fontSize: '0.75rem', textTransform: 'uppercase' }}>
            Auteurs
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            {authors.map((author, index) => (
              <Box key={index}>
                <Typography sx={{ color: '#2D3836', fontWeight: 600 }}>
                  {author.name}
                  {author.function === 'auteur_correspondant' && <Mail size={14} style={{ marginLeft: 8, verticalAlign: 'middle' }} />}
                </Typography>
                {author.idhal && (
                  <Typography sx={{ color: '#006A61', fontSize: '0.875rem' }}>
                    IdHAL: {author.idhal}
                  </Typography>
                )}
                {author.docid && (
                  <Typography sx={{ color: '#6F7977', fontSize: '0.875rem' }}>
                    Docid: {author.docid}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          <Typography variant="subtitle2" sx={{ color: '#6F7977', mb: 1, fontSize: '0.75rem', textTransform: 'uppercase' }}>
            Domaines HAL
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {domains.map((domain, index) => (
              <Chip
                key={index}
                label={halDomains.find(d => d.value === domain)?.label}
                size="small"
                sx={{ bgcolor: '#E8F5F4', color: '#006A61' }}
              />
            ))}
          </Box>

          <Typography variant="subtitle2" sx={{ color: '#6F7977', mb: 1, fontSize: '0.75rem', textTransform: 'uppercase' }}>
            Fichiers
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {mainFile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaperclipIcon className="size-4" color="#006A61" />
                <Typography sx={{ color: '#2D3836', fontSize: '0.875rem' }}>
                  {mainFile.name} ({formatFileSize(mainFile.size)}) - <strong>Principal</strong>
                </Typography>
              </Box>
            )}
            {annexFiles.map((file, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PaperclipIcon className="size-4" color="#6F7977" />
                <Typography sx={{ color: '#2D3836', fontSize: '0.875rem' }}>
                  {file.name} ({formatFileSize(file.size)})
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() => setStep('form')}
            sx={{
              color: '#006A61',
              borderColor: '#006A61',
              '&:hover': {
                borderColor: '#005550',
                bgcolor: 'transparent'
              }
            }}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmDeposit}
            sx={{
              bgcolor: '#006A61',
              '&:hover': { bgcolor: '#005550' }
            }}
          >
            Confirmer le dépôt
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: '#006A61', fontWeight: 600, mb: 1 }}>
        Déposer dans HAL
      </Typography>
      <Typography sx={{ color: '#6F7977', fontSize: '0.875rem', mb: 2 }}>
        Remplissez les métadonnées obligatoires pour déposer votre publication sur HAL
      </Typography>

      <Alert severity="warning" sx={{ mb: 3 }}>
        Les champs marqués d'un astérisque (*) sont obligatoires pour éviter les rejets lors du dépôt.
      </Alert>

      {/* Titre */}
      <TextField
        label="Titre *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Résumé */}
      <TextField
        label="Résumé *"
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 3 }}
      />

      {/* Type de document */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Type de document *</InputLabel>
        <Select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          label="Type de document *"
        >
          {halDocumentTypes.map(type => (
            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ my: 3 }} />

      {/* Auteurs et Affiliations */}
      <AuthorAffiliationManager authors={authors} onChange={setAuthors} />

      <Divider sx={{ my: 3 }} />

      {/* Domaines HAL */}
      <Autocomplete
        multiple
        options={halDomains}
        getOptionLabel={(option) => option.label}
        value={halDomains.filter(d => domains.includes(d.value))}
        onChange={(_, newValue) => {
          setDomains(newValue.map(v => v.value));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Domaines HAL *"
            placeholder="Sélectionnez les domaines"
          />
        )}
        sx={{ mb: 3 }}
      />

      {/* Langue */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Langue *</InputLabel>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          label="Langue *"
        >
          {languages.map(lang => (
            <MenuItem key={lang.value} value={lang.value}>{lang.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Date de production */}
      <TextField
        label="Date de production *"
        type="date"
        value={productionDate}
        onChange={(e) => setProductionDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Licence */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Licence de diffusion *</InputLabel>
        <Select
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          label="Licence de diffusion *"
        >
          {licenses.map(lic => (
            <MenuItem key={lic.value} value={lic.value}>{lic.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ my: 3 }} />

      {/* Fichier principal */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ color: '#2D3836', fontWeight: 500, mb: 2 }}>
          Fichier principal (PDF) *
        </Typography>
        {mainFile ? (
          <Paper elevation={0} sx={{ bgcolor: '#E8F5F4', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaperclipIcon className="size-5" color="#006A61" />
              <Box>
                <Typography sx={{ color: '#006A61', fontWeight: 500 }}>{mainFile.name}</Typography>
                <Typography sx={{ color: '#6F7977', fontSize: '0.75rem' }}>
                  {formatFileSize(mainFile.size)}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setMainFile(null)} size="small">
              <CloseIcon size={18} />
            </IconButton>
          </Paper>
        ) : (
          <Button
            variant="outlined"
            component="label"
            startIcon={<Upload size={18} />}
            sx={{
              color: '#006A61',
              borderColor: '#006A61',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#005550',
                bgcolor: 'transparent'
              }
            }}
          >
            Choisir un fichier PDF
            <input
              type="file"
              hidden
              accept="application/pdf"
              onChange={handleMainFileUpload}
            />
          </Button>
        )}
      </Box>

      {/* Fichiers complémentaires */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ color: '#2D3836', fontWeight: 500, mb: 2 }}>
          Fichiers complémentaires (optionnel)
        </Typography>
        {annexFiles.map((file, index) => (
          <Paper key={index} elevation={0} sx={{ bgcolor: '#F5F7F6', p: 2, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaperclipIcon className="size-5" color="#6F7977" />
              <Box>
                <Typography sx={{ color: '#2D3836', fontWeight: 500, fontSize: '0.875rem' }}>{file.name}</Typography>
                <Typography sx={{ color: '#6F7977', fontSize: '0.75rem' }}>
                  {formatFileSize(file.size)}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => handleRemoveAnnexFile(index)} size="small">
              <CloseIcon size={18} />
            </IconButton>
          </Paper>
        ))}
        <Button
          variant="text"
          component="label"
          startIcon={<Plus size={18} />}
          sx={{
            color: '#006A61',
            textTransform: 'none',
            '&:hover': { bgcolor: '#E8F5F4' }
          }}
        >
          Ajouter un fichier complémentaire
          <input
            type="file"
            hidden
            onChange={handleAnnexFileUpload}
          />
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Submit button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: '#006A61',
            textTransform: 'none',
            px: 4,
            '&:hover': { bgcolor: '#005550' }
          }}
        >
          Passer à la validation
        </Button>
      </Box>
    </Box>
  );
}