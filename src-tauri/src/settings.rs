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
    pub shell_path: String,
}

impl Settings {
    pub fn new() -> Self {
        Self {
            shell_path: "/bin/zsh".to_string(), // determine default by platform
        }
    }
    pub fn to_string(&self) -> Result<String, String> {
        pretty_print(&to_string(self).unwrap())
    }
}

fn get_settings_path(app: &AppHandle) -> PathBuf {
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
