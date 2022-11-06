#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod config;

use config::{get_config, get_config_path};

use serde_json::{Map, Value};
use std::process::Command;
use tauri::{
    ClipboardManager, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, SystemTraySubmenu,
};
use tauri_runtime::menu::SystemTrayMenuEntry;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn generate_menu(config: &Map<String, Value>) -> SystemTrayMenu {
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

fn generate_menu_entry(key: &String, value: &Value) -> SystemTrayMenuEntry {
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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            Ok({
                let handle = app.handle();

                let config = get_config(get_config_path(&app.handle()));

                SystemTray::new()
                    .with_id("main")
                    .with_menu(generate_menu(config.as_object().unwrap()))
                    .build(&handle)
                    .expect("unable to create tray");
            })
        })
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "config" => {
                    Command::new("open")
                        .arg(get_config_path(app))
                        .output()
                        .expect("failed to execute process");
                }
                "open" => {
                    if let Some(window) = app.get_window("main") {
                        window.show().unwrap();
                    } else {
                        println!("no window");
                    }
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                "quit" => {
                    std::process::exit(0);
                }
                id => {
                    app.clipboard_manager()
                        .write_text(id)
                        .expect("failed to copy");

                    Command::new("open")
                        .arg("/bin/zsh")
                        .output()
                        .expect("failed to execute process");
                }
            },
            _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
