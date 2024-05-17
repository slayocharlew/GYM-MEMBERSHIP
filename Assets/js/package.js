function calculateExpiration(packageType) {
  const expirationDate = new Date();
  
  switch (packageType) {
    case 'silver':
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      break;
    case 'diamond':
      expirationDate.setMonth(expirationDate.getMonth() + 3);
      break;
    case 'gold':
      expirationDate.setMonth(expirationDate.getMonth() + 6);
      break;
    default:
      console.error('Invalid package type');
      return;
  }

  const expirationElement = document.getElementById(`${packageType}-expiration`);
  expirationElement.textContent = expirationDate.toDateString();
}

