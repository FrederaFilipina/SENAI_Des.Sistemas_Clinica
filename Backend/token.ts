import jwt from "jsonwebtoken"

const Secret_Key = "chaveMegaUltraHiperPowersecreta1"

const token = jwt.sign(
    {
        userId: 1,
        email: "usuario@exemplo.com",
        role: "admin"
    },
    Secret_Key,
    {
        expiresIn: "5s"
    }
)

setTimeout(()=>{
    try{
        const decoded = jwt.verify(token, Secret_Key)
        console.log("Decodificado:", decoded)
    } catch (error) {
        console.error("Token invalido", error.mensage)
    }
}, 5500)

console.log("JWT:", token)