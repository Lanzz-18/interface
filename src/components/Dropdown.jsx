import React, {useState} from 'react';

/*
<DropDown 
    label="Property Type"
    options={propertTypes}
    onSelect={(value) => console.log(`User selected: ${value}`)}
/>
*/

const DropDown = (props) => {
    const [val, setVal] = useState("");
    const handleChange = (event) => {
        setVal(event.target.value);
        props.onSelect(event.target.value);
    };

    return(
        <div className="form-group">
            {props.label && <label className="filter-label">{props.label}</label>}
            <select value={val} onChange={handleChange}>
                <option value={props.default}>{props.default}</option>
                {props.options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropDown;
