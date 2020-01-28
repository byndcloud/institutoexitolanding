import axios from 'axios'

export async function getPageElement (url) {
  // let html = await fetch(url,
  //   {
  //     method: 'GET',
  //     headers: new Headers({
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'text/html'
  //     }),
  //     mode: 'cors',
  //     cache: 'default'
  //   }
  // )

  let html = await axios.get(
    'https://cors-anywhere.herokuapp.com/' + url,
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
  )

  let el = document.createElement('html')
  el.innerHTML = await html.data

  return el
}

export async function getPreview (url) {
  let page = await getPageElement(url)

  let img = page.querySelector("meta[property='og:image']")
  img = img ? img.getAttribute('content') : null

  let title = page.querySelector("meta[property='og:title']")
  title = title ? title.getAttribute('content') : null

  let description = page.querySelector("meta[property='og:description']")
  description = description ? description.getAttribute('content') : null

  let source = page.querySelector("meta[property='og:site_name']")
  source = source ? source.getAttribute('content') : null

  return { img, title, description, source }
}
