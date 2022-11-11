use serde_derive::{Deserialize, Serialize};
use serde_json::{from_str, Value};
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

use std::collections::BTreeMap;

// https://stackoverflow.com/questions/33895090/serialize-json-in-a-recursive-struct
#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
enum Config {
    String(String),
    Directory(Directory),
}

type Directory = BTreeMap<String, Config>;

#[tauri::command]
pub fn add_directory(location: String, name: String) {
    println!("{}: {}", location, name);
}
