export const calculateSubTotal = (items) => {
  // Return numeric subtotal (not a formatted string)
  return items.reduce((sum, item) => sum + (parseFloat(item.total) || (parseFloat(item.quantity) * parseFloat(item.amount)) || 0), 0);
};

export const calculateTaxAmount = (subTotal, taxPercentage) => {
  const sub = parseFloat(subTotal) || 0;
  return sub * (taxPercentage / 100);
};

export const calculateGrandTotal = (subTotal, taxAmount) => {
  const sub = parseFloat(subTotal) || 0;
  const tax = parseFloat(taxAmount) || 0;
  return sub + tax;
};

export const generateGSTNumber = () => {
  var stateCode = 22;
  var panNumber = generatePANNumber();
  var registrationCount = generateRegistrationCount();
  var checkCode = generateCheckCode();
  return stateCode + panNumber + registrationCount + "Z" + checkCode;
};

function generatePANNumber() {
  var panNumber = "";
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var taxpayerCategories = "ABCFGHLJPT";
  for (var i = 0; i < 3; i++) {
    panNumber += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  panNumber += taxpayerCategories.charAt(
    Math.floor(Math.random() * taxpayerCategories.length)
  );
  panNumber += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  for (var j = 0; j < 4; j++) {
    panNumber += Math.floor(Math.random() * 10);
  }
  panNumber += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  return panNumber;
}

function generateRegistrationCount() {
  var registrationCount = Math.floor(Math.random() * 10);
  return registrationCount;
}

function generateCheckCode() {
  var checkCode = Math.floor(Math.random() * 10);
  return checkCode;
}
