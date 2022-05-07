interface Address {
  address: string
  city: string
  country: string
  latitude: string
  line1: string
  line2: string
  state: string
  zip: string
}

export interface Location {
  address: Address
  name: string
  timeZone: string
  uuid: string
}
