/**
 * Utility function to extract hospital slug from current pathname
 * Handles path-based routing (e.g. /amritsar)
 */

export const getHospitalSlug = () => {
    const pathParts = window.location.pathname.split('/');
    const potentialSlug = pathParts[1];

    // Exclude common Laravel/API paths that are not hospital slugs
    if (!potentialSlug || 
        ['admin', 'api', 'build', 'storage', 'vendor', 'livewire'].includes(potentialSlug)) {
        return null;
    }

    return potentialSlug;
};

/**
 * Get the base domain
 */
export const getBaseDomain = () => {
    return import.meta.env.VITE_BASE_DOMAIN || window.location.hostname;
};

/**
 * Check if we're on the main site (no hospital slug)
 */
export const isMainSite = () => {
    return getHospitalSlug() === null;
};

/**
 * Build full URL for a hospital branch using path-based routing
 */
export const buildHospitalUrl = (slug) => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${protocol}//${hostname}${port}/${slug}`;
};
