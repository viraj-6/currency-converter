let basec_URL=" https://v6.exchangerate-api.com/v6/2a54036929f5ebdfe732b9a9/latest/USD"

const selector = document.querySelectorAll(".selector select");
const from = document.querySelector(".from");
const to = document.querySelector(".to");
const ico = document.querySelector(".ico");
const msg = document.querySelector(".msg p");
console.log(msg);
let fromCode = "US";
let toCode = "IN";
let fromCountry ="USA";
let toCountry ="INR";
let btn = document.querySelector("form button")
// console.log(document);
// console.log(from);
//const from = document.querySelectorAll(".from img");
// console.log(to);
// for(code in countryList){
//     console.log(code , countryList[code]);
// }
for(let select of selector){
    for(counrtyCode in countryList){
        let newOpesan = document.createElement("option");
            newOpesan.innerText = counrtyCode ;
            newOpesan.value = counrtyCode;
            if(select.name === "from" && counrtyCode === "USD"){
                newOpesan.selected="selected";
            }
            else if(select.name === "to" && counrtyCode === "INR"){
                newOpesan.selected="selected";
            }
            select.append(newOpesan);

    }
    
    select.addEventListener("change" , (eve) =>{
        upedetFlag(eve.target);
        if(eve.target.name=="from"){
            // console.log(fromCode);
            fromCode=countryList[eve.target.value]
            fromCountry=eve.target.value;
        } 
        else  if(eve.target.name=="to"){
            toCode=countryList[eve.target.value]
            toCountry=eve.target.value;

        }
    })
}
// ico.addEventListener("click",(eve)=>{
//     // console.log(fromCode);
//     // console.log(toCode);
//     // console.log(eve);
//     exchange();
// })
let upedetFlag =(element)=>{
     counrtyCode = countryList[element.value];
    // console.log(element.value);
    let newStr =`https://flagsapi.com/${counrtyCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newStr;
    
}

// let exchange=()=>{
//     let temp = fromCountry;
//     fromCountry = toCountry;
//     toCountry=temp;
//     let selectFrom = from.querySelector("option");
//     selectFrom.value=fromCountry;
//     selectFrom.innerText=fromCountry;
//     //selectFrom.selected="selected";
  
//     let selectTo = to.querySelector("option");
//     selectTo.value=toCountry;
//     selectTo.innerText=toCountry;
//     //selectTo.selected="selected";

//     let temp1 ;
//     temp1 =fromCode;
//     fromCode=toCode;
//     toCode=temp1;
//     let imgForm = from.querySelector("img");
//     let srcFrom = `https://flagsapi.com/${fromCode}/flat/64.png`;
//     let srcTo = `https://flagsapi.com/${toCode}/flat/64.png`;
//     let imgTo = to.querySelector("img");
//     imgForm.src = srcFrom;
//     imgTo.src = srcTo;
// }

let upedetRate = async()=>{
    let amaunt = document.querySelector("input");
    let amt = amaunt.value;
    let respons = await fetch(basec_URL);
    let data = await respons.json();
    let str1 =`data.conversion_rates.${toCountry}`
    console.log(data.conversion_rates[fromCountry]);
    let finalRate;
    if(data.conversion_rates[toCountry] >= data.conversion_rates[fromCountry] ){
        finalRate = amt / data.conversion_rates[toCountry];
    }
    else{
         finalRate = amt * data.conversion_rates[toCountry];
    }
    let ans = `${amt} ${fromCountry} = ${finalRate} ${toCountry}`;
    msg.innerText = ans;
}
btn.addEventListener("click",(eve)=>{
    eve.preventDefault();
    upedetRate();
})
document.addEventListener("load",()=>{
    upedetRate();
})
