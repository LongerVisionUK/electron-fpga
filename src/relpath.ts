import * as path from 'path'
import * as which from 'which'

export function getRelPath(bin: string, relPath: string): string {
    const binDir = path.dirname(which.sync(bin))
    return path.join(binDir, relPath)
}
