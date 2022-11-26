use jsonxf::pretty_print;
use serde_derive::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::path::PathBuf;
use std::{
    fs::{create_dir, File},
    io::Write,
};
use tauri::{api::file, AppHandle};

use crate::errors::emit_error;
use crate::menu::generate_menu;

// https://stackoverflow.com/questions/33895090/serialize-json-in-a-recursive-struct
#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ConfigItem {
    String(String),
    Directory(Directory),
}

pub type Directory = BTreeMap<String, ConfigItem>;

pub type Config = BTreeMap<String, ConfigItem>;

pub fn get_config_path(app: &AppHandle) -> PathBuf {
    let mut path = app.path_resolver().app_data_dir().unwrap();
    path.push("config.json");
    return path;
}

pub fn parse_config(path: PathBuf) -> Config {
    let json = match file::read_string(path.clone()) {
        Ok(config) => config,
        Err(_err) => match File::create(path.clone()) {
            Ok(mut file) => {
                write!(file, "{}", "{}").unwrap();
                file::read_string(path.clone()).unwrap()
            }
            Err(_) => {
                create_dir(path.parent().unwrap()).unwrap();
                let mut file = File::create(path.clone()).unwrap();
                write!(file, "{}", "{}").unwrap();
                file::read_string(path.clone()).unwrap()
            }
        },
    };

    match serde_json::from_str::<Config>(&json) {
        Ok(out) => out,
        Err(..) => Config::new(),
    }
}

pub fn get_config(app: &AppHandle) -> Config {
    let path = get_config_path(app);
    parse_config(path)
}

#[tauri::command]
pub fn get_config_json(app_handle: AppHandle) -> String {
    let mut path = app_handle.path_resolver().app_data_dir().unwrap();
    path.push("config.json");

    match file::read_string(path.clone()) {
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
    }
}

#[tauri::command]
pub fn write_config(app_handle: AppHandle, json: String) -> String {
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

    match app_handle
        .tray_handle()
        .set_menu(generate_menu(get_config(&app_handle)))
    {
        Ok(..) => (),
        Err(..) => emit_error(&app_handle, "Unable to update menu"),
    };

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
