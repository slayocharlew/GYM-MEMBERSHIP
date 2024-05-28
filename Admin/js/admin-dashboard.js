// Ensure admin is logged in
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in, check if they are admin
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(user.uid);

    userRef.get().then(doc => {
      if (doc.exists && doc.data().role === 'admin') {
        console.log('Welcome, Admin');
      } else {
        alert('Access denied. Admins only.');
        window.location.href = '/admin-login.html';
      }
    });
  } else {
    window.location.href = '/admin-login.html';
  }
});

// Manage Inventory
document.getElementById('manageInventory').addEventListener('click', () => {
  loadInventoryManagement();
});

// Manage Trainers
document.getElementById('manageTrainers').addEventListener('click', () => {
  loadTrainerManagement();
});

// View Purchases
document.getElementById('viewPurchases').addEventListener('click', () => {
  loadPurchasesView();
});

function loadInventoryManagement() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Manage Inventory</h2>
    <div id="inventoryList"></div>
    <button id="addInventoryItem">Add Inventory Item</button>
    <!-- Add form for new items -->
    <form id="newInventoryItemForm" style="display:none;">
      <input type="text" id="itemName" placeholder="Item Name" required>
      <input type="number" id="itemQuantity" placeholder="Item Quantity" required>
      <button type="submit">Add Item</button>
    </form>
  `;

  const inventoryList = document.getElementById('inventoryList');
  const newInventoryItemForm = document.getElementById('newInventoryItemForm');

  // Show form when button is clicked
  document.getElementById('addInventoryItem').addEventListener('click', () => {
    newInventoryItemForm.style.display = 'block';
  });

  // Fetch and display inventory items
  const db = firebase.firestore();
  db.collection('inventory').get().then(snapshot => {
    snapshot.forEach(doc => {
      const item = doc.data();
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        <p>${item.name} - ${item.quantity}</p>
        <button onclick="editItem('${doc.id}', '${item.name}', ${item.quantity})">Edit</button>
        <button onclick="deleteItem('${doc.id}')">Delete</button>
      `;
      inventoryList.appendChild(itemDiv);
    });
  });

  // Handle new item form submission
  newInventoryItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;

    db.collection('inventory').add({
      name: itemName,
      quantity: itemQuantity
    }).then(() => {
      alert('Item added successfully');
      loadInventoryManagement();
    }).catch(error => {
      console.error('Error adding item: ', error);
    });
  });
}

// Edit item function
function editItem(id, name, quantity) {
  const newName = prompt('Enter new name:', name);
  const newQuantity = prompt('Enter new quantity:', quantity);

  if (newName && newQuantity) {
    const db = firebase.firestore();
    db.collection('inventory').doc(id).update({
      name: newName,
      quantity: newQuantity
    }).then(() => {
      alert('Item updated successfully');
      loadInventoryManagement();
    }).catch(error => {
      console.error('Error updating item: ', error);
    });
  }
}

// Delete item function
function deleteItem(id) {
  const db = firebase.firestore();
  db.collection('inventory').doc(id).delete().then(() => {
    alert('Item deleted successfully');
    loadInventoryManagement();
  }).catch(error => {
    console.error('Error deleting item: ', error);
  });
}

function loadTrainerManagement() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Manage Trainers</h2>
    <div id="trainerList"></div>
    <button id="addTrainer">Add Trainer</button>
    <!-- Add form for new trainers -->
    <form id="newTrainerForm" style="display:none;">
      <input type="text" id="trainerName" placeholder="Trainer Name" required>
      <input type="text" id="trainerSpecialty" placeholder="Trainer Specialty" required>
      <button type="submit">Add Trainer</button>
    </form>
  `;

  const trainerList = document.getElementById('trainerList');
  const newTrainerForm = document.getElementById('newTrainerForm');

  // Show form when button is clicked
  document.getElementById('addTrainer').addEventListener('click', () => {
    newTrainerForm.style.display = 'block';
  });

  // Fetch and display trainers
  const db = firebase.firestore();
  db.collection('trainers').get().then(snapshot => {
    snapshot.forEach(doc => {
      const trainer = doc.data();
      const trainerDiv = document.createElement('div');
      trainerDiv.innerHTML = `
        <p>${trainer.name} - ${trainer.specialty}</p>
        <button onclick="editTrainer('${doc.id}', '${trainer.name}', '${trainer.specialty}')">Edit</button>
        <button onclick="deleteTrainer('${doc.id}')">Delete</button>
      `;
      trainerList.appendChild(trainerDiv);
    });
  });

  // Handle new trainer form submission
  newTrainerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const trainerName = document.getElementById('trainerName').value;
    const trainerSpecialty = document.getElementById('trainerSpecialty').value;

    db.collection('trainers').add({
      name: trainerName,
      specialty: trainerSpecialty
    }).then(() => {
      alert('Trainer added successfully');
      loadTrainerManagement();
    }).catch(error => {
      console.error('Error adding trainer: ', error);
    });
  });
}

// Edit trainer function
function editTrainer(id, name, specialty) {
  const newName = prompt('Enter new name:', name);
  const newSpecialty = prompt('Enter new specialty:', specialty);

  if (newName && newSpecialty) {
    const db = firebase.firestore();
    db.collection('trainers').doc(id).update({
      name: newName,
      specialty: newSpecialty
    }).then(() => {
      alert('Trainer updated successfully');
      loadTrainerManagement();
    }).catch(error => {
      console.error('Error updating trainer: ', error);
    });
  }
}

// Delete trainer function
function deleteTrainer(id) {
  const db = firebase.firestore();
  db.collection('trainers').doc(id).delete().then(() => {
    alert('Trainer deleted successfully');
    loadTrainerManagement();
  }).catch(error => {
    console.error('Error deleting trainer: ', error);
  });
}

function loadPurchasesView() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>View Purchases</h2>
    <div id="purchaseList"></div>
  `;

  const purchaseList = document.getElementById('purchaseList');

  // Fetch and display purchases
  const db = firebase.firestore();
  db.collection('purchases').get().then(snapshot => {
    snapshot.forEach(doc => {
      const purchase = doc.data();
      const purchaseDiv = document.createElement('div');
      purchaseDiv.innerHTML = `
        <p>User: ${purchase.userId} - Package: ${purchase.packageType}</p>
      `;
      purchaseList.appendChild(purchaseDiv);
    });
  });
}
