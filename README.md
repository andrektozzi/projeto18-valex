# projeto18-valex

A Typescript designed project to manage benefit cards among companies and employees

<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png">
</p>
<h1 align="center">
  Valex
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

Valex simulates an API that manages a benefit card, generally made available by companies to their employees.

</br>

## Features

- Create card
- View transactions
- Activate / Block / Unblock a card
- Recharge a card
- Make card payments

</br>

## API Reference

### Create a card

```http
POST /newcards/:employeeid
```

#### Request:

| Body   | Type     | Description                        |
| :----- | :------- | :--------------------------------- |
| `type` | `string` | **Required**. type of card benefit |

`Valid types: [groceries, restaurant, transport, education, health]`

####

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

</br>

### Activate a card

```http
PUT /activatecards/:cardid
```

#### Request:

| Body           | Type     | Description                 |
| :------------- | :------- | :-------------------------- |
| `password`     | `string` | **Required**. card password |
| `securityCode` | `string` | **Required**. card cvv      |

`Password length: 4`

`Password pattern: only numbers`

`Cvv max length: 3`

#

### View transactions

```http
GET /viewtransactions/:cardid
```

#### Request:

| Params   | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

#

### Block a card

```http
PUT /blockcards/:cardid
```

#### Request:

| Params   | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `password` | `string` | **Required**. card password |

#

### Unblock a card

```http
PUT /unblockcards/:cardid
```

#### Request:

| Params   | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `password` | `string` | **Required**. card password |

#

### Recharge a card

```http
POST /rechargecards/:cardid
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Params   | Type      | Description           |
| :------- | :-------- | :-------------------- |
| `cardId` | `integer` | **Required**. card Id |

| Body     | Type      | Description                   |
| :------- | :-------- | :---------------------------- |
| `amount` | `integer` | **Required**. recharge amount |

#

### Card payments

```http
POST /paymentcards/:businessid
```

#### Request:

| Params       | Type      | Description                        |
| :----------- | :-------- | :--------------------------------- |
| `businessId` | `integer` | **Required**. card expiration date |

| Body       | Type      | Description                  |
| :--------- | :-------- | :--------------------------- |
| `cardId`   | `integer` | **Required**. card Id        |
| `password` | `string`  | **Required**. card password  |
| `amount`   | `integer` | **Required**. payment amount |

#
