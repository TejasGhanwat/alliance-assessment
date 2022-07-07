import  {useState, useEffect} from 'react'
import {baseUrl} from '../../constants/baseUrl'
import axios from 'axios';
import { ASSET } from '../../interfaces/asset';
import BootstrapTable from 'react-bootstrap-table-next';
import { API_KEY } from '../../ENV/apiKey';


const CurrencyList = () => {
  
    const [currencyItems, setcurrencyItems] = useState([]);

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

    const columns = [
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
      <div>
        <BootstrapTable keyField='asset_id' data={ currencyItems } columns={ columns } />
      </div>
    )
  }

  export default CurrencyList
