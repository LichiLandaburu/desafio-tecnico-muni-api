import { hash } from "../config/bcrypt";


export const seedData = {

  users: [
    { name: "Root", lastname: "Root", email: "admin@mail.com", password: hash("123456"), dni: 38282221, birthday: new Date("1999-01-01").toLocaleDateString(), role: "admin" },
    { name: "Jorge", lastname: "Perez", email: "jperez@mail.com", password: hash("123456"), dni: 40211021 , birthday: new Date("1982-04-16").toLocaleDateString() },
    { name: "Maria", lastname: "Gomez", email: "mgomez@mail.com", password: hash("123456"), dni: 39863992, birthday: new Date("1988-07-02").toLocaleDateString() },
    { name: "Estefania", lastname: "Diaz", email: "ediaz@mail.com", password: hash("123456"), dni: 34453009, birthday: new Date("2000-12-06").toLocaleDateString() },
    { name: "Pablo", lastname: "Cardozo", email: "pcardozo@mail.com", password: hash("123456"), dni: 30411685, birthday: new Date("1973-09-21").toLocaleDateString() },
  ],

  procedures: [
    { name: "Jorge", lastname: "Perez", email: "jperez@mail.com", dni: 40211021, province: "Buenos Aires", city: "San Nicolás", address: "Italia 220", postal_code: 2900, telephone: 1234567890, comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { name: "Esteban", lastname: "Lopez", email: "elopez@mail.com", dni: 38282221, province: "Buenos Aires", city: "San Nicolás", address: "Rivadavia 400", postal_code: 2900, telephone: 382832223, status: "rejected" },
    { name: "Josefina", lastname: "Insua", email: "jinsua@mail.com", dni: 34200033, province: "Buenos Aires", city: "San Nicolás", address: "Av. Savio 1220", postal_code: 2900, telephone: 333289444, status: "approved", comments: "Sit amet, lorem ipsum dolor sit amet. Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { name: "Estefania", lastname: "Diaz", email: "ediaz@mail.com", dni: 34453009, province: "Buenos Aires", city: "San Nicolás", address: "Rademil 400", postal_code: 2900, telephone: 32432423323, status: "approved" },
    { name: "Pablo", lastname: "Cardozo", email: "pcardozo@mail.com", dni: 30411685, province: "Buenos Aires", city: "San Nicolás", address: "Roca 123", postal_code: 2900, telephone: 2343242342, status: "rejected" },
    { name: "Victor", lastname: "Hernandez", email: "vhernandez@mail.com", dni: 29481222, province: "Buenos Aires", city: "San Nicolás", address: "Francia 1402", postal_code: 2900, telephone: 2348234333, status: "approved" },
    { name: "Lucas", lastname: "Villalba", email: "lvillalba@mail.com", dni: 38400500, province: "Buenos Aires", city: "San Nicolás", address: "Rivadavia 111", postal_code: 2900, telephone: 4548743873, comments: "Ipsum elit, sed do eiusmod tempor incididunt. Voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
  ]

}
