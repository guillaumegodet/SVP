import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  X,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  Mail,
  Info
} from 'lucide-react';
import {
  SvpBox,
  SvpTypography,
  SvpH2,
  SvpButton,
  SvpIconButton,
  SvpColors
} from './ui/SvpWrappers';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userOrcid: string;
  userIdHal: string;
  userIdRef: string;
  onNavigateToAccount: () => void;
}

export default function WelcomePopup({
  isOpen,
  onClose,
  userOrcid,
  userIdHal,
  userIdRef,
  onNavigateToAccount
}: WelcomePopupProps) {
  const hasAllIdentifiers = userOrcid && userIdHal && userIdRef;

  const handleGoToAccount = () => {
    onNavigateToAccount();
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          overflow: 'hidden',
          bgcolor: 'var(--svp-bg-page)',
          backgroundImage: 'linear-gradient(135deg, rgba(158, 242, 230, 0.1) 0%, rgba(255, 255, 255, 0) 100%)',
        }
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <SvpBox align="center" justify="space-between" sx={{ px: 3, py: 2, bgcolor: SvpColors.primary, color: '#fff' }}>
          <SvpBox align="center" sx={{ gap: 1.5 }}>
            <Info size={24} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'inherit' }}>
              Bienvenue sur SoVisu+
            </Typography>
          </SvpBox>
          <SvpIconButton onClick={onClose} sx={{ color: '#9ef2e6', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
            <X size={20} />
          </SvpIconButton>
        </SvpBox>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <SvpBox flexDir="column" sx={{ gap: 3 }}>
          <SvpBox flexDir="column" sx={{ gap: 1 }}>
            <SvpH2 sx={{ mb: 1 }}>Ravi de vous voir !</SvpH2>
            <SvpTypography>
              SoVisu+ est votre outil de pilotage bibliométrique. Pour que vos données soient les plus précises possibles, nous avons besoin de vos identifiants chercheurs.
            </SvpTypography>
          </SvpBox>

          <Divider sx={{ opacity: 0.1 }} />

          <SvpBox
            sx={{
              p: 2.5,
              borderRadius: '12px',
              bgcolor: hasAllIdentifiers ? 'rgba(0, 106, 97, 0.05)' : 'rgba(237, 108, 2, 0.05)',
              border: `1px solid ${hasAllIdentifiers ? 'rgba(0, 106, 97, 0.1)' : 'rgba(237, 108, 2, 0.1)'}`,
            }}
          >
            <SvpBox align="center" justify="space-between" sx={{ gap: 2, flexWrap: 'wrap' }}>
              <SvpBox align="center" sx={{ gap: 1.5, flex: 1 }}>
                {hasAllIdentifiers ? (
                  <CheckCircle2 color="#006A61" size={28} />
                ) : (
                  <AlertCircle color="#ED6C02" size={28} />
                )}
                <SvpBox flexDir="column">
                  <SvpTypography sx={{ fontWeight: 700, fontSize: '1rem', color: hasAllIdentifiers ? '#006A61' : '#ED6C02' }}>
                    {hasAllIdentifiers ? 'Tous vos identifiants sont configurés !' : 'Action requise'}
                  </SvpTypography>
                  <SvpTypography sx={{ fontSize: '0.875rem' }}>
                    {hasAllIdentifiers 
                      ? 'Votre profil est complet, merci !' 
                      : 'Renseignez vos identifiants dans votre profil pour synchroniser vos données.'}
                  </SvpTypography>
                </SvpBox>
              </SvpBox>
              
              {!hasAllIdentifiers && (
                <SvpButton 
                  variant="contained" 
                  onClick={handleGoToAccount}
                  sx={{ 
                    bgcolor: '#ED6C02', 
                    '&:hover': { bgcolor: '#E65100' },
                    px: 3,
                    borderRadius: '8px'
                  }}
                >
                  Accéder à Mon compte
                </SvpButton>
              )}
            </SvpBox>
          </SvpBox>

          <SvpBox flexDir="column" sx={{ gap: 2 }}>
            {/* ORCID */}
            <IdentifierStatus
              label="ORCID"
              value={userOrcid}
              description="L'identifiant international pour les chercheurs."
              missingText="Vous n'avez pas encore renseigné votre ORCID. Si vous n'en avez pas, créez-le en quelques minutes."
              actionLabel="Créer mon ORCID"
              actionUrl="https://orcid.org/register"
              color="#A6CE39"
            />

            {/* IdHAL */}
            <IdentifierStatus
              label="IdHAL"
              value={userIdHal}
              description="L'identifiant unique de la plateforme nationale HAL."
              missingText="Votre IdHAL est manquant. Il nous permet de synchroniser vos publications automatiquement."
              actionLabel="Créer mon IdHAL"
              actionUrl="https://hal.science/user/login"
              color="#006A61"
            />

            {/* IdRef */}
            <IdentifierStatus
              label="IdRef"
              value={userIdRef}
              description="L'identifiant des autorités de l'enseignement supérieur."
              missingText="Votre IdRef n'est pas renseigné. Attention, vous ne pouvez pas le créer vous-même."
              specialNote="Contactez vos bibliothécaires (bu@univ-xxxx.fr) pour demander sa création."
              actionLabel="Contacter la BU"
              actionUrl="mailto:bu@univ-xxxx.fr?subject=Demande de création d'IdRef"
              color="#003B6B"
              isSpecial
            />
          </SvpBox>

          <SvpBox justify="flex-end" sx={{ mt: 1 }}>
            <SvpButton 
              variant="contained" 
              onClick={onClose}
              sx={{ bgcolor: SvpColors.primary, px: 4 }}
            >
              C'est compris !
            </SvpButton>
          </SvpBox>
        </SvpBox>
      </DialogContent>
    </Dialog>
  );
}

