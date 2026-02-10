import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Box,
    Typography,
    Avatar,
} from '@mui/material';
import {
    Brain,
    BookOpen,
    Award,
    GraduationCap,
} from 'lucide-react';
import { Expertise } from '../../types/expertise';

interface ExpertiseStatsProps {
    expertises: Expertise[];
}

export default function ExpertiseStats({ expertises }: ExpertiseStatsProps) {
    const totalExpertises = expertises.length;
    const expertLevel = expertises.filter(e => e.level === 'reference' || e.level === 'recherche').length;
    const totalPublications = expertises.reduce((sum, e) => sum + e.publications, 0);
    const totalTheses = expertises.reduce((sum, e) => sum + e.thesesEncadrees, 0);

    return (
        <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ backgroundColor: '#6b7280', width: 48, height: 48 }}>
                                <Brain size={24} />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" sx={{ color: '#374151', fontWeight: 600 }}>
                                    {totalExpertises}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#374151' }}>
                                    Expertises totales
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ backgroundColor: '#10b981', width: 48, height: 48 }}>
                                <Award size={24} />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" sx={{ color: '#059669', fontWeight: 600 }}>
                                    {expertLevel}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#059669' }}>
                                    Niveau expert+
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ backgroundColor: '#3b82f6', width: 48, height: 48 }}>
                                <BookOpen size={24} />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" sx={{ color: '#1e40af', fontWeight: 600 }}>
                                    {totalPublications}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#1e40af' }}>
                                    Publications liées
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#fdf4ff', border: '1px solid #f0abfc' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ backgroundColor: '#a855f7', width: 48, height: 48 }}>
                                <GraduationCap size={24} />
                            </Avatar>
                            <Box>
                                <Typography variant="h4" sx={{ color: '#7e22ce', fontWeight: 600 }}>
                                    {totalTheses}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#7e22ce' }}>
                                    Thèses encadrées
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
