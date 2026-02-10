import { useState } from 'react';
import {
    ArrowLeft,
    Save,
    RefreshCw,
    Mail,
    Building,
    ExternalLink,
    Check
} from 'lucide-react';
import {
    Box,
    Typography,

    TextField,
    Button,
    Tabs,
    Tab,
    Paper,
    Grid,
    Chip,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

interface ComparisonRowProps {
    label: string;
    localValue: string;
    externalValue: string;
    onUpdate: (value: string) => void;
}

const ComparisonRow = ({ label, localValue, externalValue, onUpdate }: ComparisonRowProps) => {
    const hasDiff = localValue !== externalValue;

    return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>{label}</TableCell>
            <TableCell>{localValue || <span className="text-gray-400 italic">Non renseigné</span>}</TableCell>
            <TableCell sx={{ color: hasDiff ? '#ED6C02' : 'inherit', fontWeight: hasDiff ? 600 : 400 }}>
                {externalValue}
            </TableCell>
            <TableCell align="right">
                {hasDiff && (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onUpdate(externalValue)}
                        sx={{ color: '#006a61', borderColor: '#006a61', textTransform: 'none' }}
                    >
                        Mettre à jour
                    </Button>
                )}
                {!hasDiff && <Check size={18} className="text-green-600 ml-auto" />}
            </TableCell>
        </TableRow>
    );
};

