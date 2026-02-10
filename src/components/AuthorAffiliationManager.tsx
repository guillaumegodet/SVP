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
  Paper,
  Autocomplete,
  IconButton,
  Link,
  Grid
} from '@mui/material';
import {
  Plus,
  Trash2,
  ExternalLink,
  GripVertical,
  Edit,
  MoreVertical,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import imgOrcid16X161 from "figma:asset/6e3dbbc34225b24e434ec4a2f2b823e2d5f2a95c.png";

// Mock des auteurs suggérés (pour l'autocomplétion)
const mockSuggestedAuthors = [
  {
    id: 1,
    name: 'Magali Muraro',
    email: '@univ-reims.fr',
    domain: 'auteurcorrespondancepatricecottet',
    idhal: 'magali-muraro',
    orcid: '0000-0002-1234-5678'
  },
  {
    id: 2,
    name: 'Alrick Dias',
    email: '@imbe.fr',
    domain: '1aurliedela vaudecoscope',
    idhal: 'alrick-dias',
    orcid: undefined
  },
  {
    id: 3,
    name: 'Tristan Cazenave',
    email: '@dauphine.fr',
    domain: 'tristan-cazenave',
    idhal: 'tristan-cazenave',
    orcid: '0000-0003-4669-9374'
  },
  {
    id: 4,
    name: 'Jacques Féjoz',
    email: '@ceremade.dauphine.fr',
    domain: 'jacques-fejoz',
    idhal: 'jacques-fejoz',
    orcid: undefined
  },
  {
    id: 5,
    name: 'Coline Chartier',
    email: '@example.fr',
    domain: '',
    idhal: undefined,
    orcid: undefined
  },
  {
    id: 6,
    name: 'Julien Godard',
    email: '@example.fr',
    domain: '',
    idhal: 'julien-godard',
    orcid: undefined
  },
  {
    id: 7,
    name: 'Sylvain Durand',
    email: '@example.fr',
    domain: '',
    idhal: 'durand-sylvain',
    orcid: undefined
  }
];

// Mock des structures AureHAL (pour démo)
const mockHalStructures = [
  {
    id: '102312',
    name: 'Laboratoire Angevin de Recherche en Ingénierie des Systèmes',
    shortName: 'LARIS',
    ror: '05q3vnk25'
  },
  {
    id: '102313',
    name: 'Motricité, interactions, performance UR 4334 / Movement - Interactions - Performance',
    shortName: 'MIP',
    ror: '0154kq418'
  },
  {
    id: '102314',
    name: 'Motricité, interactions, performance EA 4334 / Movement - Interactions - Performance',
    shortName: 'MIP EA',
    ror: '02feahw73'
  },
  {
    id: '102315',
    name: 'EHESS - École des hautes études en sciences sociales',
    shortName: 'EHESS',
    ror: '011kdr723'
  }
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
};

interface AuthorAffiliationManagerProps {
  authors: Author[];
  onChange: (authors: Author[]) => void;
}

export function AuthorAffiliationManager({ authors, onChange }: AuthorAffiliationManagerProps) {
  const [authorSearchInput, setAuthorSearchInput] = useState('');

  const handleAddAuthor = (suggestedAuthor?: typeof mockSuggestedAuthors[0]) => {
    const newAuthor: Author = suggestedAuthor ? {
      name: suggestedAuthor.name,
      function: 'auteur',
      idhal: suggestedAuthor.idhal,
      orcid: suggestedAuthor.orcid,
      email: suggestedAuthor.email,
      domain: suggestedAuthor.domain,
      affiliations: []
    } : {
      name: authorSearchInput, // Use search input if no suggested author
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
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === authors.length - 1)) {
      return;
    }

    const newAuthors = [...authors];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newAuthors[index], newAuthors[targetIndex]] = [newAuthors[targetIndex], newAuthors[index]];
    onChange(newAuthors);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ color: '#2D3836', fontWeight: 600, fontSize: '1rem' }}>
          Auteurs *
        </Typography>
      </Box>

      {/* Liens vers les référentiels */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, p: 2, bgcolor: '#E8F5F4', borderRadius: 2 }}>
        <Link
          href="https://aurehal.archives-ouvertes.fr/"
          target="_blank"
          rel="noopener"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: '#006A61',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          <ExternalLink size={14} />
          AureHAL (Structures et Auteurs)
        </Link>
        <Link
          href="https://ror.org/"
          target="_blank"
          rel="noopener"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: '#006A61',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          <ExternalLink size={14} />
          ROR (Research Organization Registry)
        </Link>
      </Box>

      <Autocomplete
        inputValue={authorSearchInput}
        onInputChange={(_, value) => setAuthorSearchInput(value)}
        options={mockSuggestedAuthors}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option;
          return option.name;
        }}
        onChange={(_, value) => {
          if (typeof value === 'object' && value !== null) {
            handleAddAuthor(value);
          } else if (typeof value === 'string') {
            handleAddAuthor();
          }
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ color: '#34A853', fontWeight: 600, fontSize: '0.875rem' }}>
                {option.name}
              </Typography>
              <Typography sx={{ color: '#6F7977', fontSize: '0.75rem' }}>
                {option.email} {option.domain || option.idhal} {option.orcid || ''}
              </Typography>
            </Box>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Ajouter un auteur"
            fullWidth
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
                color: '#006A61',
                textTransform: 'none',
                justifyContent: 'flex-start',
                '&:hover': { bgcolor: '#E8F5F4' }
              }}
            >
              Ajouter un nouvel auteur
            </Button>
          </Box>
        }
        sx={{ mb: 3 }}
      />

      {/* Liste des auteurs en 2 colonnes */}
      {authors.map((author, authorIndex) => (
        <Paper
          key={authorIndex}
          elevation={0}
          sx={{
            bgcolor: '#F5F7F6',
            p: 2,
            mb: 2
          }}
        >
          <Grid container spacing={2}>
            {/* Colonne gauche : Auteur */}
            <Grid item xs={12} md={5.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                {/* Drag handle et controls */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, pt: 1 }}>
                  <GripVertical size={18} color="#9CA3AF" style={{ cursor: 'grab' }} />
                  <IconButton
                    size="small"
                    onClick={() => moveAuthor(authorIndex, 'up')}
                    disabled={authorIndex === 0}
                    sx={{ p: 0.25 }}
                  >
                    <ChevronUp size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => moveAuthor(authorIndex, 'down')}
                    disabled={authorIndex === authors.length - 1}
                    sx={{ p: 0.25 }}
                  >
                    <ChevronDown size={16} />
                  </IconButton>
                </Box>

                <Box sx={{ flex: 1 }}>
                  {/* Nom de l'auteur */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <Typography sx={{ color: '#2D3836', fontWeight: 700, fontSize: '1rem', flex: 1 }}>
                      {author.name || 'Nouvel auteur'}
                    </Typography>
                    {author.orcid && (
                      <img
                        src={imgOrcid16X161}
                        alt="ORCID"
                        style={{ width: 16, height: 16 }}
                      />
                    )}
                    <IconButton
                      size="small"
                      sx={{ color: '#9CA3AF' }}
                    >
                      <Edit size={16} />
                    </IconButton>
                  </Box>

                  {/* IdHAL */}
                  {author.idhal && (
                    <Box sx={{ mb: 1 }}>
                      <Typography sx={{ color: '#6F7977', fontSize: '0.7rem' }}>
                        IdHAL:
                      </Typography>
                      <Typography sx={{ color: '#006A61', fontSize: '0.875rem', fontWeight: 500 }}>
                        {author.idhal}
                      </Typography>
                    </Box>
                  )}

                  {/* Fonction */}
                  <FormControl size="small" sx={{ mb: 1, minWidth: 120 }}>
                    <InputLabel sx={{ fontSize: '0.813rem' }}>Fonction:</InputLabel>
                    <Select
                      value={author.function}
                      onChange={(e) => handleUpdateAuthor(authorIndex, 'function', e.target.value)}
                      label="Fonction:"
                      sx={{ fontSize: '0.813rem' }}
                    >
                      {authorFunctions.map(func => (
                        <MenuItem key={func.value} value={func.value} sx={{ fontSize: '0.813rem' }}>
                          {func.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>

            {/* Colonne droite : Affiliations */}
            <Grid item xs={12} md={5.5}>
              <Box>
                {author.affiliations.map((affiliation, affIndex) => (
                  <Box
                    key={affIndex}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1,
                      mb: 1.5,
                      p: 1.5,
                      bgcolor: 'white',
                      borderRadius: 1,
                      border: '1px solid #E5E7EB'
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ color: '#006A61', fontSize: '0.875rem', fontWeight: 600, mb: 0.5 }}>
                        {affiliation.shortName || affiliation.halStructureName}
                      </Typography>
                      <Typography sx={{ color: '#6F7977', fontSize: '0.75rem' }}>
                        {affiliation.halStructureName}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveAffiliation(authorIndex, affIndex)}
                      sx={{ color: '#D32F2F', p: 0.5 }}
                    >
                      <Trash2 size={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: '#9CA3AF', p: 0.5 }}
                    >
                      <MoreVertical size={14} />
                    </IconButton>
                  </Box>
                ))}

                {/* Ajouter une affiliation */}
                <Autocomplete
                  size="small"
                  options={mockHalStructures}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => {
                    if (value) {
                      handleAddAffiliation(authorIndex, value);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Ajouter une affiliation"
                    />
                  )}
                />
              </Box>
            </Grid>

            {/* Bouton suppression */}
            <Grid item xs={12} md={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                onClick={() => handleRemoveAuthor(authorIndex)}
                size="small"
                sx={{ color: '#D32F2F' }}
              >
                <Trash2 size={18} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}