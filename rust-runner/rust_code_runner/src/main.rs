use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::Mutex;
use warp::Filter;
use wasmtime::*;

#[derive(Deserialize)]
struct CodeRequest {
    code: String,
}

#[derive(Serialize)]
struct CodeResponse {
    result: String,
}

#[tokio::main]
async fn main() {
    let request_counts = Arc::new(Mutex::new(std::collections::HashMap::new()));
    let max_requests = 120;
    let time_window = 60 * 60 * 1000;

    let run_code = warp::post()
        .and(warp::path("api/run-rust"))
        .and(warp::body::json())
        .and(with_request_counts(request_counts.clone()))
        .and_then(move |code_request: CodeRequest, request_counts: Arc<Mutex<std::collections::HashMap<String, (i32, u64)>>| {
            let max_requests = max_requests;
            let time_window = time_window;
            async move {
                let client_ip = "client_ip_placeholder".to_string(); // 실제 클라이언트 IP를 가져오는 로직 필요
                let mut counts = request_counts.lock().await;

                let current_time = std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)
                    .unwrap()
                    .as_millis() as u64;

                let entry = counts.entry(client_ip.clone()).or_insert((0, current_time));

                if current_time - entry.1 < time_window {
                    entry.0 += 1;
                } else {
                    *entry = (1, current_time);
                }

                if entry.0 > max_requests {
                    return Ok(warp::reply::with_status(
                        warp::reply::json(&serde_json::json!({ "error": "Too many requests. Please try again later." })),
                        warp::http::StatusCode::TOO_MANY_REQUESTS,
                    ));
                }

                match run_wasm(&code_request.code).await {
                    Ok(result) => Ok(warp::reply::json(&CodeResponse { result })),
                    Err(err) => Ok(warp::reply::with_status(
                        warp::reply::json(&serde_json::json!({ "error": err })),
                        warp::http::StatusCode::INTERNAL_SERVER_ERROR,
                    )),
                }
            }
        });

    warp::serve(run_code).run(([0, 0, 0, 0], 7392)).await;
}

async fn run_wasm(code: &str) -> Result<String, String> {
    let engine = Engine::default();
    let module = Module::new(&engine, code).map_err(|e| e.to_string())?;
    let mut store = Store::new(&engine, ());
    let instance = Instance::new(&mut store, &module, &[]).map_err(|e| e.to_string())?;
    let run = instance.get_typed_func::<(), (), _>(&mut store, "_start").map_err(|e| e.to_string())?;
    run.call(&mut store, ()).map_err(|e| e.to_string())?;
    Ok("Execution successful".to_string())
}

fn with_request_counts(
    request_counts: Arc<Mutex<std::collections::HashMap<String, (i32, u64)>>>,
) -> impl Filter<Extract = (Arc<Mutex<std::collections::HashMap<String, (i32, u64)>>>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || request_counts.clone())
}
/*
1. Warp 서버 설정 : WASM 파일을 받아서 실행하는 서버, JSON 형태로 WASM 파일을 받아서 실행 결과를 반환
2. wasmtime 을 사용하여 WebAssembly 모듈을 안전하게 실행합니다.



*/
