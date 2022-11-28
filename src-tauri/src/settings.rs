use jsonxf::pretty_print;
use serde_derive::{Deserialize, Serialize};
use serde_json::to_string;
use std::{
    fs::{create_dir, File},
    io::Write,
    path::PathBuf,
};
use tauri::{api::file, AppHandle};
#[derive(Debug, Serialize, Deserialize)]
pub struct Settings {
    pub terminal: String,
    pub shell_path: String,
}

impl Settings {
    pub fn new() -> Self {
        Self {
            terminal: Settings::get_default_terminal(),
            shell_path: Settings::get_default_shell_path(),
        }
    }
    pub fn to_string(&self) -> Result<String, String> {
        pretty_print(&to_string(self).unwrap())
    }
    fn get_default_shell_path() -> String {
        if cfg!(target_os = "macos") {
            "/bin/zsh".to_string()
        } else if cfg!(target_os = "linux") {
            "/bin/bash".to_string()
        } else if cfg!(target_os = "windows") {
            "%SystemRoot%\\System32\\cmd.exe".to_string()
        } else {
            "".to_string()
        }
    }
    fn get_default_terminal() -> String {
        if cfg!(target_os = "macos") {
            "open".to_string()
        } else if cfg!(target_os = "linux") {
            "open".to_string()
        } else if cfg!(target_os = "windows") {
            "wt".to_string()
        } else {
            "".to_string()
        }
    }
}

pub fn get_settings_path(app: &AppHandle) -> PathBuf {
    let mut path = app.path_resolver().app_data_dir().unwrap();
    path.push("settings.json");
    return path;
}

fn parse_settings(path: PathBuf) -> Settings {
    let json = match file::read_string(path.clone()) {
        Ok(settings) => settings,
        Err(_err) => match File::create(path.clone()) {
            Ok(mut file) => {
                write!(file, "{}", Settings::new().to_string().unwrap()).unwrap();
                file::read_string(path.clone()).unwrap()
            }
            Err(_) => {
                create_dir(path.parent().unwrap()).unwrap();
                let mut file = File::create(path.clone()).unwrap();
                write!(file, "{}", Settings::new().to_string().unwrap()).unwrap();
                file::read_string(path.clone()).unwrap()
            }
        },
    };

    match serde_json::from_str::<Settings>(&json) {
        Ok(out) => out,
        Err(..) => Settings::new(),
    }
}

pub fn get_settings(app: &AppHandle) -> Settings {
    let path = get_settings_path(app);
    parse_settings(path)
}

#[tauri::command]
pub fn get_settings_json(app_handle: AppHandle) -> String {
    let mut path = app_handle.path_resolver().app_data_dir().unwrap();
    path.push("settings.json");

    match file::read_string(path.clone()) {
        Ok(settings) => settings,
        Err(_err) => match File::create(path.clone()) {
            Ok(mut file) => {
                write!(file, "{}", Settings::new().to_string().unwrap()).unwrap();
                file::read_string(path.clone()).unwrap()
            }
            Err(_) => {
                create_dir(path.parent().unwrap()).unwrap();
                let mut file = File::create(path.clone()).unwrap();
                write!(file, "{}", Settings::new().to_string().unwrap()).unwrap();
                file::read_string(path.clone()).unwrap()
            }
        },
    }
}

#[tauri::command]
pub fn write_settings(app_handle: AppHandle, json: String) -> String {
    let mut path = app_handle.path_resolver().app_data_dir().unwrap();
    path.push("settings.json");

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
        Ok(settings) => settings,
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
