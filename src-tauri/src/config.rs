use serde_derive::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::{
    fs::{create_dir, File},
    io::Write,
    path::PathBuf,
};
use tauri::{api::file, AppHandle};

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
