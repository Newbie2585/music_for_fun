let btn = document.getElementById("btn");
let id = btn.textContent;

btn.addEventListener("click",() => {
    fetch(`http://localhost:8080/index/${id}`)
    .then((response) => {
        if(!response.ok){
            throw new Error("response betrayed");
        }
        console.log("RESPONSE RECEIVED");
        return response.json();
    })
    .then((data) => {
        console.log(data.data);
        btn.textContent = data.data;
    })
    .catch((error) => {
        console.error("failed on response");
    });
});