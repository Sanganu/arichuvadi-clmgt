import React from 'react';

const Masterkey = (props) => {
    return (<React.Fragment>
    
            {props.items.map((rec, key) =>
                <option value={rec._id}>{rec.fname+" "+rec.lname}</option>)}

    </React.Fragment>)
}

export default Masterkey;
