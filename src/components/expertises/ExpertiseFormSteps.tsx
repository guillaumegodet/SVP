import React from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Alert,
    Autocomplete,
    Chip,
    Divider,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    Card,
    CardContent,
    Typography,
    FormGroup,
    Switch,
    Checkbox,
} from '@mui/material';
import {
    MapPin,
    Tv,
    Building,
    School,
} from 'lucide-react';
import { ExpertiseFormData } from '../../types/expertise';
import { categories, allGeographicOptions, temporalPeriods } from './expertiseConstants';

interface FormStepProps {
    formData: ExpertiseFormData;
    setFormData: React.Dispatch<React.SetStateAction<ExpertiseFormData>>;
}

export function GeneralInfoStep({ formData, setFormData }: FormStepProps) {
    return (
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info">
                Commencez par décrire votre expertise (champs marqués * sont obligatoires)
            </Alert>
            <TextField
                fullWidth
                label="Nom de l'expertise *"
                placeholder="Ex: Intelligence Artificielle"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                error={!formData.name}
                helperText={!formData.name ? "Le nom est requis" : ""}
            />
            <FormControl fullWidth required error={!formData.category}>
                <InputLabel>Catégorie *</InputLabel>
                <Select
                    label="Catégorie *"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    {categories.map(cat => (
                        <MenuItem key={cat.name} value={cat.name}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <cat.icon size={18} style={{ color: cat.color }} />
                                {cat.name}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
                {!formData.category && (
                    <FormHelperText>La catégorie est requise</FormHelperText>
                )}
            </FormControl>
            <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                placeholder="Décrivez votre expertise..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
                fullWidth
                label="Mots-clés"
                placeholder="Séparez les mots-clés par des virgules"
                helperText="Ex: Intelligence artificielle, Machine Learning, Deep Learning"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
            />
        </Box>
    );
}

export function ContextStep({ formData, setFormData }: FormStepProps) {
    return (
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info" icon={<MapPin size={20} />}>
                Définissez le contexte géographique et temporel de votre expertise (champs obligatoires)
            </Alert>

            <Autocomplete
                multiple
                options={allGeographicOptions}
                getOptionLabel={(option) => option.name}
                groupBy={(option) => {
                    if (option.type === 'country') return '🌍 Pays';
                    if (option.type === 'geopolitical') return '🌐 Zones géopolitiques';
                    return '🗺️ Zones physiques';
                }}
                value={formData.geographicZones}
                onChange={(_, newValue) => setFormData({ ...formData, geographicZones: newValue })}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Zone géographique"
                        placeholder="Sélectionnez une ou plusieurs zones"
                        required
                        error={formData.geographicZones.length === 0}
                        helperText={formData.geographicZones.length === 0 ? "Au moins une zone géographique est requise" : ""}
                    />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                            <Chip
                                key={key}
                                label={option.name}
                                {...tagProps}
                                size="small"
                                sx={{
                                    backgroundColor: option.type === 'country' ? '#e0f2fe' : option.type === 'geopolitical' ? '#fef3c7' : '#dcfce7',
                                    color: option.type === 'country' ? '#0369a1' : option.type === 'geopolitical' ? '#92400e' : '#166534'
                                }}
                            />
                        );
                    })
                }
            />

            <Divider />

            <FormControl component="fieldset" required>
                <FormLabel component="legend">Période temporelle *</FormLabel>
                <RadioGroup
                    value={formData.temporalPeriodType}
                    onChange={(e) => setFormData({ ...formData, temporalPeriodType: e.target.value })}
                >
                    <FormControlLabel value="standard" control={<Radio />} label="Période standard" />
                    <FormControlLabel value="custom" control={<Radio />} label="Période personnalisée" />
                </RadioGroup>
            </FormControl>

            {formData.temporalPeriodType === 'standard' ? (
                <FormControl fullWidth required>
                    <InputLabel>Période *</InputLabel>
                    <Select
                        label="Période *"
                        value={formData.temporalPeriodStandard}
                        onChange={(e) => setFormData({ ...formData, temporalPeriodStandard: e.target.value })}
                        error={!formData.temporalPeriodStandard}
                    >
                        {temporalPeriods.filter(p => p.value !== 'custom').map(period => (
                            <MenuItem key={period.value} value={period.value}>
                                {period.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {!formData.temporalPeriodStandard && (
                        <FormHelperText error>Veuillez sélectionner une période</FormHelperText>
                    )}
                </FormControl>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Année de début *"
                            type="number"
                            value={formData.temporalStartYear}
                            onChange={(e) => setFormData({ ...formData, temporalStartYear: e.target.value })}
                            placeholder="Ex: 2020"
                            required
                            error={!formData.temporalStartYear}
                            helperText={!formData.temporalStartYear ? "Requis" : ""}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Année de fin *"
                            type="number"
                            value={formData.temporalEndYear}
                            onChange={(e) => setFormData({ ...formData, temporalEndYear: e.target.value })}
                            placeholder="Ex: 2030"
                            required
                            error={!formData.temporalEndYear}
                            helperText={!formData.temporalEndYear ? "Requis" : ""}
                        />
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}

export function LevelStep({ formData, setFormData }: FormStepProps) {
    return (
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info">
                Auto-évaluez votre niveau d'expertise en fonction de ce que vous êtes capable de faire
            </Alert>

            <FormControl component="fieldset">
                <FormLabel component="legend">Mon niveau sur ce sujet</FormLabel>
                <RadioGroup
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                >
                    <Card sx={{ mb: 1, border: formData.level === 'veille' ? '2px solid #94a3b8' : '1px solid #e5e7eb' }}>
                        <CardContent sx={{ py: 1.5 }}>
                            <FormControlLabel
                                value="veille"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography variant="subtitle2">Intérêt secondaire / Veille</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Je suis le sujet, je peux en discuter de manière informelle, mais je ne publie pas activement dessus
                                        </Typography>
                                    </Box>
                                }
                            />
                        </CardContent>
                    </Card>

                    <Card sx={{ mb: 1, border: formData.level === 'enseignement' ? '2px solid #3b82f6' : '1px solid #e5e7eb' }}>
                        <CardContent sx={{ py: 1.5 }}>
                            <FormControlLabel
                                value="enseignement"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography variant="subtitle2">Expertise d'enseignement</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Je maîtrise le sujet suffisamment pour l'enseigner à des étudiants, je connais l'état de l'art
                                        </Typography>
                                    </Box>
                                }
                            />
                        </CardContent>
                    </Card>

                    <Card sx={{ mb: 1, border: formData.level === 'recherche' ? '2px solid #f59e0b' : '1px solid #e5e7eb' }}>
                        <CardContent sx={{ py: 1.5 }}>
                            <FormControlLabel
                                value="recherche"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography variant="subtitle2">Expertise de recherche active</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Je publie actuellement sur ce sujet (articles, thèses encadrées), je produis de la nouvelle connaissance
                                        </Typography>
                                    </Box>
                                }
                            />
                        </CardContent>
                    </Card>

                    <Card sx={{ border: formData.level === 'reference' ? '2px solid #10b981' : '1px solid #e5e7eb' }}>
                        <CardContent sx={{ py: 1.5 }}>
                            <FormControlLabel
                                value="reference"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography variant="subtitle2">Expertise de référence (Senior)</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Je suis reconnu par mes pairs comme une référence sur ce sujet (invitations keynote, direction d'ouvrages)
                                        </Typography>
                                    </Box>
                                }
                            />
                        </CardContent>
                    </Card>
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export function AvailabilityStep({ formData, setFormData }: FormStepProps) {
    const hasAnyAvailability = Object.values(formData.availability).some(v => v === true && typeof v === 'boolean');

    return (
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info">
                Indiquez pour quels types d'interventions vous êtes disponible
            </Alert>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tv size={20} />
                        Médias & Grand Public
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.availability.pressWritten}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        availability: { ...formData.availability, pressWritten: e.target.checked }
                                    })}
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="body2">Interviews Presse écrite / Web</Typography>
                                    <Typography variant="caption" color="text.secondary">Répondre aux journalistes</Typography>
                                </Box>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.availability.pressTvRadio}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        availability: { ...formData.availability, pressTvRadio: e.target.checked }
                                    })}
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="body2">Radio / TV (Direct)</Typography>
                                    <Typography variant="caption" color="text.secondary">Demande une aisance orale spécifique</Typography>
                                </Box>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.availability.publicConferences}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        availability: { ...formData.availability, publicConferences: e.target.checked }
                                    })}
                                />
                            }
                            label="Conférences Grand Public / Débats citoyens"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.availability.hotTopics}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        availability: { ...formData.availability, hotTopics: e.target.checked }
                                    })}
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="body2">Sujets "Chauds"</Typography>
                                    <Typography variant="caption" color="text.secondary">Réagir à l'actualité immédiate</Typography>
                                </Box>
                            }
                        />
                    </FormGroup>
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Building size={20} />
                        Sphère Académique & Professionnelle
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.availability.academicConferences}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        availability: { ...formData.availability, academicConferences: e.target.checked }
                                    })}
                                />
                            }
                            label="Colloques spécialisés / Séminaires"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.availability.businessPartnerships}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        availability: { ...formData.availability, businessPartnerships: e.target.checked }
                                    })}
                                />
                            }
                            label="Interventions en entreprises / Partenariats R&D"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.availability.publicExpertise}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        availability: { ...formData.availability, publicExpertise: e.target.checked }
                                    })}
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="body2">Expertise publique</Typography>
                                    <Typography variant="caption" color="text.secondary">Auditions parlementaires, Ministères, Think Tanks</Typography>
                                </Box>
                            }
                        />
                    </FormGroup>
                </CardContent>
            </Card>

            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <School size={20} />
                        Mentoring & Pédagogie
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formData.availability.schoolInterventions}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        availability: { ...formData.availability, schoolInterventions: e.target.checked }
                                    })}
                                />
                            }
                            label={
                                <Box>
                                    <Typography variant="body2">Intervention en milieu scolaire</Typography>
                                    <Typography variant="caption" color="text.secondary">Lycées, collèges, etc.</Typography>
                                </Box>
                            }
                        />
                    </FormGroup>
                </CardContent>
            </Card>

            <Divider />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={formData.availability.mediaTraining}
                        onChange={(e) => setFormData({
                            ...formData,
                            availability: { ...formData.availability, mediaTraining: e.target.checked }
                        })}
                    />
                }
                label="J'ai suivi une formation « Média Training »"
            />

            {/* Récapitulatif */}
            <Divider sx={{ mt: 2 }} />
            <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    Récapitulatif de vos disponibilités :
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {formData.availability.pressWritten && (
                        <Typography variant="caption">✓ Presse écrite / Web</Typography>
                    )}
                    {formData.availability.pressTvRadio && (
                        <Typography variant="caption">✓ TV / Radio</Typography>
                    )}
                    {formData.availability.publicConferences && (
                        <Typography variant="caption">✓ Conférences grand public</Typography>
                    )}
                    {formData.availability.hotTopics && (
                        <Typography variant="caption">✓ Sujets d'actualité</Typography>
                    )}
                    {formData.availability.academicConferences && (
                        <Typography variant="caption">✓ Colloques académiques</Typography>
                    )}
                    {formData.availability.businessPartnerships && (
                        <Typography variant="caption">✓ Partenariats R&D</Typography>
                    )}
                    {formData.availability.publicExpertise && (
                        <Typography variant="caption">✓ Expertise publique</Typography>
                    )}
                    {formData.availability.schoolInterventions && (
                        <Typography variant="caption">✓ Interventions scolaires</Typography>
                    )}
                    {formData.availability.mediaTraining && (
                        <Typography variant="caption" sx={{ fontStyle: 'italic', mt: 1 }}>
                            + Formation Média Training suivie
                        </Typography>
                    )}
                    {!hasAnyAvailability && (
                        <Typography variant="caption" color="text.secondary">
                            Aucune disponibilité sélectionnée (vous pourrez les ajouter plus tard)
                        </Typography>
                    )}
                </Box>
            </Alert>
        </Box>
    );
}
