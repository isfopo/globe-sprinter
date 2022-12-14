use crate::platform::select_by_platform;
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
            terminal: select_by_platform(
                "wt".to_string(),
                "Terminal.app".to_string(),
                Option::None,
            ),
            shell_path: select_by_platform(
                "%SystemRoot%\\System32\\cmd.exe".to_string(),
                "/bin/zsh".to_string(),
                Option::Some("/bin/bash".to_string()),
            ),
        }
    }
    pub fn to_string(&self) -> Result<String, String> {
        pretty_print(&to_string(self).unwrap())
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
