import { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Autocomplete,
  IconButton,
  Link,
  Chip,
  Alert,
  Tooltip,
  LinearProgress
} from '@mui/material';
import {
  Plus,
  Trash2,
  ExternalLink,
  GripVertical,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Search,
  UserPlus
} from 'lucide-react';
import imgOrcid16X161 from "figma:asset/6e3dbbc34225b24e434ec4a2f2b823e2d5f2a95c.png";

// Mock des auteurs suggérés pour l'autocomplétion globale (ajout d'auteur)
const mockSuggestedAuthors = [
  { id: 1, name: 'Magali Muraro', email: '@univ-reims.fr', idhal: 'magali-muraro', orcid: '0000-0002-1234-5678' },
  { id: 2, name: 'Alrick Dias', email: '@imbe.fr', idhal: 'alrick-dias', orcid: undefined },
  { id: 3, name: 'Tristan Cazenave', email: '@dauphine.fr', idhal: 'tristan-cazenave', orcid: '0000-0003-4669-9374' },
  { id: 4, name: 'Jacques Féjoz', email: '@ceremade.dauphine.fr', idhal: 'jacques-fejoz', orcid: undefined },
  { id: 5, name: 'Coline Chartier', email: '@example.fr', idhal: undefined, orcid: undefined },
  { id: 6, name: 'Julien Godard', email: '@example.fr', idhal: 'julien-godard', orcid: undefined },
  { id: 7, name: 'Sylvain Durand', email: '@example.fr', idhal: 'durand-sylvain', orcid: undefined }
];

// Mock des structures AureHAL pour démo
const mockHalStructures = [
  { id: '102312', name: 'UMR LPED – Laboratoire Population Environnement Développement', shortName: 'UMR LPED', ror: '00znkfx48' },
  { id: '102313', name: 'Laboratoire des sciences du numérique à Nantes', shortName: 'LS2N', ror: '04ezmvf85' },
  { id: '102314', name: 'EHESS - École des hautes études en sciences sociales', shortName: 'EHESS', ror: '011kdr723' },
  { id: '102315', name: 'INRAE Montpellier', shortName: 'INRAE Montpellier', ror: '003vg9w96' }
];

// Fonctions disponibles pour les auteurs
const authorFunctions = [
  { value: 'auteur', label: 'Auteur' },
  { value: 'auteur_correspondant', label: 'Auteur correspondant' },
  { value: 'directeur_publication', label: 'Directeur de publication' },
  { value: 'annotateur', label: 'Annotateur' },
  { value: 'traducteur', label: 'Traducteur' },
  { value: 'compilateur', label: 'Compilateur' }
];

type IdHalCandidate = {
  idhal: string;
  fullName: string;
  affiliations: string;
  publications: number;
  matchScore: number;
  orcid?: string;
};

type StructureCandidate = {
  halStructureId: string;
  shortName: string;
  fullName: string;
  tutelles?: string;
  ror?: string;
  researchers?: number;
  matchScore: number;
};

type Affiliation = {
  halStructureId: string;
  halStructureName: string;
  shortName?: string;
  foundViaRor?: boolean;
  ror?: string;
  importedText?: string;
  structureCandidates?: StructureCandidate[];
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
  idhalCandidates?: IdHalCandidate[];
};

interface AuthorAffiliationManagerProps {
  authors: Author[];
  onChange: (authors: Author[]) => void;
}

const TEAL = '#006A61';
const TEAL_DARK = '#005550';
const TEAL_LIGHT = '#E8F5F4';
const SURFACE = '#F5F7F6';
const BORDER = '#E5E7E6';
const TEXT = '#2D3836';
const MUTED = '#6F7977';
const WARN = '#B45309';
const WARN_BG = '#FEF7E6';
const WARN_BORDER = '#F1D9A0';
const SUCCESS = '#34A853';

function getMatchColor(score: number) {
  if (score >= 85) return SUCCESS;
  if (score >= 65) return '#C58A00';
  return MUTED;
}

