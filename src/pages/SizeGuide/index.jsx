import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Navigation from '../../components/Navigation'
import SizeChart from '../../components/SizeChart'
import measuringGuide from '../../assets/images/foot-measuring.png'
import { useLocation } from 'react-router-dom'
import Footer from '../../components/Footer'
function SizeGuide({ sizes }) {
    const [sizeType, setSizeType] = useState("US");
    const [unitType, setUnitType] = useState("IN");
    const location = useLocation();
    const product = location.state;
    // const selectBox = document.getElementById("size-select");
    // const selectedValue = selectBox.value;
    // useEffect(() => {
    //     console.log(selectedValue)
    //     setSizeType(selectedValue)
    // }, [selectBox])

    return (
        <body>
            <Header />

            <Navigation />
            <main>
                <section className="product-measurements">
                    <div className="heading">
                        <h2>Size Guide</h2>

                        <div className='settings'>
                            <div className="custom-select">


                                <select onChange={(e) => setSizeType(e.target.value)} name="size-select" >
                                    <option value="US">US size</option>
                                    <option value="UK">UK size</option>
                                </select>
                            </div>

                            <a onClick={() => setUnitType("IN")} className={unitType === "IN" ? 'in active-unit' : 'in'}>IN</a>
                            <a onClick={() => setUnitType("CM")} className={unitType === "CM" ? 'cm active-unit' : 'cm'}>CM</a>


                            <div>
                            </div>
                        </div>
                    </div>


                    <h3>Product measurements</h3>

                    <SizeChart product={product} sizeType={sizeType} unitType={unitType} />




                </section>
                <section >


                    <h3>How to measure</h3>
                    <div className='how-to-measure'>


                        <ol>
                            <li>
                                <span>Foot length</span>
                                <br />
                                Measure the maximum length of your foot.
                            </li>
                            <br />
                            <li>
                                <span>Foot width</span>
                                <br />
                                Measure the maximum width of your foot.
                            </li>
                            <br />
                            <li>
                                <span>Ball girth</span>
                                <br />
                                Wrap a tape to measure around the widest part of your foot.

                            </li>
                            <br />
                        </ol>

                        <img src={measuringGuide} alt="foot measuring guide" />
                    </div>

                </section>
            </main>
            <Footer />
        </body>
    )
}

export default SizeGuide