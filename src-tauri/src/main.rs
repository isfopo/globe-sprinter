#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;
use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("run", "Run"))
        .add_item(CustomMenuItem::new("open", "Open"))
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_item(CustomMenuItem::new("quit", "Quit"));

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "run" => {
                    let output = Command::new("open")
                        .arg("/bin/zsh")
                        .output()
                        .expect("failed to execute process");
                    println!("{}", output.status.to_string())
                }
                "open" => {
                    if let Some(window) = app.get_window("main") {
                        window.show().unwrap()
                    } else {
                        println!("no window")
                    }
                }
                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
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
