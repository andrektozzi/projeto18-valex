import { faker } from "@faker-js/faker"
import dayjs from "dayjs";
import bcrypt from "bcrypt";


import * as cardRepository from "../repositories/cardRepository";
import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";

export async function create(apiKey: string, employeeId: number, type: cardRepository.TransactionTypes) {
    const company = await companyRepository.findByApiKey(apiKey);
    const employee = await employeeRepository.findById(employeeId);
    const existingCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId);

    if(!company || !employee) {
        throw {type: "not_found", message: "no data in the database"}
    }

    if(existingCard) {
        throw {type: "conflict", message: "employee already have a card with this type"}
    }

    const number = faker.finance.creditCardNumber('mastercard');
    const cardholderName = formatNamePrintedCard(employee.fullName);
    const expirationDate = dayjs().add(5, "year").format("MM/YY");
    const securityCode = faker.finance.creditCardCVV();
    const hash = bcrypt.hashSync(securityCode, 8);

    const card = {
        employeeId,
        number,
        cardholderName,
        securityCode: hash,
        expirationDate,
        isVirtual: false,
        isBlocked: false,
        type
    }

    await cardRepository.insert(card);
    return {card, securityCode};
}

function formatNamePrintedCard(employeeFullName: string) {
    const nameObject = employeeFullName.split(" ")
    const name = [nameObject[0]];
    for (let i = 1; i < nameObject.length -1; i++) {
        if(nameObject[i].length >= 3) {
            name.push(nameObject[i][0])
        }
    }
    name.push(nameObject[nameObject.length - 1]);
    return name.join(" ").toUpperCase();
}

export async function activation(id: number, cvc: string, password: string) {
    const card = await cardRepository.findById(id);

    if(!card) {
        throw {type: "not_found", message: "no data in the database"}
    }

    const today = dayjs().format("MM/YY");

    if(dayjs(today).isAfter(dayjs(card.expirationDate))) {
        throw {type: "bad_request", message: "expired card"}
    }

    if(card.password) {
        throw {type: "conflict", message: "card already has a password"}
    }

    const checkCVC = bcrypt.compareSync(cvc, card.securityCode);

    if(!checkCVC) {
        throw {type: "unauthorized", message: "unauthorized"}
    }

    if(Number(password) || password.length != 4) {
        throw {type: "bad_request", message: "wrong format for the password"}
    }

    const hash = bcrypt.hashSync(password, 8);
    await cardRepository.update(id, { password: hash });
}