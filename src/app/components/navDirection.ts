export type NavDir = "forward" | "back" | "none"

const KEY = "__nav_dir__"

export function setNavDir(dir: NavDir) {
  try {
    sessionStorage.setItem(KEY, dir)
  } catch {}
}

export function consumeNavDir(): NavDir {
  try {
    const v = (sessionStorage.getItem(KEY) as NavDir) || "none"
    sessionStorage.removeItem(KEY)
    return v
  } catch {
    return "none"
  }
}
