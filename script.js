let btnAction = document.getElementById('btn')

btnAction.addEventListener("click", getDataForm)

async function getDataAPI(username, password) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(await "GET", `https://painel.fstream.tk/extension?username=${username}&senha=${password}`, false); // false for synchronous request
    xmlHttp.send(null);

    return result = { status: xmlHttp.status, msg: xmlHttp.responseText };
}

async function lol() {
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
        let username = localStorage.getItem('username'),
            password = localStorage.getItem('password')
        let data = await getDataAPI(username, password)
        let body = document.getElementsByTagName('body')[0];

        body.innerHTML = `
        <main class="dashboard">
            <nav class="navbar navbar-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img src="https://i.imgur.com/DvW6HI1.png" alt="" width="30" height="30"
                            class="d-inline-block align-text-top">
                        <text class="text-login">Pontos nos canais</text>
                    </a>
                    <a target="blank" href="https://painel.fstream.tk/"><i class='bx bxs-dashboard'></i></a>
                </div>
            </nav>
            <br/>
            <div class="container">
            <!-- <div id="username"></div> -->
                <div id="canais"></div> 
            </div>
            <footer class="bg-purple text-center text-lg-start">
                <div class="text-center p-3">
                    Todos os direitos reservados © FStream 2021
                </div>
            </footer>
        </main>
        <script type="text/javascript" src="script.js"></script>`

        let array = JSON.parse(data.msg)

        let dataCanais = document.getElementById('canais')
        // let dataUsername = document.getElementById('username')

        // dataUsername.innerHTML = `<p class="username">Logado como: ${username}</p>`

        for (var i = 0; i < array.length; i++) {
            dataCanais.innerHTML += `<div class="channels">
            <h6 class="channel-name">${array[i].streamer}</h6>
            <h6 class="channel-points"><i class='bx bxs-coin-stack'></i> ${array[i].points.toLocaleString()}</h6>
            <a target="blank" href="https://streamelements.com/${array[i].streamer}/store"><i class='bx bx-store'></i></a>
            </div><br/>`
        }
    }
}

lol()


async function getDataForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === '' || password === '') {
        var elementErro = document.getElementById('erro')
        elementErro.innerHTML = 'Você precisa inserir usuário e a senha'

        setTimeout(function () {
            elementErro.innerHTML = ''
        }, 5000);
    } else if (username && password && username !== '' && password !== '') {
        let data = await getDataAPI(username, password)
        let body = document.getElementsByTagName('body')[0];

        if (data.status === 200) {

            body.innerHTML = `
            <main class="dashboard">
                <nav class="navbar navbar-light">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            <img src="https://i.imgur.com/DvW6HI1.png" alt="" width="30" height="30"
                                class="d-inline-block align-text-top">
                            <text class="text-login">Pontos nos canais</text>
                        </a>
                        <a target="blank" href="https://painel.fstream.tk/"><i class='bx bxs-dashboard'></i></a>
                    </div>
                </nav>
                <br/>
                <div class="container">
                <!-- <div id="username"></div> -->
                    <div id="canais"></div> 
                </div>
                <footer class="bg-purple text-center text-lg-start">
                    <div class="text-center p-3">
                        Todos os direitos reservados © FStream 2021
                    </div>
                </footer>
            </main>
            <script type="text/javascript" src="script.js"></script>`

            let array = JSON.parse(data.msg)

            let dataCanais = document.getElementById('canais')
            // let dataUsername = document.getElementById('username')

            // dataUsername.innerHTML = `<p class="username">Logado como: ${username}</p>`

            for (var i = 0; i < array.length; i++) {
                dataCanais.innerHTML += `<div class="channels">
                <h6 class="channel-name">${array[i].streamer}</h6>
                <h6 class="channel-points"><i class='bx bxs-coin-stack'></i> ${array[i].points.toLocaleString()}</h6>
                <a target="blank" href="https://streamelements.com/${array[i].streamer}/store"><i class='bx bx-store'></i></a>
                </div><br/>`
            }

            localStorage.setItem('username', username)
            localStorage.setItem('password', password)

        } else if (data.status === 404) {
            var elementErro = document.getElementById('erro')
            elementErro.innerHTML = 'Username / password erradas.'
            setTimeout(function () {
                elementErro.innerHTML = ''
            }, 5000);
        }
    }
}