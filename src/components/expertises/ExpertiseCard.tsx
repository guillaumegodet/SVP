import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Box,
    Typography,
    Avatar,
    IconButton,
    Chip,
    Divider,
    Tooltip,
} from '@mui/material';
import {
    MapPin,
    Calendar,
    Eye,
    Tv,
    GraduationCap,
    Building,
    MoreVertical,
} from 'lucide-react';
import { Expertise, ExpertiseLevel } from '../../types/expertise';

interface ExpertiseCardProps {
    expertise: Expertise;
    categoryIcon: any;
    categoryColor: string;
    onMenuClick: (event: React.MouseEvent<HTMLElement>, expertise: Expertise) => void;
}

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

export default function ExpertiseCard({ expertise, categoryIcon: CategoryIcon, categoryColor, onMenuClick }: ExpertiseCardProps) {
    const levelInfo = getLevelInfo(expertise.level);

    return (
        <Grid
            item
            xs={12}
            md={6}
            lg={6}
            sx={{
                display: 'flex',
                maxWidth: '45% !important',
                flexBasis: '45%',
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    borderLeft: `4px solid ${levelInfo.color}`,
                    position: 'relative',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                    },
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                            <Avatar
                                sx={{
                                    backgroundColor: `${categoryColor}20`,
                                    width: 48,
                                    height: 48,
                                }}
                            >
                                <CategoryIcon size={24} style={{ color: categoryColor }} />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {expertise.name}
                                    </Typography>
                                    <Tooltip title={levelInfo.description} arrow placement="top">
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: levelInfo.color,
                                                cursor: 'help',
                                            }}
                                        />
                                    </Tooltip>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                                    {expertise.category}
                                </Typography>
                            </Box>
                        </Box>
                        <IconButton
                            onClick={(e) => onMenuClick(e, expertise)}
                            size="small"
                        >
                            <MoreVertical />
                        </IconButton>
                    </Box>

                    <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', mb: 2, minHeight: 60 }}>
                        {expertise.description}
                    </Typography>

                    {/* Terrain */}
                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <MapPin size={16} style={{ color: '#6b7280' }} />
                            <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(0,0,0,0.7)' }}>
                                Zones géographiques :
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {expertise.geographicZones.map((zone, index) => (
                                <Chip
                                    key={index}
                                    label={zone.name}
                                    size="small"
                                    sx={{
                                        fontSize: '0.7rem',
                                        backgroundColor: zone.type === 'country' ? '#e0f2fe' : zone.type === 'geopolitical' ? '#fef3c7' : '#dcfce7',
                                        color: zone.type === 'country' ? '#0369a1' : zone.type === 'geopolitical' ? '#92400e' : '#166534'
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Calendar size={16} style={{ color: '#6b7280' }} />
                            <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(0,0,0,0.7)' }}>
                                Période :
                            </Typography>
                        </Box>
                        <Chip
                            label={
                                expertise.temporalPeriod.type === 'custom'
                                    ? `${expertise.temporalPeriod.startYear} - ${expertise.temporalPeriod.endYear}`
                                    : expertise.temporalPeriod.label
                            }
                            size="small"
                            sx={{ fontSize: '0.7rem', backgroundColor: '#f3f4f6' }}
                        />
                    </Box>

                    {/* Availability Summary */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(0,0,0,0.7)', mb: 1, display: 'block' }}>
                            Disponibilités :
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {expertise.availability.pressWritten && (
                                <Tooltip title="Presse écrite / Web">
                                    <Chip icon={<Eye size={14} />} label="Presse" size="small" sx={{ fontSize: '0.7rem' }} />
                                </Tooltip>
                            )}
                            {expertise.availability.pressTvRadio && (
                                <Tooltip title="TV / Radio">
                                    <Chip icon={<Tv size={14} />} label="TV/Radio" size="small" sx={{ fontSize: '0.7rem' }} />
                                </Tooltip>
                            )}
                            {expertise.availability.academicConferences && (
                                <Tooltip title="Colloques académiques">
                                    <Chip icon={<GraduationCap size={14} />} label="Colloques" size="small" sx={{ fontSize: '0.7rem' }} />
                                </Tooltip>
                            )}
                            {expertise.availability.publicExpertise && (
                                <Tooltip title="Expertise publique">
                                    <Chip icon={<Building size={14} />} label="Expertise publique" size="small" sx={{ fontSize: '0.7rem' }} />
                                </Tooltip>
                            )}
                            {!expertise.availability.pressWritten &&
                                !expertise.availability.pressTvRadio &&
                                !expertise.availability.academicConferences &&
                                !expertise.availability.publicExpertise && (
                                    <Typography variant="caption" color="text.secondary">
                                        Non disponible pour interventions
                                    </Typography>
                                )}
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Stats */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={4} md={2.4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: '#006a61', fontWeight: 600 }}>
                                    {expertise.publications}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                                    Publications
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={2.4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: '#006a61', fontWeight: 600 }}>
                                    {expertise.thesesSoutenues}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                                    Thèses soutenues
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={2.4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: '#006a61', fontWeight: 600 }}>
                                    {expertise.thesesEncadrees}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                                    Thèses encadrées
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={2.4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: '#006a61', fontWeight: 600 }}>
                                    {expertise.brevets}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                                    Brevets
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4} md={2.4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ color: '#006a61', fontWeight: 600 }}>
                                    {expertise.interventionsPubliques}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)' }}>
                                    Interventions publiques
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Keywords */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {expertise.keywords.slice(0, 3).map((keyword, index) => (
                            <Chip
                                key={index}
                                label={keyword}
                                size="small"
                                sx={{
                                    backgroundColor: '#f3f4f6',
                                    fontSize: '0.75rem',
                                }}
                            />
                        ))}
                        {expertise.keywords.length > 3 && (
                            <Chip
                                label={`+${expertise.keywords.length - 3}`}
                                size="small"
                                sx={{
                                    backgroundColor: '#e5e7eb',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                }}
                            />
                        )}
                    </Box>

                    <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'rgba(0,0,0,0.5)' }}>
                        Dernière mise à jour : {new Date(expertise.lastUpdate).toLocaleDateString('fr-FR')}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

