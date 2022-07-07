import './styles.css'
function CurrencyItemDetails(props:any) {

    return (
        <div className='currency-details'>
            <h3>Currency Details</h3>
            <h6>Select currency from table to view details</h6>
            {props.hasData &&
                <table className='myTable'>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                   {Object.keys(props.data).map((key) =>{
                    return (
                        <>
                        <tr>
                        <td>{key}</td>
                        <td>{props.data[key]}</td>
                        </tr>
                        </>
                    )
                   })}
                </tbody>
            </table>
            }
            
        </div>
    );
}

export default CurrencyItemDetails;