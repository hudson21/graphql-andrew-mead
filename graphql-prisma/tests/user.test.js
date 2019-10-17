import { getFirstName, isValidPassword } from '../src/utils/user';

test('Should return firstname when given full name', () => {
    const firstName = getFirstName('Carlos Hudson')

    expect(firstName).toBe('Carlos')
})

test('Should return first name when given first name', () => {
    const firstName = getFirstName('Carlos')

    expect(firstName).toBe('Carlos')
})

test('Should reject password shorter than 8 characters', () => {
    const isValid = isValidPassword('flute')

    expect(isValid).toBe(false)
})

test('Should reject password that contains password', () => {
    const isValid = isValidPassword('flute5816password')

    expect(isValid).toBe(false)
})

test('Should correctly validate a valid password', () => {
    const isValid = isValidPassword('flute5816')

    expect(isValid).toBe(true)
})