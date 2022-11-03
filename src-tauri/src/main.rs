#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde_json::{from_str, Value};
use std::path::PathBuf;
use std::process::Command;
use std::{
    fs::{create_dir, File},
    io::Write,
};
use tauri::api::file;
use tauri::{
    AppHandle, ClipboardManager, CustomMenuItem, Manager, SystemTray, SystemTrayEvent,
    SystemTrayMenu, SystemTraySubmenu,
};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn get_config_path(app: &AppHandle) -> PathBuf {
    let mut path = app.path_resolver().app_dir().unwrap();
    path.push("config.json");
    return path;
}

fn get_config(path: PathBuf) -> Value {
    let json = match file::read_string(path.clone()) {
        Ok(config) => config,
        Err(_err) => match File::create(path.clone()) {
            Ok(mut file) => {
                write!(file, "{}", "{}").unwrap();
                format!("{}", "{}")
            }
            Err(_) => {
                create_dir(path.parent().unwrap()).unwrap();
                let mut file = File::create(path.clone()).unwrap();
                write!(file, "{}", "{}").unwrap();
                format!("{}", "{}")
            }
        },
    };

    return from_str(json.as_str()).unwrap();
}

fn main() {
    // read config file, create if doesn't exists

    // turn file into object

    // add folders and commands as submenus and items, respectively

    // add open, hide and quit items

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            Ok({
                app.path_resolver().app_dir();

                let handle = app.handle();

                let run_menu = SystemTrayMenu::new().add_item(CustomMenuItem::new("run", "Run"));
                let sub_menu = SystemTraySubmenu::new("Sub", run_menu);

                let tray_menu = SystemTrayMenu::new()
                    .add_submenu(sub_menu)
                    .add_item(CustomMenuItem::new("config", "Configure"))
                    .add_item(CustomMenuItem::new("list", "List"))
                    .add_item(CustomMenuItem::new("open", "Open"))
                    .add_item(CustomMenuItem::new("hide", "Hide"))
                    .add_item(CustomMenuItem::new("quit", "Quit"));

                let path = get_config_path(&handle);
                let config = get_config(path.clone());

                for (key, value) in config.as_object().unwrap().into_iter().rev() {
                    println!("{} / {}", key, value);
                    // tray_menu.add_item(CustomMenuItem::new(key, "value.as_str()"));
                }

                SystemTray::new()
                    .with_id("main")
                    .with_menu(tray_menu)
                    .build(&handle)
                    .expect("unable to create tray");
            })
        })
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                let path = get_config_path(app);
                let config = get_config(path.clone());

                match config.as_object().unwrap().get(id.as_str()) {
                    Some(value) => {
                        app.clipboard_manager()
                            .write_text(value.as_str().unwrap())
                            .expect("failed to copy");

                        Command::new("open")
                            .arg("/bin/zsh")
                            .output()
                            .expect("failed to execute process");
                    }
                    None => {}
                }

                match id.as_str() {
                    "run" => {
                        app.clipboard_manager()
                            .write_text("ls")
                            .expect("failed to copy");

                        Command::new("open")
                            .arg("/bin/zsh")
                            .output()
                            .expect("failed to execute process");
                    }
                    "config" => {
                        Command::new("open")
                            .arg(path)
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
                    _ => {}
                }
            }
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
