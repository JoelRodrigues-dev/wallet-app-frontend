
const renderFinancelist = (data) => {
  const table = document.getElementById('Finance-table')
  
  
  data.map((item) =>{
    const tableRow = document.createElement("tr")

     // titulo 

     const titleTd = document.createElement("td")
     const titleText = document.createTextNode(item.title)
     titleTd.appendChild(titleText);
     tableRow.appendChild(titleTd)

      // categoria

    const categoryTd = document.createElement("td")
    const categoryText = document.createTextNode(item.name)
    categoryTd.appendChild(categoryText);
    table.appendChild(categoryTd)

    // data

    const dateTd = document.createElement("td")
    const dateText = document.createTextNode(new Date(item.date).toLocaleDateString())
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd)

    // value

    const valueTd = document.createElement("td")
    valueTd.className = "center"
    const valueText = document.createTextNode(new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.value))
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd)


    // Ação

    const deleteTd = document.createElement("td")
    deleteTd.className = "right"
    const deleteText = document.createTextNode("Deletar")
    deleteTd.appendChild(deleteText);
    tableRow.appendChild(deleteTd)


    // table add tableRow

    table.appendChild(tableRow)
  })
}


const renderFinanceElements = (data) => {
  const totalItems = data.length
  const revenues = data.filter(item => Number(item.value) > 0).reduce((acc, item) => acc + Number(item.value), 0)
  const expenses = data.filter(item => Number(item.value) < 0).reduce((acc, item) => acc + Number(item.value), 0)
  const totalValues = revenues + expenses;

// render total items
const financeCard1 = document.getElementById("finance-card1")
const totalText= document.createTextNode(totalItems)
const totalElements = document.createElement("h1")
revenueTextElements.className = "mt smaller"
revenueTextElements.appendChild(revenueText)
financeCard1.appendChild(revenueTextElements)

// render revenue

const financeCard2 = document.getElementById("finance-card2")
const revenueText= document.createTextNode(new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(revenues))
const revenueTextElements = document.createElement("h1")
revenueTextElements.className = "mt smaller"
revenueTextElements.appendChild(revenueText)
financeCard2.appendChild(revenueTextElements)

// render expenses 


const financeCard3 = document.getElementById("finance-card3")
const expensesText= document.createTextNode(new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(expenses))
const expensesTextElements = document.createElement("h1")
revenueTextElements.className = "mt smaller"
revenueTextElements.appendChild(expensesText)
financeCard3.appendChild(expensesTextElements)


// render balance


const financeCard4 = document.getElementById("finance-card4")
const balanceText= document.createTextNode(new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalValues))
const balanceTextElements = document.createElement("h1")
revenueTextElements.className = "mt smaller"
balanceTextElements.style.color = '#5936cd'
revenueTextElements.appendChild(balanceText)
financeCard3.appendChild(balanceTextElements)

}


const onLoadFinancesData = async () => {
  try {
    const date = '2022-12-15'
    const email = localStorage.getItem("@WalletApp:userEmail")
    const result = await fetch(`https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`, {method: 'GET', headers:{email:email}})

    const data = await result.json()
    renderFinanceElements(data);
    renderFinancelist(data);
    return data


  } catch (error)  {
    return error
  }
}




const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail")
  const name = localStorage.getItem("@WalletApp:userName")


  const navbarUserInfo = document.getElementById("navbar-user-container")
  const navbarUserAvatar = document.getElementById("navbar-user-avatar")


  // add user email

  const emailElement = document.createElement("p")
  const emailText = document.createTextNode(email)

  emailElement.appendChild(emailText)
  navbarUserInfo.appendChild(emailText)

  // add logout link
  const logoutElement = document.createElement("a")
  const logoutText = document.createTextNode("sair")
  logoutElement.appendChild(logoutText)
  navbarUserInfo.appendChild(logoutElement)


  // add user first letter

    const nameElement = document.createElement("h3")
    const nameText = document.createTextNode(name.charAt(0))

    nameElement.appendChild(nameText)
    navbarUserAvatar.appendChild(nameElement)

}

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
  
} 