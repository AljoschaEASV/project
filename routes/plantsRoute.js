const express = require("express")
const router = express.Router()

const Plant = require("../models/plants.js")
const jsPDF = require("jspdf");


//Enabling to get All routes using the blank blade.
router.get("/", async (req, res) => {

        const plants = await Plant.find()
    if(plants == null || undefined){
        console.log("No plantID Given ")
    }else{
        res.json(plants)
    }


})

//Getting one plant through the made middleware function all the way down the page.
router.get("/:id", getPlants, (req, res) => {
    res.json(res.foundPlant)
})

router.post("/", async (req, res) => {
    const createPlant = new Plant({
        name: req.body.name ,
        plantId: req.body.plantId,
        plantHumidity: req.body.plantHumidity,

        tempWarning: req.body.tempWarning,
        drySoil: req.body.drySoil
    })


    try{
        //todo Create the correct logic for the coming param
          if(newPlant.plantHumidity > 20 ){
            return console.log("To moist")
        } if(newPlant.plantHumidity < 20 ){
            return console.log("To dry")
        }
          if(newPlant.drySoil === true){
              console.log("Dude water the plant before Shipping")
          }
        else{
            (newPlant.plantId !== null)
              const doc = new jsPDF();
              newPlant.forEach(function(newPlant, i){
                  doc.text(20, 10 + (i * 10),
                      "This is the Plant Certificate All seems fine"
                  + "Plant Name: " + newPlant.name +
                      "Plant ID: " + newPlant.plantId+
                  "plantHumidity: " + newPlant.plantHumidity+
                  "tempWarning: Perfect Temp"+
                      "drySoil: Perfect Soil");
              });
              doc.save('Test.pdf');
          }

        let newPlant;
        newPlant = await createPlant.save();


        res.status(201).json(newPlant)
    }catch(err){
        //User bad Data === Error 400 (DB === 500;) )
        res.status(400).json({message: err.message})

    }

})



//Patch will only take some specific information und update these. If we did put instead it would update all fields.
router.patch("/:id",getPlants, async (req, res) => {
    if (req.body.name != null) {
        res.foundPlant.name = req.body.name
    }
    if (req.body.plantId != null) {
        res.foundPlant.plantId = req.body.plantId
    }
    //Changing the HumidityStatus
    if (req.body.plantHumidity != null) {
        res.foundPlant.plantHumidity = req.body.plantHumidity
    }
    if (req.body.tempWarning != null) {
        res.foundPlant.tempWarning = req.body.tempWarning
    }

    try {
        const changedPlant = await res.foundPlant.save()
        res.json(changedPlant)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete("/:id",getPlants, async (req, res) => {
try{
    await res.foundPlant.remove()
    res.json({message: "Deleted" + res.foundPlant.id})
}catch(err){
res.status(500).json({message: err.message})
}
})

//written to help the router requests working by ID holding less redundant code.
//Todo get plants from the Database.
async function getPlants(req, res, next) {
    let foundPlant
    try {
        foundPlant = await Plant.findById(req.params.id)
        if (foundPlant == null) {
            return res.status(404).json({ message: 'Cannot find foundPlant' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.foundPlant = foundPlant
    next()
}

//Adding CRUD Support

module.exports = router