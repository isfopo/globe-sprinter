use serde_json::{Map, Value};
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTraySubmenu};
use tauri_runtime::menu::SystemTrayMenuEntry;

pub fn generate_menu(config: &Map<String, Value>) -> SystemTrayMenu {
    let mut menu = SystemTrayMenu::new();

    for (key, value) in config.into_iter().rev() {
        menu.items.push(generate_menu_entry(key, value))
    }

    menu.add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("config", "Configure"))
        .add_item(CustomMenuItem::new("open", "Open"))
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_item(CustomMenuItem::new("quit", "Quit"))
}

pub fn generate_menu_entry(key: &String, value: &Value) -> SystemTrayMenuEntry {
    match value.as_str() {
        Some(value) => SystemTrayMenuEntry::CustomItem(CustomMenuItem::new(value, key)),
        None => {
            let mut submenu = SystemTrayMenu::new();

            for (sub_key, sub_value) in value.as_object().unwrap().into_iter().rev() {
                submenu.items.push(generate_menu_entry(sub_key, sub_value))
            }

            SystemTrayMenuEntry::Submenu(SystemTraySubmenu::new(key, submenu))
        }
    }
}
