import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function index(props:any) {
    const {currencyExchangeData} = props

    return (
        <>
            <div className="currency-exchange-flex">
                <p>{currencyExchangeData.asset_id_base}</p>
                <ArrowForwardIcon fontSize="large" color="inherit"/>
                <p>{currencyExchangeData.asset_id_quote}</p>
            </div>
            <p>Conversion Rate: ${currencyExchangeData.rate}</p>
        </>
        
    );
}

export default index;