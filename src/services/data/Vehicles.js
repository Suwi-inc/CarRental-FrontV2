
export const Vehicles = () =>
[
    {
        //"id": 1,
        carName: "Mercedez",
        model: "e200",
        registration: "a001",
        colour: "black"
    },
    {
        //"id": 2,
        carName: "BMW",
        model: "M3",
        registration: "a002",
        colour: "grey"
    },
    {
       // "id": 3,
        carName: "Toyota",
        model: "Camry",
        registration: "a003",
        colour: "red"
    }

]
.map((item,index) => ({
    id: index+1,
    ...item
  }))