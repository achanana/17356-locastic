import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://credit.17-356.isri.cmu.edu/api',
  headers: { Accept: 'application/json' },
})

export async function processPayment(total: number) {
  try {
    const response = await instance.post('transactions', {
      companyId: 'locastic',
      amount: total,
    })
    return response.data.id
  } catch (error) {
    return null
  }
}

export async function checkPaymentStatus(transId: number) {
  try {
    const response = await instance.get('trasactions/' + transId)
    return response.data.status
  } catch (error) {
    return null
  }
}
