import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {
  isValidCreditCardNumber,
  isValidExpiryDate,
  isValidCVV,
  getCreditCardType,
} from 'credit-card-number-vld';

export default function CreditCardValidationScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [cardType, setCardType] = useState('Unknown');
  const [error, setError] = useState('');

  const handleCheckValidity = () => {
    const isCardNumberValid = isValidCreditCardNumber(cardNumber);
    const isExpiryDateValid = isValidExpiryDate(expiryDate);
    const isCVVValid = isValidCVV(cvv);

    if (isCardNumberValid && isExpiryDateValid && isCVVValid) {
      setIsValid(true);
      const type = getCreditCardType(cardNumber);
      setCardType(type);
      setError('');
    } else {
      setIsValid(false);
      setCardType('Invalid');
      setError('Please check your information.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Credit Card Validation</Text>

      <TextInput
        style={styles.input}
        placeholder="Card Number (e.g., 4111 1111 1111 1111)"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={(text) => setExpiryDate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="CVV (3 or 4 digits)"
        value={cvv}
        onChangeText={(text) => setCVV(text)}
      />

      <Button title="Check Validity" onPress={handleCheckValidity} />

      {isValid && <Text style={styles.validText}>Card is valid</Text>}
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.cardTypeText}>Card Type: {cardType}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  validText: {
    color: 'green',
    fontSize: 18,
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginTop: 10,
  },
  cardTypeText: {
    fontSize: 18,
    marginTop: 10,
  },
});
