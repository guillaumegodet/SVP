import { useState, useMemo } from 'react';
import {
    Search,
    Plus,
    Download,
    RefreshCw,
    X,
    MoreVertical,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import {
    Button,
    Chip,
    IconButton,
    Checkbox
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    SvpH1
} from './ui/SvpWrappers';

type ResearcherType = 'Enseignant-chercheur' | 'chercheur' | 'doctorant' | 'post-doctorant' | 'personnel d\'appui' | 'associé / invité';
type ResearcherStatus = 'Validé' | 'Anticipé' | 'Parti';

interface Researcher {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    type: ResearcherType;
    status: ResearcherStatus;
    employer: string;
    affiliation: string;
    team: string;
    group: string;
}

const mockResearchers: Researcher[] = [
    {
        id: '1',
        name: 'Pierre Janin',
        firstName: 'Pierre',
        lastName: 'Janin',
        type: 'chercheur',
        status: 'Validé',
        employer: 'CNRS',
        affiliation: 'LPED',
        team: 'Axe 1',
        group: 'Sécurité alimentaire'
    },
    {
        id: '2',
        name: 'Estella Fourat',
        firstName: 'Estella',
        lastName: 'Fourat',
        type: 'Enseignant-chercheur',
        status: 'Validé',
        employer: 'Nantes Université',
        affiliation: 'CEISAM',
        team: 'Équipe Chimie',
        group: 'Synthèse'
    },
    {
        id: '3',
        name: 'Guillaume Godet',
        firstName: 'Guillaume',
        lastName: 'Godet',
        type: 'personnel d\'appui',
        status: 'Validé',
        employer: 'Nantes Université',
        affiliation: 'PHAN',
        team: 'Support',
        group: 'IT'
    },
    {
        id: '4',
        name: 'Jean Dupont',
        firstName: 'Jean',
        lastName: 'Dupont',
        type: 'doctorant',
        status: 'Anticipé',
        employer: 'Centrale Nantes',
        affiliation: 'LS2N',
        team: 'Robotique',
        group: 'Contrôle'
    }
];

export default function PersonnelRecherche() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [employerFilter, setEmployerFilter] = useState('all');
    const [affiliationFilter, setAffiliationFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [sortBy, setSortBy] = useState<'name' | 'type' | 'status'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const filteredResearchers = useMemo(() => {
        return mockResearchers.filter(r => {
            const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
            const matchesEmployer = employerFilter === 'all' || r.employer === employerFilter;
            const matchesAffiliation = affiliationFilter === 'all' || r.affiliation === affiliationFilter;
            const matchesType = typeFilter === 'all' || r.type === typeFilter;
            return matchesSearch && matchesStatus && matchesEmployer && matchesAffiliation && matchesType;
        }).sort((a, b) => {
            const fieldA = a[sortBy].toLowerCase();
            const fieldB = b[sortBy].toLowerCase();
            if (sortDirection === 'asc') return fieldA.localeCompare(fieldB);
            return fieldB.localeCompare(fieldA);
        });
    }, [searchTerm, statusFilter, employerFilter, affiliationFilter, typeFilter, sortBy, sortDirection]);

    const handleSort = (field: 'name' | 'type' | 'status') => {
        if (sortBy === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="min-h-screen p-6 bg-[#F5F7F6]">
            <div className="max-w-[1600px] mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <SvpH1>
                            Personnel de recherche
                        </SvpH1>
                        <p className="text-sm mt-1 text-gray-500">
                            Gestion et suivi des chercheurs et personnels de la structure
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outlined"
                            startIcon={<Download size={18} />}
                            sx={{ color: '#006a61', borderColor: '#006a61', textTransform: 'none', borderRadius: '20px' }}
                        >
                            Export CSV
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshCw size={18} />}
                            sx={{ color: '#006a61', borderColor: '#006a61', textTransform: 'none', borderRadius: '20px' }}
                        >
                            Synchroniser
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Plus size={18} />}
                            sx={{ bgcolor: '#006a61', color: 'white', textTransform: 'none', borderRadius: '20px', '&:hover': { bgcolor: '#005550' } }}
                        >
                            Ajouter un chercheur
                        </Button>
                    </div>
                </div>

                {/* Table View */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Filters */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex-1 min-w-[300px]">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un chercheur..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent"
                                    />
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            <X className="size-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] text-sm"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="Validé">Validé</option>
                                <option value="Anticipé">Anticipé</option>
                                <option value="Parti">Parti</option>
                            </select>

                            <select
                                value={employerFilter}
                                onChange={(e) => setEmployerFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] text-sm"
                            >
                                <option value="all">Tous les employeurs</option>
                                <option value="Nantes Université">Nantes Université</option>
                                <option value="CNRS">CNRS</option>
                                <option value="Centrale Nantes">Centrale Nantes</option>
                                <option value="Le Mans Université">Le Mans Université</option>
                            </select>

                            <select
                                value={affiliationFilter}
                                onChange={(e) => setAffiliationFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] text-sm"
                            >
                                <option value="all">Toutes les appartenances</option>
                                <option value="CEISAM">CEISAM</option>
                                <option value="LS2N">LS2N</option>
                                <option value="MIP">MIP</option>
                                <option value="PHAN">PHAN</option>
                                <option value="LPED">LPED</option>
                            </select>

                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] text-sm"
                            >
                                <option value="all">Tous les types</option>
                                <option value="Enseignant-chercheur">Enseignant-chercheur</option>
                                <option value="chercheur">Chercheur</option>
                                <option value="doctorant">Doctorant</option>
                                <option value="post-doctorant">Post-doctorant</option>
                                <option value="personnel d'appui">Personnel d'appui</option>
                                <option value="associé / invité">Associé / Invité</option>
                            </select>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                            <span className="font-medium text-gray-900">{filteredResearchers.length}</span> chercheur{filteredResearchers.length > 1 ? 's' : ''} trouvé{filteredResearchers.length > 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="w-12 p-4"><Checkbox size="small" /></th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                                        <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-[#006a61]">
                                            Nom et type
                                            {sortBy === 'name' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                                        </button>
                                    </th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">
                                        <button onClick={() => handleSort('status')} className="flex items-center gap-1 hover:text-[#006a61]">
                                            Statut
                                            {sortBy === 'status' && (sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                                        </button>
                                    </th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Employeur</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Appartenance</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Équipe</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Groupe</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredResearchers.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4"><Checkbox size="small" /></td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span
                                                    className="text-[#006a61] font-medium hover:underline cursor-pointer"
                                                    onClick={() => navigate(`/personnel/${r.id}`)}
                                                >
                                                    {r.name}
                                                </span>
                                                <span className="text-xs text-gray-500">{r.type}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Chip
                                                label={r.status}
                                                size="small"
                                                sx={{
                                                    bgcolor: r.status === 'Validé' ? '#E0F2F1' : r.status === 'Anticipé' ? '#FFF4E5' : '#F3F4F6',
                                                    color: r.status === 'Validé' ? '#006a61' : r.status === 'Anticipé' ? '#ED6C02' : '#6B7280',
                                                    fontWeight: 500,
                                                    fontSize: '0.75rem'
                                                }}
                                            />
                                        </td>
                                        <td className="p-4 text-sm text-gray-700">{r.employer}</td>
                                        <td className="p-4 text-sm text-gray-700">{r.affiliation}</td>
                                        <td className="p-4 text-sm text-gray-700">{r.team}</td>
                                        <td className="p-4 text-sm text-gray-700">{r.group}</td>
                                        <td className="p-4">
                                            <IconButton size="small">
                                                <MoreVertical size={18} />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
