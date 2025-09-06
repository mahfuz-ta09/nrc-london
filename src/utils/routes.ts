

export const isProtectedRoute = (url: string) => {
  const protectedPaths = ["/Dashboard", "/Dashboard/*"]; // add all your protected routes
  return protectedPaths.some((path) => url.startsWith(path));
};
