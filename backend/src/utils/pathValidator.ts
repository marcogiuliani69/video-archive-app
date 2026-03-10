// Path validation utility to prevent path traversal attacks

import path from "path";

export function validateVideoPath(filePath: string, basePath: string): boolean {
  // Resolve and normalize paths to handle .. and . segments
  const resolvedBase = path.resolve(basePath);
  const resolvedPath = path.resolve(filePath);

  // Check if the resolved path is within the base directory
  return (
    resolvedPath.startsWith(resolvedBase + path.sep) ||
    resolvedPath === resolvedBase
  );
}
