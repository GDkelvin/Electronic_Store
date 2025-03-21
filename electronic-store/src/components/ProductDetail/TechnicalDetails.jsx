import React from "react";
import "../../css/TechnicalDetails.css"

const TechnicalDetails = ({ attributes }) => {
    // const details = [
    //     { label: "Display", value: "13.3-inch (diagonal) LED-backlit display with IPS technology" },
    //     { label: "Graphics", value: "Apple 10-core GPU" },
    //     { label: "Processor", value: "Apple M2 chip" },
    //     { label: "In the box", value: "67W USB-C Power Adapter, USB-C Charge Cable (2 m)" },
    //     { label: "Height", value: "0.61 inch (1.56 cm)" },
    //     { label: "Width", value: "11.97 inches (30.41 cm)" },
    // ];
    return (
        <div className="technical-detail">
            <h3 style={{ marginBottom: "10px", marginTop: "50px" }}>Technical Details</h3>
            <table>
                <tbody>
                    {Object.entries(attributes).map(([key, value], index) => (
                        <tr key={index}>
                            <td className="first-column">{key}</td>
                            <td className="second-column">{value}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    );
}

export default TechnicalDetails