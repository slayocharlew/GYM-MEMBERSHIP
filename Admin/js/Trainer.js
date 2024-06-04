import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCGEZ-movg4KhXJO0PFCnLFyy-zYxKx6yw",
    authDomain: "gym-membership-3881e.firebaseapp.com",
    databaseURL: "https://gym-membership-3881e-default-rtdb.firebaseio.com",
    projectId: "gym-membership-3881e",
    storageBucket: "gym-membership-3881e.appspot.com",
    messagingSenderId: "342224120014",
    appId: "1:342224120014:web:0318e246d79e335ec2889f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    loadTrainers();

    const trainerForm = document.getElementById('trainerForm');
    trainerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTrainer();
    });
});

function showAddTrainerForm() {
    document.getElementById('add-trainer-form').style.display = 'block';
}

async function loadTrainers() {
    const trainersList = document.getElementById('trainers-list');
    trainersList.innerHTML = '';
    const querySnapshot = await getDocs(collection(db, "trainers"));
    querySnapshot.forEach((doc) => {
        const trainer = doc.data();
        trainersList.innerHTML += `
            <div class="trainer">
                <img src="${trainer.image}" alt="${trainer.name}">
                <h3>${trainer.name}</h3>
                <p>Phone: ${trainer.phone}</p>
                <p>Specialty: ${trainer.specialty}</p>
                <button onclick="editTrainer('${doc.id}')">Edit</button>
                <button onclick="deleteTrainer('${doc.id}')">Delete</button>
            </div>
        `;
    });
}

async function addTrainer() {
    const trainerName = document.getElementById('trainerName').value;
    const trainerPhone = document.getElementById('trainerPhone').value;
    const trainerSpecialty = document.getElementById('trainerSpecialty').value;
    const trainerImage = document.getElementById('trainerImage').value;

    await addDoc(collection(db, "trainers"), {
        name: trainerName,
        phone: trainerPhone,
        specialty: trainerSpecialty,
        image: trainerImage
    });

    loadTrainers();
    document.getElementById('add-trainer-form').style.display = 'none';
}

async function editTrainer(trainerId) {
    const trainerDoc = doc(db, "trainers", trainerId);
    const trainer = (await getDoc(trainerDoc)).data();

    document.getElementById('trainerName').value = trainer.name;
    document.getElementById('trainerPhone').value = trainer.phone;
    document.getElementById('trainerSpecialty').value = trainer.specialty;
    document.getElementById('trainerImage').value = trainer.image;

    document.getElementById('add-trainer-form').style.display = 'block';

    document.getElementById('trainerForm').onsubmit = async function (e) {
        e.preventDefault();
        await updateDoc(trainerDoc, {
            name: document.getElementById('trainerName').value,
            phone: document.getElementById('trainerPhone').value,
            specialty: document.getElementById('trainerSpecialty').value,
            image: document.getElementById('trainerImage').value
        });
        loadTrainers();
        document.getElementById('add-trainer-form').style.display = 'none';
    };
}

async function deleteTrainer(trainerId) {
    await deleteDoc(doc(db, "trainers", trainerId));
    loadTrainers();
}
