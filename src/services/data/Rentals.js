export const Rentals = () =>
[

   {
    
   price: 5467.0,
   startDate: "2022-02-14T21:00:00.000+00:00",
   endDate: "2022-03-13T21:00:00.000+00:00",
   vehicle: 1,
   customer : 2

}
].map((item,index) => ({
    id: index+1,
    ...item
  }))