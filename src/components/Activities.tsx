import { useState } from 'react';
import {
  Plus,
  Calendar,
  Users,
  FileText,
  Lightbulb,
  Briefcase,
  BookOpen,
  Award,
  Megaphone,
  X,
  ChevronLeft,
  Link as LinkIcon,
  Edit,
  Trash2,
  GraduationCap
} from 'lucide-react';
import {
  SvpH1
} from './ui/SvpWrappers';

interface Activity {
  id: string;
  type: 'projet' | 'encadrement' | 'editorial' | 'brevet' | 'conference' | 'distinction' | 'mediation' | 'enseignement';
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
  url?: string;
  specificData?: any;
}

const activityTypes = [
  { id: 'tous', label: 'Tous', icon: FileText },
  { id: 'projet', label: 'Projets', icon: Briefcase },
  { id: 'encadrement', label: 'Encadrement', icon: Users },
  { id: 'editorial', label: 'Éditorial', icon: BookOpen },
  { id: 'brevet', label: 'Brevets', icon: Lightbulb },
  { id: 'conference', label: 'Conférences', icon: Megaphone },
  { id: 'distinction', label: 'Distinctions', icon: Award },
  { id: 'mediation', label: 'Médiation', icon: FileText },
  { id: 'enseignement', label: 'Enseignement', icon: GraduationCap },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'projet',
    title: 'Projet ANR DeepLearning4Science',
    startDate: '2023-01-15',
    endDate: '2025-12-31',
    description: 'Développement de méthodes d\'apprentissage profond pour l\'analyse de données scientifiques massives.',
    url: 'https://anr.fr/projet-ANR-20-CE23-0001',
    specificData: { budget: '450 000 €', role: 'Coordinateur' }
  },
  {
    id: '2',
    type: 'encadrement',
    title: 'Thèse de Marie Dupont',
    startDate: '2022-10-01',
    endDate: '2025-09-30',
    description: 'Optimisation des algorithmes de traitement d\'images par intelligence artificielle.',
    specificData: { student: 'Marie Dupont', level: 'PhD', percentage: '50%' }
  },
  {
    id: '3',
    type: 'brevet',
    title: 'Système d\'analyse automatisée pour la détection précoce',
    startDate: '2024-03-15',
    description: 'Brevet déposé pour un système innovant utilisant l\'IA pour la détection précoce de pathologies.',
    specificData: { number: 'FR2024001234', status: 'En cours d\'examen' }
  },
  {
    id: '4',
    type: 'distinction',
    title: 'Prix jeune chercheur - Société Française d\'IA',
    startDate: '2024-06-10',
    description: 'Récompense pour contributions exceptionnelles dans le domaine de l\'apprentissage automatique.',
    specificData: { organization: 'SFIA' }
  },
  {
    id: '5',
    type: 'conference',
    title: 'Conférence invitée - NeurIPS 2024',
    startDate: '2024-12-10',
    description: 'Présentation invitée sur les avancées récentes en apprentissage par renforcement.',
    url: 'https://neurips.cc',
    specificData: { location: 'Vancouver, Canada', type: 'Invited talk' }
  },
  {
    id: '6',
    type: 'enseignement',
    title: 'Intelligence Artificielle Avancée - Master 2',
    startDate: '2023-09-01',
    endDate: '2024-06-30',
    description: 'Cours magistral et travaux dirigés sur l\'apprentissage profond, les réseaux de neurones convolutifs et récurrents, avec projets appliqués sur des cas d\'usage réels.',
    specificData: {
      establishment: 'Université de Nantes',
      level: 'Master 2',
      hours: '48',
      courseType: 'Mixte',
      subject: 'Intelligence Artificielle Avancée'
    }
  },
];

