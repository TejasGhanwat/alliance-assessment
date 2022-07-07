import './styles.css'
function CurrencyItemDetails(props:any) {

    return (
        <div className=''>
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
        </div>
    );
}

export default CurrencyItemDetails;