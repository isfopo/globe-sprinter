use std::collections::BTreeMap;

use crate::config::{Config, ConfigItem};
use serde_json::{Map, Value};
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu};
use tauri_runtime::menu::SystemTrayMenuEntry;

pub fn generate_menu(config: Config) -> SystemTrayMenu {
    let mut menu: SystemTrayMenu = SystemTrayMenu::new();

    for (key, value) in config.into_iter() {
        menu.items.push(match value {
            ConfigItem::String(command) => {
                SystemTrayMenuEntry::CustomItem(CustomMenuItem::new(command, key))
            }
            ConfigItem::Directory(dir) => generate_menu_entry(key, dir),
        });
    }

    menu.add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("config", "Configure"))
        .add_item(CustomMenuItem::new("open", "Open"))
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_item(CustomMenuItem::new("quit", "Quit"))
}

pub fn generate_menu_entry(
    key: String,
    directory: BTreeMap<String, ConfigItem>,
) -> SystemTrayMenuEntry {
    let mut submenu = SystemTrayMenu::new();

    for (key, value) in directory.into_iter() {
        submenu.items.push(match value {
            ConfigItem::String(command) => {
                SystemTrayMenuEntry::CustomItem(CustomMenuItem::new(command, key))
            }
            ConfigItem::Directory(sub_dir) => generate_menu_entry(key, sub_dir),
        })
    }

    SystemTrayMenuEntry::Submenu(SystemTraySubmenu::new(key, submenu))
}
