const express = require("express");
const app = express();

const db = require("./db")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

const nunjucks = require('nunjucks')

nunjucks.configure("views", {
    express: app,
    noCache: true, //boolean

})

app.get("/", (req, res) => {
  
  db.all(`SELECT * FROM  cartaz`, function(err, rows) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        
        const reversed = [...rows].reverse()

            let cartaz = []
            for (let carta of reversed) {
                if(cartaz.length < 1) {
                    cartaz.push(carta)
                }
            }
            return res.render("index.html", { cartaz: cartaz })
    })
})

app.get("/dashboard", (req, res) => {
  res.render("cartaz.html")
})

app.get("/login", (req, res) => {
  res.render("login.html")
})

app.get("/unidades", (req, res) => {

  db.all(`SELECT * FROM  logoFalcao`, function(err, rows) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        
        const reversed = [...rows].reverse()

            let logoFalcao = []
            for (let logo of reversed) {
                if(logoFalcao.length < 1) {
                    logoFalcao.push(logo)
                }
            }
            return res.render("unidades.html", { logoFalcao: logoFalcao })
    })
});

app.get("/unidades/falcoes", (req, res) => {
  
  db.all(`SELECT * FROM  falcoes`, function(err, rows) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        
        const reversed = [...rows].reverse()

            let falcoes = []
            for (let aviso of reversed) {
                if(falcoes.length < 1) {
                    falcoes.push(aviso)
                }
            }
            return res.render("falcoes.html", { falcoes: falcoes })
    })
})

app.get("/enfases/fisica", (req, res) => {
  
  db.all(`SELECT * FROM  enfMental`, function(err, rows) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        
        const reversed = [...rows].reverse()

            let enfFisica = []
            for (let enfase of reversed) {
                if(enfFisica.length < 1) {
                    enfFisica.push(enfase)
                }
            }
            return res.render("enf-fisica.html", { enfFisica: enfFisica })
    })
})

app.get("/enfases/mental", (req, res) => {
  
  db.all(`SELECT * FROM  enfMental`, function(err, rows) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        
        const reversed = [...rows].reverse()

            let enfMental = []
            for (let enfase of reversed) {
                if(enfMental.length < 1) {
                    enfMental.push(enfase)
                }
            }
            return res.render("enf-mental.html", { enfMental: enfMental })
    })
})


app.get("*", (req, res) => {
  res.status(404).render("404.html")
})

app.post("/", (req, res) => {
        const query = `
    INSERT INTO cartaz(
        image,
        title,
        description
    )   VALUES (?,?,?);
`

    const values = [
        req.body.image,
        req.body.title,
        req.body.description
    ] 
    db.run(query, values, function(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/")
    })

})

app.post("/unidades", (req, res) => {
        const query = `
    INSERT INTO logoFalcao(
        image,
        title,
        description,
        logo
    )   VALUES (?,?,?,?);
`

    const values = [
        req.body.image,
        req.body.title,
        req.body.description,
        req.body.logo
    ] 
    db.run(query, values, function(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/unidades")
    })

})

app.post("/falcoes-aviso", (req, res) => {
        const query = `
    INSERT INTO falcoes(
        image,
        title,
        description
    )   VALUES (?,?,?);
`

    const values = [
        req.body.image,
        req.body.title,
        req.body.description
    ] 
    db.run(query, values, function(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/unidades/falcoes")
    })

})

app.post("/enfase-fisica", (req, res) => {
        const query = `
    INSERT INTO enfMental(
        image,
        title,
        description
    )   VALUES (?,?,?);
`

    const values = [
        req.body.image,
        req.body.title,
        req.body.description
    ] 
    console.log(req.body.description)
    db.run(query, values, function(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/enfases/fisica")
    })

})

app.post("/enfase-mental", (req, res) => {
        const query = `
    INSERT INTO enfMental(
        image,
        title,
        description
    )   VALUES (?,?,?);
`

    const values = [
        req.body.image,
        req.body.title,
        req.body.description
    ] 
    console.log(req.body.description)
    db.run(query, values, function(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/enfases/mental")
    })

})

const listener = app.listen(process.env.PORT, () => {
  console.log("Desbravadores estão para desbravar! Na porta " + listener.address().port);
});
