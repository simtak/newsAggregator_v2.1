


document.getElementById("headlines-search-btn").addEventListener("click", (e) => {
    e.preventDefault()
    const queryInput = document.getElementById("headlines-query-input").value

    
    const dataObject = {
        query: queryInput,
        country: "",
        category: ""
    }

    getDataFromApi(dataObject)


})






async function getDataFromApi(dataObject){

    const query = dataObject.query ? `q=${dataObject.query}&` : ""
    const country = dataObject.country ? `country=${dataObject.country}&` : "country=us&" //default US news
    const category = dataObject.category ? `category=${dataObject.category}&` : ""
    
    console.log(query)
    const response = await fetch(`https://newsapi.org/v2/top-headlines?${query}${country}${category}apiKey=09d8a95cabc9457dbc40a0943edfdacd`)

    const data = await response.json()
    console.log(data)
    displayHeadlineSearchResults(data)
}
 



function displayHeadlineSearchResults(data){
    const container =  document.getElementById("headlines-results-container")
    const apiData = data.articles
    

    const html = apiData.map(element => {
        
        return `
        <div class="results-box">
            <div class="image-container">
                <img class="container-img" src="${element.urlToImage}">
            </div>
            <div>
                <a class="results-box-link" href="${element.url}">${element.title}</a>
                <p>${element.description}</p>
            </div>
            <div class="container-meta-infos">
                <p>Author: ${element.author}</p>
                <p>Published: ${element.publishedAt.substr(0,10)}</p>
                <p>Source: ${element.source.name}</p>
            </div>

            
        </div>`

        
    }).join("")

    container.innerHTML = html
    

}
