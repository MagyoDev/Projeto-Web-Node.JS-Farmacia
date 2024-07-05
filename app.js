const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const serviceAccount = require('./firebase-config.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.render("CadProduto");
  });
  
  const tipoDeProduto = {
    type1: "Medicamento Fitoterápico",
    type2: "Medicamento Alopático",
    type3: "Medicamento Homeopático",
    type4: "Medicamento Similar",
    type5: "Medicamento Genérico",
    type6: "Medicamento de Referência",
    type7: "Medicamento Manipulado"
  };
  
  app.get("/ConsProduto", async function (req, res) {
    try {
      const dataSnapshot = await db.collection('Produtos').get();
      const data = [];
  
      dataSnapshot.forEach((doc) => {
        const productType = tipoDeProduto[doc.get('productType')] || doc.get('productType');
        data.push({
          id: doc.id,
          productType: productType,
          productName: doc.get('productName'),
          validity: doc.get('validity'),
          observations: doc.get('observations'),
        });
      });
      res.render("ConsProduto", { data });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      res.status(500).send("Erro ao buscar produtos");
    }
  });
  
  app.get("/EditProduto/:id", async function (req, res) {
    try {
      const dataSnapshot = await db.collection('Produtos').doc(req.params.id).get();
      if (!dataSnapshot.exists) {
        console.error("Documento não encontrado");
        return res.status(404).send("Produto não encontrado");
      }
  
      const data = {
        id: dataSnapshot.id,
        productType: dataSnapshot.get('productType'),
        productName: dataSnapshot.get('productName'),
        validity: dataSnapshot.get('validity'),
        observations: dataSnapshot.get('observations'),
      };
      res.render("EditProduto", { data });
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      res.status(500).send("Erro ao buscar produto");
    }
  });
  
  app.get("/excluir/:id", async function (req, res) {
    try {
      await db.collection('Produtos').doc(req.params.id).delete();
      console.log('Documento excluído');
      res.redirect('/ConsProduto');
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      res.status(500).send("Erro ao excluir produto");
    }
  });
  
  app.post("/CadProduto", async function (req, res) {
    try {
      await db.collection('Produtos').add({
        productType: req.body.productType,
        productName: req.body.productName,
        validity: req.body.validity,
        observations: req.body.observations,
      });
      console.log('Produto adicionado');
      res.redirect('/ConsProduto');
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      res.status(500).send("Erro ao adicionar produto");
    }
  });
  
  app.post("/atualizar", async function (req, res) {
    try {
      await db.collection("Produtos").doc(req.body.id).update({
        productType: req.body.productType,
        productName: req.body.productName,
        validity: req.body.validity,
        observations: req.body.observations,
      });
      console.log("Documento atualizado");
      res.redirect("/ConsProduto");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).send("Erro ao atualizar produto");
    }
  });
  
  app.listen(8081, function () {
    console.log("Servidor ativo!");
  });