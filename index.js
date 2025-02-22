import express from 'express'

const app = express()
const port = 3000

//send the data: 

// app.get("/", (req, res) =>{
//     res.send("Hello from Amresh!")
// })
// app.get("/cool-car", (req, res) =>{
//     res.send("what car will you prefer to buy!")
// })
// app.get("/twitter", (req, res) =>{
//     res.send("#Amresh!")
// })

app.use(express.json())

let carData =[]
let nextId=1

//creating different routs so that i can add this different car data and can see and update car data.
//add a new car
app.post('/cars', (req,res)=>{
    const {model, price} = req.body
    const newCar = {id: nextId++, model, price}
    carData.push(newCar)
    res.status(201).send(carData)
})

//saving to carData array.
//get all car
app.get('/cars', (req,res)=>{
    res.status(200).send(carData)
})

//getting single car
//accessing anything by a url can be done by a params keyword. String type return.
//get a car with id
app.get('/cars/:id',(req,res)=>{
    const car = carData.find(c => c.id === parseInt(req.params.id))
    if(!car){
        return res.status(404).send("Car not found")
    }
    res.status(200).send(car)
})

//update car

app.put('/cars/:id', (req,res)=>{
    const car = carData.find(c => c.id === parseInt(req.params.id))
    if(!car){
        res.status(404).send("Car not found")
    }
    const {model, price}= req.body
    car.model=model
    car.price=price
    res.send(200).send(car)
})

//delete tea

app.delete('/cars/:id', (req,res)=>{
    const index = carData.findIndex(c => c.id === parseInt(req.params.id))
    if(index == -1){
        return res.status(404).send("car not found")
    }
    carData.splice(index,1)
    return res.status(204).send('deleted')

})

app.listen(port, ()=>{
    console.log(`Server is running at port: ${port}...`)
})