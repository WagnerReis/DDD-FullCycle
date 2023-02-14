export interface InputCreateCustomerDto {
  name: string;
  address: Address;
}

export interface Address {
  street: string;
  number: number;
  zip: string;
  city: string;
}

export interface OutputCreateCustomerDto {
  id: string;
  name: string;
  address: Address;
}