export function AuthorAffiliationManager({ authors, onChange }: AuthorAffiliationManagerProps) {
  const [authorSearchInput, setAuthorSearchInput] = useState('');
  const [expandedCandidates, setExpandedCandidates] = useState<Record<number, boolean>>({});

  // Calcul des statistiques d'alignement AureHAL
  const stats = useMemo(() => {
    const totalAuthors = authors.length;
    const authorsAligned = authors.filter(a => !!a.idhal).length;
    const authorsMissingIdhal = totalAuthors - authorsAligned;

    let totalAffiliations = 0;
    let affiliationsAligned = 0;
    authors.forEach(a => {
      a.affiliations.forEach(aff => {
        totalAffiliations += 1;
        if (aff.halStructureId && !aff.importedText) affiliationsAligned += 1;
      });
    });
    const affiliationsUnaligned = totalAffiliations - affiliationsAligned;

    const totalItems = totalAuthors + totalAffiliations;
    const alignedItems = authorsAligned + affiliationsAligned;
    const pendingItems = totalItems - alignedItems;
    const pct = totalItems > 0 ? Math.round((alignedItems / totalItems) * 100) : 100;

    return {
      totalAuthors,
      totalAffiliations,
      authorsMissingIdhal,
      affiliationsUnaligned,
      alignedItems,
      totalItems,
      pendingItems,
      pct
    };
  }, [authors]);

  const toggleCandidates = (idx: number) => {
    setExpandedCandidates(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleAddAuthor = (suggestedAuthor?: typeof mockSuggestedAuthors[0]) => {
    const newAuthor: Author = suggestedAuthor ? {
      name: suggestedAuthor.name,
      function: 'auteur',
      idhal: suggestedAuthor.idhal,
      orcid: suggestedAuthor.orcid,
      email: suggestedAuthor.email,
      affiliations: []
    } : {
      name: authorSearchInput,
      function: 'auteur',
      affiliations: []
    };

    onChange([...authors, newAuthor]);
    setAuthorSearchInput('');
  };

  const handleRemoveAuthor = (index: number) => {
    onChange(authors.filter((_, i) => i !== index));
  };

  const handleUpdateAuthor = (index: number, field: keyof Author, value: any) => {
    const newAuthors = [...authors];
    newAuthors[index] = { ...newAuthors[index], [field]: value };
    onChange(newAuthors);
  };

  const handleAddAffiliation = (authorIndex: number, structure: typeof mockHalStructures[0]) => {
    const newAuthors = [...authors];
    const affiliation: Affiliation = {
      halStructureId: structure.id,
      halStructureName: structure.name,
      shortName: structure.shortName,
      foundViaRor: !!structure.ror,
      ror: structure.ror
    };
    newAuthors[authorIndex].affiliations.push(affiliation);
    onChange(newAuthors);
  };

  const handleRemoveAffiliation = (authorIndex: number, affiliationIndex: number) => {
    const newAuthors = [...authors];
    newAuthors[authorIndex].affiliations.splice(affiliationIndex, 1);
    onChange(newAuthors);
  };

  const moveAuthor = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === authors.length - 1)) return;
    const newAuthors = [...authors];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newAuthors[index], newAuthors[targetIndex]] = [newAuthors[targetIndex], newAuthors[index]];
    onChange(newAuthors);
  };

  // Confirme un candidat IdHAL pour un auteur (alignement AureHAL)
  const confirmIdhalCandidate = (authorIndex: number, candidate: IdHalCandidate) => {
    const newAuthors = [...authors];
    newAuthors[authorIndex] = {
      ...newAuthors[authorIndex],
      idhal: candidate.idhal,
      orcid: candidate.orcid || newAuthors[authorIndex].orcid,
      idhalCandidates: undefined
    };
    onChange(newAuthors);
  };

  // Aligne une affiliation importée avec une structure AureHAL
  const alignStructure = (authorIndex: number, affiliationIndex: number, candidate: StructureCandidate) => {
    const newAuthors = [...authors];
    newAuthors[authorIndex].affiliations[affiliationIndex] = {
      halStructureId: candidate.halStructureId,
      halStructureName: candidate.fullName,
      shortName: candidate.shortName,
      ror: candidate.ror,
      foundViaRor: !!candidate.ror
    };
    onChange(newAuthors);
  };

  // Aligne tout via les meilleures correspondances
  const alignAllBestMatches = () => {
    const newAuthors = authors.map(author => {
      const next: Author = { ...author };
      if (!next.idhal && next.idhalCandidates && next.idhalCandidates.length > 0) {
        const best = [...next.idhalCandidates].sort((a, b) => b.matchScore - a.matchScore)[0];
        if (best.matchScore >= 85) {
          next.idhal = best.idhal;
          next.orcid = best.orcid || next.orcid;
          next.idhalCandidates = undefined;
        }
      }
      next.affiliations = next.affiliations.map(aff => {
        if (aff.importedText && aff.structureCandidates && aff.structureCandidates.length > 0) {
          const best = [...aff.structureCandidates].sort((a, b) => b.matchScore - a.matchScore)[0];
          if (best.matchScore >= 85) {
            return {
              halStructureId: best.halStructureId,
              halStructureName: best.fullName,
              shortName: best.shortName,
              ror: best.ror,
              foundViaRor: !!best.ror
            };
          }
        }
        return aff;
      });
      return next;
    });
    onChange(newAuthors);
  };

  return (
    <Box>
      {/* Bandeau principal d'alignement AureHAL */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ color: TEXT, fontWeight: 600, fontSize: '1.125rem' }}>
            Auteurs <Box component="span" sx={{ color: '#D32F2F' }}>*</Box>
          </Typography>
          <Typography sx={{ color: MUTED, fontSize: '0.875rem' }}>
            <Box component="span" sx={{ fontWeight: 600, color: TEXT }}>{stats.totalAuthors}</Box> auteur{stats.totalAuthors > 1 ? 's' : ''}
            {' · '}
            <Box component="span" sx={{ fontWeight: 600, color: TEXT }}>{stats.totalAffiliations}</Box> affiliation{stats.totalAffiliations > 1 ? 's' : ''}
          </Typography>
        </Box>

        {stats.pendingItems > 0 ? (
          <Paper
            elevation={0}
            sx={{
              bgcolor: WARN_BG,
              border: `1px solid ${WARN_BORDER}`,
              borderRadius: '12px',
              p: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <AlertTriangle size={20} color={WARN} style={{ flexShrink: 0, marginTop: 2 }} />
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: WARN, fontWeight: 700, fontSize: '0.9375rem', mb: 0.5 }}>
                  {stats.pendingItems} alignement{stats.pendingItems > 1 ? 's' : ''} AureHAL requis avant le dépôt
                </Typography>
                <Typography sx={{ color: TEXT, fontSize: '0.875rem', mb: 1.5 }}>
                  {stats.authorsMissingIdhal > 0 && (
                    <>
                      <Box component="span" sx={{ fontWeight: 600 }}>{stats.authorsMissingIdhal}</Box> auteur{stats.authorsMissingIdhal > 1 ? 's' : ''} sans IdHAL
                    </>
                  )}
                  {stats.authorsMissingIdhal > 0 && stats.affiliationsUnaligned > 0 && ' · '}
                  {stats.affiliationsUnaligned > 0 && (
                    <>
                      <Box component="span" sx={{ fontWeight: 600 }}>{stats.affiliationsUnaligned}</Box> affiliation{stats.affiliationsUnaligned > 1 ? 's' : ''} non alignée{stats.affiliationsUnaligned > 1 ? 's' : ''}
                    </>
                  )}
                  . L'identification des personnes et structures dans AureHAL est indispensable pour transmettre le dépôt à HAL.
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Sparkles size={16} />}
                    onClick={alignAllBestMatches}
                    sx={{
                      bgcolor: TEAL,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': { bgcolor: TEAL_DARK }
                    }}
                  >
                    Aligner toutes les meilleures correspondances
                  </Button>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 200 }}>
                    <Box sx={{ flex: 1, maxWidth: 200 }}>
                      <LinearProgress
                        variant="determinate"
                        value={stats.pct}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#FFF',
                          '& .MuiLinearProgress-bar': { bgcolor: TEAL }
                        }}
                      />
                    </Box>
                    <Typography sx={{ color: MUTED, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                      <Box component="span" sx={{ fontWeight: 700, color: TEXT }}>{stats.alignedItems}/{stats.totalItems}</Box> alignés · {stats.pct}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              bgcolor: TEAL_LIGHT,
              border: `1px solid ${BORDER}`,
              borderRadius: '12px',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}
          >
            <CheckCircle2 size={20} color={SUCCESS} />
            <Typography sx={{ color: TEXT, fontSize: '0.9375rem', fontWeight: 600 }}>
              Tous les auteurs et affiliations sont alignés avec AureHAL.
            </Typography>
            <Box sx={{ ml: 'auto' }}>
              <Typography sx={{ color: MUTED, fontSize: '0.8125rem' }}>
                <Box component="span" sx={{ fontWeight: 700, color: TEXT }}>{stats.alignedItems}/{stats.totalItems}</Box> alignés · {stats.pct}%
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Liens vers les référentiels */}
      <Box sx={{ display: 'flex', gap: 3, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link
          href="https://aurehal.archives-ouvertes.fr/"
          target="_blank"
          rel="noopener"
          sx={{
            display: 'flex', alignItems: 'center', gap: 0.5,
            color: TEAL, textDecoration: 'none', fontSize: '0.875rem',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          <ExternalLink size={14} />
          Consulter AureHAL (structures et auteurs)
        </Link>
        <Link
          href="https://ror.org/"
          target="_blank"
          rel="noopener"
          sx={{
            display: 'flex', alignItems: 'center', gap: 0.5,
            color: TEAL, textDecoration: 'none', fontSize: '0.875rem',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          <ExternalLink size={14} />
          ROR (Research Organization Registry)
        </Link>
      </Box>

      {/* Recherche d'un auteur dans AureHAL */}
      <Box sx={{ mb: 3, position: 'relative' }}>
        <Autocomplete
          inputValue={authorSearchInput}
          onInputChange={(_, value) => setAuthorSearchInput(value)}
          options={mockSuggestedAuthors}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
          onChange={(_, value) => {
            if (typeof value === 'object' && value !== null) handleAddAuthor(value);
            else if (typeof value === 'string') handleAddAuthor();
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ color: TEXT, fontWeight: 600, fontSize: '0.875rem' }}>
                    {option.name}
                  </Typography>
                  {option.idhal && (
                    <Chip
                      size="small"
                      label={`IdHAL: ${option.idhal}`}
                      sx={{ height: 18, fontSize: '0.6875rem', bgcolor: TEAL_LIGHT, color: TEAL }}
                    />
                  )}
                  {option.orcid && (
                    <img src={imgOrcid16X161} alt="ORCID" style={{ width: 14, height: 14 }} />
                  )}
                </Box>
                <Typography sx={{ color: MUTED, fontSize: '0.75rem' }}>
                  {option.email}
                </Typography>
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Ajouter un auteur — rechercher dans AureHAL (nom, IdHAL, ORCID)"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <Search size={16} color={MUTED} style={{ marginRight: 8 }} />
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: (
                  <>
                    <Chip
                      size="small"
                      label="API AureHAL"
                      sx={{
                        height: 22,
                        fontSize: '0.6875rem',
                        bgcolor: TEAL_LIGHT,
                        color: TEAL,
                        fontWeight: 600,
                        mr: 0.5
                      }}
                    />
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
          freeSolo
          onKeyDown={(e) => {
            if (e.key === 'Enter' && authorSearchInput && !mockSuggestedAuthors.some(a => a.name.toLowerCase() === authorSearchInput.toLowerCase())) {
              e.preventDefault();
              handleAddAuthor();
            }
          }}
          noOptionsText={
            <Box sx={{ p: 1 }}>
              <Button
                fullWidth
                startIcon={<Plus size={16} />}
                onClick={() => handleAddAuthor()}
                sx={{
                  color: TEAL, textTransform: 'none', justifyContent: 'flex-start',
                  '&:hover': { bgcolor: TEAL_LIGHT }
                }}
              >
                Ajouter un nouvel auteur
              </Button>
            </Box>
          }
        />
      </Box>

      {/* Liste des auteurs */}
      {authors.map((author, authorIndex) => {
        const needsIdhal = !author.idhal;
        const hasIdhalCandidates = needsIdhal && author.idhalCandidates && author.idhalCandidates.length > 0;
        const isAuthorAligned = !needsIdhal;

        return (
          <Paper
            key={authorIndex}
            elevation={0}
            sx={{
              bgcolor: 'white',
              border: `1px solid ${needsIdhal ? WARN_BORDER : BORDER}`,
              borderRadius: '12px',
              p: 2.5,
              mb: 2
            }}
          >
            {/* Bandeau supérieur de l'auteur */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              {/* Réordonnancement */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 0.25 }}>
                <Tooltip title="Glisser pour réordonner">
                  <GripVertical size={16} color="#9CA3AF" style={{ cursor: 'grab' }} />
                </Tooltip>
                <IconButton size="small" onClick={() => moveAuthor(authorIndex, 'up')} disabled={authorIndex === 0} sx={{ p: 0.25 }}>
                  <ChevronUp size={14} />
                </IconButton>
                <IconButton size="small" onClick={() => moveAuthor(authorIndex, 'down')} disabled={authorIndex === authors.length - 1} sx={{ p: 0.25 }}>
                  <ChevronDown size={14} />
                </IconButton>
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* Ligne nom + statut + actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                  <Typography sx={{ color: TEXT, fontWeight: 700, fontSize: '1.0625rem' }}>
                    {author.name || 'Nouvel auteur'}
                  </Typography>
                  {author.orcid && (
                    <Tooltip title={`ORCID: ${author.orcid}`}>
                      <img src={imgOrcid16X161} alt="ORCID" style={{ width: 16, height: 16 }} />
                    </Tooltip>
                  )}
                  {isAuthorAligned ? (
                    <Chip
                      size="small"
                      icon={<CheckCircle2 size={12} />}
                      label={`IdHAL · ${author.idhal}`}
                      sx={{
                        height: 22,
                        bgcolor: TEAL_LIGHT,
                        color: TEAL,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        '& .MuiChip-icon': { color: TEAL, ml: 0.5 }
                      }}
                    />
                  ) : (
                    <Chip
                      size="small"
                      icon={<AlertTriangle size={12} />}
                      label="Sans IdHAL"
                      sx={{
                        height: 22,
                        bgcolor: WARN_BG,
                        color: WARN,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        border: `1px solid ${WARN_BORDER}`,
                        '& .MuiChip-icon': { color: WARN, ml: 0.5 }
                      }}
                    />
                  )}
                  {isAuthorAligned && (
                    <Button
                      size="small"
                      onClick={() => handleUpdateAuthor(authorIndex, 'idhal', undefined)}
                      sx={{ color: TEAL, textTransform: 'none', fontSize: '0.75rem', ml: 'auto', minWidth: 'auto' }}
                    >
                      Changer
                    </Button>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveAuthor(authorIndex)}
                    sx={{ color: '#9CA3AF', ml: isAuthorAligned ? 0 : 'auto', '&:hover': { color: '#D32F2F' } }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </Box>

                {/* Fonction */}
                <Box sx={{ mb: 1.5 }}>
                  <FormControl size="small" sx={{ minWidth: 220 }}>
                    <InputLabel sx={{ fontSize: '0.8125rem' }}>Fonction</InputLabel>
                    <Select
                      value={author.function}
                      onChange={(e) => handleUpdateAuthor(authorIndex, 'function', e.target.value)}
                      label="Fonction"
                      sx={{ fontSize: '0.8125rem' }}
                    >
                      {authorFunctions.map(func => (
                        <MenuItem key={func.value} value={func.value} sx={{ fontSize: '0.8125rem' }}>
                          {func.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Panneau "Identité AureHAL à confirmer" */}
                {needsIdhal && (
                  <Paper
                    elevation={0}
                    sx={{
                      bgcolor: WARN_BG,
                      border: `1px solid ${WARN_BORDER}`,
                      borderRadius: '8px',
                      p: 1.5,
                      mb: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <AlertTriangle size={14} color={WARN} />
                      <Typography sx={{ color: WARN, fontWeight: 700, fontSize: '0.8125rem' }}>
                        Identité AureHAL à confirmer
                      </Typography>
                      <Typography sx={{ color: TEXT, fontSize: '0.8125rem' }}>
                        — cet auteur n'a pas d'IdHAL. Sélectionnez son identité pour permettre le dépôt HAL.
                      </Typography>
                    </Box>

                    {hasIdhalCandidates && (
                      <>
                        <Typography sx={{ color: MUTED, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', mb: 1 }}>
                          Candidats AureHAL · {author.idhalCandidates!.length}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {author.idhalCandidates!
                            .slice(0, expandedCandidates[authorIndex] ? undefined : 3)
                            .map((candidate, ci) => (
                              <Paper
                                key={ci}
                                elevation={0}
                                sx={{
                                  bgcolor: 'white',
                                  border: `1px solid ${BORDER}`,
                                  borderRadius: '8px',
                                  p: 1.25,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1.5
                                }}
                              >
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.25 }}>
                                    <Typography sx={{ color: TEXT, fontWeight: 600, fontSize: '0.875rem' }}>
                                      {candidate.fullName}
                                    </Typography>
                                    {candidate.orcid && (
                                      <Tooltip title={`ORCID: ${candidate.orcid}`}>
                                        <img src={imgOrcid16X161} alt="ORCID" style={{ width: 12, height: 12 }} />
                                      </Tooltip>
                                    )}
                                    <Chip
                                      size="small"
                                      label={candidate.idhal}
                                      sx={{ height: 18, fontSize: '0.6875rem', bgcolor: TEAL_LIGHT, color: TEAL }}
                                    />
                                  </Box>
                                  <Typography sx={{ color: MUTED, fontSize: '0.75rem' }}>
                                    {candidate.affiliations} · {candidate.publications} publication{candidate.publications > 1 ? 's' : ''} dans HAL
                                  </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography sx={{ color: getMatchColor(candidate.matchScore), fontWeight: 700, fontSize: '0.875rem' }}>
                                    {candidate.matchScore}%
                                  </Typography>
                                </Box>
                                <Button
                                  variant={candidate.matchScore >= 85 ? 'contained' : 'outlined'}
                                  size="small"
                                  onClick={() => confirmIdhalCandidate(authorIndex, candidate)}
                                  sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    bgcolor: candidate.matchScore >= 85 ? TEAL : 'transparent',
                                    color: candidate.matchScore >= 85 ? 'white' : TEAL,
                                    borderColor: TEAL,
                                    '&:hover': {
                                      bgcolor: candidate.matchScore >= 85 ? TEAL_DARK : TEAL_LIGHT,
                                      borderColor: TEAL
                                    }
                                  }}
                                >
                                  Confirmer
                                </Button>
                              </Paper>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1, flexWrap: 'wrap' }}>
                          {author.idhalCandidates!.length > 3 && (
                            <Button
                              size="small"
                              onClick={() => toggleCandidates(authorIndex)}
                              sx={{ color: TEAL, textTransform: 'none', fontSize: '0.75rem', minWidth: 'auto', p: 0 }}
                            >
                              {expandedCandidates[authorIndex] ? 'Voir moins' : `Voir tous les candidats (${author.idhalCandidates!.length})`}
                            </Button>
                          )}
                          <Typography sx={{ color: MUTED, fontSize: '0.75rem' }}>·</Typography>
                          <Link
                            href="https://aurehal.archives-ouvertes.fr/author/create"
                            target="_blank"
                            rel="noopener"
                            sx={{ color: TEAL, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                          >
                            Créer un IdHAL pour {author.name}
                          </Link>
                          <Typography sx={{ color: MUTED, fontSize: '0.75rem' }}>·</Typography>
                          <Button
                            size="small"
                            onClick={() => handleUpdateAuthor(authorIndex, 'idhal', `_anon_${authorIndex}`)}
                            sx={{ color: MUTED, textTransform: 'none', fontSize: '0.75rem', minWidth: 'auto', p: 0 }}
                          >
                            Déposer sans IdHAL
                          </Button>
                        </Box>
                      </>
                    )}

                    {!hasIdhalCandidates && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                        <Link
                          href="https://aurehal.archives-ouvertes.fr/author/create"
                          target="_blank"
                          rel="noopener"
                          sx={{ color: TEAL, textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                        >
                          Créer un IdHAL pour {author.name}
                        </Link>
                        <Typography sx={{ color: MUTED, fontSize: '0.75rem' }}>·</Typography>
                        <Button
                          size="small"
                          onClick={() => handleUpdateAuthor(authorIndex, 'idhal', `_anon_${authorIndex}`)}
                          sx={{ color: MUTED, textTransform: 'none', fontSize: '0.75rem', minWidth: 'auto', p: 0 }}
                        >
                          Déposer sans IdHAL
                        </Button>
                      </Box>
                    )}
                  </Paper>
                )}

                {/* Affiliations */}
                <Typography sx={{ color: MUTED, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', mb: 1 }}>
                  Affiliations
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {author.affiliations.map((affiliation, affIndex) => {
                    const isAligned = affiliation.halStructureId && !affiliation.importedText;
                    const hasStructureCandidates = affiliation.structureCandidates && affiliation.structureCandidates.length > 0;

                    if (isAligned) {
                      return (
                        <Paper
                          key={affIndex}
                          elevation={0}
                          sx={{
                            bgcolor: SURFACE,
                            border: `1px solid ${BORDER}`,
                            borderRadius: '8px',
                            p: 1.25,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.25 }}>
                              <Typography sx={{ color: TEAL, fontWeight: 700, fontSize: '0.875rem' }}>
                                {affiliation.shortName || affiliation.halStructureName}
                              </Typography>
                              {affiliation.ror && (
                                <Chip
                                  size="small"
                                  label={`ROR ${affiliation.ror}`}
                                  sx={{ height: 18, fontSize: '0.6875rem', bgcolor: TEAL_LIGHT, color: TEAL }}
                                />
                              )}
                            </Box>
                            <Typography sx={{ color: MUTED, fontSize: '0.75rem' }}>
                              {affiliation.halStructureName}
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveAffiliation(authorIndex, affIndex)}
                            sx={{ color: '#9CA3AF', '&:hover': { color: '#D32F2F' } }}
                          >
                            <Trash2 size={14} />
                          </IconButton>
                        </Paper>
                      );
                    }

                    // Affiliation non alignée
                    return (
                      <Paper
                        key={affIndex}
                        elevation={0}
                        sx={{
                          bgcolor: WARN_BG,
                          border: `1px solid ${WARN_BORDER}`,
                          borderRadius: '8px',
                          p: 1.25
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <AlertTriangle size={14} color={WARN} />
                          <Typography sx={{ color: WARN, fontWeight: 700, fontSize: '0.8125rem' }}>
                            Structure à aligner avec AureHAL
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveAffiliation(authorIndex, affIndex)}
                            sx={{ ml: 'auto', color: '#9CA3AF', '&:hover': { color: '#D32F2F' } }}
                          >
                            <Trash2 size={14} />
                          </IconButton>
                        </Box>
                        <Typography sx={{ color: TEXT, fontSize: '0.8125rem', mb: 1 }}>
                          Texte importé : <Box component="span" sx={{ fontStyle: 'italic' }}>« {affiliation.importedText} »</Box>
                        </Typography>

                        {hasStructureCandidates && (
                          <>
                            <Typography sx={{ color: MUTED, fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', mb: 0.75 }}>
                              Candidats AureHAL
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                              {affiliation.structureCandidates!.map((cand, ci) => (
                                <Paper
                                  key={ci}
                                  elevation={0}
                                  sx={{
                                    bgcolor: 'white',
                                    border: `1px solid ${BORDER}`,
                                    borderRadius: '6px',
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5
                                  }}
                                >
                                  <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap', mb: 0.25 }}>
                                      <Typography sx={{ color: TEXT, fontWeight: 700, fontSize: '0.8125rem' }}>
                                        {cand.shortName}
                                      </Typography>
                                      {cand.ror && (
                                        <Chip
                                          size="small"
                                          label={`ROR ${cand.ror}`}
                                          sx={{ height: 16, fontSize: '0.625rem', bgcolor: TEAL_LIGHT, color: TEAL }}
                                        />
                                      )}
                                    </Box>
                                    <Typography sx={{ color: TEXT, fontSize: '0.75rem' }}>
                                      {cand.fullName}
                                    </Typography>
                                    {(cand.tutelles || cand.researchers) && (
                                      <Typography sx={{ color: MUTED, fontSize: '0.6875rem', mt: 0.25 }}>
                                        {cand.tutelles && <>Tutelles : {cand.tutelles}</>}
                                        {cand.tutelles && cand.researchers && ' · '}
                                        {cand.researchers && <>{cand.researchers} chercheurs</>}
                                      </Typography>
                                    )}
                                  </Box>
                                  <Typography sx={{ color: getMatchColor(cand.matchScore), fontWeight: 700, fontSize: '0.8125rem' }}>
                                    {cand.matchScore}%
                                  </Typography>
                                  <Button
                                    variant={cand.matchScore >= 85 ? 'contained' : 'outlined'}
                                    size="small"
                                    onClick={() => alignStructure(authorIndex, affIndex, cand)}
                                    sx={{
                                      textTransform: 'none',
                                      fontWeight: 600,
                                      fontSize: '0.75rem',
                                      bgcolor: cand.matchScore >= 85 ? TEAL : 'transparent',
                                      color: cand.matchScore >= 85 ? 'white' : TEAL,
                                      borderColor: TEAL,
                                      '&:hover': {
                                        bgcolor: cand.matchScore >= 85 ? TEAL_DARK : TEAL_LIGHT,
                                        borderColor: TEAL
                                      }
                                    }}
                                  >
                                    Aligner
                                  </Button>
                                </Paper>
                              ))}
                            </Box>
                          </>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                          <Autocomplete
                            size="small"
                            options={mockHalStructures}
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => {
                              if (value) {
                                alignStructure(authorIndex, affIndex, {
                                  halStructureId: value.id,
                                  shortName: value.shortName,
                                  fullName: value.name,
                                  ror: value.ror,
                                  matchScore: 100
                                });
                              }
                            }}
                            sx={{ flex: 1, minWidth: 220 }}
                            renderInput={(params) => (
                              <TextField {...params} placeholder="Rechercher dans AureHAL…" />
                            )}
                          />
                          <Typography sx={{ color: MUTED, fontSize: '0.75rem' }}>·</Typography>
                          <Link
                            href="https://aurehal.archives-ouvertes.fr/structure/create"
                            target="_blank"
                            rel="noopener"
                            sx={{ color: TEAL, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                          >
                            Demander la création dans AureHAL
                          </Link>
                        </Box>
                      </Paper>
                    );
                  })}
                </Box>

                {/* Ajouter une affiliation */}
                <Box sx={{ mt: 1 }}>
                  <Autocomplete
                    size="small"
                    options={mockHalStructures}
                    getOptionLabel={(option) => option.name}
                    onChange={(_, value) => {
                      if (value) handleAddAffiliation(authorIndex, value);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Ajouter une affiliation AureHAL" />
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        );
      })}

      {/* Actions globales */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mt: 2, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<UserPlus size={16} />}
          onClick={() => handleAddAuthor()}
          sx={{
            color: TEAL, borderColor: TEAL, textTransform: 'none', fontWeight: 600,
            '&:hover': { borderColor: TEAL_DARK, bgcolor: TEAL_LIGHT }
          }}
        >
          Ajouter un auteur
        </Button>
      </Box>
    </Box>
  );
}
