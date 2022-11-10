use serde_json::{from_str, Value};
use std::{
    fs::{create_dir, File},
    io::Write,
    path::PathBuf,
};
use tauri::{api::file, AppHandle};

pub fn get_config_path(app: &AppHandle) -> PathBuf {
    let mut path = app.path_resolver().app_dir().unwrap();
    path.push("config.json");
    return path;
}

pub fn parse_config(path: PathBuf) -> Value {
    return from_str(
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
        .as_str(),
    )
    .unwrap();
}
