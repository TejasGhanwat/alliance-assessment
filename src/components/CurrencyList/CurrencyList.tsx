import  {useState, useEffect} from 'react'
import {baseUrl} from '../../constants/baseUrl'
import { API_KEY } from '../../ENV/apiKey';
import axios from 'axios';
import {COLUMNITEM} from '../../interfaces/columnItems'
import { ASSET } from '../../interfaces/asset';
import BootstrapTable from 'react-bootstrap-table-next';
import CurrencyItemDetails from '../CurrencyItemDetails/CurrencyItemDetails'

function CurrencyList() {
    const [currencyItems, setcurrencyItems] = useState([]);
    const [currencyItemDetails, setcurrencyItemDetails] = useState<ASSET>()
    const [hasData, setHasData] = useState(false)

    const rowEvents = {
      onClick: (e:React.SyntheticEvent, row:ASSET, rowIndex:number) => {
        setcurrencyItemDetails(row)
        setHasData(true)
      }
    };

    console.log(setcurrencyItemDetails)

    useEffect(()=>{
      axios.get(`${baseUrl}v1/assets`,  {
        headers: {
          'X-CoinAPI-Key': API_KEY ,
        }
      })
      .then(res => {
        const assests = res.data;
        setcurrencyItems(assests)
      })
    }, [])

    const listColumns: Array<COLUMNITEM> = [
      {
      dataField: 'name',
      text: 'Asset Name',
      sort: true
    },
    {
      dataField: 'price_usd',
      text: 'Price $USD',
      sort: true
    },];
    return (
        <div style={{display:"flex",flexDirection:"row" }}>
          <div style={{height:"400px", width:"400px", border:"1px solid black", overflow:"scroll" }}>
          <BootstrapTable keyField='asset_id' data={ currencyItems } columns={ listColumns } rowEvents={ rowEvents} />
          </div>
          <div style={{height:"400px", width:"400px", border:"1px solid black" }}>

            {
              hasData && <CurrencyItemDetails data={currencyItemDetails} />
            }
          </div>
          
        </div>
    );
}

export default CurrencyList;