export default function Activities() {
  const [selectedType, setSelectedType] = useState('tous');
  const [selectedYear, setSelectedYear] = useState<string>('tous');
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<'category' | 'form'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Activity>>({});
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const years = ['tous', '2024', '2023', '2022', '2021', '2020'];

  const filteredActivities = mockActivities.filter(activity => {
    const typeMatch = selectedType === 'tous' || activity.type === selectedType;
    const yearMatch = selectedYear === 'tous' || activity.startDate.startsWith(selectedYear);
    return typeMatch && yearMatch;
  });

  const getActivityIcon = (type: string) => {
    const activityType = activityTypes.find(t => t.id === type);
    return activityType?.icon || FileText;
  };

  const getActivityColor = (type: string) => {
    const colors: Record<string, string> = {
      projet: '#006a61',
      encadrement: '#0088cc',
      editorial: '#9b59b6',
      brevet: '#f39c12',
      conference: '#e74c3c',
      distinction: '#d4af37',
      mediation: '#16a085',
      enseignement: '#2ecc71',
    };
    return colors[type] || '#6c757d';
  };

  const handleAddActivity = () => {
    setShowWizard(true);
    setWizardStep('category');
    setSelectedCategory(null);
    setFormData({});
    setEditingActivity(null);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setShowWizard(true);
    setWizardStep('form');
    setSelectedCategory(activity.type);
    setFormData(activity);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setWizardStep('form');
    // Si on est en mode édition, on garde les données existantes
    if (editingActivity) {
      setFormData({ ...editingActivity });
    } else {
      setFormData({ type: categoryId as any });
    }
  };

  const handleCloseWizard = () => {
    setShowWizard(false);
    setWizardStep('category');
    setSelectedCategory(null);
    setFormData({});
    setEditingActivity(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingActivity) {
      console.log('Modification de l\'activité:', formData);
      // Ici on modifierait l'activité dans la liste
    } else {
      console.log('Nouvelle activité:', formData);
      // Ici on ajouterait l'activité à la liste
    }
    handleCloseWizard();
  };

  const renderSpecificFields = () => {
    if (!selectedCategory) return null;

    switch (selectedCategory) {
      case 'projet':
        return (
          <>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Budget</label>
              <input
                type="text"
                value={formData.specificData?.budget || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                placeholder="ex: 450 000 €"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, budget: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Rôle</label>
              <select
                value={formData.specificData?.role || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, role: e.target.value }
                })}
              >
                <option value="">Sélectionner...</option>
                <option value="Coordinateur">Coordinateur</option>
                <option value="Participant">Participant</option>
                <option value="Responsable de tâche">Responsable de tâche</option>
              </select>
            </div>
          </>
        );
      case 'encadrement':
        return (
          <>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Nom de l'étudiant</label>
              <input
                type="text"
                value={formData.specificData?.student || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                placeholder="ex: Marie Dupont"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, student: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Niveau</label>
              <select
                value={formData.specificData?.level || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, level: e.target.value }
                })}
              >
                <option value="">Sélectionner...</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
                <option value="Post-doc">Post-doc</option>
                <option value="Stage">Stage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Pourcentage d'encadrement</label>
              <input
                type="text"
                value={formData.specificData?.percentage || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                placeholder="ex: 50%"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, percentage: e.target.value }
                })}
              />
            </div>
          </>
        );
      case 'brevet':
        return (
          <>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Numéro de dépôt</label>
              <input
                type="text"
                value={formData.specificData?.number || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                placeholder="ex: FR2024001234"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, number: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Statut</label>
              <select
                value={formData.specificData?.status || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, status: e.target.value }
                })}
              >
                <option value="">Sélectionner...</option>
                <option value="Déposé">Déposé</option>
                <option value="En cours d'examen">En cours d'examen</option>
                <option value="Délivré">Délivré</option>
                <option value="Rejeté">Rejeté</option>
              </select>
            </div>
          </>
        );
      case 'conference':
        return (
          <>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Lieu</label>
              <input
                type="text"
                value={formData.specificData?.location || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                placeholder="ex: Paris, France"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, location: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Type d'intervention</label>
              <select
                value={formData.specificData?.type || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, type: e.target.value }
                })}
              >
                <option value="">Sélectionner...</option>
                <option value="Invited talk">Invited talk</option>
                <option value="Keynote">Keynote</option>
                <option value="Présentation">Présentation</option>
                <option value="Poster">Poster</option>
              </select>
            </div>
          </>
        );
      case 'enseignement':
        return (
          <>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Établissement *</label>
              <input
                type="text"
                value={formData.specificData?.establishment || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                placeholder="ex: Université de Nantes"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, establishment: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Niveau *</label>
              <select
                value={formData.specificData?.level || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, level: e.target.value }
                })}
              >
                <option value="">Sélectionner...</option>
                <option value="Licence 1">Licence 1</option>
                <option value="Licence 2">Licence 2</option>
                <option value="Licence 3">Licence 3</option>
                <option value="Master 1">Master 1</option>
                <option value="Master 2">Master 2</option>
                <option value="Doctorat">Doctorat</option>
                <option value="Formation continue">Formation continue</option>
                <option value="École d'ingénieurs">École d'ingénieurs</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Volume horaire (heures)</label>
                <input
                  type="number"
                  value={formData.specificData?.hours || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                  placeholder="ex: 48"
                  onChange={(e) => setFormData({
                    ...formData,
                    specificData: { ...formData.specificData, hours: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Type de cours</label>
                <select
                  value={formData.specificData?.courseType || ''}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                  onChange={(e) => setFormData({
                    ...formData,
                    specificData: { ...formData.specificData, courseType: e.target.value }
                  })}
                >
                  <option value="">Sélectionner...</option>
                  <option value="CM">CM (Cours Magistral)</option>
                  <option value="TD">TD (Travaux Dirigés)</option>
                  <option value="TP">TP (Travaux Pratiques)</option>
                  <option value="Mixte">Mixte (CM/TD/TP)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">Matière / UE</label>
              <input
                type="text"
                value={formData.specificData?.subject || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                placeholder="ex: Intelligence Artificielle Avancée"
                onChange={(e) => setFormData({
                  ...formData,
                  specificData: { ...formData.specificData, subject: e.target.value }
                })}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <SvpH1 sx={{ mb: 2 }}>
              Activités
            </SvpH1>
            <p className="text-gray-600" style={{ fontSize: '0.875rem' }}>
              Gérez vos projets, encadrements, et autres activités scientifiques
            </p>
          </div>
          <button
            onClick={handleAddActivity}
            className="flex items-center gap-2 px-6 py-3 bg-[#006a61] text-white rounded-lg hover:bg-[#005550] transition-colors"
            style={{
              textTransform: 'none',
              borderRadius: '8px',
              fontSize: '0.9375rem'
            }}
          >
            <Plus className="size-5" />
            Ajouter une activité
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            {/* Type filters */}
            <div className="flex flex-wrap gap-2">
              {activityTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${selectedType === type.id
                      ? 'bg-[#006a61] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    <Icon className="size-4" />
                    <span className="text-sm">{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Year filter */}
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year === 'tous' ? 'Toutes les années' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Activities count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredActivities.length} activité{filteredActivities.length > 1 ? 's' : ''} trouvée{filteredActivities.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Activities list */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const color = getActivityColor(activity.type);

            return (
              <div
                key={activity.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                style={{ borderLeft: `4px solid ${color}` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div
                        className="size-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon className="size-6" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-gray-900">{activity.title}</h3>
                          <span
                            className="px-3 py-1 rounded-full text-xs text-white"
                            style={{ backgroundColor: color }}
                          >
                            {activityTypes.find(t => t.id === activity.type)?.label}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{activity.description}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="size-4" />
                            <span>
                              {new Date(activity.startDate).toLocaleDateString('fr-FR')}
                              {activity.endDate && ` - ${new Date(activity.endDate).toLocaleDateString('fr-FR')}`}
                            </span>
                          </div>
                          {activity.url && (
                            <a
                              href={activity.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-[#006a61] hover:underline"
                            >
                              <LinkIcon className="size-4" />
                              Lien externe
                            </a>
                          )}
                        </div>
                        {activity.specificData && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex flex-wrap gap-4 text-sm">
                              {Object.entries(activity.specificData as Record<string, any>).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2">
                                  <span className="text-gray-500 capitalize">{key}:</span>
                                  <span className="text-gray-900">{String(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditActivity(activity)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="size-5" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <FileText className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">Aucune activité trouvée</h3>
            <p className="text-gray-600 mb-6">
              Commencez par ajouter votre première activité de recherche
            </p>
            <button
              onClick={handleAddActivity}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#006a61] text-white rounded-lg hover:bg-[#005550] transition-colors"
            >
              <Plus className="size-5" />
              Ajouter une activité
            </button>
          </div>
        )}
      </div>

      {/* Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {wizardStep === 'form' && (
                  <button
                    onClick={() => setWizardStep('category')}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                )}
                <h2 className="text-gray-900">
                  {wizardStep === 'category'
                    ? 'Choisir le type d\'activité'
                    : editingActivity
                      ? 'Modifier l\'activité'
                      : 'Ajouter une activité'
                  }
                </h2>
              </div>
              <button
                onClick={handleCloseWizard}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {wizardStep === 'category' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activityTypes.filter(t => t.id !== 'tous').map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => handleCategorySelect(type.id)}
                        className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-[#006a61] hover:bg-[#006a6108] transition-colors"
                      >
                        <div className="size-16 rounded-full bg-[#006a6115] flex items-center justify-center">
                          <Icon className="size-8 text-[#006a61]" />
                        </div>
                        <span className="text-gray-900">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Common fields */}
                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Titre / Nom de l'activité *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                      placeholder="ex: Projet ANR DeepLearning4Science"
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">Date de début *</label>
                      <input
                        type="date"
                        required
                        value={formData.startDate || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2 text-gray-700">Date de fin</label>
                      <input
                        type="date"
                        value={formData.endDate || ''}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">Description *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                      placeholder="Décrivez l'activité..."
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">URL</label>
                    <input
                      type="url"
                      value={formData.url || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                      placeholder="https://..."
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                  </div>

                  {/* Specific fields based on category */}
                  {renderSpecificFields()}

                  <div>
                    <label className="block text-sm mb-2 text-gray-700">
                      Chercheurs associés (tags)
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                      placeholder="Rechercher des chercheurs..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Tapez pour rechercher et ajouter des chercheurs de votre laboratoire
                    </p>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCloseWizard}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#006a61] text-white rounded-lg hover:bg-[#005550] transition-colors"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}