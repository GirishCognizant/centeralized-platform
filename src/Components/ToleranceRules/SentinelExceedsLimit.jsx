import React, { useEffect, useState } from "react";
import axios from "axios";
import links from "../../Utils/links"

export default function SentinelExceedsLimit() {
    const { portUrl, filterVinDetailsUrl } = links

    // API call URLs
    // const portUrl = "http://localhost:8080";
    // const filterVinDetailsUrl = "/api/VinFilter";

    // Search parameters to fetch VIN
    const [searchParams, setSearchParams] = useState({
        VIN: '',
        ProductType: '',
        condition: '',
        override: '',
    });

    // Handle input changes in the UI form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Searching VIN and storing to display
    const [vinData, setVinData] = useState([]);
    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${portUrl + filterVinDetailsUrl}`, { VIN: searchParams.VIN });
        setVinData(response.data);
    };

    //options for Category
    const [TermData, setTermData] = useState(null);
    const [percentageOfInvoice, setpercentageOfInvoice] = useState(null);
    const [difference, setdifference] = useState([]);

    // Formula Calculation function
    const calculateValues = (invoice, DandH, colorupCharge, PIOInvoice, percentageOfInvoice, difference) => {
        const calculatedParameter = (invoice + DandH + colorupCharge + PIOInvoice) * percentageOfInvoice / 100;
        const calculatedSentinel = calculatedParameter + difference;
        let calculatedOverride

        if (difference <= 50) {
            calculatedOverride = "0"
        } else if (difference <= 500) {
            calculatedOverride = "2"
        } else if (difference <= 1000) {
            calculatedOverride = "4"
        } else if (difference > 1000) {
            calculatedOverride = "5"
        }
        return { calculatedParameter, calculatedSentinel, calculatedOverride }
    };

    //initiate when changes in the form input
    useEffect(() => {
        const { condition } = searchParams;

        const setFormData = (TermData, percentageOfInvoice, difference) => {
            setTermData(TermData)
            setpercentageOfInvoice(percentageOfInvoice)
            setdifference(difference)
        };

        if (condition === "NEW") {
            if (vinData.length ? vinData[0].Make === "Honda" : null) {
                setFormData(36, 5, [50, 50.01, 1000, 1000.01])
            } else {
                setFormData(24, 5, [50, 50.01, 500.01, 1000.01])
            }
        } else if (condition === "Used/Certified") {
            if (vinData ? vinData[0].Make === "Honda" : null) {
                setFormData(36, 5, [50, 50.01, 1000, 1000.01])
            } else {
                setFormData(24, 5, [50, 50.01, 500.01, 1000.01])
            }
        }
    }, [searchParams, vinData]);

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">Sentinel exceeds limit</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
                <section>
                    <label className="px-1 font-medium" htmlFor="VIN">VIN:</label>
                    <input name="VIN" value={searchParams.VIN} onChange={handleChange} type="text" className="border border-black rounded p-2" required />
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="ProductType">Product Type:</label>
                    <select name="ProductType" id="ProductType" value={searchParams.ProductType} onChange={handleChange} className="border border-black rounded p-2" required >
                        <option value="">NA</option>
                        <option value="Retail">Retail</option>
                        <option value="Lease">Lease</option>
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="condition">Condition:</label>
                    <select name="condition" id="condition" value={searchParams.condition} onChange={handleChange} className="border border-black rounded p-2" required >
                        <option value="">NA</option>
                        <option value="NEW">New</option>
                        <option value="Used/Certified">Used/Certified</option>
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="override">Override:</label>
                    <select name="override" id="override" value={searchParams.override} onChange={handleChange} className="border border-black rounded p-2">
                        <option value="">All</option>
                        <option value="0">0</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </section>

                <button className="rounded-md p-2 mx-2 border border-black" type="submit">Submit</button>
            </form>

            {vinData.length ?
                <section className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap">
                    <span className="px-1 font-normal">Product Type:</span>
                    <span className="px-1 font-bold">{searchParams.ProductType ? searchParams.ProductType : null}</span>
                    <span className="px-1 font-normal">Condition:</span>
                    <span className="px-1 font-bold">{searchParams.condition ? searchParams.condition : null}</span>
                    <span className="px-1 font-normal">vin:</span>
                    <span className="px-1 font-bold">{vinData[0].VIN ? vinData[0].VIN : null}</span>
                    <span className="px-1 font-normal">Year:</span>
                    <span className="px-1 font-bold">{vinData[0].Year ? vinData[0].Year : null}</span>
                    <span className="px-1 font-normal">Make:</span>
                    <span className="px-1 font-bold">{vinData[0].Make ? vinData[0].Make : null}</span>
                    <span className="px-1 font-normal">Model:</span>
                    <span className="px-1 font-bold">{vinData[0].Model ? vinData[0].Model : null}</span>
                </section>
                :
                null
            }
            <section className="py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr className="text-blue-900">
                                <th className="p-4 border border-black">Term</th>
                                <th className="p-4 border border-black">Invoice</th>
                                <th className="p-4 border border-black">D&H</th>
                                <th className="p-4 border border-black">Colorup charge</th>
                                <th className="p-4 border border-black">PIO Invoice</th>
                                <th className="p-4 border border-black">% of Invoice</th>
                                <th className="p-4 border border-black">Parameter</th>
                                <th className="p-4 border border-black">Sentinel</th>
                                <th className="p-4 border border-black">Difference</th>
                                <th className="p-4 border border-black">Override</th>
                                <th className="p-4 border border-black">Release</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vinData && vinData.map((element) => (
                                <React.Fragment key={element.VIN}>
                                    {

                                        difference && difference.map((differenceValue, index) => {
                                            const { calculatedParameter, calculatedSentinel, calculatedOverride } = calculateValues(
                                                parseInt(element.DLR_INV_AM),
                                                parseInt(element.DH_AMT),
                                                parseInt(element.Color_Upcharge_Invoice),
                                                parseInt(element.PIO_Total_Dlr_Invoice_Amount),
                                                percentageOfInvoice,
                                                parseFloat(difference[index])
                                            );

                                            if (
                                                searchParams.override &&
                                                calculatedOverride !== searchParams.override 
                                            ) {
                                                return null; // Skip this row if it doesn't match the selected Override level
                                            }

                                            return (
                                                <tr key={index}>
                                                    <td className="p-2 border border-black">{TermData}</td>
                                                    <td className="p-2 border border-black">{element.DLR_INV_AM}</td>
                                                    <td className="p-2 border border-black">{element.DH_AMT}</td>
                                                    <td className="p-2 border border-black">{element.Color_Upcharge_Invoice}</td>
                                                    <td className="p-2 border border-black">{element.PIO_Total_Dlr_Invoice_Amount}</td>
                                                    <td className="p-2 border border-black">{percentageOfInvoice}</td>
                                                    <td className="p-2 border border-black">{calculatedParameter}</td>
                                                    <td className="p-2 border border-black">{calculatedSentinel.toFixed(2)}</td>
                                                    <td className="p-2 border border-black">{differenceValue}</td>
                                                    <td className="p-2 border border-black">{calculatedOverride}</td>
                                                    <td className="p-2 border border-black">Wave 36B</td>
                                                </tr>
                                            );
                                        })}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}