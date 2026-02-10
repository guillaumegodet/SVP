import React, { useState } from 'react';
import {
  CloudUpload,
  X,
  ChevronRight,
  ChevronLeft,
  FileText,
  Trash2,
  Plus,
  AlertCircle,
  Upload,
  CheckCircle,
  Info
} from 'lucide-react';

interface Publication {
  title: string;
  authors: string;
  date: string;
  status: string;
  statusType: string;
  source: string;
  type: string;
  abstract: string;
  openAccessStatus?: string;
  history: any[];
}

interface HalDepositDialogProps {
  open: boolean;
  onClose: () => void;
  publication: Publication | null;
}

interface Author {
  name: string;
  affiliation: string;
}

const steps = ['Fichier PDF', 'Métadonnées', 'Fichiers annexes', 'Authentification', 'Récapitulatif'];

const halDomains = [
  { value: 'cs', label: 'Informatique [cs]' },
  { value: 'cs.AI', label: 'Intelligence Artificielle [cs.AI]' },
  { value: 'math', label: 'Mathématiques [math]' },
  { value: 'math.PR', label: 'Probabilités [math.PR]' },
  { value: 'shs', label: 'Sciences de l\'Homme et Société [shs]' },
  { value: 'shs.eco', label: 'Économie [shs.eco]' },
  { value: 'shs.socio', label: 'Sociologie [shs.socio]' },
  { value: 'sde', label: 'Sciences de l\'environnement [sde]' },
  { value: 'sdv', label: 'Sciences du Vivant [sdv]' },
  { value: 'phys', label: 'Physique [phys]' }
];

