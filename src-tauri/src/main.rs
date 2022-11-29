#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod config;
mod errors;
mod menu;
mod platform;
mod settings;

use config::{get_config, get_config_json, get_config_path, write_config};
use errors::emit_error;
use menu::generate_menu;
use platform::select_by_platform;
use settings::{get_settings, get_settings_json, get_settings_path, write_settings};

use std::process::Command;
use tauri::{App, AppHandle, ClipboardManager, Manager, RunEvent, SystemTray, SystemTrayEvent};

fn main() {
    let setup = |app: &mut App| {
        Ok({
            let handle = app.handle();

            let config = get_config(&handle);

            SystemTray::new()
                .with_id("main")
                .with_menu(generate_menu(config))
                .build(&handle)
                .expect("unable to create tray");
        })
    };

    let system_tray_event = |app: &AppHandle, event: SystemTrayEvent| match event {
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "config" => match Command::new(select_by_platform(
                "explorer",
                "open",
                Option::Some("xdg-open"),
            ))
            .arg(get_config_path(app))
            .output()
            {
                Ok(..) => (),
                Err(e) => {
                    emit_error(app, &e.to_string());
                }
            },
            "settings" => match Command::new(select_by_platform(
                "explorer",
                "open",
                Option::Some("xdg-open"),
            ))
            .arg(get_settings_path(app))
            .output()
            {
                Ok(..) => (),
                Err(..) => {
                    emit_error(app, "failed to execute process");
                }
            },
            "reload" => {
                app.tray_handle()
                    .set_menu(generate_menu(get_config(&app)))
                    .unwrap();
                match app.emit_all("reload", {}) {
                    Ok(..) => (),
                    Err(..) => emit_error(app, "Could not reload"),
                }
            }
            "open" => {
                if let Some(window) = app.get_window("main") {
                    window.show().unwrap();
                } else {
                    tauri::WindowBuilder::new(
                        app,
                        "main",
                        tauri::WindowUrl::App("index.html".into()),
                    )
                    .title("Globe Sprinter")
                    .build()
                    .unwrap();
                }
            }
            "hide" => {
                let window = app.get_window("main").unwrap();
                match window.hide() {
                    Ok(..) => (),
                    Err(..) => emit_error(app, "Could not hide window"),
                };
            }
            "quit" => {
                std::process::exit(0);
            }
            id => {
                match app.clipboard_manager().write_text(id) {
                    Ok(..) => (),
                    Err(..) => emit_error(app, "Failed to copy command"),
                }

                let settings = get_settings(app);

                match Command::new(settings.terminal).arg(settings.shell_path).output() {
                    Ok(..) => (),
                    Err(..) => emit_error(app, "Failed to execute process"),
                }
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
            get_config_json,
            write_config,
            get_settings_json,
            write_settings
        ])
        .setup(setup)
        .on_system_tray_event(system_tray_event)
        .build(tauri::generate_context!())
        .expect("error while building tauri application")
        .run(run);
}
