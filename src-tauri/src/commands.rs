use std::{
    fs::{create_dir, File},
    io::Write,
};
use tauri::{api::file, AppHandle};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
pub fn get_config(app_handle: AppHandle) -> String {
    let mut path = app_handle.path_resolver().app_dir().unwrap();
    path.push("config.json");

    match file::read_string(path.clone()) {
        Ok(config) => config,
        Err(_err) => {
            println!("{}", _err.to_string());
            match File::create(path.clone()) {
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
            }
        }
    }
}

#[tauri::command]
pub fn add_directory(location: String, name: String) {
    println!("{}: {}", location, name);
}
