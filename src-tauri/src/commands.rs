use jsonxf::pretty_print;
use std::{
    fs::{create_dir, File},
    io::Write,
};
use tauri::{api::file, AppHandle, Runtime};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
pub fn get_config_json(app_handle: AppHandle) -> String {
    let mut path = app_handle.path_resolver().app_data_dir().unwrap();
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
pub fn write_config<R: Runtime>(app_handle: AppHandle<R>, json: String) -> String {
    let mut path = app_handle.path_resolver().app_data_dir().unwrap();
    path.push("config.json");

    match File::create(path.clone()) {
        Ok(mut file) => {
            write!(file, "{}", pretty_print(&json).unwrap()).unwrap();
        }
        Err(_) => {
            create_dir(path.parent().unwrap()).unwrap();
            let mut file = File::create(path.clone()).unwrap();
            write!(file, "{}", pretty_print(&json).unwrap()).unwrap();
        }
    }

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
