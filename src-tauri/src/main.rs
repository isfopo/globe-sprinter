#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;
use tauri::{
    ClipboardManager, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTraySubmenu,
};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let run_menu = SystemTrayMenu::new().add_item(CustomMenuItem::new("run", "Run"));
    let sub_menu = SystemTraySubmenu::new("Sub", run_menu);

    let tray_menu = SystemTrayMenu::new()
        .add_submenu(sub_menu)
        .add_item(CustomMenuItem::new("open", "Open"))
        .add_item(CustomMenuItem::new("hide", "Hide"))
        .add_item(CustomMenuItem::new("quit", "Quit"));

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "run" => {
                    app.clipboard_manager()
                        .write_text("ls")
                        .expect("failed to copy");

                    let output = Command::new("open")
                        .arg("/bin/zsh")
                        .output()
                        .expect("failed to execute process");
                    println!("{}", output.status.to_string());
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
