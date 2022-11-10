#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod config;
mod menu;

use config::{get_config, get_config_path};
use menu::generate_menu;

use std::process::Command;
use tauri::{App, AppHandle, ClipboardManager, Manager, RunEvent, SystemTray, SystemTrayEvent};

fn main() {
    let setup = |app: &mut App| {
        Ok({
            let handle = app.handle();

            let config = get_config(get_config_path(&app.handle()));

            SystemTray::new()
                .with_id("main")
                .with_menu(generate_menu(config.as_object().unwrap()))
                .build(&handle)
                .expect("unable to create tray");
        })
    };

    let system_tray_event = |app: &AppHandle, event: SystemTrayEvent| match event {
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
    };

    let run = |_app_handle: &AppHandle, event: RunEvent| match event {
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    };

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::get_config,
            commands::add_directory
        ])
        .setup(setup)
        .on_system_tray_event(system_tray_event)
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(run);
}
