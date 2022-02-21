
export const Customers = () =>
[
 {
    
    fullName: "Сувиланджи Кампамба Силвамба",
    address: "Воронеж, ул. Холзунова 35",
    phoneNumber: "87999332"
},
{
    
    fullName: "Иванов Иван Иванович",
    address: "Воронеж, ул. Холзунова 45",
    phoneNumber: "87455578"
},
{
    //"id": 3,
    fullName: "Петров Иван Иванович",
    address: "Воронеж, ул. Холзунова 42",
    phoneNumber: "89567845"
},
{
   // "id": 4,
    fullName: "Random fourth name",
    address: "voronrzh, kholzunova 10",
    phoneNumber: "89000687"
}
].map((item) => ({
    id: +Date(),
    ...item,
  }));
