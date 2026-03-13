export type NavigationHandler = (href: string, point?: Record<string, unknown>) => void;

export function navigateToPoint(
  href: string | undefined,
  point: Record<string, unknown>,
  onNavigate?: NavigationHandler
) {
  if (!href) return;

  if (onNavigate) {
    onNavigate(href, point);
    return;
  }

  if (typeof window !== 'undefined') {
    window.location.href = href;
  }
}
