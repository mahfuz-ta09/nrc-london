

export const isProtectedRoute = (url: string) => {
  const protectedPaths = ["/dashboard", "/dashboard/*"]
  return protectedPaths.some((path) => url.startsWith(path))
}
