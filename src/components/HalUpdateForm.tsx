import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Alert,
  Divider
} from '@mui/material';
import {
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';

type MetadataComparison = {
  field: string;
  label: string;
  halValue: string;
  sovisuValue: string;
  source: string;
  selected: boolean;
};

interface HalUpdateFormProps {
  halId?: string;
}

export function HalUpdateForm({ halId }: HalUpdateFormProps) {
  const [updating, setUpdating] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);

  // Mock data - Comparaison des métadonnées HAL vs SoVisu+
  const [metadataComparisons, setMetadataComparisons] = useState<MetadataComparison[]>([
    {
      field: 'abstract',
      label: 'Résumé',
      halValue: 'Food security resilience has become a major concept...',
      sovisuValue: 'Food security resilience has become a major concept in development policies. However, its practical application remains challenging due to different interpretations and measurement approaches across projects and organizations.',
      source: 'Scopus',
      selected: true
    },
    {
      field: 'author_orcid',
      label: 'ORCID de Quentin Boudot',
      halValue: '',
      sovisuValue: '0000-0003-1234-5678',
      source: 'OpenAlex',
      selected: true
    },
    {
      field: 'author_orcid_2',
      label: 'ORCID de Pierre Janin',
      halValue: '',
      sovisuValue: '0000-0002-1234-5678',
      source: 'OpenAlex',
      selected: true
    },
    {
      field: 'keywords',
      label: 'Mots-clés',
      halValue: 'Food security, Resilience, Burkina Faso',
      sovisuValue: 'Food security, Resilience, Burkina Faso, Development, Agriculture, Policy',
      source: 'Scopus',
      selected: true
    },
    {
      field: 'doi',
      label: 'DOI',
      halValue: '10.1016/j.foodpol.2024.102345',
      sovisuValue: '10.1016/j.foodpol.2024.102345',
      source: 'Crossref',
      selected: false
    },
    {
      field: 'publisher',
      label: 'Éditeur',
      halValue: 'Elsevier',
      sovisuValue: 'Elsevier Ltd',
      source: 'Scopus',
      selected: false
    }
  ]);

  const handleToggleField = (index: number) => {
    const newComparisons = [...metadataComparisons];
    newComparisons[index].selected = !newComparisons[index].selected;
    setMetadataComparisons(newComparisons);
  };

  const handleSelectAll = () => {
    const newComparisons = metadataComparisons.map(comp => ({
      ...comp,
      selected: comp.halValue !== comp.sovisuValue
    }));
    setMetadataComparisons(newComparisons);
  };

  const handleDeselectAll = () => {
    const newComparisons = metadataComparisons.map(comp => ({
      ...comp,
      selected: false
    }));
    setMetadataComparisons(newComparisons);
  };

  const handleUpdate = async () => {
    const selectedFields = metadataComparisons.filter(comp => comp.selected);

    if (selectedFields.length === 0) {
      toast.error('Veuillez sélectionner au moins un champ à mettre à jour');
      return;
    }

    setUpdating(true);

    // Simulation de la mise à jour
    await new Promise(resolve => setTimeout(resolve, 2000));

    setUpdating(false);
    setUpdateComplete(true);
    toast.success(`${selectedFields.length} champ(s) mis à jour avec succès sur HAL`);
  };

  if (updateComplete) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CheckCircle size={64} color="#34A853" style={{ marginBottom: 16 }} />
        <Typography variant="h6" sx={{ color: '#006A61', fontWeight: 600, mb: 2 }}>
          Mise à jour réussie !
        </Typography>
        <Typography sx={{ color: '#6F7977', mb: 3 }}>
          Les métadonnées HAL ont été mises à jour avec succès.
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#006A61',
            '&:hover': { bgcolor: '#005550' }
          }}
          onClick={() => {
            setUpdateComplete(false);
            // Reset selections
            const newComparisons = metadataComparisons.map(comp => ({
              ...comp,
              selected: false
            }));
            setMetadataComparisons(newComparisons);
          }}
        >
          Fermer
        </Button>
      </Box>
    );
  }

  const differencesCount = metadataComparisons.filter(
    comp => comp.halValue !== comp.sovisuValue
  ).length;

  const selectedCount = metadataComparisons.filter(comp => comp.selected).length;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: '#006A61', fontWeight: 600, mb: 1 }}>
        Mettre à jour sur HAL
      </Typography>
      <Typography sx={{ color: '#6F7977', fontSize: '0.875rem', mb: 3 }}>
        Comparez les métadonnées HAL avec celles collectées par SoVisu+ et sélectionnez les champs à mettre à jour
      </Typography>

      {halId && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>HAL ID:</strong> {halId} - Les métadonnées seront envoyées à HAL pour mise à jour
        </Alert>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<AlertCircle size={16} />}
            label={`${differencesCount} différence(s) détectée(s)`}
            sx={{
              bgcolor: '#FFF4E5',
              color: '#F57C00',
              fontWeight: 500,
              '& .MuiChip-icon': {
                color: '#F57C00'
              }
            }}
          />
          <Chip
            label={`${selectedCount} sélectionné(s)`}
            sx={{
              bgcolor: '#E8F5F4',
              color: '#006A61',
              fontWeight: 500
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            onClick={handleSelectAll}
            sx={{
              color: '#006A61',
              textTransform: 'none',
              fontSize: '0.875rem',
              '&:hover': { bgcolor: '#E8F5F4' }
            }}
          >
            Tout sélectionner
          </Button>
          <Button
            size="small"
            onClick={handleDeselectAll}
            sx={{
              color: '#6F7977',
              textTransform: 'none',
              fontSize: '0.875rem',
              '&:hover': { bgcolor: '#F5F7F6' }
            }}
          >
            Tout désélectionner
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid #E5E7E6', borderRadius: '8px', overflow: 'hidden' }}>
        <Table>
          <TableBody>
            {metadataComparisons.map((comparison, index) => {
              const isDifferent = comparison.halValue !== comparison.sovisuValue;
              const halEmpty = !comparison.halValue || comparison.halValue.trim() === '';

              return (
                <TableRow
                  key={index}
                  sx={{
                    bgcolor: comparison.selected ? '#F0F9F8' : 'white',
                    '&:hover': { bgcolor: comparison.selected ? '#E8F5F4' : '#FAFAFA' }
                  }}
                >
                  <TableCell sx={{ width: '40px', borderBottom: '1px solid #E5E7E6' }}>
                    <Checkbox
                      checked={comparison.selected}
                      onChange={() => handleToggleField(index)}
                      disabled={!isDifferent}
                      sx={{
                        color: '#006A61',
                        '&.Mui-checked': {
                          color: '#006A61'
                        }
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ borderBottom: '1px solid #E5E7E6', py: 2 }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <Typography sx={{ color: '#2D3836', fontWeight: 600, fontSize: '0.9375rem' }}>
                          {comparison.label}
                        </Typography>
                        {isDifferent && (
                          <Chip
                            label={halEmpty ? 'Nouveau' : 'Modifié'}
                            size="small"
                            sx={{
                              bgcolor: halEmpty ? '#E8F5F4' : '#FFF4E5',
                              color: halEmpty ? '#006A61' : '#F57C00',
                              fontSize: '0.625rem',
                              height: '18px',
                              fontWeight: 600
                            }}
                          />
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                        {/* HAL value */}
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ color: '#6F7977', fontSize: '0.75rem', mb: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>
                            Dans HAL
                          </Typography>
                          <Paper elevation={0} sx={{ bgcolor: '#F5F7F6', p: 1.5, borderRadius: '6px' }}>
                            <Typography sx={{
                              color: halEmpty ? '#9CA3A0' : '#2D3836',
                              fontSize: '0.875rem',
                              fontStyle: halEmpty ? 'italic' : 'normal'
                            }}>
                              {halEmpty ? 'Non renseigné' : comparison.halValue}
                            </Typography>
                          </Paper>
                        </Box>

                        {/* Arrow */}
                        {isDifferent && (
                          <Box sx={{ display: 'flex', alignItems: 'center', pt: 3 }}>
                            <ArrowRight size={20} color="#006A61" />
                          </Box>
                        )}

                        {/* SoVisu+ value */}
                        {isDifferent && (
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography sx={{ color: '#6F7977', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 500 }}>
                                Dans SoVisu+
                              </Typography>
                              <Chip
                                label={`Source: ${comparison.source}`}
                                size="small"
                                sx={{
                                  bgcolor: 'white',
                                  border: '1px solid #E5E7E6',
                                  color: '#6F7977',
                                  fontSize: '0.625rem',
                                  height: '18px'
                                }}
                              />
                            </Box>
                            <Paper elevation={0} sx={{ bgcolor: '#E8F5F4', p: 1.5, borderRadius: '6px', border: '1px solid #B8E6E2' }}>
                              <Typography sx={{ color: '#006A61', fontSize: '0.875rem', fontWeight: 500 }}>
                                {comparison.sovisuValue}
                              </Typography>
                            </Paper>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          disabled={updating}
          sx={{
            color: '#6F7977',
            borderColor: '#E5E7E6',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#6F7977',
              bgcolor: 'transparent'
            }
          }}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          startIcon={updating ? null : <Upload size={18} />}
          onClick={handleUpdate}
          disabled={updating || selectedCount === 0}
          sx={{
            bgcolor: '#006A61',
            textTransform: 'none',
            px: 4,
            '&:hover': { bgcolor: '#005550' },
            '&.Mui-disabled': {
              bgcolor: '#E5E7E6',
              color: '#9CA3A0'
            }
          }}
        >
          {updating ? 'Mise à jour en cours...' : `Mettre à jour ${selectedCount} champ(s)`}
        </Button>
      </Box>
    </Box>
  );
}
