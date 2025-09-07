

export const isProtectedRoute = (url: string) => {
  const protectedPaths = ["/Dashboard", "/Dashboard/*"]
  return protectedPaths.some((path) => url.startsWith(path))
}
