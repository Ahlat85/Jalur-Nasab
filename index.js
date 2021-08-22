const express = require("express");
const app = express();

const settings = require("./settings.json");
const nasab = require(settings.app.file);
const data_one_page = 104;

app.set("view engine", "ejs");
app.use("/assets/css", express.static("public/css"));
app.use("/assets/js", express.static("public/js"));

app.get("/", function(req, res){
  res.redirect("/1");
});

app.get("/:page", function (req, res) {
  const data = {
    title_page: "Index",
    start: data_one_page * req.params.page - data_one_page,
    page: String((req.params.page)).toIndiaDigits(),
    pagination: Math.ceil(nasab.length / data_one_page),
    nasab: getNasab(parseInt(req.params.page))
  }
  res.render("pages/index", data);
})

function getNasab(page) {
  let start = data_one_page * page - data_one_page;
  let end = (data_one_page * page - data_one_page) + data_one_page;
  
  return nasab.slice(start, end);
}

String.prototype.toIndiaDigits= function(){
 var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
 return this.replace(/[0-9]/g, function(w){
  return id[+w]
 });
}

app.listen(settings.app.port, () => {
  console.log(`Aplikasi Berjalan dengan Port http://localhost:${settings.app.port}`)
})