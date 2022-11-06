if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registeration => {
        console.log("SW Registered!");
        console.log(registeration);
    }).catch(error => {
        console.log("SW Registeration faild!");
        console.log(error);
    })
}