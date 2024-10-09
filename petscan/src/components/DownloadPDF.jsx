import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import PropTypes from 'prop-types'

const DownloadPDF = ({ results }) => {
    const downloadPDF = () => {
        const doc = new jsPDF();

        // titolo
        doc.setFontSize(20);
        doc.text("Risultati degli esami", 14, 22);

        // tabella
        autoTable(doc, {
            head: [['Parametro', 'Valore']],
            body: results.map(result => [
                { content: result.valueName, styles: { fontStyle: 'bold' } },
                `${result.value} ${result.unit}`
            ]),
        });

        // salva esami
        doc.save("risultati_esami.pdf");
    };

    return (
        <button onClick={downloadPDF} className="btn btn-primary mt-3">
            Scarica PDF
        </button>
    );
};

DownloadPDF.propTypes = {
    results: PropTypes.array.isRequired,
};

export default DownloadPDF;