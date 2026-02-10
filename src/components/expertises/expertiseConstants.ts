import {
    Brain,
    Atom,
    Leaf,
    TrendingUp,
    Globe,
    Users,
} from 'lucide-react';
import { ExpertiseCategory, GeographicZone } from '../../types/expertise';

export const categories: ExpertiseCategory[] = [
    { name: 'Intelligence Artificielle', icon: Brain, color: '#3b82f6' },
    { name: 'Physique Quantique', icon: Atom, color: '#8b5cf6' },
    { name: 'Développement Durable', icon: Leaf, color: '#10b981' },
    { name: 'Économie', icon: TrendingUp, color: '#f59e0b' },
    { name: 'Relations Internationales', icon: Globe, color: '#06b6d4' },
    { name: 'Sciences Sociales', icon: Users, color: '#ec4899' },
];

export const countries: GeographicZone[] = [
    { name: 'France', code: 'FR', type: 'country' },
    { name: 'Japon', code: 'JP', type: 'country' },
    { name: 'États-Unis', code: 'US', type: 'country' },
    { name: 'Royaume-Uni', code: 'GB', type: 'country' },
    { name: 'Allemagne', code: 'DE', type: 'country' },
    { name: 'Burkina Faso', code: 'BF', type: 'country' },
    { name: 'Sénégal', code: 'SN', type: 'country' },
    { name: 'Mali', code: 'ML', type: 'country' },
];

export const geopoliticalZones: GeographicZone[] = [
    { name: 'Union Européenne', type: 'geopolitical' },
    { name: 'OTAN', type: 'geopolitical' },
    { name: 'Mercosur', type: 'geopolitical' },
    { name: 'Pays du Sud', type: 'geopolitical' },
    { name: 'Afrique Subsaharienne', type: 'geopolitical' },
    { name: 'Asie du Sud-Est', type: 'geopolitical' },
];

export const physicalZones: GeographicZone[] = [
    { name: 'Arctique', type: 'physical' },
    { name: 'Méditerranée', type: 'physical' },
    { name: 'Zone intertropicale', type: 'physical' },
    { name: 'Milieu urbain', type: 'physical' },
    { name: 'Zone rurale', type: 'physical' },
    { name: 'Zone côtière', type: 'physical' },
];

export const allGeographicOptions = [...countries, ...geopoliticalZones, ...physicalZones];

export const temporalPeriods = [
    { label: 'Préhistoire', value: 'prehistoire' },
    { label: 'Antiquité', value: 'antiquite' },
    { label: 'Moyen Âge', value: 'moyenage' },
    { label: 'Époque moderne', value: 'moderne' },
    { label: 'Époque contemporaine', value: 'contemporaine' },
    { label: 'Années 1990', value: '1990s' },
    { label: 'Années 2000', value: '2000s' },
    { label: 'Années 2010', value: '2010s' },
    { label: 'Actuel (2020-2030)', value: 'actuel' },
    { label: 'Prospectif', value: 'prospectif' },
    { label: 'Personnalisé', value: 'custom' },
];