export default function HalDepositDialog({ open, onClose, publication }: HalDepositDialogProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [complementaryFiles, setComplementaryFiles] = useState<File[]>([]);
  const [halError, setHalError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [halMetadata, setHalMetadata] = useState({
    title: publication?.title || '',
    abstract: publication?.abstract || '',
    authors: [{ name: '', affiliation: '' }] as Author[],
    documentType: publication?.type || 'ART',
    halDomains: [] as string[],
    language: 'fr',
    productionDate: '',
    license: 'cc-by'
  });

  const [halToken, setHalToken] = useState('');

  React.useEffect(() => {
    if (publication) {
      setHalMetadata(prev => ({
        ...prev,
        title: publication.title,
        abstract: publication.abstract,
        documentType: publication.type
      }));
    }
  }, [publication]);

  const handleClose = () => {
    setActiveStep(0);
    setPdfFile(null);
    setComplementaryFiles([]);
    setHalError(null);
    setHalMetadata({
      title: '',
      abstract: '',
      authors: [{ name: '', affiliation: '' }],
      documentType: 'ART',
      halDomains: [],
      language: 'fr',
      productionDate: '',
      license: 'cc-by'
    });
    setHalToken('');
    onClose();
  };

  const handleNext = () => {
    // Validation
    if (activeStep === 0 && !pdfFile) {
      setHalError('Veuillez sélectionner un fichier PDF');
      return;
    }
    if (activeStep === 1) {
      if (!halMetadata.title || !halMetadata.abstract || halMetadata.halDomains.length === 0) {
        setHalError('Veuillez remplir tous les champs obligatoires');
        return;
      }
    }
    if (activeStep === 3 && !halToken) {
      setHalError('Veuillez entrer votre token HAL');
      return;
    }

    setHalError(null);

    if (activeStep === steps.length - 1) {
      // Submit
      setIsUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            handleClose();
            alert('Dépôt HAL effectué avec succès !');
          }, 500);
        }
      }, 200);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePdfFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setPdfFile(file);
        setHalError(null);
      } else {
        setHalError('Le fichier doit être au format PDF');
      }
    }
  };

  const handleComplementaryFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setComplementaryFiles([...complementaryFiles, ...files]);
  };

  const addAuthor = () => {
    setHalMetadata({
      ...halMetadata,
      authors: [...halMetadata.authors, { name: '', affiliation: '' }]
    });
  };

  const removeAuthor = (index: number) => {
    setHalMetadata({
      ...halMetadata,
      authors: halMetadata.authors.filter((_, i) => i !== index)
    });
  };

  const updateAuthor = (index: number, field: 'name' | 'affiliation', value: string) => {
    const newAuthors = [...halMetadata.authors];
    newAuthors[index][field] = value;
    setHalMetadata({ ...halMetadata, authors: newAuthors });
  };

  const toggleDomain = (domain: string) => {
    const domains = halMetadata.halDomains.includes(domain)
      ? halMetadata.halDomains.filter(d => d !== domain)
      : [...halMetadata.halDomains, domain];
    setHalMetadata({ ...halMetadata, halDomains: domains });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#006a61] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CloudUpload className="size-6" />
            <div>
              <h2 className="text-xl">Dépôt sur HAL</h2>
              <p className="text-sm text-[#9ef2e6] mt-1">
                {publication?.title.substring(0, 60)}...
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isUploading}
            className="p-2 hover:bg-[#005550] rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`size-10 rounded-full flex items-center justify-center transition-colors ${
                      index < activeStep
                        ? 'bg-green-500 text-white'
                        : index === activeStep
                        ? 'bg-[#006a61] text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {index < activeStep ? (
                      <CheckCircle className="size-5" />
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-xs mt-2 text-center max-w-[80px]">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      index < activeStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {halError && (
          <div className="mx-6 mt-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-900">
                  <strong>Erreur HAL</strong>
                </p>
                <p className="text-sm text-red-800 mt-1">{halError}</p>
              </div>
              <button onClick={() => setHalError(null)} className="text-red-600 hover:text-red-800">
                <X className="size-4" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 0: PDF Upload */}
          {activeStep === 0 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg mb-2">Fichier PDF principal</h3>
                <p className="text-sm text-gray-600">
                  HAL impose que le fichier principal déposé soit au format PDF.
                </p>
              </div>

              {!pdfFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#006a61] transition-colors">
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handlePdfFileChange}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center gap-4">
                    <div className="size-20 bg-[#006a61] bg-opacity-10 rounded-full flex items-center justify-center">
                      <CloudUpload className="size-10 text-[#006a61]" />
                    </div>
                    <div>
                      <p className="text-gray-700 mb-1">Cliquez pour sélectionner un fichier PDF</p>
                      <p className="text-sm text-gray-500">ou glissez-déposez votre fichier ici</p>
                    </div>
                    <button
                      type="button"
                      className="px-6 py-2 bg-[#006a61] text-white rounded-lg hover:bg-[#005550] transition-colors"
                    >
                      Parcourir
                    </button>
                  </label>
                </div>
              ) : (
                <div className="bg-[#f1f8f6] border border-[#006a61] rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="size-16 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="size-8 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{pdfFile.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => setPdfFile(null)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Info className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="mb-1"><strong>Vérifications effectuées</strong></p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1">
                      <li>Format PDF validé</li>
                      <li>Taille du fichier acceptable (max 100 MB)</li>
                      <li>Le fichier doit être lisible et non corrompu</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Metadata */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-2">Métadonnées obligatoires</h3>
                <p className="text-sm text-gray-600">
                  HAL requiert un ensemble minimal de métadonnées pour le dépôt.
                </p>
              </div>

              <div>
                <label className="block text-sm mb-2">Titre *</label>
                <input
                  type="text"
                  value={halMetadata.title}
                  onChange={(e) => setHalMetadata({ ...halMetadata, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Résumé *</label>
                <textarea
                  value={halMetadata.abstract}
                  onChange={(e) => setHalMetadata({ ...halMetadata, abstract: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm">Auteurs *</label>
                  <button
                    onClick={addAuthor}
                    className="flex items-center gap-1 text-sm text-[#006a61] hover:underline"
                  >
                    <Plus className="size-4" />
                    Ajouter un auteur
                  </button>
                </div>
                <div className="space-y-3">
                  {halMetadata.authors.map((author, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nom de l'auteur"
                        value={author.name}
                        onChange={(e) => updateAuthor(idx, 'name', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Affiliation"
                        value={author.affiliation}
                        onChange={(e) => updateAuthor(idx, 'affiliation', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent"
                      />
                      {halMetadata.authors.length > 1 && (
                        <button
                          onClick={() => removeAuthor(idx)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Type de document *</label>
                  <select
                    value={halMetadata.documentType}
                    onChange={(e) => setHalMetadata({ ...halMetadata, documentType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent"
                  >
                    <option value="ART">Article</option>
                    <option value="COMM">Communication</option>
                    <option value="THESE">Thèse</option>
                    <option value="HDR">HDR</option>
                    <option value="OUV">Ouvrage</option>
                    <option value="COUV">Chapitre d'ouvrage</option>
                    <option value="DOUV">Direction d'ouvrage</option>
                    <option value="OTHER">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Langue *</label>
                  <select
                    value={halMetadata.language}
                    onChange={(e) => setHalMetadata({ ...halMetadata, language: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent"
                  >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                    <option value="es">Espagnol</option>
                    <option value="de">Allemand</option>
                    <option value="it">Italien</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Domaines HAL *</label>
                <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto space-y-2">
                  {halDomains.map((domain) => (
                    <label key={domain.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={halMetadata.halDomains.includes(domain.value)}
                        onChange={() => toggleDomain(domain.value)}
                        className="size-4 text-[#006a61] rounded focus:ring-[#006a61]"
                      />
                      <span className="text-sm">{domain.label}</span>
                    </label>
                  ))}
                </div>
                {halMetadata.halDomains.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    {halMetadata.halDomains.length} domaine(s) sélectionné(s)
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Date de production *</label>
                  <input
                    type="date"
                    value={halMetadata.productionDate}
                    onChange={(e) => setHalMetadata({ ...halMetadata, productionDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Licence de diffusion *</label>
                  <select
                    value={halMetadata.license}
                    onChange={(e) => setHalMetadata({ ...halMetadata, license: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent"
                  >
                    <option value="cc-by">CC BY - Attribution</option>
                    <option value="cc-by-sa">CC BY-SA - Attribution, Partage</option>
                    <option value="cc-by-nd">CC BY-ND - Attribution, Pas de modification</option>
                    <option value="cc-by-nc">CC BY-NC - Attribution, Pas d'usage commercial</option>
                    <option value="cc-by-nc-sa">CC BY-NC-SA - Attribution, Pas d'usage commercial, Partage</option>
                    <option value="cc-by-nc-nd">CC BY-NC-ND - Attribution, Pas d'usage commercial, Pas de modification</option>
                    <option value="cc0">CC0 - Domaine public</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Complementary Files */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg mb-2">Fichiers complémentaires (optionnel)</h3>
                <p className="text-sm text-gray-600">
                  Vous pouvez ajouter des fichiers complémentaires : sources LaTeX, images, annexes, jeux de données, scripts, etc.
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#006a61] transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleComplementaryFilesChange}
                  className="hidden"
                  id="complementary-upload"
                />
                <label htmlFor="complementary-upload" className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="size-12 bg-[#006a61] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Plus className="size-6 text-[#006a61]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 mb-1">Ajouter des fichiers complémentaires</p>
                    <p className="text-xs text-gray-500">Sources, annexes, données, etc.</p>
                  </div>
                </label>
              </div>

              {complementaryFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm">Fichiers ajoutés ({complementaryFiles.length})</h4>
                  {complementaryFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <FileText className="size-5 text-gray-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <button
                        onClick={() => setComplementaryFiles(complementaryFiles.filter((_, i) => i !== idx))}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  💡 <strong>Astuce :</strong> Cette étape est optionnelle. Vous pouvez passer directement à l'étape suivante si vous n'avez pas de fichiers complémentaires à ajouter.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Authentication */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-2">Authentification HAL</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Le dépôt sur HAL requiert un token d'authentification. Vous pouvez le générer depuis votre compte HAL.
                </p>
              </div>

              <div>
                <label className="block text-sm mb-2">Token HAL *</label>
                <input
                  type="password"
                  value={halToken}
                  onChange={(e) => setHalToken(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006a61] focus:border-transparent font-mono"
                  placeholder="Votre token HAL"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Le token sera stocké de manière sécurisée dans votre navigateur
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Info className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="mb-2">Comment obtenir votre token HAL :</p>
                    <ol className="list-decimal list-inside space-y-1 text-blue-800">
                      <li>Connectez-vous sur hal.science</li>
                      <li>Allez dans "Mon espace" → "Paramètres"</li>
                      <li>Générez un nouveau token d'API</li>
                      <li>Copiez et collez le token ci-dessus</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-900">
                  <p className="mb-1"><strong>Sécurité :</strong></p>
                  <p className="text-yellow-800">
                    Votre token ne sera jamais transmis à des serveurs tiers. Il est utilisé uniquement pour communiquer directement avec l'API HAL via CrossHAL.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg mb-2">Récapitulatif du dépôt</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Vérifiez les informations avant de procéder au dépôt sur HAL.
                </p>
              </div>

              {/* Files summary */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="text-sm">Fichiers</h4>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <FileText className="size-5 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm">{pdfFile?.name}</p>
                      <p className="text-xs text-gray-500">
                        Fichier principal - {pdfFile && (pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {complementaryFiles.length > 0 && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-600 mb-2">
                        Fichiers complémentaires ({complementaryFiles.length})
                      </p>
                      <div className="space-y-2">
                        {complementaryFiles.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <FileText className="size-4 text-gray-400" />
                            <span className="text-xs">{file.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata summary */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="text-sm">Métadonnées</h4>
                </div>
                <div className="p-4 space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Titre</p>
                    <p className="text-gray-900">{halMetadata.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Auteurs</p>
                    <p className="text-gray-900">
                      {halMetadata.authors.map(a => a.name).filter(Boolean).join(', ') || 'Non spécifié'}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Type de document</p>
                      <p className="text-gray-900">{halMetadata.documentType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Langue</p>
                      <p className="text-gray-900">{halMetadata.language}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Domaines HAL</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {halMetadata.halDomains.length > 0 ? (
                        halMetadata.halDomains.map((domain) => (
                          <span key={domain} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {domain}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-900">Non spécifié</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Licence</p>
                    <p className="text-gray-900">{halMetadata.license}</p>
                  </div>
                </div>
              </div>

              {/* Warning message */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-orange-900">
                    <p className="mb-1"><strong>Attention :</strong></p>
                    <p className="text-orange-800">
                      Vous êtes sur le point de déposer cette publication sur HAL. Cette action créera un nouveau dépôt sur la plateforme HAL.
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload progress */}
              {isUploading && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Upload en cours...</span>
                    <span className="text-gray-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#006a61] h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={activeStep === 0 ? handleClose : handleBack}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="size-4" />
            <span>{activeStep === 0 ? 'Annuler' : 'Précédent'}</span>
          </button>

          <div className="text-sm text-gray-600">
            Étape {activeStep + 1} sur {steps.length}
          </div>

          <button
            onClick={handleNext}
            disabled={isUploading}
            className="flex items-center gap-2 px-6 py-2 bg-[#006a61] text-white rounded-lg hover:bg-[#005550] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{activeStep === steps.length - 1 ? 'Déposer sur HAL' : 'Suivant'}</span>
            {activeStep === steps.length - 1 ? (
              <Upload className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
