import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function index(props:any) {
    const {currencyExchangeData} = props

    return (
        <div style={{display:"flex", flexDirection:"row"}}>
            <p>{currencyExchangeData.asset_id_base}</p>
            <ArrowForwardIcon />
            <p>{currencyExchangeData.asset_id_quote}</p>
            <p>{currencyExchangeData.rate}</p>
        </div>
    );
}

export default index;