interface IdentifierStatusProps {
  label: string;
  value: string;
  description: string;
  missingText: string;
  actionLabel: string;
  actionUrl: string;
  color: string;
  specialNote?: string;
  isSpecial?: boolean;
}

function IdentifierStatus({
  label,
  value,
  description,
  missingText,
  actionLabel,
  actionUrl,
  color,
  specialNote,
  isSpecial = false
}: IdentifierStatusProps) {
  const isMissing = !value;

  return (
    <SvpBox
      sx={{
        p: 2,
        borderRadius: '12px',
        border: '1px solid',
        borderColor: isMissing ? 'rgba(0,0,0,0.05)' : 'rgba(0, 106, 97, 0.1)',
        bgcolor: isMissing ? '#fff' : 'rgba(0, 106, 97, 0.02)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <SvpBox flexDir="column" sx={{ gap: 1.5 }}>
        <SvpBox align="center" justify="space-between">
          <SvpBox align="center" sx={{ gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: color,
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.75rem'
              }}
            >
              {label[0]}
            </Box>
            <SvpTypography sx={{ fontWeight: 700 }}>{label}</SvpTypography>
          </SvpBox>
          
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 600,
              bgcolor: isMissing ? 'rgba(0,0,0,0.05)' : 'rgba(0, 106, 97, 0.1)',
              color: isMissing ? '#666' : '#006A61',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            {isMissing ? (
              <>
                <AlertCircle size={14} />
                Manquant
              </>
            ) : (
              <>
                <CheckCircle2 size={14} />
                Configuré
              </>
            )}
          </Box>
        </SvpBox>

        <SvpBox flexDir="column" sx={{ gap: 0.5 }}>
          <SvpTypography sx={{ fontSize: '0.8125rem', color: SvpColors.textSecondary }}>
            {description}
          </SvpTypography>
          {isMissing ? (
            <SvpBox flexDir="column" sx={{ gap: 1, mt: 1 }}>
              <SvpTypography sx={{ fontSize: '0.875rem' }}>
                {missingText}
              </SvpTypography>
              {specialNote && (
                <SvpTypography sx={{ fontSize: '0.8125rem', fontStyle: 'italic', color: '#003B6B' }}>
                  {specialNote}
                </SvpTypography>
              )}
              <SvpBox sx={{ mt: 0.5 }}>
                <SvpButton
                  component="a"
                  href={actionUrl}
                  {...({
                    target: isSpecial ? "_self" : "_blank",
                    rel: "noopener noreferrer"
                  } as any)}
                  size="small"
                  variant="outlined"
                  startIcon={isSpecial ? <Mail size={16} /> : <ExternalLink size={16} />}
                  sx={{
                    borderColor: color,
                    color: color,
                    '&:hover': {
                      borderColor: color,
                      bgcolor: `${color}10`
                    }
                  }}
                >
                  {actionLabel}
                </SvpButton>
              </SvpBox>
            </SvpBox>
          ) : (
            <SvpTypography sx={{ fontSize: '0.875rem', color: '#006A61', fontWeight: 500, mt: 0.5 }}>
              Identifiant : {value}
            </SvpTypography>
          )}
        </SvpBox>
      </SvpBox>
    </SvpBox>
  );
}
