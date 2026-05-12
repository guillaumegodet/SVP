import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, PanelLeftClose, Search, User, Building2, Activity, Users, Moon, Sun, LogOut, Info } from 'lucide-react';
import svgPaths from "../imports/svg-vt1w2gqizi";
import {
  SvpBox,
  SvpTypography,
  SvpSurface,
  SvpIconButton,
  SvpColors
} from './ui/SvpWrappers';

interface SidebarProps {
  searchType: 'chercheur' | 'laboratoire';
  setSearchType: (type: 'chercheur' | 'laboratoire') => void;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  onOpenWelcomePopup?: () => void;
  onClose?: () => void;
}

export default function Sidebar({ searchType, setSearchType, isDarkMode, setIsDarkMode, onOpenWelcomePopup, onClose }: SidebarProps) {
  const location = useLocation();
  const [isAccountExpanded, setIsAccountExpanded] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SvpBox
      flexDir="column"
      sx={{
        bgcolor: SvpColors.primary,
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        color: '#fff'
      }}
    >
      {/* Logo */}
      <SvpBox align="center" justify="space-between" sx={{ px: 2, py: 4 }}>
        <SvpBox align="center" justify="center" sx={{ overflow: 'hidden', height: 39, width: 168 }}>
          <svg className="block" fill="none" preserveAspectRatio="none" viewBox="0 0 168 39" style={{ width: '100%', height: '100%' }}>
            <g>
              <path d={svgPaths.p76fae00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p1582ed00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p3e05cef0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p1d8ccd00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p1e7489b0} fill="white" />
              <path d={svgPaths.p279ee8c0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </SvpBox>
        {onClose && (
          <SvpIconButton
            onClick={onClose}
            sx={{
              p: 1,
              color: '#9ef2e6',
              '&:hover': { bgcolor: SvpColors.primaryHover }
            }}
          >
            <PanelLeftClose size={24} />
          </SvpIconButton>
        )}
      </SvpBox>

      {/* Search section with tabs */}
      <SvpBox flexDir="column" sx={{ px: 2, pb: 3, pt: 3 }}>
        <SvpSurface sx={{ overflow: 'hidden', border: 'none' }}>
          {/* Tabs */}
          <SvpBox sx={{ borderBottom: '1px solid #eee' }}>
            <SvpBox
              component="button"
              onClick={() => setSearchType('chercheur')}
              align="center"
              justify="center"
              sx={{
                flex: 1,
                gap: 1,
                px: 2,
                py: 1.5,
                transition: 'colors 0.2s',
                border: 'none',
                cursor: 'pointer',
                bgcolor: searchType === 'chercheur' ? '#00877B' : '#fff',
                color: searchType === 'chercheur' ? '#fff' : '#666',
                '&:hover': {
                  bgcolor: searchType === 'chercheur' ? '#00877B' : '#f9f9f9'
                }
              }}
            >
              <User size={16} />
              <SvpTypography sx={{ fontSize: '0.875rem', color: 'inherit' }}>Personnel</SvpTypography>
            </SvpBox>
            <SvpBox
              component="button"
              onClick={() => setSearchType('laboratoire')}
              align="center"
              justify="center"
              sx={{
                flex: 1,
                gap: 1,
                px: 2,
                py: 1.5,
                transition: 'colors 0.2s',
                border: 'none',
                cursor: 'pointer',
                bgcolor: searchType === 'laboratoire' ? '#00877B' : '#fff',
                color: searchType === 'laboratoire' ? '#fff' : '#666',
                '&:hover': {
                  bgcolor: searchType === 'laboratoire' ? '#00877B' : '#f9f9f9'
                }
              }}
            >
              <Building2 size={16} />
              <SvpTypography sx={{ fontSize: '0.875rem', color: 'inherit' }}>Structure</SvpTypography>
            </SvpBox>
          </SvpBox>

          {/* Search input */}
          <SvpBox sx={{ p: 1 }}>
            <SvpBox align="center" sx={{ gap: 1, px: 1.5, py: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Search size={16} color="#999" />
              <input
                type="text"
                placeholder={searchType === 'chercheur' ? 'Rechercher un chercheur' : 'Rechercher une structure de recherche'}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.875rem',
                  color: '#444'
                }}
              />
            </SvpBox>
          </SvpBox>
        </SvpSurface>
      </SvpBox>

      {/* Navigation */}
      <SvpBox component="nav" flexDir="column" sx={{ flex: 1, px: 2, mt: 2 }}>
        <SvpBox flexDir="column" sx={{ gap: 0.5 }}>
          <Link
            to="/dashboard"
            style={{ textDecoration: 'none' }}
          >
            <SvpBox
              align="center"
              sx={{
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: isActive('/dashboard') ? '#9ef2e6' : 'transparent',
                color: isActive('/dashboard') ? '#00201d' : '#9ef2e6',
                '&:hover': {
                  bgcolor: isActive('/dashboard') ? '#9ef2e6' : SvpColors.primaryHover
                }
              }}
            >
              <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p87f6b00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <SvpTypography sx={{ color: 'inherit' }}>Tableau de bord</SvpTypography>
            </SvpBox>
          </Link>
          <Link
            to="/publications"
            style={{ textDecoration: 'none' }}
          >
            <SvpBox
              align="center"
              sx={{
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: isActive('/publications') ? '#9ef2e6' : 'transparent',
                color: isActive('/publications') ? '#00201d' : '#9ef2e6',
                '&:hover': {
                  bgcolor: isActive('/publications') ? '#9ef2e6' : SvpColors.primaryHover
                }
              }}
            >
              <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p1fb4a780} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <SvpTypography sx={{ color: 'inherit' }}>Publications</SvpTypography>
            </SvpBox>
          </Link>
          <Link
            to="/activities"
            style={{ textDecoration: 'none' }}
          >
            <SvpBox
              align="center"
              sx={{
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: isActive('/activities') ? '#9ef2e6' : 'transparent',
                color: isActive('/activities') ? '#00201d' : '#9ef2e6',
                '&:hover': {
                  bgcolor: isActive('/activities') ? '#9ef2e6' : SvpColors.primaryHover
                }
              }}
            >
              <Activity size={24} />
              <SvpTypography sx={{ color: 'inherit' }}>Activités de recherche</SvpTypography>
            </SvpBox>
          </Link>
          <Link
            to="/expertises"
            style={{ textDecoration: 'none' }}
          >
            <SvpBox
              align="center"
              sx={{
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: isActive('/expertises') ? '#9ef2e6' : 'transparent',
                color: isActive('/expertises') ? '#00201d' : '#9ef2e6',
                '&:hover': {
                  bgcolor: isActive('/expertises') ? '#9ef2e6' : SvpColors.primaryHover
                }
              }}
            >
              <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p1eb92f00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <SvpTypography sx={{ color: 'inherit' }}>Expertises</SvpTypography>
            </SvpBox>
          </Link>
          <Link
            to="/personnel"
            style={{ textDecoration: 'none' }}
          >
            <SvpBox
              align="center"
              sx={{
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: isActive('/personnel') ? '#9ef2e6' : 'transparent',
                color: isActive('/personnel') ? '#00201d' : '#9ef2e6',
                '&:hover': {
                  bgcolor: isActive('/personnel') ? '#9ef2e6' : SvpColors.primaryHover
                }
              }}
            >
              <Users size={24} />
              <SvpTypography sx={{ color: 'inherit', textAlign: 'left' }}>Personnel de recherche</SvpTypography>
            </SvpBox>
          </Link>
        </SvpBox>
      </SvpBox>

      {/* Bottom navigation */}
      <SvpBox flexDir="column" sx={{ px: 2, pb: 3 }}>
        <SvpBox sx={{ mt: 3 }}>
          <SvpBox
            component="button"
            align="center"
            sx={{
              gap: 1,
              px: 1.5,
              py: 2,
              width: '100%',
              bgcolor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9ef2e6',
              borderRadius: 1,
              '&:hover': { bgcolor: SvpColors.primaryHover }
            }}
          >
            <svg style={{ width: 24, height: 24 }} fill="none" viewBox="0 0 23 24">
              <path clipRule="evenodd" d={svgPaths.p4b28b00} fill="currentColor" fillRule="evenodd" />
            </svg>
            <SvpTypography sx={{ color: 'inherit' }}>Français</SvpTypography>
            <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
          </SvpBox>
        </SvpBox>

        {/* Dark Mode Toggle */}
        <SvpBox sx={{ mt: 1 }}>
          <SvpBox
            component="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            align="center"
            sx={{
              gap: 1.5,
              px: 2,
              py: 1,
              width: '100%',
              bgcolor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9ef2e6',
              borderRadius: 2,
              '&:hover': { bgcolor: SvpColors.primaryHover }
            }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            <SvpTypography sx={{ color: 'inherit', fontSize: '0.875rem' }}>
              {isDarkMode ? 'Mode clair' : 'Mode sombre'}
            </SvpTypography>
            <SvpBox
              sx={{
                ml: 'auto',
                width: 36,
                height: 20,
                borderRadius: 10,
                bgcolor: isDarkMode ? '#10b981' : 'rgba(255,255,255,0.2)',
                position: 'relative',
                transition: 'background-color 0.2s'
              }}
            >
              <SvpBox
                sx={{
                  position: 'absolute',
                  top: 2,
                  left: isDarkMode ? 18 : 2,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: '#fff',
                  transition: 'left 0.2s'
                }}
              />
            </SvpBox>
          </SvpBox>
        </SvpBox>

        {/* 1ère connexion */}
        <SvpBox sx={{ mt: 1 }}>
          <SvpBox
            component="button"
            onClick={onOpenWelcomePopup}
            align="center"
            sx={{
              gap: 1.5,
              px: 2,
              py: 1,
              width: '100%',
              bgcolor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9ef2e6',
              borderRadius: 2,
              opacity: 0.8,
              transition: 'opacity 0.2s',
              '&:hover': { 
                bgcolor: SvpColors.primaryHover,
                opacity: 1
              }
            }}
          >
            <Info size={20} />
            <SvpTypography sx={{ color: 'inherit', fontSize: '0.875rem' }}>
              1ère connexion
            </SvpTypography>
          </SvpBox>
        </SvpBox>
      </SvpBox>
      {/* User profile */}
      <SvpBox flexDir="column" sx={{ px: 2, pb: 3, mt: 2 }}>
        <SvpBox
          flexDir="column"
          sx={{
            bgcolor: SvpColors.primaryHover,
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid rgba(158, 242, 230, 0.1)'
          }}
        >
          {/* User Info (Header-like) - Clickable Toggle */}
          <SvpBox
            component="button"
            onClick={() => setIsAccountExpanded(!isAccountExpanded)}
            align="center"
            sx={{
              gap: 1.5,
              px: 2,
              py: 1.5,
              width: '100%',
              bgcolor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              borderBottom: isAccountExpanded ? '1px solid rgba(158, 242, 230, 0.05)' : 'none',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'rgba(158, 242, 230, 0.05)'
              }
            }}
          >
            <SvpBox
              align="center"
              justify="center"
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                bgcolor: '#9ef2e6',
                flexShrink: 0
              }}
            >
              <SvpTypography sx={{ color: SvpColors.primary, fontWeight: 700, fontSize: '0.75rem' }}>GG</SvpTypography>
            </SvpBox>
            <SvpBox sx={{ flex: 1, overflow: 'hidden' }}>
              <SvpTypography noWrap sx={{ color: '#fff', fontSize: '0.8125rem', fontWeight: 600 }}>Guillaume Godet</SvpTypography>
            </SvpBox>
            <ChevronDown 
              size={16} 
              color="#9ef2e6" 
              style={{ 
                transform: isAccountExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }} 
            />
          </SvpBox>

          {/* Account Actions - Conditionally Rendered */}
          {isAccountExpanded && (
            <SvpBox flexDir="column">
              <Link to="/mon-compte" style={{ textDecoration: 'none' }}>
                <SvpBox
                  align="center"
                  sx={{
                    gap: 1.5,
                    px: 2,
                    py: 1.25,
                    color: '#9ef2e6',
                    transition: 'all 0.2s',
                    '&:hover': { 
                      bgcolor: 'rgba(158, 242, 230, 0.1)',
                      color: '#fff'
                    }
                  }}
                >
                  <User size={16} />
                  <SvpTypography sx={{ color: 'inherit', fontSize: '0.8125rem' }}>Accéder à Mon compte</SvpTypography>
                </SvpBox>
              </Link>
              
              <SvpBox
                component="button"
                align="center"
                sx={{
                  gap: 1.5,
                  px: 2,
                  py: 1.25,
                  bgcolor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  color: '#9ef2e6',
                  transition: 'all 0.2s',
                  '&:hover': { 
                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                    color: '#f87171' // Red-ish for logout
                  }
                }}
              >
                <LogOut size={16} />
                <SvpTypography sx={{ color: 'inherit', fontSize: '0.8125rem' }}>Se déconnecter</SvpTypography>
              </SvpBox>
            </SvpBox>
          )}
        </SvpBox>
      </SvpBox>
    </SvpBox>
  );
}