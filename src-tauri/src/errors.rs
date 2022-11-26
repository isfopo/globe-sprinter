use tauri::{AppHandle, Manager};

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}

pub fn emit_error(app: &AppHandle, message: &str) {
    app.emit_all(
        "error",
        Payload {
            message: message.into(),
        },
    )
    .unwrap();
}
