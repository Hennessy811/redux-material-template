import faker from 'faker';
import { default as casualHelper } from 'casual-browserify';

const casual: Casual.Generators & Casual.Casual = require('casual-browserify').ru_RU;
faker.setLocale('ru');

export type RequestDataItemState = 'pending' | 'rejected' | 'approved' | 'changes requested';

export interface EmployeesDataItem {
  id: string;
  fullName: string;
  order?: string;
  specialization: string;
  price?: number;
}

export interface RequestDataItem {
  id: string;
  img?: string;
  tag?: string;
  payUntil?: string;
  tagColor?: string;
  title: string;
  content: string;
  price: number;
  type: 'single' | 'registry';
  state: RequestDataItemState;
  employees: EmployeesDataItem[];
}

const getEmployees = (amount: number) =>
  Array.from({ length: amount }).map(() => ({
    id: faker.datatype.uuid(),
    fullName: `${casual.full_name}`,
    order: faker.name.jobArea(),
    specialization: faker.name.jobTitle(),
    price: faker.datatype.number(20000),
  }));

const incomingRequests: RequestDataItem[] = [
  {
    id: 'db52af72-5cf9-4aed-af75-22c4ed73741a',
    img:
      'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Реестр от 19.04.2021',
    payUntil: 'до завтра',
    tag: 'Торговый зал',
    content: '68 исполнителей | 23 заказа',
    price: 216840,
    type: 'registry',
    state: 'pending',
    employees: getEmployees(68),
  },
  {
    id: 'db52af72-5cf9-4aed-af75-1234ed73741a',
    img:
      'https://images.unsplash.com/photo-1604605801370-3396f9bd9cf0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Реестр от 15.03.2021',
    payUntil: '30.03.2021',
    tag: 'Доставка',
    content: '12 исполнителей | 12 заказов',
    price: 32250,
    type: 'registry',
    state: 'approved',
    employees: getEmployees(68),
  },
  {
    id: 'fa72a1c8-a831-4d3e-9950-a2f760c9db35',
    // img:
    //   'https://images.unsplash.com/photo-1619139529130-f168eccd80d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'Реестр от 30.03.2021',
    payUntil: 'до 15.04.2021',
    tag: 'Касса',
    content: '42 исполнителя | 6 заказов',
    price: 183221.4,
    type: 'registry',
    state: 'pending',
    employees: getEmployees(42),
  },
  {
    id: '65d5a0b9-8f1e-43fb-9339-992f76253257',
    // img:
    //   'https://images.unsplash.com/photo-1619139529130-f168eccd80d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    title: 'SMM-менеджер',
    payUntil: 'до 15.04.2021',
    // tag: 'Аванс',
    content: '1 исполнитель',
    price: 21000,
    type: 'single',
    state: 'pending',
    employees: getEmployees(1),
  },
  {
    id: '65d5a0b9-8f1e-43fb-9339-992f7625325712421',
    title: 'Пополнить баланс',
    // payUntil: 'до 15.04.2021',
    tag: 'Внутренний',
    content: 'По итогам выплат на конец апреля баланс на платформе подходит к концу',
    price: 2100000,
    type: 'single',
    state: 'pending',
    employees: [],
  },
];

export default incomingRequests;
