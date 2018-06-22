import entries from 'lodash/entries'

interface Params {
  [key: string]: string
}

export function url(base: string, params: Params) {
  const p = entries(params)
    // .map(([key, value]) => `${key}=${value}`)
    .map(v => v.join('='))
    .join(';')
  return `${base}?${p}`
}

export function checkResp(resp: Response) {
  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error()
  }
}

export function post(postURL: string, body: any) {
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    }
  }

  return fetch(postURL, options)
}
