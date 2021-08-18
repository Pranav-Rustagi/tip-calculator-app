import { useState } from "react";


// checks if string follows certain regular expression
const checkPattern = (value, pattern) => (new RegExp(pattern)).test(value);


// when input field is brought to focus
const focusInput = (target, checkVal) => {
    target.parentElement.classList.add("active");

    if (target.value === checkVal)
        target.value = ""
}


// when input field looses focus
const blurInput = (target, checkVal) => {
    const val = target.value.trim();
    target.parentElement.classList.remove("active");
    target.value = (val === "") ? checkVal : +val;
}


// modifies input vlaues for certain cases
const alterValue = val => {
    if (val === ".")
        val = "0.";
        
    else if (val.length > 1 && val[0] === "0" && val[1] !== ".")
        val = val.slice(1, val.length);

    return val;
}


// handles "active" class for the selected element
const setActiveTipButton = (target, setTipRate) => {
    let activeEl = document.querySelector(".tip-btn-grp .active");
    if (activeEl !== target) {
        target.classList.add("active");
        activeEl.classList.remove("active");
        if (target.tagName === "INPUT") 
            setTipRate(0);
    }
}


// calculates amounts for tip, and total amount (per head)
const calcAmount = (billAmount, tipRate, peopleCount) => {
    if(peopleCount !== "") {
        const billPP = (billAmount / peopleCount).toFixed(2);
        const tipPP = (billPP * tipRate / 100).toFixed(2);
        return [tipPP, (+billPP + +tipPP).toFixed(2)];
    }
    return [0, 0];
}


// component
const Calculator = props => {
    const tipRates = props.tipRates;

    const [billAmount, setBillAmount] = useState(0);
    const [tipRate, setTipRate] = useState(tipRates[0]);
    const [customTipRate, setCustomTipRate] = useState("");
    const [peopleCount, setPeopleCount] = useState(1);

    const [tipAmount, totalBill] = calcAmount(billAmount, tipRate, peopleCount);
    
    // onChange event handler for bill input
    const funcBillAmount = val => {
        val = alterValue(val);
        if(val === "" || checkPattern(val, "^[1-9]*[0-9]\\.?[0-9]{0,2}$"))
            setBillAmount(val);
    }

    // onClick event handler for tip-rate buttons
    const funcTipRate = (target, tip) => {
        setActiveTipButton(target);
        setTipRate(tip);
        setCustomTipRate("");
    }

    // onBlur event handler for custom tip rate input
    const checRate = value => {
        if (value === "")
            setCustomTipRate(0);
    }

    // onChange event handler for custom tip rate input
    const funcCustomTipRate = val => {
        val = alterValue(val);
        if(val <= 100 && (val === "" || checkPattern(val, "^[1-9]*[0-9]\\.?[0-9]{0,2}$"))) {
            setCustomTipRate(val);
            setTipRate(val);
        }
    }

    // onChange event handler for people count input
    const funcPeopleCount = count => {
        if(count === "" || checkPattern(count, "^[1-9][0-9]*$"))
            setPeopleCount(count);
    }

    // onClick event handler for "reset" button
    const resetAll = () => {
        setBillAmount(0);
        setTipRate(tipRates[0]);
        setCustomTipRate("");
        setPeopleCount(1);
        document.querySelector(".tip-btn-grp .btn").classList.add("active");
    }

    return (
        <div className="box row justify-content-between mx-auto mt-md-3 p-4 p-lg-3 col-12 col-sm-9 col-md-7 col-lg-9 col-xl-7 shadow">
            <div className="col-lg-6 py-2 px-0 px-lg-3 d-flex flex-column justify-content-between">
                <div className="mb-4 mb-md-3 mb-lg-0">
                    <label className="fw-bold mb-1 text-capitalize">bill</label>
                    <div className="input-group border border-2 border-white rounded-3">
                        <span className="input-group-text border-0 bg-transparent">
                            <img src={process.env.PUBLIC_URL + "/icon-dollar.svg"} alt="dollar" />
                        </span>
                        <input type="text" className="form-control py-1 border-0 text-end fw-bold bg-transparent shadow-none" aria-label="Total Amount" onFocus={(event) => {focusInput(event.target, "0")}} onBlur={(event) => blurInput(event.target, "0")} onChange={ (event) => { funcBillAmount(event.target.value.trim()) } } value={ billAmount } />
                    </div>
                </div>

                <div className="mb-4 mb-md-3 mb-lg-0">
                    <label className="fw-bold text-capitalize">select tip %</label>
                    <div className="tip-btn-grp row justify-content-between gx-2 mt-2">
                        {
                            tipRates.map((tip, ind) => {
                                return (
                                    <div className="col-4 my-1" key={ind}>
                                        <button className={"btn fw-bold py-1 w-100 border border-2 border-white rounded-3 shadow-none" + (tip === tipRate ? " active" : "")} onClick={(event) => {funcTipRate(event.target, tip)}}>{tip + "%"}</button>
                                    </div>
                                )
                            })
                        }
                        <div className="col-4 my-1">
                            <input type="text" className="form-control py-1 border-2 border-white rounded-3 text-end fw-bold shadow-none" aria-label="Custom Tip Rate" onBlur={(event) => {checRate(event.target.value)}} onClick={(event) => {setActiveTipButton(event.target, setTipRate)}} onChange={(event) => {funcCustomTipRate(event.target.value)}} value={customTipRate} placeholder="Custom" />
                        </div>
                    </div>
                </div>

                <div className="mb-4 mb-md-3 mb-lg-0">
                    <label className="fw-bold mb-1 text-capitalize">number of people</label>
                    <div className="input-group border border-2 border-white rounded-3">
                        <span className="input-group-text border-0 bg-transparent">
                            <img src={process.env.PUBLIC_URL + "/icon-person.svg"} alt="people" />
                        </span>
                        <input type="text" className="form-control py-1 border-0 text-end fw-bold bg-transparent shadow-none" aria-label="Number of people" onFocus={(event) => {focusInput(event.target, "1")}} onBlur={(event) => {blurInput(event.target, "1")}} onChange={ (event) => { funcPeopleCount(event.target.value.trim())} } value={ peopleCount } />
                    </div>
                </div>
            </div>

            <div className="col-lg-custom p-4 d-flex flex-column justify-content-between">
                <div>
                    <div className="mx-2 mb-3 mb-md-2 mt-2 d-flex justify-content-between align-items-center">
                        <label><span className="text-capitalize">tip amount</span><br/><span>/ person</span></label>
                        <span className="money fs-1 fw-bold">{ "$" + tipAmount }</span>
                    </div>

                    <div className="mx-2 my-3 my-md-2 d-flex justify-content-between align-items-center">
                        <label><span className="text-capitalize">total</span><br/><span>/ person</span></label>
                        <span className="money fs-1 fw-bold">{ "$" + totalBill }</span>
                    </div>
                </div>
                <button className="btn btn-reset fw-bold shadow-none text-uppercase d-block mb-2 mt-3 mt-md-4 mt-lg-5" onClick={resetAll}>reset</button>
            </div>
        </div>
    )
}


export default Calculator;