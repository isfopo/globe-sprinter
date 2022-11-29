pub fn select_by_platform<T>(windows: T, macos: T, linux: Option<T>) -> T {
  if cfg!(target_os = "windows") {
    windows
  } else if cfg!(target_os = "macos") {
    macos
  } else {
    linux.unwrap_or(macos)
  }
}