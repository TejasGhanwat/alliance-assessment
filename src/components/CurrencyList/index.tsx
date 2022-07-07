import  {useState, useEffect} from 'react'
import {baseUrl} from '../../constants/baseUrl'
import axios from 'axios';
import {COLUMNITEM} from '../../interfaces/columnItems'
import { ASSET } from '../../interfaces/asset';
import BootstrapTable from 'react-bootstrap-table-next';
import CurrencyItemDetails from '../CurrencyItemDetails'
import CurrencyExchange from '../CurrencyExchange'
import './styles.css'

function CurrencyList() {
    const [currencyItems, setcurrencyItems] = useState([]);
    const [filterableCurrencyItems, setFilterableCurrencyItems] = useState([])
    const [currencyItemDetails, setcurrencyItemDetails] = useState<ASSET>()
    const [hasData, setHasData] = useState(false)
    const [currencyExchangeIds, setCurrencyExchangeIds] = useState<string[]>([])
    const [currencyExchangeData, setCurrencyExchangeData] = useState<ASSET[]>([])

    useEffect(()=>{
      axios.get(`${baseUrl}v1/assets`,  {
        headers: {
          'X-CoinAPI-Key': '41750804-A2C7-4AF6-93CB-B9B06ECD4F76' ,
        }
      })
      .then(res => {
        const assets = res.data;
        setcurrencyItems(assets)
        setFilterableCurrencyItems(assets)
      })
    }, [])

    const setNewData = (e:React.ChangeEvent<HTMLInputElement>) =>{
      const searchParam = e.target.value.toLocaleLowerCase();
      const updatedList = [...currencyItems];
      const filteredData = updatedList.filter((item:any) =>item.name.toLowerCase().includes(searchParam))
      setFilterableCurrencyItems(filteredData)
    }

    const rowEvents = {
      onClick: (e:React.SyntheticEvent, row:any, rowIndex:number) => {
        setcurrencyItemDetails(row)
        setHasData(true)
        if(currencyExchangeIds.length < 2){
          const newCurrencyExchangeData = [row.asset_id, ...currencyExchangeIds]
          setCurrencyExchangeIds(newCurrencyExchangeData)
        }
        else{
          setCurrencyExchangeIds([row.asset_id])
        }
      }
    };

    useEffect(()=>{
          axios.get(`${baseUrl}v1/exchangerate/${currencyExchangeIds[0]}/${currencyExchangeIds[1]}`,  {
            headers: {
              'X-CoinAPI-Key': '41750804-A2C7-4AF6-93CB-B9B06ECD4F76' ,
            }
          })
          .then(res => {
            const currencyExchange = res.data;
            setCurrencyExchangeData(currencyExchange)
          })
    }, [currencyExchangeIds])

    const listColumns: Array<COLUMNITEM> = [
      {
      dataField: 'name',
      text: 'Asset Name',
      sort: true
    },
    {
      dataField: 'price_usd',
      text: 'Price in $USD',
      sort: true
    },];

    return (
        <div className="wrapper">
          <div className= "currency-list">
            <h3>Currency List</h3>
          <input className="search-input" type="text" placeholder='search...' onChange={setNewData}></input>
          <BootstrapTable keyField='asset_id' data={ filterableCurrencyItems } columns={ listColumns } rowEvents={ rowEvents} />
          </div>
          <div className='right-panel'>
            <CurrencyItemDetails hasData={hasData} data={currencyItemDetails} />
            <div className="currency-exchange">
            <h3>Currency Exchange</h3>
            <h6>Make two selections from currency table to view Currency Exchange</h6>
            {currencyExchangeIds.length ===2 &&
              <CurrencyExchange currencyExchangeData={currencyExchangeData}/>
            }
            </div>
          </div>
        </div>
    );
}

export default CurrencyList;