export default function PersonnelDetail() {
    const navigate = useNavigate();
    useParams(); // Removed 'id' as it's unused
    const [activeTab, setActiveTab] = useState(0);

    // Mock data for the researcher
    const [researcher, setResearcher] = useState({
        firstName: 'Pierre',
        lastName: 'Janin',
        email: 'pierre.janin@ird.fr',
        professionalEmail: 'pierre.janin@univ-nantes.fr',
        status: 'Validé',
        type: 'chercheur',
        employer: 'CNRS',
        affiliation: 'LPED',
        arrivalDate: '2015-09-01',
        idref: '123456789',
        orcid: '0000-0002-1825-0097',
        hal: 'pierre-janin',
        birthDate: '1970-05-15',
        rank: 'Directeur de recherche'
    });

    // Mock external data for comparison (e.g. from ORCID)
    const orcidData = {
        firstName: 'Pierre',
        lastName: 'Janin',
        orcid: '0000-0002-1825-0097',
        rank: 'Directeur de recherche CNRS',
        affiliation: 'Laboratoire Population Environnement Développement'
    };

    const handleUpdateField = (field: string, value: string) => {
        setResearcher({ ...researcher, [field]: value });
    };

    return (
        <div className="min-h-screen p-6 bg-[#F5F7F6]">
            <div className="max-w-[1200px] mx-auto">
                {/* Back button and profile header */}
                <Button
                    onClick={() => navigate('/personnel')}
                    startIcon={<ArrowLeft size={18} />}
                    sx={{ mb: 4, color: '#006a61', textTransform: 'none' }}
                >
                    Retour à la liste
                </Button>

                <div className="flex items-start gap-6 mb-8">
                    <Avatar
                        sx={{ width: 100, height: 100, bgcolor: '#006a61', fontSize: '2.5rem' }}
                    >
                        PJ
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-[#00201D] m-0">
                                {researcher.firstName} {researcher.lastName}
                            </h1>
                            <Chip
                                label={researcher.status}
                                size="small"
                                sx={{ bgcolor: '#E0F2F1', color: '#006a61', fontWeight: 600 }}
                            />
                        </div>
                        <p className="text-gray-600 text-lg mb-4">{researcher.type} • {researcher.affiliation}</p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Mail size={16} />
                                {researcher.professionalEmail}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Building size={16} />
                                {researcher.employer}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button variant="contained" startIcon={<Save size={18} />} sx={{ bgcolor: '#006a61', '&:hover': { bgcolor: '#005550' } }}>
                            Enregistrer
                        </Button>
                        <Button variant="outlined" startIcon={<RefreshCw size={18} />} sx={{ color: '#006a61', borderColor: '#006a61' }}>
                            Synchroniser tout
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <Paper sx={{ borderRadius: '12px', overflow: 'hidden', mb: 4 }}>
                    <Tabs
                        value={activeTab}
                        onChange={(_, v) => setActiveTab(v)}
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, minHeight: '64px' },
                            '& .Mui-selected': { color: '#006a61 !important' },
                            '& .MuiTabs-indicator': { backgroundColor: '#006a61' }
                        }}
                    >
                        <Tab label="Informations générales" />
                        <Tab label="Mise à jour IdRef" />
                        <Tab label="Mise à jour ORCID" />
                        <Tab label="Mise à jour HAL" />
                    </Tabs>

                    <Box sx={{ p: 4 }}>
                        {activeTab === 0 && (
                            <Grid container spacing={6}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#00201D' }}>Identité et contact</Typography>
                                        <div className="space-y-4">
                                            <TextField fullWidth label="Prénom" value={researcher.firstName} onChange={(e) => handleUpdateField('firstName', e.target.value)} />
                                            <TextField fullWidth label="Nom" value={researcher.lastName} onChange={(e) => handleUpdateField('lastName', e.target.value)} />
                                            <TextField fullWidth label="Email de contact" value={researcher.email} onChange={(e) => handleUpdateField('email', e.target.value)} />
                                            <TextField fullWidth label="Email professionnel" value={researcher.professionalEmail} onChange={(e) => handleUpdateField('professionalEmail', e.target.value)} />
                                            <TextField fullWidth label="Date de naissance" type="date" InputLabelProps={{ shrink: true }} value={researcher.birthDate} onChange={(e) => handleUpdateField('birthDate', e.target.value)} />
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#00201D' }}>Parcours et identifiants</Typography>
                                        <div className="space-y-4">
                                            <TextField fullWidth label="Grade / Corps" value={researcher.rank} onChange={(e) => handleUpdateField('rank', e.target.value)} />
                                            <TextField fullWidth label="Employeur" value={researcher.employer} onChange={(e) => handleUpdateField('employer', e.target.value)} />
                                            <TextField fullWidth label="Date d'arrivée dans la position" type="date" InputLabelProps={{ shrink: true }} value={researcher.arrivalDate} onChange={(e) => handleUpdateField('arrivalDate', e.target.value)} />
                                            <TextField
                                                fullWidth
                                                label="ORCID"
                                                value={researcher.orcid}
                                                onChange={(e) => handleUpdateField('orcid', e.target.value)}
                                                InputProps={{ endAdornment: <ExternalLink size={18} className="text-gray-400 cursor-pointer" /> }}
                                            />
                                            <TextField
                                                fullWidth
                                                label="IdRef"
                                                value={researcher.idref}
                                                onChange={(e) => handleUpdateField('idref', e.target.value)}
                                                InputProps={{ endAdornment: <ExternalLink size={18} className="text-gray-400 cursor-pointer" /> }}
                                            />
                                        </div>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}

                        {activeTab === 2 && (
                            <Box>
                                <Alert severity="info" sx={{ mb: 4 }}>
                                    Comparez les données locales avec celles de votre profil ORCID public.
                                </Alert>
                                <TableContainer>
                                    <Table>
                                        <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 600 }}>Champ</TableCell>
                                                <TableCell sx={{ fontWeight: 600 }}>SoVisu+</TableCell>
                                                <TableCell sx={{ fontWeight: 600 }}>ORCID</TableCell>
                                                <TableCell align="right" sx={{ fontWeight: 600 }}>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <ComparisonRow
                                                label="Prénom"
                                                localValue={researcher.firstName}
                                                externalValue={orcidData.firstName}
                                                onUpdate={(v) => handleUpdateField('firstName', v)}
                                            />
                                            <ComparisonRow
                                                label="Nom"
                                                localValue={researcher.lastName}
                                                externalValue={orcidData.lastName}
                                                onUpdate={(v) => handleUpdateField('lastName', v)}
                                            />
                                            <ComparisonRow
                                                label="Grade / Fonction"
                                                localValue={researcher.rank}
                                                externalValue={orcidData.rank}
                                                onUpdate={(v) => handleUpdateField('rank', v)}
                                            />
                                            <ComparisonRow
                                                label="Appartenance"
                                                localValue={researcher.affiliation}
                                                externalValue={orcidData.affiliation}
                                                onUpdate={(v) => handleUpdateField('affiliation', v)}
                                            />
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="contained" sx={{ bgcolor: '#006a61' }}>
                                        Enrichir tout depuis ORCID
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {(activeTab === 1 || activeTab === 3) && (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <RefreshCw size={48} className="text-gray-300 mx-auto mb-4" />
                                <Typography variant="h6" color="textSecondary">Logique de comparaison similaire à l'onglet ORCID</Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    Cet onglet permettra de comparer et synchroniser les données avec {activeTab === 1 ? 'IdRef' : 'HAL'}.
                                </Typography>
                                <Button variant="outlined" sx={{ mt: 3, color: '#006a61', borderColor: '#006a61' }}>
                                    Lancer la comparaison
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </div>
        </div>
    );
}
