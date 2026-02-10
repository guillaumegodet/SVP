import {
    Box,
    BoxProps,
    Paper,
    PaperProps,
    Typography,
    TypographyProps,
    Button,
    ButtonProps,
    Container,
    ContainerProps,
    IconButton,
    IconButtonProps
} from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Design Tokens for SoVisu+
 */
export const SvpColors = {
    primary: 'var(--svp-primary)',
    primaryHover: 'var(--svp-primary-hover)',
    primaryLight: 'var(--svp-primary-light)',
    primaryDark: 'var(--svp-primary-dark, #00423B)',
    textPrimary: 'var(--svp-text-primary)',
    textSecondary: 'var(--svp-text-secondary)',
    bgPage: 'var(--svp-bg-page)',
    white: 'var(--svp-surface)',
    error: '#DE3730',
    errorLight: '#fef2f2',
    warning: '#ED6C02',
    warningLight: '#fffbeb',
    border: 'var(--svp-border)',
};

/**
 * Common Spacing/Gap values translated from Tailwind
 */

/**
 * SvpBox: Extension of MUI Box that defaults to flex display.
 * Useful for replacing 'flex', 'flex-col', 'items-center', etc.
 */
export const SvpBox = styled(Box)<BoxProps & {
    flexDir?: 'row' | 'column';
    align?: string;
    justify?: string;
    fullWidth?: boolean;
}>(({ flexDir, align, justify, fullWidth }) => ({
    display: 'flex',
    flexDirection: flexDir || 'row',
    alignItems: align || 'stretch',
    justifyContent: justify || 'flex-start',
    width: fullWidth ? '100%' : 'auto',
}));

/**
 * SvpSurface: Styled Paper for cards, modals, and distinct UI sections.
 * Replaces 'bg-white rounded-lg shadow-sm', etc.
 */
export const SvpSurface = styled(Paper)<PaperProps>(() => ({
    borderRadius: '12px',
    boxShadow: 'var(--svp-shadow)',
    backgroundColor: 'var(--svp-glass-bg)',
    backdropFilter: 'var(--svp-glass-blur)',
    WebkitBackdropFilter: 'var(--svp-glass-blur)',
    overflow: 'hidden',
    border: `1px solid ${SvpColors.border}`,
    transition: 'all 0.3s ease',
}));

/**
 * SvpContainer: Max-width layout container (1600px).
 * Replaces 'max-w-[1600px] mx-auto'.
 */
export const SvpContainer = styled(Container)<ContainerProps>(({ theme }) => ({
    maxWidth: '1600px !important',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: '16px',
        paddingRight: '16px',
    },
    [theme.breakpoints.up('sm')]: {
        paddingLeft: '24px',
        paddingRight: '24px',
    },
}));

/**
 * SvpButton: Primary and variant buttons with SoVisu+ styling.
 * Replaces custom rounded buttons with Tailwind colors.
 */
export const SvpButton = styled(Button)<ButtonProps>(() => ({
    borderRadius: '20px',
    textTransform: 'none',
    fontWeight: 500,
    padding: '8px 20px',
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none',
    },
    '&.MuiButton-containedPrimary': {
        backgroundColor: SvpColors.primary,
        '&:hover': {
            backgroundColor: SvpColors.primaryHover,
        },
    },
}));

/**
 * SvpIconButton: Consistent icon button styles.
 */
export const SvpIconButton = styled(IconButton)<IconButtonProps>(() => ({
    color: SvpColors.textSecondary,
    '&:hover': {
        backgroundColor: 'rgba(0, 106, 97, 0.04)',
    },
}));

/**
 * SvpTypography: Typography with default project colors and variants.
 */
export const SvpTypography = styled(Typography)<TypographyProps>(() => ({
    color: SvpColors.textPrimary,
    fontFamily: "'Inter', sans-serif",
    transition: 'color 0.3s ease',
}));

/**
 * Specific Heading components
 */
export const SvpH1 = styled(SvpTypography)(() => ({
    fontSize: '2rem',
    fontWeight: 500,
    color: SvpColors.textPrimary,
    margin: 0,
}));

export const SvpH2 = styled(SvpTypography)(() => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    color: SvpColors.primary,
}));

/**
 * SvpCardContent: Internal padding for surfaces
 */
export const SvpCardContent = styled(Box)<BoxProps>(() => ({
    padding: '24px',
}));

