import  Mock from "mockjs"
import data from "./data.json"

Mock.mock("/api/getShopData",{
    code:0,
    data
})
