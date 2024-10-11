import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import PropTypes from 'prop-types';
import logo from '../assets/images/logo-blue.png';
import downloadIcon from '../assets/images/file-pdf-solid.svg';

const DownloadPDF = ({ results, ownerName, surname, petName, petType, age, gender, breed, dateOfTest, testNumber }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.addImage(logo, 'PNG', 10, 5, 25, 25);


        // titolo
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0); // colore nero
        doc.text("Risultati degli esami", 40, 20);


        // nome del proprietario
        if (ownerName) {
            doc.setFontSize(11);
            doc.text(`Proprietario: ${ownerName} ${surname}`, 14, 35);
        }

        //data esame
        if (dateOfTest) {
            doc.setFontSize(11);
            doc.text(`Data dell'esame: ${dateOfTest}`, 140, 35);
        }

        // nome dell'animale
        if (petName) {
            doc.setFontSize(11);
            doc.text(`Nome dell'animale: ${petName}`, 14, 43);
        }

        //numero dell'esame
        if (testNumber) {
            doc.setFontSize(11);
            doc.text(`Numero dell'esame: ${testNumber}`, 140, 43);
        }

        //genere
        if (gender) {
            doc.setFontSize(11);

            const genderAnimal = gender === 'FEMALE' ? 'Femmina' : gender === 'MALE' ? 'Maschio' : gender;
            doc.text(`Genere: ${genderAnimal}`, 14, 51);
        }

        // specie
        if (petType) {
            doc.setFontSize(11);

            const animalType = petType === 'CAT' ? 'Gatto' : petType === 'DOG' ? 'Cane' : petType;
            doc.text(`Specie: ${animalType}`, 14, 59);
        }

        // razza
        if (breed) {
            doc.setFontSize(11);
            doc.text(`Razza: ${breed}`, 14, 67);
        }

        // eta'
        if (age) {
            doc.setFontSize(11);
            doc.text(`Età: ${age}`, 14, 75);
        }


        // tabella
        autoTable(doc, {
            head: [['Parametro', 'Valore']],
            body: results.map(result => [
                { content: result.valueName || 'N/A', styles: { fontStyle: 'bold' } },
                `${result.value !== undefined ? result.value : 'N/A'} ${result.unit || ''}`
            ]),
            startY: 85, // per spostare la tabella in basso

            headStyles: { // stile tabella
                fillColor: [3, 146, 175],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
            },
        });

        // salva esami
        doc.save("risultati_esami.pdf");
    };

    return (

        <img
            src={downloadIcon}
            alt="Scarica PDF"
            className="btn download-pdf mt-3"
            style={{ cursor: 'pointer' }}
            onClick={downloadPDF}
        />
    );
};

DownloadPDF.propTypes = {
    results: PropTypes.array.isRequired,
    ownerName: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    petName: PropTypes.string.isRequired,
    petType: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    dateOfTest: PropTypes.string.isRequired,
    testNumber: PropTypes.string.isRequired,
};

export default DownloadPDF;