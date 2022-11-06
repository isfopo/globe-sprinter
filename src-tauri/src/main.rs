#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod config;
mod menu;

use config::{get_config, get_config_path};
use menu::generate_menu;

use std::process::Command;
use tauri::{ClipboardManager, Manager, SystemTray, SystemTrayEvent};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
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
